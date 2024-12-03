import { isString } from 'lodash-es';
import type { ObjectLikeThemes } from './types';

export function parseTheme(
    value: string | string[] | ObjectLikeThemes,
    prefix: string
): string[] {
    const parseResult: string[] = [];
    let values: string[] = [];
    if (isString(value)) {
        values = (value as string).trim().split(',');
    } else if (Array.isArray(value)) {
        values = value as string[];
    } else {
        values = Object.keys(value).filter(key => value[key]);
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
