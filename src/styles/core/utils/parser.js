import fs from 'node:fs';

import postcss from 'postcss';

export function parseVariableFiles(paths) {
    const rawVariables = {};

    for (const path of paths) {
        const css = fs.readFileSync(path, 'utf8');
        const root = postcss.parse(css);

        root.walkDecls((decl) => {
            if (decl.prop.startsWith('$')) {
                if (decl.prop in rawVariables) {
                    throw new Error(
                        `Duplicate variable ${decl.prop} found in ${path}`,
                    );
                }

                rawVariables[decl.prop] = decl.value;
            }
        });
    }

    const variables = {};
    const resolving = new Set();

    function resolveVariable(name) {
        if (name in variables) {
            return variables[name];
        }

        if (!(name in rawVariables)) {
            throw new Error(
                `Undefined variable ${name}`,
            );
        }

        if (resolving.has(name)) {
            throw new Error(
                `Circular variable reference involving ${name}`,
            );
        }

        resolving.add(name);

        const value = rawVariables[name].replace(
            /\$[\w-]+/g,
            (reference) => resolveVariable(reference),
        );

        resolving.delete(name);

        if (/\$[\w-]+/.test(value)) {
            throw new Error(
                `Unresolved variable in ${name}: ${value}`,
            );
        }

        variables[name] = value;

        return value;
    }

    for (const name of Object.keys(rawVariables)) {
        resolveVariable(name);
    }

    return variables;
}
