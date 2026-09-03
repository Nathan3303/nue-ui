# 新增一个组件（端到端清单）

适合"我要加一个 NueXxx 组件"的任务。先把 `component-conventions.md` 通读一遍，选好组件形态与"近亲"参照，然后照本清单走。**每一步都要有产出，别跳步。**

## 0. 准备

- `git status` 确认工作区干净、基线可回退。
- 确定组件名与形态：普通组件 / 分组（父或子）/ 函数式调用 / 弹层。决定它属于哪个类别（对应文档分类：basic/data/form/feedback/navigation/others）。
- 选定参照组件目录，把它完整读一遍（结构 + 类型 + 主题 css + 测试 + 文档页）。

## 1. 建目录 packages/components/<name>/

最小三件套 + 测试：

```
<name>/
├── <name>.vue
├── types.ts
├── index.ts
└── __tests__/<name>.test.ts
```

骨架（普通 SFC 组件）：

`types.ts`

```ts
import type { GlobalProps } from '@nue-ui/utils';

export type NueXxxSize = 'small' | 'large';

export interface NueXxxProps extends GlobalProps {
    // 你的 props...
}

export type NueXxxEmits = {
    change: [value: boolean];
};
```

`<name>.vue`（要点：defineOptions name、parseTheme、无 style、props→CSS 变量）

```vue
<template>
    <div :class="classes" :style="styles">
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueXxxProps, NueXxxEmits } from './types';

defineOptions({ name: 'NueXxx' });
const props = withDefaults(defineProps<NueXxxProps>(), {/* 默认值 */});
const emit = defineEmits<NueXxxEmits>();

const prefix = 'nue-xxx';
const classes = computed(() => [prefix, ...parseTheme(props.theme, prefix)]);
const styles = computed(() => ({/* '--nue-xxx-*': props.xxx */}));
</script>
```

`index.ts`

```ts
import { withInstall } from '@nue-ui/utils';
import Xxx from './xxx.vue';
import type { NueXxxProps, NueXxxEmits } from './types';

export const NueXxx = withInstall(Xxx);
export type { NueXxxProps, NueXxxEmits };
```

子组件形态：父在目录 index.ts 一并导出（如 container/index.ts、select/index.ts 导出 `NueSelect` + `NueSelectOption`）；分组上下文再补 `constants.ts`。函数式形态参考 message/confirm（见 conventions §6），且 index.ts 不包 withInstall。

## 2. 接线（三处 + 检查）

| 文件                           | 改动                             | 为什么                         |
| ------------------------------ | -------------------------------- | ------------------------------ |
| `<name>/index.ts`              | withInstall 导出 + `export type` | 组件自带 install               |
| `packages/components/index.ts` | 增加 `export * from './<name>';` | 库入口可具名导入               |
| `packages/core/components.ts`  | import + 数组里加 `NueXxx`       | 支持 `app.use(NueUI)` 全量安装 |

注意：`packages/core/index.ts` 已 `export * from '@nue-ui/components'`，**不用**再改；函数式调用组件（message/confirm/prompt）不进 `components.ts` 的安装数组（它们是函数不是组件），但在 `components/index.ts` 与核心包的 `export *` 链上照常出现（因为类型/函数被 re-export）。

验证：`grep -n "NueXxx" packages/components/index.ts packages/core/components.ts`，两个文件都出现即接线完成。

## 3. 主题样式（新组件基本都要）

- 在 `packages/themes/shadlike/src/components/` 建 `<name>.css`；
- 在 `packages/themes/shadlike/src/components/index.css` 加 `@import './<name>.css';`（放哪一行参考现有排序——文件列表尾部是后加入的组件）；
- `pnpm shadlike-theme build` 让 dist 生效（文档站/演练场等 import 的是 dist）。
- 写法要点见 `styling-theming.md`：先给 `--nue-<xxx>-*` 变量默认值，再用类名 + 变量写视觉规则，颜色/尺寸一律引用全局 token，别写死。

## 4. 测试

`__tests__/<name>.test.ts`：覆盖 渲染默认态 / 每个 props 的类名或 style 断言 / 事件（disabled 时不发） / 插槽 / 分组联动（如有）。跑：

```bash
pnpm exec vp test run packages/components/<name>    # 单组件，秒级
pnpm test:run                                       # 全量（提交前）
```

约定细节看 `references/testing.md`。

## 5. 文档（见 references/docs.md）

- 建 `apps/document/tutorial/<类别>/<name>/index.md` + 若干 `xxx.vue` 演示；
- 在 `apps/document/.vitepress/config.mts` 对应类别分组里加 sidebar item（`{ text: 'Xxx 中文名', link: '/tutorial/<类别>/<name>/index.md' }`）；
- 更新 props/emits 表，与 types.ts 保持一致。

## 6. 收尾

- 全量校验：`pnpm exec vp lint`（或 `vp check`）、`pnpm test:run` 全绿；
- 若组件进入核心 README 的组件总表（`packages/core/README.md`、根 `README.md`），顺手更新（大型新增一般要）；
- `git diff --stat` 自查改动范围，多余文件撤掉；
- 按 `.agents/commands/commit.md` 的格式提交（feat 前缀 + 变更点列表）。

## 常见遗漏自查

- [ ] SFC 有 `defineOptions({ name: 'NueXxx' })`
- [ ] 目录 `index.ts`、`components/index.ts`、`core/components.ts` 三处齐了
- [ ] 主题 css 文件建了且 `@import` 注册了
- [ ] 用了 `theme` 类或状态类后，主题 css 里有对应规则（否则无样式）
- [ ] types 里没写死、与 props 实际用法一致；文档表与 types 一致
- [ ] 测试从 `vite-plus/test` 导入
- [ ] 提交信息按仓库规范