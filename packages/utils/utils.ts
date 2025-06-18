export function isString(value: unknown): boolean {
    return (
        (typeof value === 'string' || value instanceof String) &&
        Object.prototype.toString.call(value) === '[object String]'
    );
}

export function isNumber(value: unknown): boolean {
    return (
        typeof value === 'number' &&
        Object.prototype.toString.call(value) === '[object Number]'
    );
}

export function isArray(value: unknown): boolean {
    return Array.isArray(value);
}

export function isFunction(value: unknown): boolean {
    return typeof value === 'function' && typeof value.call === 'function';
}

export function debounce<T extends (...args: unknown[]) => void>(
    cb: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: number;
    return function (...args: unknown[]) {
        if (timer) clearTimeout(timer);
        timer = setTimeout(() => {
            if (cb) cb.call(null, ...args);
            clearTimeout(timer);
            timer = 0;
        }, delay) as unknown as number;
    };
}

export function throttle<T extends (...args: unknown[]) => void>(
    cb: T,
    delay: number
): (...args: Parameters<T>) => void {
    let timer: number;
    return (...args: unknown[]) => {
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
