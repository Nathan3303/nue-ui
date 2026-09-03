# 单元测试约定（**tests**）

测试跑在 Vitest（由 vite-plus 的 `vp test` 驱动），jsdom 环境。**先看一个现有测试文件再写**（`button/__tests__/button.test.ts` 是最干净的范本）。

## 硬性约定

- 测试文件放在组件目录 `__tests__/<name>.test.ts`（目录内 colocate）。
- **必须从 `'vite-plus/test'` 导入** `describe/it/expect/vi/beforeEach/afterEach`（lint 规则 `vite-plus/prefer-vite-plus-imports` 禁止直接 import 'vitest'）。
- 挂载用 `@vue/test-utils` 的 `mount`。
- 被测对象从 `'../index'` 导入公开导出（`NueButton`）；要测内部子组件时直接导入 `.vue` 文件（如 message 测试 mount `MessageNodeInner` 并传 node/wrapper props）。
- 用例与 `describe` 用**中文**命名，描述行为而非实现。惯例分组：`Props 渲染`、`事件处理`、`插槽渲染`、`图标渲染`、`API 测试`、`节流功能` 等。
- 环境自带 stub（`test-setup.ts`）：ResizeObserver / IntersectionObserver / matchMedia / getComputedStyle 已被 mock，涉及滚动/弹层/可见性观察的组件测试无需自己处理这些。

## 常用断言模式（从 button/checkbox/message 测试提炼）

```ts
import { describe, it, expect, vi, beforeEach, afterEach } from 'vite-plus/test';
import { mount } from '@vue/test-utils';
import { NueButton } from '../index';

describe('NueButton', () => {
    describe('Props 渲染', () => {
        it('应该渲染带文本的按钮', () => {
            const wrapper = mount(NueButton, { slots: { default: '点击我' } });
            expect(wrapper.text()).toBe('点击我');
        });

        it('应该渲染不同尺寸的按钮', () => {
            (['small', 'large'] as const).forEach(size => {
                const wrapper = mount(NueButton, { props: { size } });
                expect(wrapper.find('button').classes()).toContain(`nue-button--${size}`);
            });
        });

        it('应该把 props 映射为 CSS 变量', () => {
            const wrapper = mount(NueButton, { props: { alignment: 'center' } });
            expect(wrapper.find('button').attributes('style')).toContain(
                '--nue-button-alignment: center'
            );
        });
    });

    describe('事件处理', () => {
        it('应该触发 click 事件', async () => {
            const wrapper = mount(NueButton);
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted('click')).toBeTruthy();
        });

        it('禁用状态下不应该触发 click', async () => {
            const wrapper = mount(NueButton, { props: { disabled: true } });
            await wrapper.find('button').trigger('click');
            expect(wrapper.emitted('click')).toBeFalsy();
        });
    });
});
```

要点：

- **类名断言**是主体（`classes()` / `toContain`）——因为视觉全在主题 css，单测不加载 css，能断言的"表现"就是结构、类名、style 变量与事件；
- **style 变量断言**：`attributes('style')` 包含 `--nue-xxx-prop: value`；
- **插槽**：`slots: { default: '文本' }` 或注入 HTML `'<span class="x">y</span>'` 后 `find('.x')`；命名插槽同理；
- **事件载荷**：`wrapper.emitted('change')?.[0]`；v-model：`props: { modelValue: true }` + 断言 `emitted('update:modelValue')`；
- **异步交互**一律 `await ...trigger(...)`；涉及计时器（throttle/debounce/duration）用 `vi.useFakeTimers()` + `vi.advanceTimersByTime(ms)`，`afterEach` 里 `vi.useRealTimers()`（button 的节流测试是范本）；
- **回调型 props**（如 checkbox 的 `beforeCheck`）：直接传函数，断言其被调用/返回值影响行为；
- **函数式调用组件**（message/confirm/prompt）：API 层测试导出函数的类型与"不抛错"（`expect(typeof NueMessage.success).toBe('function')`、`expect(() => NueMessage.success('x')).not.toThrow()`）；DOM 渲染测内部 SFC（见 `message/__tests__/message.caller.test.ts`）。

## 运行

```bash
pnpm exec vp test run packages/components/<name>   # 开发时：只跑一个组件，秒级
pnpm test:run                                      # 全量（提交前必跑）
pnpm test:coverage                                 # 覆盖率
```

新组件要求：主干 props、全部事件、disabled/loading 守卫、插槽都有用例覆盖；描述真实用户可见行为（"应该…"），不要断言实现细节（如内部函数名）。