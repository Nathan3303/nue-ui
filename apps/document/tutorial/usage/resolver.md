# 自动导入

`nue-ui-resolver` 是一个配合 `unplugin-vue-components` 使用的解析器插件，可以实现 NueUI 组件的自动导入，无需手动编写 import 语句。

## 安装

```shell
# npm
npm install nue-ui-resolver -D

# pnpm
pnpm add nue-ui-resolver -D
```

## 配置

### Vite 配置

在 `vite.config.ts` 中配置 `unplugin-vue-components` 和 `nue-ui-resolver`：

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from 'nue-ui-resolver'; // 注意 i 是小写

export default defineConfig({
    plugins: [
        Components({
            resolvers: [NueUiResolver()]
        })
    ]
});
```

### 配置选项

`NueUiResolver` 支持以下配置选项：

| 参数         | 类型     | 默认值               | 说明         |
| ------------ | -------- | -------------------- | ------------ |
| `importPath` | `string` | `@nue-ui/components` | 组件导入路径 |

```typescript
// vite.config.ts
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from 'nue-ui-resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                NueUiResolver({
                    // 自定义导入路径（可选）
                    importPath: '@nue-ui/components'
                })
            ]
        })
    ]
});
```

## 手动引入 CSS

::: warning 重要提示
该解析器仅处理组件的自动导入，**不会自动导入组件样式**。您需要手动在项目中引入 CSS
样式。但组件库鼓励主题定制，所以所有默认 CSS 都定义到了包 `nue-ui-shadlike-theme` 中，因此无论如何都需要手动引入 CSS 。
:::

### 引入全量样式

```typescript
// main.ts
import 'nue-ui-shadlike-theme/dist/index.css';
```

### 按需引入样式

```typescript
// main.ts
import 'nue-ui-shadlike-theme/dist/components/button.css';
import 'nue-ui-shadlike-theme/dist/components/dialog.css';
import 'nue-ui-shadlike-theme/dist/components/div.css';
```

## 使用示例

配置完成后，无需手动导入组件，可以直接在模板中使用：

```vue
<!-- 无需 import 语句，直接使用组件 -->
<template>
    <NueButton type="primary">点击我</NueButton>
    <NueText>这是一个文本组件</NueText>
    <NueDialog v-model="showDialog" title="提示"> 这是一个对话框 </NueDialog>
</template>
```

组件会在构建时自动按需导入，有效减少最终产物体积。

## 支持的组件

| 组件                                                                   | 说明              |
| ---------------------------------------------------------------------- | ----------------- |
| NueAside                                                               | 侧边栏            |
| NueAvatar                                                              | 头像              |
| NueBadge                                                               | 徽标              |
| NueBreadcrumb / NueBreadcrumbItem                                      | 面包屑            |
| NueButton / NueButtonGroup                                             | 按钮 / 按钮组     |
| NueCheckbox / NueCheckboxGroup                                         | 复选框 / 复选框组 |
| NueCollapse / NueCollapseItem                                          | 折叠面板          |
| NueContainer / NueHeader / NueAside / NueMain / NueContent / NueFooter | 布局容器          |
| NueDatePicker                                                          | 日期选择器        |
| NueDialog                                                              | 对话框            |
| NueDiv                                                                 | 弹性盒            |
| NueDivider                                                             | 分割线            |
| NueDrawer                                                              | 抽屉              |
| NueDropdown / NueDropdownItem                                          | 下拉菜单          |
| NueEmpty                                                               | 空状态            |
| NueIcon                                                                | 图标              |
| NueInfiniteScroll                                                      | 无限滚动          |
| NueInput                                                               | 输入框            |
| NueLink                                                                | 链接              |
| NueMarquee                                                             | 跑马灯            |
| NueProgress                                                            | 进度条            |
| NueSwitch                                                              | 开关              |
| NueSelect / NueSelectOption                                            | 选择器 / 选项     |
| NueSeparator                                                           | 分割符            |
| NueText                                                                | 文本              |
| NueTextarea                                                            | 文本域            |
| NueTooltip                                                             | 提示              |

## TypeScript 支持

该包内置了 TypeScript 类型声明，无需额外安装类型包。

如果需要在 `tsconfig.json` 中获取组件类型提示，可以添加全局组件类型：

```json5
{
    compilerOptions: {
        types: ['nue-ui/dist/global']
    }
}
```