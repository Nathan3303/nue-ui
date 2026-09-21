# CLI 用法

`nue-ui-skill` 命令用于把技能安装到项目，核心子命令为 `install`。

## 命令参考

| 命令                                      | 说明                                     |
| ----------------------------------------- | ---------------------------------------- |
| `nue-ui-skill install [target] [--force]` | 安装到 `<target>/.agents/skills/nue-ui/` |
| `nue-ui-skill --help` / `-h`              | 显示帮助                                 |
| `nue-ui-skill --version` / `-v`           | 显示版本                                 |

### 参数

| 参数             | 说明                                          |
| ---------------- | --------------------------------------------- |
| `target`         | 目标项目目录，默认当前目录（`process.cwd()`） |
| `--force` / `-f` | 目标已存在时覆盖（默认**拒绝**覆盖）          |

## 行为细节

- **覆盖保护**：若 `.agents/skills/nue-ui/` 已存在，默认报错并提示加 `--force`，避免误覆盖已有内容；
- **安装内容**：`SKILL.md` + `references/`（4 个深度文档）原样复制，与包内文件一致；
- **目标目录名**：固定为 `nue-ui`（与 `SKILL.md` frontmatter 的 `name` 一致），Agent 按此目录名发现技能。

## 示例

```bash
# 当前项目
nue-ui-skill install

# 指定项目
nue-ui-skill install ../my-app

# 覆盖已存在
nue-ui-skill install --force

# 未全局安装时
npx nue-ui-skill install
```