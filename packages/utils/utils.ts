export function isString(value: any): boolean {
    return (
        (typeof value === "string" || value instanceof String) &&
        Object.prototype.toString.call(value) === "[object String]"
    );
}

export function isNumber(value: any): boolean {
    return (
        typeof value === "number" &&
        Object.prototype.toString.call(value) === "[object Number]"
    );
}

export function isArray(value: any): boolean {
    return Array.isArray(value);
}

export function isFunction(value: any): boolean {
    return typeof value === "function" && typeof value.call === "function";
}

export function debounce(cb: Function, delay: number): Function {
    let timer: number;
    return function (...args: any[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (cb) cb.call(null, ...args);
            clearTimeout(timer);
            timer = 0;
        }, delay) as unknown as number;
    };
}

export function throttle(cb: Function, delay: number): Function {
    let timer: number;
    return function (...args: any[]) {
        if (timer) return;
        if (cb) cb.call(null, ...args);
        timer = setTimeout(() => {
            clearTimeout(timer);
            timer = 0;
        }, delay) as unknown as number;
    };
}

export function generateId(length: number = 6) {
    return Math.random()
        .toString(36)
        .slice(2, 2 + length);
}
