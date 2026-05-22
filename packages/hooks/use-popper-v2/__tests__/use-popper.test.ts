import { describe, it, expect, vi, beforeEach, afterEach, MockInstance } from 'vitest';
import { ref } from 'vue';
import usePopper from '../use-popper';

describe('usePopper', () => {
    let wrapperEl: HTMLElement;
    let popperEl: HTMLElement;

    beforeEach(() => {
        wrapperEl = document.createElement('div');
        wrapperEl.getBoundingClientRect = vi.fn().mockReturnValue({
            x: 100,
            y: 100,
            width: 100,
            height: 40,
            top: 100,
            right: 200,
            bottom: 140,
            left: 100
        });

        popperEl = document.createElement('div');
        popperEl.getBoundingClientRect = vi.fn().mockReturnValue({
            x: 0,
            y: 0,
            width: 150,
            height: 200,
            top: 0,
            right: 150,
            bottom: 200,
            left: 0
        });

        Object.defineProperty(window, 'innerWidth', { value: 1024, writable: true });
        Object.defineProperty(window, 'innerHeight', { value: 768, writable: true });
    });

    describe('顺时针检测机制', () => {
        it('当左侧超出视口时，应按顺时针顺序检测其他方向', () => {
            wrapperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 0,
                y: 300,
                width: 100,
                height: 40,
                top: 300,
                right: 100,
                bottom: 340,
                left: 0
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('left', 'start');

            expect(result.direction).not.toBe('left');
        });

        it('当底部和左侧都超出视口时，应按顺时针顺序找到顶部方向', () => {
            popperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 0,
                y: 0,
                width: 150,
                height: 200,
                top: 0,
                right: 150,
                bottom: 200,
                left: 0
            });

            wrapperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 100,
                y: 600,
                width: 100,
                height: 40,
                top: 600,
                right: 200,
                bottom: 640,
                left: 100
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('bottom', 'start');

            expect(result.direction).toBe('top');
        });

        it('当所有方向都超出视口时，应返回原始方向作为默认出口', () => {
            popperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 0,
                y: 0,
                width: 2000,
                height: 2000,
                top: 0,
                right: 2000,
                bottom: 2000,
                left: 0
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('left', 'start');

            expect(result.direction).toBe('left');
        });
    });

    describe('默认出口机制', () => {
        it('应防止无限递归推断', () => {
            popperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 0,
                y: 0,
                width: 2000,
                height: 2000,
                top: 0,
                right: 2000,
                bottom: 2000,
                left: 0
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            expect(() => {
                calculatePopperPosition('top', 'center');
            }).not.toThrow();
        });
    });

    describe('ResizeObserver 功能', () => {
        let resizeObserverSpy: MockInstance;

        beforeEach(() => {
            resizeObserverSpy = vi.spyOn(window, 'ResizeObserver').mockImplementation(
                () =>
                    ({
                        observe: vi.fn(),
                        disconnect: vi.fn()
                    }) as unknown as ResizeObserver
            );
        });

        afterEach(() => {
            resizeObserverSpy.mockRestore();
        });

        it('startResizeObserver 应该创建 ResizeObserver 并监听元素', () => {
            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { startResizeObserver } = usePopper(wrapperRef, popperRef, 8, 8);

            const callback = vi.fn();
            startResizeObserver(callback);

            expect(resizeObserverSpy).toHaveBeenCalled();
            const observerInstance = resizeObserverSpy.mock.results[0].value as ResizeObserver;
            expect(observerInstance.observe).toHaveBeenCalledWith(popperEl);
            expect(observerInstance.observe).toHaveBeenCalledWith(wrapperEl);
        });

        it('stopResizeObserver 应该断开 ResizeObserver', () => {
            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { startResizeObserver, stopResizeObserver } = usePopper(
                wrapperRef,
                popperRef,
                8,
                8
            );

            const callback = vi.fn();
            startResizeObserver(callback);
            stopResizeObserver();

            const observerInstance = resizeObserverSpy.mock.results[0].value as ResizeObserver;
            expect(observerInstance.disconnect).toHaveBeenCalled();
        });
    });

    describe('位置计算', () => {
        it('应该正确计算顶部位置', () => {
            popperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 0,
                y: 0,
                width: 150,
                height: 50,
                top: 0,
                right: 150,
                bottom: 50,
                left: 0
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('top', 'start');

            expect(result.y).toBe(100 - 8 - 50);
            expect(result.x).toBe(100);
        });

        it('应该正确计算底部位置', () => {
            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('bottom', 'start');

            expect(result.y).toBe(100 + 40 + 8);
            expect(result.x).toBe(100);
        });

        it('应该正确计算右侧位置', () => {
            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('right', 'start');

            expect(result.x).toBe(100 + 100 + 8);
            expect(result.y).toBe(100);
        });

        it('应该正确计算左侧位置', () => {
            wrapperEl.getBoundingClientRect = vi.fn().mockReturnValue({
                x: 200,
                y: 100,
                width: 100,
                height: 40,
                top: 100,
                right: 300,
                bottom: 140,
                left: 200
            });

            const wrapperRef = ref(wrapperEl);
            const popperRef = ref(popperEl);
            const { calculatePopperPosition } = usePopper(wrapperRef, popperRef, 8, 8);

            const result = calculatePopperPosition('left', 'start');

            expect(result.x).toBe(200 - 8 - 150);
            expect(result.y).toBe(100);
        });
    });
});
