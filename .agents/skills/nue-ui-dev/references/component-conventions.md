# 组件代码约定（packages/components）

阅读前提：先看 `SKILL.md` 的"心智模型"（无样式组件 + 三处接线）。本文按文件组织说明"一个组件长什么样、为什么这么写"。**改动前务必找近亲组件通读**，本文是约定汇总，不是全部真相。

## 1. 目录解剖

一个典型组件目录（参考 `button/`、`switch/`、`link/`）：

```
<name>/
├── <name>.vue            # 组件主体（script setup + defineOptions + 无 <style>）
├── types.ts              # Props / Emits / 其它公开类型
├── index.ts              # withInstall 导出 + 类型再导出
└── __tests__/<name>.test.ts   # 测试（见 testing.md）
```

复杂组件还会出现：`constants.ts`（分组上下文 key、常量）、子组件文件（如 `input/` 下 `input.vue` + `textarea.vue` + `word-counter.vue`；`container/` 下一个目录 6+ 个子组件）、`calendar/` 这种把子面板拆成多个 vue 的巨型目录。函数式调用组件则多一个 `.ts` 入口（见 §6）。

## 2. 命名规则

| 对象        | 规则                                         | 例                                                                                                                   |
| ----------- | -------------------------------------------- | -------------------------------------------------------------------------------------------------------------------- |
| 组件标识    | `Nue` + PascalCase                           | `NueButton`、`NueDatePicker`、`NueScrollBar`、`NueInfiniteScroll`                                                    |
| 子组件后缀  | 语义后缀                                     | `NueButtonGroup`、`NueCheckboxGroup`、`NueSelectOption`、`NueBreadcrumbItem`、`NueCollapseItem`、`NueMessageWrapper` |
| 根类名      | `nue-<kebab-case>`（与组件名对应）           | `nue-button`、`nue-checkbox`、`nue-scroll-bar`                                                                       |
| 内部元素    | `${prefix}__<elem>`                          | `nue-button__icon`、`nue-button__text`、`nue-checkbox__label`                                                        |
| 状态/修饰类 | `${prefix}--<mod>`                           | `nue-button--disabled`、`nue-button--loading`、`nue-checkbox--checked`                                               |
| theme 类    | `${prefix}--<theme项>`（由 parseTheme 生成） | `nue-button--primary`                                                                                                |
| CSS 变量    | `--nue-<块>-<属性>`                          | `--nue-button-flex`、`--nue-icon-size`                                                                               |

props/emits 类型名：`Nue<Xxx>Props`、`Nue<Xxx>Emits`；尺寸等联合类型 `Nue<Xxx>Size`。

## 3. types.ts 约定

```ts
import type { GlobalProps } from '@nue-ui/utils'; // GlobalProps 自带 theme?

export type NueSwitchSize = 'small' | 'large'; // 值域用字符串联合，不建 enum

export interface NueSwitchProps extends GlobalProps {
    // 继承后自动拥有 theme prop
    modelValue?: boolean;
    disabled?: boolean;
    // ...
}

// Emits：tuple 风格，标注每个事件的载荷类型（与 defineEmits<T> 配合）
export type NueSwitchEmits = {
    'update:modelValue': [value: boolean];
    change: [value: boolean];
};
```

要点：

- **所有可被外部使用的 props 都先定义成类型**，组件内 `defineProps<NueXxxProps>()` + `withDefaults` 给默认值（如 button 默认 `type: 'button'`）；不要把 props 定义在 defineProps 的字面量里而 types.ts 不同步。
- `GlobalProps`（`{ theme?: string | string[] | Record<string, boolean> }`）是几乎每个组件 props 都继承的基类——这保证了全库组件都支持 `theme` 属性（主题自定义，见 styling-theming.md）。
- v-model 类组件：`modelValue` + `'update:modelValue'`，通常伴随 `change` 事件；checkbox 这类还发 `checked`/`unchecked` 等语义事件。
- 值语义而非布尔堆叠：比如尺寸、对齐方向用字符串联合而不是多个布尔。
- 事件载荷用 tuple 语法写具体类型（`[payload: MouseEvent]`），文档表格的"参数"列即来自这里。少数组件（如 overlay）用函数签名 emits，两种都合法，新代码推荐 tuple 风格。

## 4. SFC 骨架（script setup）

```vue
<template>
    <button :class="classes" :disabled="disabled" :style="styles" @click="handleClick">
        <slot />
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueButtonProps, NueButtonEmits } from './types';

// withInstall 靠这个名字做全局注册（app.component(name, comp)），必须有！
defineOptions({ name: 'NueButton' });

const props = withDefaults(defineProps<NueButtonProps>(), { type: 'button' });
const emit = defineEmits<NueButtonEmits>();

const classes = computed(() => {
    const prefix = 'nue-button';
    return [prefix, ...parseTheme(props.theme, prefix), props.disabled && `${prefix}--disabled`];
});

// 把 props 中"需要被 CSS 消费"的值映射为组件级 CSS 变量（样式契约的另一半）
const styles = computed(() => ({ '--nue-button-alignment': props.alignment }));
</script>
```

要点：

- **没有 `<style>`**。视觉效果一律留给主题包 CSS 用类名 + `--nue-<block>-*` 变量去实现。
- `defineOptions({ name: 'NueXxx' })` 放在 script 最前，紧接 imports；漏掉它 = 全局安装失效。
- 对外可样式化的点只有：类名（含 parseTheme 的 theme 类）与内联 CSS 变量。设计一个新组件时先想清楚"主题要能定制哪些维度"，把它们定义成 CSS 变量并写进 types。
- 内部使用兄弟组件：`import { NueIcon } from '../icon'` 之类（也可像 dialog.vue 那样直接 import `.vue` 文件）；模板里用小写 kebab `<nue-icon>`。
- 常规内部组织（观察 button/checkbox/overlay 得到）：模板用 `v-if="$slots.xxx"` 决定插槽渲染；逻辑用 `computed`，命名常用 `classes` / `styles`；交互处理函数 `handleXxx`；分组组件通过 `inject` 读父上下文（见 §5）。

## 5. 分组组件：provide/inject 上下文

一个"组"往往由 父分组组件 + 若干子组件 组成，父通过 provide 一个响应式上下文，子通过 inject 读取并合并自身 props。父子约定要同时支持"独立使用"与"组内使用"。

文件拆分：

- `constants.ts`：`export const BUTTON_GROUP_CTX_KEY = 'ButtonGroupCtx';`（key 就是字符串常量）
- `types.ts`：上下文类型 `NueButtonGroupCtxType`、Props/Emits
- 父组件（button-group.vue）：`provide(KEY, reactive ctx)`，ctx 持有 size/disabled 等"可下发给子"的字段；父 props 变化时更新 ctx（button-group 用 reactive 包裹 props 快照；checkbox-group 用 reactive + register/unregister 维护 name 集合与"最大/最小选中"约束）
- 子组件（button.vue / checkbox.vue）：`inject(KEY, 默认值)`，把 ctx 值与自身 props 合并（如 `const disabled = computed(() => groupCtx?.disabled || props.disabled || props.loading)`）；ctx 的 `size`/`theme` 优先生效

参照实现：`button-group/` + `button/`（属性下发型）、`checkbox-group/` + `checkbox/`（集合管理型，含 register/unregister、activeNames、maximized/minimized）。**做分组组件前把 checkbox-group 完整读一遍**。

## 6. 函数式调用组件（Xxx() / Xxx.success() API）

`message/`、`confirm/`、`prompt/` 不靠标签使用，而是导出可调用函数。两段式结构：

- 渲染载体（SFC，如 `message-inner.vue`、`confirm.vue`）：正常组件，接收特殊回调 props（`close`、`destroy`），决定自身结构与动画；
- 调用器（`message.ts` / `confirm.ts`）：程序化创建 VNode 并挂载到 DOM。

`confirm.ts` 的骨架（Promise + popup anchor）：

```ts
const NueConfirmCaller = (payload): Promise<...> => {
    return new Promise((resolve, reject) => {
        const popupAnchor = usePopupAnchor(payload.wrapperId); // 自建挂载点
        popupAnchor.mountPopupAnchor();
        const vnode = createVNode(NueConfirm, { ...payload,
            close: (isByCancel, result, error) => error ? reject(error) : resolve([isByCancel, result]),
            destroy: () => { popupAnchor.unmountPopupAnchor(); } });
        render(vnode, popupAnchor.popupAnchor);
    });
};
```

`message.ts` 更底层：直接在 `#app`/body 下建 wrapper DOM，`createVNode(MessageNodeInner, ...)` + `render`，并用 `NueMessage.success/error/warn/info/log` 魔术方法扩展。

导出约定（index.ts）：

- 普通组件：`export const NueXxx = withInstall(Comp);`
- 函数式：`export const NueMessage = Message as NueMessageCaller;`（不包 withInstall，无法 app.use）；配套 `NueMessageWrapper`（渲染容器组件）仍可 withInstall。
- 记得把 Caller/Payload/Result 等类型一并 `export type`。

## 7. 弹层（popup）组件骨架

会浮起来/盖层的东西（dialog/drawer/tooltip/dropdown/select 面板）遵循一套组合拳，**先读 `dialog/dialog.vue` + `overlay/overlay.vue` 再写**：

- 结构：`<teleport>` → `NueOverlay`（遮罩，自带动画与 focus/esc 处理）→ 内容容器；
- 定位/挂载：`usePopupAnchor()`（来自 `@nue-ui/hooks/use-popup-anchor`）提供 teleport 目标状态 `tpState` 与 `mountPopupAnchor/unmountPopupAnchor`；函数式调用器传 `wrapperId` 指定挂载点；
- 动画契约：组件内维护 `visible`（显隐），内容根节点监听 `animationstart/animationend` 发出 `beforeOpen/beforeClose/afterOpen/afterClose`；`afterClose` 时 `emit('update:modelValue', false)` 并 `unmountPopupAnchor`；动画名/时长通过 `parsePopupItemAnimation` 把 props 转成 `--nue-*-animation-name/-duration` 变量交给主题 CSS（见 styling-theming.md）；
- API：`defineExpose({ open, close })`；
- 浮层定位（tooltip/dropdown/select）：`usePopper` / `usePopperV2`（见 hooks-utils.md，dropdown.vue 是最新用法参照）。

## 8. 其它值得知道的形态

- **渲染函数组件**：无需模板时用 `defineComponent` + `setup` 返回渲染函数（`div/div.ts`、`dropdown/dropdown-group.ts`）。props 直接以 `defineComponent` 的 props 选项声明（类型用构造函数写法）。
- **图标**：`icon/icon.vue` 渲染 `<i class="iconfont" :class="['nue-icon', 'icon-<name>', ...]">`，配合 `nue-ui-iconfont` 字体；常用类 `nue-icon--spin`（加载旋转）。给按钮类组件配图标时复用 `NueIcon`。
- 长而复杂的状态机（date-picker/calendar/select）内部常把面板拆成多个子 vue 并抽出 composable（如 `use-calendar`），顶层文件保持薄。

## 9. 改代码的边界

- 只动与任务相关的文件；顺手"重构"别的组件违背仓库 AGENTS.md（外科手术式修改）。
- 若你发现其它组件的死代码/可疑代码，口头提出，不要顺手删除。
- 结构改动往往需要同步：主题 CSS 类名/变量、文档表格、相关测试——用 `git status` + `grep` 检查遗漏。