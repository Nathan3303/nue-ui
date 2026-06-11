import { isString } from 'lodash-es';
import type { ObjectLikeThemes } from './types';

/**
 * 解析主题值为类名数组
 * @param value 主题值
 * @param prefix 前缀
 * @returns 类名数组
 */
export const parseTheme = (
    value: string | string[] | ObjectLikeThemes | undefined,
    prefix: string
): string[] => {
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
};

// export const makeClassNames = (rules: Record<string, boolean>, prefix: string) => {
//     const classNames: string[] = [];
//     for (const key in rules) {
//         if (!rules[key]) continue;
//         classNames.push(`${prefix}--${key.trim()}`);
//     }
//     return classNames;
// };
