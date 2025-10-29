import { isString } from 'lodash-es';
import type { NuePopupItemAnimation, ObjectLikeThemes } from './types';

export function parseTheme(
    value: string | string[] | ObjectLikeThemes | undefined,
    prefix: string
): string[] {
    if (!value) return [];
    let themeNames: string[];
    if (isString(value)) {
        themeNames = value.trim().split(',');
    } else if (Array.isArray(value)) {
        themeNames = value;
    } else {
        themeNames = Object.keys(value).filter(key => value[key]);
    }
    return themeNames.map(item => `${prefix}--${item.trim()}`);
}

export function parseFlex(value: string): string {
    if (value === '') return 'auto';
    return value;
}

export function parseFlexWrap(value: string): string {
    if (value === '') return 'wrap';
    return value;
}

export function parseAnimationDurationToNumber(value: string | number): number {
    // maybe 'xxx s' or 'xxx ms', please convert to number
    if (typeof value === 'string') {
        if (value.endsWith('s')) {
            return parseFloat(value.slice(0, -1)) * 1000;
        }
        return parseFloat(value);
    }
    return value;
}

// @method 解析弹窗动画 props 值至 CSS 样式值
type ParsePopupItemAnimation = { name: string | undefined; duration: string | undefined };
export const parsePopupItemAnimation = (value?: NuePopupItemAnimation): ParsePopupItemAnimation => {
    const result: ParsePopupItemAnimation = { name: void 0, duration: void 0 };
    if (isString(value)) {
        result.name = value;
    } else if (value) {
        result.name = value.name;
        result.duration = value.duration + 'ms';
    }
    return result;
};
