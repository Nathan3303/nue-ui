import { isString } from './utils';

export function parseTheme(value: string | string[], prefix: string): string[] {
    const parseResult: string[] = [];
    let values: string[] = [];
    if (isString(value)) {
        values = (value as string).trim().split(',');
    } else {
        values = value as string[];
    }
    values = values.map(item => `${prefix}--${item.trim()}`);
    return parseResult.concat(values);
}

export function parseFlex(value: string): string {
    if (value === '') return 'auto';
    return value;
}

export function parseFlexWrap(value: string): string {
    if (value === '') return 'wrap';
    return value;
}
