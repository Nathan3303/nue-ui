# 技能（Agent Skill）

`nue-ui-skill` 是一个 **Agent Skill 包**：安装后，AI Agent（Pi、Claude Code、Codex 等）能获得一份"如何使用 NueUI 写界面"的操作指南，包括组件选型、引入方式、v-model 与事件约定、theme 与 CSS 变量定制、暗色模式，以及可复制的画面套路（应用壳、表单、弹窗、消息/确认流、列表加载、下拉菜单等）。

> 当前版本：`nue-ui-skill@0.3.x`

## 适用场景

- 用 NueUI 组件**搭页面/后台/表单/弹窗流程**；
- 问"某个组件怎么用、传什么参数"；
- 排查使用问题（组件没样式、图标不显示、对话框不弹等）。

## 不适用场景

- **开发/修改组件库本身**（`packages/components` 源码、主题 CSS、新增 `NueXxx` 组件、`apps/document` 组件文档）——那是仓库内开发，使用 `nue-ui-dev` 技能，不是本技能。

## 技能内容

`SKILL.md` 是技能入口，包含三条心智模型、编写流程、任务路由表与快速纠错表；`references/` 为按需加载的深度文档：

| 文件               | 内容                                                           |
| ------------------ | -------------------------------------------------------------- |
| `get-started.md`   | 安装/引入/注册三种方式、样式与图标字体引入                     |
| `component-map.md` | 按界面任务选组件：用途、核心 props/事件、对应文档页            |
| `recipes.md`       | 画面套路：应用壳、表单、弹窗/确认/消息流、列表与加载、下拉菜单 |
| `customize.md`     | theme 属性、CSS 变量 token、暗色模式、常见定制做法             |

技能内容与本文档站同源，且以[在线文档](https://nathan3303.github.io/nue-ui/)为权威出处。

## 快速开始

```bash
# 方式一：Pi 安装后自动发现
pi install npm:nue-ui-skill

# 方式二：复制到项目（任何 harness 可用）
npx nue-ui-skill install
```

详见[安装](./install.md)与[CLI](./cli.md)。