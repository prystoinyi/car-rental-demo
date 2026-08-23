import { readFileSync, statSync } from 'node:fs';
import { findPackageJSON } from 'node:module';
import { dirname, extname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import stylelint from 'stylelint';
import { propertyGroups } from 'stylelint-config-clean-order';
import { __unstable__loadDesignSystem } from 'tailwindcss';

const { createPlugin } = stylelint;
const ruleName = 'lcr/tailwind-order';
const projectRoot = fileURLToPath(new URL('..', import.meta.url));
const globalsPath = resolve(projectRoot, 'src/app/globals.css');
const importPattern = /@import\s+["']([^"']+)["']\s*;/gu;
const utilityPattern = /^\s*@utility\s+([\w-]+)\s*\{/gmu;
const projectSourceRoot = resolve(projectRoot, 'src');

const propertyOrder = new Map(
    propertyGroups.flatMap((group, groupIndex) =>
        group.map((property, propertyIndex) => [property, { groupIndex, propertyIndex }]),
    ),
);

function resolveImport(importPath, importingFile) {
    if (importPath === 'tailwindcss') {
        return fileURLToPath(import.meta.resolve('tailwindcss/index.css'));
    }

    if (importPath === 'tw-animate-css') {
        const packageJsonPath = findPackageJSON('tw-animate-css', import.meta.url);
        const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf8'));

        return resolve(dirname(packageJsonPath), packageJson.main ?? packageJson.style);
    }

    const importedPath = resolve(dirname(importingFile), importPath);

    return extname(importedPath) === '' ? `${importedPath}.css` : importedPath;
}

function inlineImports(filePath, visitedFiles = new Set(), importedFiles = new Set(), customUtilities = new Set()) {
    if (visitedFiles.has(filePath)) {
        return '';
    }

    visitedFiles.add(filePath);
    importedFiles.add(filePath);

    const css = readFileSync(filePath, 'utf8');

    if (filePath === projectSourceRoot || filePath.startsWith(`${projectSourceRoot}/`)) {
        for (const match of css.matchAll(utilityPattern)) {
            customUtilities.add(match[1]);
        }
    }

    return css.replace(importPattern, (_, importPath) =>
        inlineImports(resolveImport(importPath, filePath), visitedFiles, importedFiles, customUtilities),
    );
}

let designSystem;
let designSystemPromise;
let lastImportSignature = '';
let lastGlobalsMtime = 0;
let importedFiles = new Set();
let customUtilityNames = new Set();

function getImportSignature(importedFiles) {
    return [...importedFiles]
        .sort()
        .map((filePath) => {
            const { mtimeNs, size } = statSync(filePath);

            return `${filePath}:${mtimeNs}:${size}`;
        })
        .join('|');
}

async function getDesignSystem() {
    const globalsMtime = statSync(globalsPath).mtimeNs;

    if (designSystemPromise && globalsMtime === lastGlobalsMtime) {
        const knownImportSignature = getImportSignature(importedFiles);

        if (knownImportSignature === lastImportSignature) {
            return designSystemPromise;
        }
    }

    const discoveredFiles = new Set();
    const discoveredCustomUtilities = new Set();
    const css = inlineImports(globalsPath, new Set(), discoveredFiles, discoveredCustomUtilities);
    const importSignature = getImportSignature(discoveredFiles);

    importedFiles = discoveredFiles;
    customUtilityNames = discoveredCustomUtilities;
    lastGlobalsMtime = globalsMtime;
    lastImportSignature = importSignature;
    designSystemPromise = __unstable__loadDesignSystem(css)
        .then((nextDesignSystem) => {
            designSystem = nextDesignSystem;
            utilityOrderCache.clear();
            candidateNameCache.clear();

            return nextDesignSystem;
        })
        .catch((error) => {
            designSystemPromise = undefined;
            lastImportSignature = '';

            throw error;
        });

    return designSystemPromise;
}

const utilityOrderCache = new Map();
const candidateNameCache = new Map();

function findMinDeclarationOrder(nodes) {
    let minOrder = null;
    const stack = [nodes];

    while (stack.length > 0) {
        const currentNodes = stack.pop();

        for (const node of currentNodes) {
            if (node.kind === 'declaration') {
                const order = propertyOrder.get(node.property);

                if (
                    order
                    && (minOrder === null
                        || order.groupIndex < minOrder.groupIndex
                        || (order.groupIndex === minOrder.groupIndex && order.propertyIndex < minOrder.propertyIndex))
                ) {
                    minOrder = order;
                }
            }

            if (node.nodes) {
                stack.push(node.nodes);
            }
        }
    }

    return minOrder;
}

function getCandidateName(utility) {
    if (candidateNameCache.has(utility)) {
        return candidateNameCache.get(utility);
    }

    const withoutImportant = utility.replace(/^!|!$/gu, '');
    let depth = 0;
    let lastSeparator = -1;

    for (let index = 0; index < withoutImportant.length; index++) {
        const char = withoutImportant[index];

        if (char === '[' || char === '(') {
            depth++;
        } else if (char === ']' || char === ')') {
            depth--;
        } else if (char === ':' && depth === 0) {
            lastSeparator = index;
        }
    }

    const withoutVariants = lastSeparator === -1
        ? withoutImportant
        : withoutImportant.slice(lastSeparator + 1);
    const candidateName = withoutVariants.replace(/^-/u, '');

    candidateNameCache.set(utility, candidateName);

    return candidateName;
}

function getUtilityOrder(utility) {
    if (utilityOrderCache.has(utility)) {
        return utilityOrderCache.get(utility);
    }

    const ast = designSystem.candidatesToAst([utility]).flat();
    const order = findMinDeclarationOrder(ast) ?? {
        groupIndex: propertyGroups.length,
        propertyIndex: Number.MAX_SAFE_INTEGER,
    };

    utilityOrderCache.set(utility, order);

    return order;
}

function getUtilityData(utility) {
    if (customUtilityNames.has(getCandidateName(utility))) {
        return { kind: 'custom' };
    }

    return { kind: 'sortable', order: getUtilityOrder(utility) };
}

function getUtilities(run) {
    return run.flatMap((node) => node.params.trim().split(/\s+/u).filter(Boolean));
}

function getExpectedGroups(run) {
    const utilities = getUtilities(run);
    const customUtilities = [];
    const groupedUtilities = new Map();

    utilities.forEach((utility, sourceIndex) => {
        const data = getUtilityData(utility);

        if (data.kind === 'custom') {
            customUtilities.push(utility);

            return;
        }

        const group = groupedUtilities.get(data.order.groupIndex) ?? [];

        group.push({ utility, sourceIndex, order: data.order });
        groupedUtilities.set(data.order.groupIndex, group);
    });

    return [
        ...customUtilities.map((utility) => [utility]),
        ...Array.from(groupedUtilities.entries())
            .sort(([firstGroupIndex], [secondGroupIndex]) => firstGroupIndex - secondGroupIndex)
            .map(([, group]) =>
                group
                    .sort((first, second) =>
                        first.order.propertyIndex - second.order.propertyIndex
                        || first.sourceIndex - second.sourceIndex)
                    .map(({ utility }) => utility),
            )
            .filter((group) => group.length > 0),
    ];
}

function getApplyRuns(root) {
    const runs = [];
    let currentRun = [];

    root.walkAtRules('apply', (node) => {
        if (currentRun.length > 0 && currentRun[currentRun.length - 1].next() !== node) {
            runs.push(currentRun);
            currentRun = [];
        }

        currentRun.push(node);
    });

    if (currentRun.length > 0) {
        runs.push(currentRun);
    }

    return runs;
}

function getCanonicalGroups(run) {
    return getExpectedGroups(run);
}

function normalizeUtilityParams(params) {
    return params.trim().split(/\s+/u).join(' ');
}

function isCanonical(run, expectedGroups) {
    return run.length === expectedGroups.length && run.every((node, index) =>
        normalizeUtilityParams(node.params) === expectedGroups[index].join(' '),
    );
}

function replaceRun(run, expectedGroups) {
    const replacements = expectedGroups.map((group) => {
        const replacement = run[0].clone();

        replacement.params = group.join(' ');
        replacement.raws.before = run[0].raws.before;
        replacement.raws.afterName = ' ';

        return replacement;
    });

    run[0].replaceWith(...replacements);
    run.slice(1).forEach((node) => node.remove());
}

const rule = (primaryOption, secondaryOptions, context) => async (root, result) => {
    await getDesignSystem();

    const runs = getApplyRuns(root);

    for (const run of runs) {
        const expectedGroups = getCanonicalGroups(run);

        if (isCanonical(run, expectedGroups)) {
            continue;
        }

        if (context.fix) {
            replaceRun(run, expectedGroups);
        } else {
            stylelint.utils.report({
                message: 'Tailwind utilities should follow the native CSS order',
                node: run[0],
                result,
                ruleName,
            });
        }
    }
};

rule.ruleName = ruleName;
rule.messages = {
    expected: 'Tailwind utilities should follow the native CSS order',
};

export default createPlugin(ruleName, rule);
