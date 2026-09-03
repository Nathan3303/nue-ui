# nue-ui-skill

使用 **NueUI**（Vue 3 组件库：`nue-ui` + `nue-ui-theme-shadlike`）编写界面的 [Agent Skill](https://agentskills.io/specification)。

本技能面向**使用方**：告诉 AI Agent 如何用现有 NueUI 组件搭页面/画面——组件选型、引入方式、v-model 与事件约定、theme 与 CSS 变量定制、暗色模式、可复制的画面套路（应用壳、表单、弹窗、消息/确认流、列表加载、下拉菜单等）。不涉及组件库源码的二次开发。

> 技能本体即本包：`SKILL.md` 位于包根，`references/` 为按需加载的深度文档。

## 安装

### pi（自动发现）

```bash
pi install npm:nue-ui-skill     # 全局
pi install -l npm:nue-ui-skill  # 仅当前项目
pi -e npm:nue-ui-skill          # 临时试用不落盘
```

### Claude Code / Codex 等

Claude Code 不自动扫描 npm 包，把"含 `SKILL.md` 的目录"（即本包目录）加入它的技能位置即可，例如 symlink 或复制：

```bash
ln -s node_modules/nue-ui-skill ~/.claude/skills/nue-ui
# 或项目级：ln -s node_modules/nue-ui-skill .claude/skills/nue-ui
```

其它 harness 同理：把本包目录指向其 skills 路径。

## 内容

| 文件                          | 说明                                             |
| ----------------------------- | ------------------------------------------------ |
| `SKILL.md`                    | 使用心智模型 + 编写流程 + 任务路由表 + 快速纠错  |
| `references/get-started.md`   | 全量/按需/自动导入、样式与图标字体引入           |
| `references/component-map.md` | 按界面任务选组件（布局/表单/反馈/数据展示/导航） |
| `references/recipes.md`       | 画面套路与可复制片段                             |
| `references/customize.md`     | theme、CSS 变量 token、暗色模式定制              |

完整组件 API 以 NueUI 官方文档为准：https://nathan3303.github.io/nue-ui/

## 仓库

- 源码：[NueUI monorepo](https://github.com/Nathan3303/nue-ui)（`packages/nue-ui-skill/`）
- NueUI 组件库：[nue-ui](https://www.npmjs.com/package/nue-ui)

## License

MIT