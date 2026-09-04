import { vi } from 'vite-plus/test';
import '@testing-library/jest-dom';

global.ResizeObserver = vi.fn(function () {
    return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
    };
}) as unknown as typeof ResizeObserver;

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
});

global.IntersectionObserver = vi.fn(function () {
    return {
        observe: vi.fn(),
        unobserve: vi.fn(),
        disconnect: vi.fn()
    };
}) as unknown as typeof IntersectionObserver;

window.getComputedStyle = vi.fn().mockImplementation(() => ({
    getPropertyValue: vi.fn(() => ''),
    removeProperty: vi.fn(),
    setProperty: vi.fn()
}));