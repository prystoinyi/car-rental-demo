import stylelint from 'stylelint';

const { createPlugin } = stylelint;
const ruleName = 'lcr/indentation';

function getIndentation(value) {
    const lastLineBreak = value.lastIndexOf('\n');

    return lastLineBreak === -1 ? value : value.slice(lastLineBreak + 1);
}

function setIndentation(value, indentation) {
    const lastLineBreak = value.lastIndexOf('\n');

    if (lastLineBreak === -1) {
        return value;
    }

    return `${value.slice(0, lastLineBreak + 1)}${indentation}`;
}

function getNewlineCount(value) {
    return value.match(/\n/gu)?.length ?? 0;
}

function removeExtraBlankLines(value) {
    if (value.trim() !== '' || getNewlineCount(value) <= 2) {
        return value;
    }

    return `${'\n'.repeat(2)}${getIndentation(value)}`;
}

function getNodeIndentation(node) {
    const before = node.raws.before ?? '';

    const indentation = getIndentation(before);

    return indentation || node.parent?.raws.indent || '';
}

function checkNodeIndentation(node, depth, indentationSize, context, result) {
    const expectedIndentation = ' '.repeat(depth * indentationSize);
    const before = node.raws.before ?? '';

    if (getNewlineCount(before) > 2 && before.trim() === '') {
        if (context.fix) {
            node.raws.before = removeExtraBlankLines(before);
        } else {
            stylelint.utils.report({
                message: 'Only one empty line is allowed between CSS nodes',
                node,
                result,
                ruleName,
            });
        }
    }

    if (before.includes('\n') && getNodeIndentation(node) !== expectedIndentation) {
        if (context.fix) {
            node.raws.before = setIndentation(before, expectedIndentation);
        } else {
            stylelint.utils.report({
                message: `Expected indentation of ${depth * indentationSize} spaces`,
                node,
                result,
                ruleName,
            });
        }
    }

    if (!node.nodes) {
        return;
    }

    for (const child of node.nodes) {
        checkNodeIndentation(child, depth + 1, indentationSize, context, result);
    }

    const after = node.raws.after ?? '';

    if (getNewlineCount(after) > 2 && after.trim() === '') {
        if (context.fix) {
            node.raws.after = removeExtraBlankLines(after);
        } else {
            stylelint.utils.report({
                message: 'Only one empty line is allowed before a closing brace',
                node,
                result,
                ruleName,
            });
        }
    }

    if (after.includes('\n') && getIndentation(after) !== expectedIndentation) {
        if (context.fix) {
            node.raws.after = setIndentation(after, expectedIndentation);
        } else {
            stylelint.utils.report({
                message: `Expected closing indentation of ${depth * indentationSize} spaces`,
                node,
                result,
                ruleName,
            });
        }
    }
}

const rule = (primaryOption = 4, secondaryOptions, context) => (root, result) => {
    for (const node of root.nodes ?? []) {
        checkNodeIndentation(node, 0, primaryOption, context, result);
    }
};

rule.ruleName = ruleName;
rule.messages = {
    expected: 'CSS indentation should use four spaces',
};

export default createPlugin(ruleName, rule);
