# NueUI

NueUI 是一个基于 Vue 3 的 UI 组件库，采用 Monorepo 架构，旨在提供一套简洁、易用且高度可定制的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

## 特性

- 🎨 **设计风格简洁现代** - 以简洁现代的设计风格为主，提供美观统一的视觉体验
- 🎁 **丰富且易于使用的组件** - 提供丰富且易于使用的预构建组件，可以快速地集成到项目中
- 🚀 **良好的文档和社区支持** - 拥有详细的文档，内容清晰，涵盖了从基础入门到高级用法的各个方面
- ⚙️ **支持 TypeScript** - 组件库完全支持 TypeScript，提供了完整的类型定义文件
- 📦 **按需引入** - 支持全量引入、按需引入和自动导入三种方式
- 🌓 **主题定制** - 支持主题定制，提供 Shadlike 主题
- 🧪 **单元测试** - 完善的单元测试覆盖
- 🏗️ **Monorepo 架构** - 采用 Monorepo 架构，便于统一管理和开发

## 项目信息

- **名称**: `@nue-ui/repo`
- **仓库版本**: `0.2.4`
- **作者**: Nathan Lee
- **许可证**: MIT
- **仓库**: [GitHub](https://github.com/Nathan3303/nue-ui)
- **文档**: [在线文档](https://nathan3303.github.io/nue-ui/)

## 快速开始

### 安装组件库

```bash
pnpm install nue-ui
```

### 基本使用

```ts
import { createApp } from 'vue';
import App from './App.vue';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';

createApp(App).use(NueUI).mount('#app');
```

详细的使用说明请参考 [packages/core/README.md](./packages/core/README.md)

## 项目结构

NueUI 项目采用 Monorepo 结构，包含以下几个主要模块：

### Apps（应用）

- **`@nue-ui/document`** - 基于 VitePress 的文档站点，提供完整的组件使用文档和示例
- **`@nue-ui/playground`** - 组件演练场，用于快速测试和演示组件功能
- **`@nue-ui/histoire`** - 基于 Histoire 的组件测试和展示平台

### Packages（核心包）

- **`@nue-ui/components`** - 所有组件的源码，包含 30+ 个高质量组件
- **`@nue-ui/core`** - 组件库构建核心，负责打包、构建和发布，支持 ES Module 和 UMD 格式
- **`@nue-ui/hooks`** - 功能钩子集合，提供常用的 Vue 3 组合式函数
- **`@nue-ui/themes`** - 主题相关配置和样式
- **`@nue-ui/plugins`** - 插件集合，包括自动导入 resolver 等

### 独立包

- **`nue-ui-theme-shadlike`** - Shadlike 风格主题包
- **`nue-ui-iconfont`** - 图标字体包

## 组件概览

NueUI 提供了 30+ 个高质量组件，分为以下几类：

- **基础组件** - Button、Icon、Link、Text、Div 等
- **布局组件** - Container、Header、Aside、Main、Footer 等
- **数据展示** - Avatar、Badge、Collapse、Empty、Progress 等
- **表单组件** - Input、Textarea、Select、Checkbox、Switch、DatePicker 等
- **反馈组件** - Dialog、Drawer、Message、Tooltip 等
- **导航组件** - Breadcrumb、Dropdown 等

详细的组件列表和说明请参考 [packages/core/README.md](./packages/core/README.md)

## 开发指南

### 环境要求

- Node.js >= 18
- pnpm >= 8

### 安装依赖

```bash
git clone https://github.com/Nathan3303/nue-ui.git
cd nue-ui
pnpm install
```

### 常用命令

#### 测试

```bash
pnpm test              # 运行测试
pnpm test:ui           # 运行测试 UI
pnpm test:run          # 运行测试（无 UI）
pnpm test:coverage     # 生成测试覆盖率报告
```

#### 代码质量

```bash
pnpm lint              # 运行 ESLint
pnpm format            # 运行 Prettier 格式化
```

#### 构建

```bash
pnpm core build        # 构建组件库
pnpm shadlike-theme build  # 构建 Shadlike 主题
pnpm iconfont build    # 构建图标字体
pnpm build             # 构建全部
```

#### 开发服务器

```bash
pnpm document dev      # 启动文档站点开发服务器
pnpm histoire dev      # 启动 Histoire 开发服务器
pnpm playground dev    # 启动演练开发服务器
```

#### 构建预览

```bash
pnpm document preview  # 预览文档站点
pnpm histoire preview  # 预览 Histoire
pnpm playground preview # 预览演练
```

### 开发规范

- 使用 TypeScript 进行类型检查
- 使用 ESLint 进行代码检查
- 使用 Prettier 进行代码格式化
- 使用 Vitest 进行单元测试
- 提交前会自动运行 lint-staged 进行代码检查和格式化

## 贡献

我们欢迎任何形式的贡献！如果您想为 NueUI 贡献代码，请遵循以下步骤：

1. Fork 本项目
2. 创建新分支 (`git checkout -b feature/YourFeatureName`)
3. 提交您的更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin feature/YourFeatureName`)
5. 提交 Pull Request

### 贡献指南

- 遵循现有的代码风格和命名规范
- 为新功能添加相应的测试用例
- 更新相关文档
- 确保所有测试通过

## 问题反馈

如果您在使用过程中遇到任何问题或有任何建议，欢迎在 [GitHub Issues](https://github.com/Nathan3303/nue-ui/issues) 中提出。

在提交 Issue 前，请先搜索已有的 Issue，避免重复提交。

## 相关文档

- [组件库使用文档](./packages/core/README.md)
- [Resolver 使用文档](./packages/plugins/resolver/README.md)
- [在线文档](https://nathan3303.github.io/nue-ui/)

## 许可证

NueUI 采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。

## 致谢

感谢所有为 NueUI 做出贡献的开发者！
