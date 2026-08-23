import { parseVariableFiles } from './utils/parser.js';

export const variables = parseVariableFiles([
    './src/styles/core/variables/breakpoints.css',
    './src/styles/core/variables/colors.css',
]);
