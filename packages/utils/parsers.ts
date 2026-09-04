import { isString } from './utils';
import type { NuePopupItemAnimation } from './types';

/**
 * 解析 flex 值（后续将禁用）
 * @param value flex 值
 * @returns flex 值
 */
export function parseFlex(value: string): string {
    if (value === '') return 'auto';
    return value;
}

/**
 * 解析 flex-wrap 值（后续将禁用）
 * @param value flex-wrap 值
 * @returns flex-wrap 值
 */
export function parseFlexWrap(value: string): string {
    if (value === '') return 'wrap';
    return value;
}

/**
 * 解析动画持续时间值为数字
 * @param value 动画持续时间值
 * @returns 动画持续时间值
 */
export function parseAnimationDurationToNumber(value: string | number): number {
    if (typeof value === 'string') {
        if (value.endsWith('s')) {
            return parseFloat(value.slice(0, -1)) * 1000;
        }
        return parseFloat(value);
    }
    return value;
}

/**
 * 解析弹窗动画 props 值至 CSS 样式值
 * @param value 弹窗动画 props 值
 * @returns 弹窗动画 props 值
 */
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