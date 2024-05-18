/**
 * Check value is a String or not
 * @description 检测传入的值是否是字符串
 * @param {any} value
 * @return {boolean}
 */
export function isString(value: any): boolean {
    return (
        (typeof value === "string" || value instanceof String) &&
        Object.prototype.toString.call(value) === "[object String]"
    );
}

/**
 * Check value is a Number or not
 * @description 检测传入的值是否是数字
 * @param {any} value
 * @return {boolean}
 */
export function isNumber(value: any): boolean {
    return (
        typeof value === "number" &&
        Object.prototype.toString.call(value) === "[object Number]"
    );
}

/**
 * Check value is a Array or not
 * @description 检测传入的值是否是数组
 * @param {any} value
 * @return {boolean}
 */
export function isArray(value: any): boolean {
    return Array.isArray(value);
}

/**
 * Check value is contain 'px' or not
 * @description 检测传入的值是否包含'px'
 * @param {string|number} value
 * @return {boolean}
 */
export function hasPixelSign(value: string | number): boolean {
    if (isString(value)) {
        return (value as string).includes("px");
    }
    return false;
}

/**
 * Check value is contain '%' or not
 * @description 检测传入的值是否包含'%'
 * @param {string|number} value
 * @return {boolean}
 */
export function hasPercentageSign(value: string | number): boolean {
    if (isString(value)) {
        return (value as string).includes("%");
    }
    return false;
}

export function debounce(cb: Function, delay: number): Function {
    let timer: number;
    return function (...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (cb) cb.call(null, ...args);
            clearTimeout(timer);
        }, delay);
    };
}

export function throttle(cb: Function, delay: number): Function {
    let timer: number;
    return function (...args: any[]) {
        if (timer) return;
        if (cb) cb.call(null, ...args);
        timer = setTimeout(() => {
            clearTimeout(timer);
        }, delay);
    };
}

export function generateId(length: number = 4) {
    return Math.random()
        .toString(36)
        .slice(2, 2 + length);
}
