import { describe, it, expect, beforeEach, afterEach, vi } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueInfiniteScroll } from '../index';

describe('NueInfiniteScroll', () => {
    describe('Props 渲染', () => {
        it('应该渲染默认无限滚动', () => {
            const wrapper = mount(NueInfiniteScroll, {
                slots: { default: '<div class="item">项目1</div><div class="item">项目2</div>' }
            });
            expect(wrapper.find('.nue-infinite-scroll').exists()).toBe(true);
        });
    });

    describe('插槽渲染', () => {
        it('应该渲染默认插槽', () => {
            const wrapper = mount(NueInfiniteScroll, {
                slots: { default: '<div class="item">项目1</div><div class="item">项目2</div>' }
            });
            expect(wrapper.findAll('.item').length).toBe(2);
        });
    });

    describe('滚动触发', () => {
        let intersectCallback: IntersectionObserverCallback;
        let originalObserver: typeof IntersectionObserver;

        beforeEach(() => {
            originalObserver = globalThis.IntersectionObserver;
            globalThis.IntersectionObserver = vi.fn(function (
                callback: IntersectionObserverCallback
            ) {
                intersectCallback = callback;
                return { observe: vi.fn(), unobserve: vi.fn(), disconnect: vi.fn() };
            }) as unknown as typeof IntersectionObserver;
        });

        afterEach(() => {
            globalThis.IntersectionObserver = originalObserver;
        });

        const makeEntries = (isIntersecting: boolean) => [
            { isIntersecting } as IntersectionObserverEntry
        ];

        it('触发条进入视口时应该触发 loadMore', () => {
            const wrapper = mount(NueInfiniteScroll);
            intersectCallback(makeEntries(true), {} as IntersectionObserver);
            expect(wrapper.emitted('loadMore')).toBeTruthy();
        });

        it('触发条未进入视口时不应该触发 loadMore', () => {
            const wrapper = mount(NueInfiniteScroll);
            intersectCallback(makeEntries(false), {} as IntersectionObserver);
            expect(wrapper.emitted('loadMore')).toBeFalsy();
        });

        it('entries 为空时不应该报错也不应该触发 loadMore', () => {
            const wrapper = mount(NueInfiniteScroll);
            expect(() => intersectCallback([], {} as IntersectionObserver)).not.toThrow();
            expect(wrapper.emitted('loadMore')).toBeFalsy();
        });
    });
});