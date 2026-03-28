# NueUI Core

NueUI Core 是 NueUI 组件库的核心构建包，负责组件的打包、构建和发布。它将所有组件打包成一个完整的组件库，支持 ES Module 和 UMD 两种格式。

## 包信息

- **名称**: `nue-ui`
- **版本**: `1.8.28`
- **描述**: Components library by Vue3 + TS
- **作者**: Nathan33
- **许可证**: MIT
- **类型**: Module

## 功能特性

- 📦 **全量打包** - 将所有 NueUI 组件打包成一个完整的组件库
- 🔧 **多种构建格式** - 支持 ES Module 和 UMD 两种格式
- 📝 **TypeScript 支持** - 完整的类型定义文件
- 🎨 **样式导出** - 支持按需导入和全量导入样式
- 🚀 **生产优化** - 自动代码压缩和优化

## 导出格式

### ES Module

```ts
import { NueButton, NueDialog } from 'nue-ui';
```

- **入口文件**: `./dist/es/index.js`
- **类型定义**: `./dist/types/core/index.d.ts`
- **使用场景**: 现代打包工具（Vite、Webpack 等）

### UMD

```ts
const NueUI = require('nue-ui');
```

- **入口文件**: `./dist/umd/index.umd.cjs`
- **类型定义**: `./dist/types/core/index.d.ts`
- **使用场景**: 传统打包工具、CDN 引入

## 导出组件

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

| 组件名称            | 说明       |
| ------------------- | ---------- |
| `NueAvatar`         | 头像       |
| `NueBadge`          | 徽标       |
| `NueCollapse`       | 折叠面板   |
| `NueCollapseItem`   | 折叠面板项 |
| `NueEmpty`          | 空状态     |
| `NueMarquee`        | 跑马灯     |
| `NueProgress`       | 进度条     |
| `NueInfiniteScroll` | 无限滚动   |

### 表单组件

| 组件名称           | 说明       |
| ------------------ | ---------- |
| `NueInput`         | 输入框     |
| `NueTextarea`      | 文本域     |
| `NueSelect`        | 选择器     |
| `NueSelectOption`  | 选择器选项 |
| `NueCheckbox`      | 复选框     |
| `NueCheckboxGroup` | 复选框组   |
| `NueSwitch`        | 开关       |
| `NueDatePicker`    | 日期选择器 |

### 反馈组件

| 组件名称            | 说明         |
| ------------------- | ------------ |
| `NueDialog`         | 对话框       |
| `NueDrawer`         | 抽屉         |
| `NueMessageWrapper` | 消息提示容器 |
| `NueTooltip`        | 文字提示     |

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

## 使用方式

### 全量引入

```ts
import { createApp } from 'vue';
import App from './App.vue';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';

createApp(App).use(NueUI).mount('#app');
```

### 按需引入

```ts
import { createApp } from 'vue';
import App from './App.vue';
import { NueButton, NueDialog } from 'nue-ui';
import 'nue-ui/dist/theme/button.css';
import 'nue-ui/dist/theme/dialog.css';

createApp(App).use(NueButton).use(NueDialog).mount('#app');
```

## 构建命令

```bash
# 清理构建目录
pnpm remove-dist

# 构建 ES Module
pnpm build-es

# 构建 UMD
pnpm build-umd

# 完整构建（清理 + ES + UMD + 类型定义）
pnpm build
```

## 构建输出

构建完成后，会在 `dist` 目录下生成以下文件：

```
dist/
├── es/                    # ES Module 格式
│   ├── index.js          # 主入口文件
│   └── theme/            # 样式文件
│       └── index.css
├── umd/                  # UMD 格式
│   └── index.umd.cjs     # UMD 入口文件
└── types/                # TypeScript 类型定义
    └── core/
        └── index.d.ts
```

## 环境提示

组件库会在控制台输出当前运行模式：

- **生产模式**: 显示彩色渐变文本 "NueUI is running in production mode."
- **开发模式**: 显示 "NueUI is running in development mode."

## 依赖

### Peer Dependencies

- `vue`: ^3.5.18

### Dev Dependencies

- `@rollup/plugin-terser`: ^0.4.4
- `shelljs`: ^0.5.5
- `vite-plugin-compression2`: ^2.3.1
- `vite-plugin-dts`: ^4.5.4

## 注意事项

1. **样式导入**: 使用组件时需要手动导入对应的样式文件
2. **Vue 版本**: 需要安装 Vue 3.5.18 或更高版本
3. **类型支持**: 完整支持 TypeScript，无需额外配置
4. **按需引入**: 建议使用按需引入以减小打包体积

## 相关链接

- [GitHub 仓库](https://github.com/Nathan3303/nue-ui)
- [文档站点](https://nathan3303.github.io/nue-ui/)
- [组件列表](../../README.md#组件列表)
