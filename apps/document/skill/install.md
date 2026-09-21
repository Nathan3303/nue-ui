# 安装

## 方式一：pi（自动发现）

```bash
pi install npm:nue-ui-skill     # 全局
pi install -l npm:nue-ui-skill  # 仅当前项目
pi -e npm:nue-ui-skill          # 临时试用不落盘
```

## 方式二：CLI 复制到项目（通用）

包自带 `nue-ui-skill` 命令，把 `SKILL.md` + `references/` 复制到目标项目的 `.agents/skills/nue-ui/`，pi / Claude Code / Codex 等都能识别：

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