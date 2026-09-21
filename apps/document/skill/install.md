# 安装

## Pi 是什么

[Pi](https://pi.dev) 是一个运行在终端中的编码代理（AI coding agent）：像 Claude Code / Codex 一样，在命令行里通过对话帮你完成编码任务。Pi 支持安装并加载 **Agent Skill**——技能安装后，Pi 会在合适的时机自动读取其内容，获得"如何用 NueUI 写界面"这类特定领域的操作指南。

> 下文命令中的 `pi` 是 Pi 的命令行入口（命令名本身是小写）；正文提及产品时统一写作 **Pi**。

## 方式一：Pi（自动发现）

```bash
pi install npm:nue-ui-skill     # 全局
pi install -l npm:nue-ui-skill  # 仅当前项目
pi -e npm:nue-ui-skill          # 临时试用不落盘
```

## 方式二：CLI 复制到项目（通用）

包自带 `nue-ui-skill` 命令，把 `SKILL.md` + `references/` 复制到目标项目的 `.agents/skills/nue-ui/`，Pi / Claude Code / Codex 等都能识别：

```bash
nue-ui-skill install                  # 复制到当前项目 .agents/skills/nue-ui/
nue-ui-skill install ../my-app        # 复制到指定项目
nue-ui-skill install --force          # 目标已存在时覆盖（默认拒绝）
```

未全局安装时：

```bash
npx nue-ui-skill install
```

命令细节见 [CLI 用法](./cli.md)。

## 方式三：手动放置

把包目录（含 `SKILL.md` 与 `references/`）复制或软链到任意 harness 的 skills 路径，例如 Claude Code：

```bash
ln -s node_modules/nue-ui-skill ~/.claude/skills/nue-ui
# 或项目级：ln -s node_modules/nue-ui-skill .claude/skills/nue-ui
```

## 安装后验证

项目内出现 `.agents/skills/nue-ui/SKILL.md` 即安装成功；向 Agent 提问"用 NueUI 搭一个页面"之类的问题，观察其是否加载了技能。