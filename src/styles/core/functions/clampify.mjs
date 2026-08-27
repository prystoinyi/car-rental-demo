/**
 * Returns a PostCSS helper that converts two value breakpoints into a fluid
 * `clamp()` declaration between two viewport breakpoints.
 */

const NUMBER_REGEX = /^([+-]?(?:\d+\.?\d*|\.\d+))(.*)$/;

const ALLOWED_VALUE_UNITS = new Set(['', 'px']);
const ALLOWED_VIEWPORT_UNITS = new Set(['', 'px']);

const INVALID_RESULT = 'clamp()';

export function clampify(variables) {
    const defaultMinViewport = variables['$content-min'];
    const defaultMaxViewport = variables['$content-max'];

    return (...args) => {
        if (args.length !== 2 && args.length !== 4) {
            return INVALID_RESULT;
        }

        const [minValue, maxValue, minViewport = defaultMinViewport, maxViewport = defaultMaxViewport] = args;

        const parsedMinValue = parseValue(minValue);
        const parsedMaxValue = parseValue(maxValue);
        const parsedMinViewport = parseValue(minViewport);
        const parsedMaxViewport = parseValue(maxViewport);

        const valuesValid
            = isValidParsedValue(parsedMinValue)
            && isValidParsedValue(parsedMaxValue)
            && isValidParsedValue(parsedMinViewport)
            && isValidParsedValue(parsedMaxViewport);

        if (!valuesValid) {
            return INVALID_RESULT;
        }

        const unitsValid
            = parsedMinValue.unit === parsedMaxValue.unit
            && ALLOWED_VALUE_UNITS.has(parsedMinValue.unit)
            && ALLOWED_VIEWPORT_UNITS.has(parsedMinViewport.unit)
            && ALLOWED_VIEWPORT_UNITS.has(parsedMaxViewport.unit);

        if (!unitsValid) {
            return INVALID_RESULT;
        }

        const minNumber = parsedMinValue.value;
        const maxNumber = parsedMaxValue.value;
        const minViewportNumber = parsedMinViewport.value;
        const maxViewportNumber = parsedMaxViewport.value;

        const viewportDiff = maxViewportNumber - minViewportNumber;

        if (viewportDiff === 0) {
            return `${minNumber}${parsedMinValue.unit}`;
        }

        const slope = (maxNumber - minNumber) / viewportDiff;
        const offset = round(maxNumber - slope * maxViewportNumber);
        const scale = round(slope * 100);

        if (parsedMinValue.unit === '') {
            return `clamp(${minNumber}, calc(${offset} + ${scale} * (1vw / 1px)), ${maxNumber})`;
        }

        return `clamp(${minNumber}px, calc(${offset}px + ${scale}vw), ${maxNumber}px)`;
    };
}

function parseValue(input) {
    const match = String(input).trim().match(NUMBER_REGEX);

    if (!match) {
        return null;
    }

    const value = parseFloat(match[1]);

    return Number.isFinite(value) ? { value, unit: match[2] } : null;
}

function round(value) {
    return Math.round(value * 10000) / 10000;
}

function isValidParsedValue(value) {
    return value !== null && Number.isFinite(value.value);
}
