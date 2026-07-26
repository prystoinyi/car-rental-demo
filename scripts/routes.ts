import path from 'node:path';
import { watch } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';

type AppRoute = {
    key: string;
    params: RouteParam[];
    score: number;
    template: string;
};

type RouteParam = {
    name: string;
    optional: boolean;
    rest: boolean;
};

const appDirectory = path.join(process.cwd(), 'src/app');
const outputFile = path.join(process.cwd(), 'src/lib/navigation/routes.ts');
const pageFilePattern = /^page\.(?:jsx?|tsx?)$/;

const dynamicParamPattern = /^\[(.+)\]$/;
const optionalRestParamPattern = /^\[\[\.\.\.(.+)\]\]$/;
const restParamPattern = /^\[\.\.\.(.+)\]$/;

async function main() {
    const watchMode = process.argv.includes('--watch');

    await generateRoutes();

    if (watchMode) {
        startWatcher();
    }
}

async function generateRoutes() {
    const pageFiles = await findPageFiles(appDirectory);
    const routes = pageFiles
        .map(toAppRoute)
        .sort(compareRoutes);

    await writeGeneratedFile(routes);
}

function startWatcher() {
    console.log('Watching for route changes...');

    let timeout: ReturnType<typeof setTimeout> | null = null;

    const regenerate = () => {
        if (timeout) {
            clearTimeout(timeout);
        }

        timeout = setTimeout(async () => {
            console.log('Routes changed, regenerating...');
            await generateRoutes();
            console.log('Routes regenerated.');
        }, 300);
    };

    watch(appDirectory, { recursive: true }, regenerate);

    process.on('SIGINT', () => {
        console.log('\nStopping watcher.');
        process.exit(0);
    });
}

async function findPageFiles(directory: string): Promise<string[]> {
    const entries = await readdir(directory, { withFileTypes: true });
    const files = await Promise.all(entries.map(async (entry) => {
        const entryPath = path.join(directory, entry.name);

        if (entry.isDirectory()) {
            if (entry.name.startsWith('_')) {
                return [];
            }

            return findPageFiles(entryPath);
        }

        return pageFilePattern.test(entry.name) ? [entryPath] : [];
    }));

    return files.flat();
}

function toAppRoute(file: string): AppRoute {
    const routeDirectory = path.dirname(path.relative(appDirectory, file));
    const segments = routeDirectory === '.'
        ? []
        : routeDirectory.split(path.sep).filter(isUrlSegment);
    const template = segments.length > 0 ? `/${segments.join('/')}` : '/';

    return {
        key: toRouteKey(template),
        params: segments.flatMap(toRouteParam),
        score: routeScore(segments),
        template,
    };
}

function isUrlSegment(segment: string) {
    return !segment.startsWith('@') && !/^\(.+\)$/.test(segment);
}

function toRouteParam(segment: string): RouteParam[] {
    const optionalRestMatch = segment.match(optionalRestParamPattern);

    if (optionalRestMatch) {
        return [{ name: optionalRestMatch[1], optional: true, rest: true }];
    }

    const restMatch = segment.match(restParamPattern);

    if (restMatch) {
        return [{ name: restMatch[1], optional: false, rest: true }];
    }

    const dynamicMatch = segment.match(dynamicParamPattern);

    if (dynamicMatch) {
        return [{ name: dynamicMatch[1], optional: false, rest: false }];
    }

    return [];
}

function compareRoutes(left: AppRoute, right: AppRoute) {
    if (right.score !== left.score) {
        return right.score - left.score;
    }

    return left.template.localeCompare(right.template);
}

function routeScore(segments: string[]) {
    return segments.reduce((score, segment) => {
        if (optionalRestParamPattern.test(segment)) {
            return score;
        }

        if (restParamPattern.test(segment)) {
            return score + 1;
        }

        if (dynamicParamPattern.test(segment)) {
            return score + 2;
        }

        return score + 4;
    }, 0);
}

function toRouteKey(template: string) {
    if (template === '/') {
        return 'index';
    }

    if (template === '/[slug]') {
        return 'topic';
    }

    const segments = template.slice(1).split('/');
    const lastSegment = segments.at(-1) ?? '';
    const previousSegment = segments.at(-2);

    if (segments.length === 2 && previousSegment && dynamicParamPattern.test(lastSegment)) {
        return toCamelCase([singularize(previousSegment)]);
    }

    return toCamelCase(segments.map((segment) => toRouteKeyPart(segment)));
}

function toRouteKeyPart(segment: string) {
    const param = toRouteParam(segment)[0];

    return param?.name ?? segment;
}

function toCamelCase(parts: string[]) {
    return parts
        .flatMap((part) => part.split('-'))
        .map((part, index) => {
            if (index === 0) {
                return part;
            }

            return `${part.slice(0, 1).toUpperCase()}${part.slice(1)}`;
        })
        .join('');
}

function singularize(value: string) {
    if (value.endsWith('ies')) {
        return `${value.slice(0, -3)}y`;
    }

    if (value.endsWith('s') && !value.endsWith('ss')) {
        return value.slice(0, -1);
    }

    return value;
}

async function writeGeneratedFile(routes: AppRoute[]) {
    const source = generateSource(routes);

    try {
        const currentSource = await readFile(outputFile, 'utf8');

        if (currentSource === source) {
            return;
        }
    } catch {
        // The first run creates the generated route file.
    }

    await writeFile(outputFile, source);
}

function generateSource(routes: AppRoute[]) {
    const routeEntries = routes.map((route) => {
        const params = route.params.map(toParamSignature).join(', ');
        const href = toHrefBuilder(route.template);

        return `${route.key}: createRoute('${route.template}', (${params}) => resolveRoute(${href})),`;
    });

    const source = `
        // This file is generated by scripts/routes.ts.
        // Do not edit this file manually.

        import type { Route } from 'next';

        type RouteDefinition<TId extends string, TArgs extends unknown[], THref extends string> = {
            (...args: TArgs): Route<THref>;
            id: TId;
            is: (href: string) => boolean;
        };

        const resolveRoute = <T extends string>(href: Route<T>) => href;

        const normalizePathname = (pathname: string) =>
            pathname !== '/' ? pathname.replace(/\\/+$/, '') || '/' : pathname;

        const pathnameOf = (href: string) => {
            try {
                return normalizePathname(new URL(href, 'https://local.test').pathname);
            } catch {
                return normalizePathname(href.split(/[?#]/)[0] || '/');
            }
        };

        const escapeRegExp = (value: string) => value.replace(/[.*+?^$\\{\\}()|[\\]\\\\]/g, '\\\\$&');

        const segmentToPattern = (segment: string) => {
            if (/^\\[\\[\\.\\.\\.[^\\]]+\\]\\]$/.test(segment)) {
                return '(?:/[^/]+(?:/[^/]+)*)?';
            }

            if (/^\\[\\.\\.\\.[^\\]]+\\]$/.test(segment)) {
                return '/[^/]+(?:/[^/]+)*';
            }

            if (/^\\[[^\\]]+\\]$/.test(segment)) {
                return '/[^/]+';
            }

            return \`/\${escapeRegExp(segment)}\`;
        };

        const templateToRegExp = (template: string) => {
            if (template === '/') {
                return /^\\/$/;
            }

            return new RegExp(\`^\${template.slice(1).split('/').map(segmentToPattern).join('')}$\`);
        };

        const createRoute = <TId extends string, TArgs extends unknown[], THref extends string>(
            id: TId,
            createHref: (...args: TArgs) => Route<THref>,
        ): RouteDefinition<TId, TArgs, THref> =>
            Object.assign(createHref, {
                id,
                is: (href: string) => templateToRegExp(id).test(pathnameOf(href)),
            });

        export const route = {
            ${routeEntries.join('\n            ')}
        };

        export type RouteId = {
            [K in keyof typeof route]: (typeof route)[K]['id'];
        }[keyof typeof route];
    `;

    return `${source.replace(/^ {8}/gm, '').trim()}\n`;
}

function toParamSignature(param: RouteParam) {
    const optional = param.optional ? '?' : '';
    const type = param.rest ? 'string[]' : 'string';

    return `${param.name}${optional}: ${type}`;
}

function toHrefBuilder(template: string) {
    if (!template.includes('[')) {
        return `'${template}'`;
    }

    const segments = template.slice(1).split('/');
    const pathSegments = segments.map((segment) => {
        const param = toRouteParam(segment)[0];

        if (!param) {
            return segment;
        }

        if (param.optional) {
            return `\${${param.name}?.join('/') ?? ''}`;
        }

        if (param.rest) {
            return `\${${param.name}.join('/')}`;
        }

        return `\${${param.name}}`;
    });

    return `\`/${pathSegments.join('/')}\``;
}

main().catch((error: unknown) => {
    console.error(error);
    process.exitCode = 1;
});
