# NueUI Resolver

NueUI Resolver 是一个用于 `unplugin-vue-components` 的组件解析器，实现了 NueUI Vue 3 组件的自动导入功能。

## 包信息

- **名称**: `nue-ui-resolver`
- **版本**: `0.2.1`
- **描述**: NueUI resolver for unplugin-vue-components
- **作者**: Nathan Lee
- **许可证**: MIT
- **类型**: Module
- **仓库**: [GitHub](https://github.com/Nathan3303/nue-ui.git)

## 功能特性

- 🚀 **自动导入** - 自动导入 NueUI 组件，无需手动引入
- 📦 **按需加载** - 只导入实际使用的组件，减小打包体积
- 🎯 **TypeScript 支持** - 完整的 TypeScript 类型定义
- 🔧 **高度可配置** - 支持自定义导入路径
- ⚡ **零配置** - 开箱即用，无需额外配置

## 安装

```bash
# npm
npm install @nue-ui/resolver -D

# pnpm
pnpm add @nue-ui/resolver -D

# yarn
yarn add @nue-ui/resolver -D
```

## 依赖

- **unplugin-vue-components**: ^0.27.0
- **vue**: ^3.5.0

## 使用方式

### 基本配置

在 Vite 配置文件中使用：

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [NueUiResolver()]
        })
    ]
});
```

### Webpack 配置

```ts
// webpack.config.js
const Components = require('unplugin-vue-components/webpack');
const { NueUiResolver } = require('@nue-ui/resolver');

module.exports = {
    plugins: [
        Components({
            resolvers: [NueUiResolver()]
        })
    ]
};
```

### 自定义导入路径

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [
                NueUiResolver({
                    importPath: '@nue-ui/components'
                })
            ]
        })
    ]
});
```

### 与其他解析器一起使用

```ts
// vite.config.ts
import { defineConfig } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

export default defineConfig({
    plugins: [
        Components({
            resolvers: [NueUiResolver(), ElementPlusResolver()]
        })
    ]
});
```

## 重要提示：手动导入样式

此解析器仅处理 **组件的自动导入**，您仍需手动导入组件样式：

### 全量导入样式

```ts
// main.ts
import 'nue-ui/dist/index.css';
```

### 按需导入样式

```ts
// main.ts
import 'nue-ui/dist/theme/button.css';
import 'nue-ui/dist/theme/dialog.css';
import 'nue-ui/dist/theme/input.css';
```

### 使用 Shadlike 主题

```ts
// main.ts
import 'nue-ui-theme-shadlike/dist/index.css';
```

## 支持的组件

### 基础组件

| 组件名称         | 说明     |
| ---------------- | -------- |
| `NueButton`      | 按钮     |
| `NueButtonGroup` | 按钮组   |
| `NueIcon`        | 图标     |
| `NueLink`        | 链接     |
| `NueText`        | 文本     |
| `NueDiv`         | 布局容器 |

### 布局组件

| 组件名称       | 说明     |
| -------------- | -------- |
| `NueContainer` | 布局容器 |
| `NueHeader`    | 头部     |
| `NueAside`     | 侧边栏   |
| `NueContent`   | 内容区域 |
| `NueMain`      | 主体     |
| `NueFooter`    | 底部     |
| `NueSeparator` | 分隔符   |

### 数据展示

| 组件名称            | 说明     |
| ------------------- | -------- |
| `NueAvatar`         | 头像     |
| `NueBadge`          | 徽标     |
| `NueCollapse`       | 折叠面板 |
| `NueEmpty`          | 空状态   |
| `NueMarquee`        | 跑马灯   |
| `NueProgress`       | 进度条   |
| `NueInfiniteScroll` | 无限滚动 |

### 表单组件

| 组件名称           | 说明       |
| ------------------ | ---------- |
| `NueInput`         | 输入框     |
| `NueTextarea`      | 文本域     |
| `NueSelect`        | 选择器     |
| `NueCheckbox`      | 复选框     |
| `NueCheckboxGroup` | 复选框组   |
| `NueSwitch`        | 开关       |
| `NueDatePicker`    | 日期选择器 |

### 反馈组件

| 组件名称     | 说明     |
| ------------ | -------- |
| `NueDialog`  | 对话框   |
| `NueDrawer`  | 抽屉     |
| `NueMessage` | 消息提示 |
| `NueConfirm` | 确认框   |
| `NuePrompt`  | 输入框   |
| `NueTooltip` | 文字提示 |

### 导航组件

| 组件名称            | 说明       |
| ------------------- | ---------- |
| `NueBreadcrumb`     | 面包屑     |
| `NueBreadcrumbItem` | 面包屑项   |
| `NueDropdown`       | 下拉菜单   |
| `NueDropdownItem`   | 下拉菜单项 |

### 其他

| 组件名称       | 说明     |
| -------------- | -------- |
| `NueDivider`   | 分割线   |
| `NuePopupPool` | 弹出层池 |

## 配置选项

### NueUiResolverOptions

| 参数         | 类型     | 默认值                 | 说明           |
| ------------ | -------- | ---------------------- | -------------- |
| `importPath` | `string` | `'@nue-ui/components'` | 组件的导入路径 |

### 示例

```ts
NueUiResolver({
    importPath: '@nue-ui/components'
});
```

## 工作原理

### 组件名称转换

Resolver 支持多种组件名称格式：

- **PascalCase**: `NueButton` → `NueButton`
- **kebab-case**: `nue-button` → `NueButton`
- **混合**: `NueButton` → `button` (移除 Nue 前缀)

### 导入路径生成

Resolver 会根据组件名称自动生成正确的导入路径：

```ts
// 组件: NueButton
// 生成的导入: import { NueButton } from '@nue-ui/components/button'

// 组件: NueDialog
// 生成的导入: import { NueDialog } from '@nue-ui/components/dialog'
```

## TypeScript 支持

此包包含完整的 TypeScript 类型定义，无需额外配置即可获得完整的类型提示。

```ts
import { NueUiResolver, NueUiResolverOptions } from '@nue-ui/resolver';

const options: NueUiResolverOptions = {
    importPath: '@nue-ui/components'
};

const resolver = NueUiResolver(options);
```

## 完整示例

### 项目结构

```
my-project/
├── src/
│   ├── App.vue
│   └── main.ts
├── vite.config.ts
├── package.json
└── tsconfig.json
```

### vite.config.ts

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import Components from 'unplugin-vue-components/vite';
import { NueUiResolver } from '@nue-ui/resolver';

export default defineConfig({
    plugins: [
        vue(),
        Components({
            resolvers: [NueUiResolver()],
            dts: true // 生成类型声明文件
        })
    ]
});
```

### main.ts

```ts
import { createApp } from 'vue';
import App from './App.vue';

// 导入样式
import 'nue-ui/dist/index.css';

createApp(App).mount('#app');
```

### App.vue

```vue
<template>
    <div>
        <NueButton type="primary">点击我</NueButton>
        <NueDialog v-model:visible="visible" title="对话框">
            <p>这是一个对话框</p>
        </NueDialog>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// 组件会自动导入，无需手动 import
const visible = ref(false);
</script>
```

## 注意事项

1. **样式导入**: Resolver 只处理组件的自动导入，样式需要手动导入
2. **组件注册**: 组件会自动注册到全局，无需手动注册
3. **类型支持**: 建议在 `unplugin-vue-components` 配置中启用 `dts: true` 以生成类型声明文件
4. **版本兼容**: 确保安装的 `unplugin-vue-components` 版本符合要求 (^0.27.0)
5. **Vue 版本**: 需要 Vue 3.5.0 或更高版本

## 常见问题

### Q: 为什么组件没有样式？

A: Resolver 只处理组件的自动导入，您需要手动导入样式文件：

```ts
import 'nue-ui/dist/index.css';
```

### Q: 如何自定义组件的导入路径？

A: 使用 `importPath` 选项：

```ts
NueUiResolver({
    importPath: '@my-custom-path/components'
});
```

### Q: 支持哪些构建工具？

A: 支持 Vite、Webpack、Rollup 等主流构建工具，只要使用 `unplugin-vue-components` 即可。

### Q: 如何禁用某个组件的自动导入？

A: 在 `unplugin-vue-components` 配置中使用 `exclude` 选项：

```ts
Components({
    resolvers: [NueUiResolver()],
    exclude: [/NueButton/]
});
```

## 相关链接

- [GitHub 仓库](https://github.com/Nathan3303/nue-ui)
- [在线文档](https://nathan3303.github.io/nue-ui/)
- [unplugin-vue-components](https://github.com/antfu/unplugin-vue-components)
- [NueUI 组件库](https://github.com/Nathan3303/nue-ui)

## 许可证

MIT License