# NueUI

NueUI 是一个基于 Vue 3 的 UI 组件库，旨在提供一套简洁、易用且高度可定制的 UI 组件，帮助开发者快速构建现代化的 Web 应用。

## 项目信息

- **名称**: `@nue-ui/repo`
- **版本**: `0.2.0`
- **作者**: Nathan Lee
- **许可证**: MIT
- **仓库**: [GitHub](https://github.com/nathanlee323/nue-ui)

## 在其他项目中使用 NueUI 组件库

### 安装

```bash
pnpm install nue-ui@latest
```

### 使用

#### 全量引入

在您的 Vue 应用程序中，您可以通过以下方式使用全量引入 NueUI 组件库：

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import NueUI from 'nue-ui';
import 'nue-ui/dist/index.css';

createApp(App).use(NueUI).mount('#app');
```

#### 按需引入

在您的 Vue 应用程序中，您可以通过以下方式使用按需引入 NueUI 组件库：

```ts
// main.ts
import { createApp } from 'vue';
import App from './App.vue';
import { NueDiv, NueButton, NueLink } from 'nue-ui';
import 'nue-ui/dist/theme/div.css';
import 'nue-ui/dist/theme/button.css';
import 'nue-ui/dist/theme/link.css';

createApp(App).use(NueDiv).use(NueButton).use(NueLink).mount('#app');
```

## 贡献以及二次开发

### 项目结构

NueUI 项目采用 Monorepo 结构，包含以下几个主要模块：

- **Apps**
    - **`@nue-ui/document`**: 文档站点
    - **`@nue-ui/playground`**: 组件演示与测试环境
    - **`@nue-ui/story`**: Storybook
- **Packages**
    - **`@nue-ui/components`**: 组件库
    - **`@nue-ui/core`**: 核心组件库
    - **`@nue-ui/hooks`**: 钩子库
    - **`@nue-ui/theme`**: 主题库
    - **`@nue-ui/utils`**: 工具库

### 开发

通过 Git clone 项目，进入项目根目录，并执行以下命令进行初始化：

项目使用 `pnpm` 作为包管理工具，所有依赖项均通过 `pnpm` 安装和管理。

#### 安装依赖

```bash
pnpm install
```

#### 常用指令

```bash
pnpm core build # 构建核心组件库
pnpm playground [dev|build|preview] # Playground
pnpm document [dev|build|preview] # 文档站点
```

### 贡献

我们欢迎任何形式的贡献！如果您想为 NueUI 贡献代码，请遵循以下步骤：

1. Fork 本项目
2. 创建新分支 (`git checkout -b feature/YourFeatureName`)
3. 提交您的更改 (`git commit -am 'Add some feature'`)
4. 推送到分支 (`git push origin feature/YourFeatureName`)
5. 提交 Pull Request

## 许可证

NueUI 采用 MIT 许可证，详情请参阅 [LICENSE](LICENSE) 文件。
