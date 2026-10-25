# 任务状态（接续快照）

> 重开会话先读本文件。更新时间：2026-10-25（已合并 + 已打 tag） · 批次：Glass 主题包 v0.1.0

## 当前批次

| 项       | 内容                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| 需求     | 新增 `nue-ui-theme-glass@0.1.0`（Apple HIG 玻璃拟态 · C 端官网/落地页 · 34 组件全量 · 亮/暗双套） |
| Issue    | [#75](https://github.com/Nathan3303/nue-ui/issues/75)（npm 发布后关闭）                           |
| PR       | [#76](https://github.com/Nathan3303/nue-ui/pull/76) **MERGED**（squash）                          |
| 合并提交 | `73e0593b feat(theme): 新增 Glass 玻璃拟态主题包（Apple HIG · 亮/暗双套 · 34 组件全覆盖）(#76)`   |
| tag      | `glass-theme-v0.1.0` → `73e0593b`（annotated）                                                    |
| Release  | https://github.com/Nathan3303/nue-ui/releases/tag/glass-theme-v0.1.0                              |
| PRD      | `docs/prds/2026-10-25-glass-theme.md`（AC-01~17）                                                 |
| 技术方案 | `docs/reports/2026-10-25-T75-arch.md`                                                             |
| ADR      | `docs/adr/2026-10-25-glass-theme-tokens-degradation.md`                                           |
| 发布说明 | `docs/releases/glass-theme-0.1.0.md`                                                              |

## 任务分解（全部完成）

| 编号         | 任务                                                                                     | 角色          | 状态           |
| ------------ | ---------------------------------------------------------------------------------------- | ------------- | -------------- |
| T75-1        | 架构评审（含 D1–D12 裁定、A1–A11 断言口径）                                              | arch-designer | **done(full)** |
| T75-2        | 批 1：骨架 + tokens + 9 浮层                                                             | rd-fe         | **done(lite)** |
| T75-3        | 批 2：25 实底                                                                            | rd-fe         | **done(lite)** |
| T75-3b/c/d/e | 可访问性收口（F1/F2、继承债务、collapse 层级、placeholder opacity、700 档、destructive） | rd-fe         | **done(lite)** |
| T75-4        | 接线 + 发布配置 + lockfile 3 行                                                          | rd-infra      | **done(lite)** |
| T75-5        | 门禁测试（A1–A11 + 148 组矩阵 + 结构/体积）                                              | qa            | **done(full)** |
| T75-6        | push + 建 PR #76                                                                         | rd-infra      | **done(lite)** |
| T75-7        | CI 纳入 glass 构建（构建前移至 tests 前）                                                | rd-infra      | **done(lite)** |
| T75-8        | squash 合并                                                                              | rd-infra      | **done(lite)** |
| T75-9        | push master + tag                                                                        | rd-infra      | **done(lite)** |

## 最终门禁数字

- `35 文件 / 618 例 / 0 红`；CI pass 1m38s
- 矩阵 **148/148** · 退化态 **64/64** · A1–A11 全过
- 结构：backdrop **7** · 定义名 **424** = 418+6 · 悬空 **0** · 退化 **3×3** · imports **34** · glass 变量 **6** · dist **41** 文件
- 体积：dist **103,090 B** · gzip **13,172 B** · 单文件最大 **9,635 B**（余 365 B）

## 合并后固化的三条边界（勿当 bug 修）

1. **暗色深文本档由三级压到两级**（700/800/900 → ≈secondary / 800+）：玻璃最坏背景压窄对比带的必然结果
2. **`dist/global/variables.css` 距单文件上限仅 365 B**：新增全局 token 会先撞线，优先落组件层局部变量
3. **门禁测试读 `dist/`**：CI 中 glass 构建必须前置于 `Run tests`（`4846039a`）；若未来并行化 job，需让测试自建或改读 `src/`

## 未完成

| 项                  | 状态       | 阻塞原因                                                                                         |
| ------------------- | ---------- | ------------------------------------------------------------------------------------------------ |
| `npm publish 0.1.0` | **待执行** | `npm whoami` = 401 未登录；包名 `nue-ui-theme-glass` 已确认未被占用（备用 `nue-ui-theme-frost`） |

发布命令（凭据到位后）：

```bash
cd packages/themes/glass && npm publish
# 根目录跑 npm 会被 devEngines.packageManager=pnpm 拦（EBADDEVENGINES）
```

## 接续快照

- 代码侧已全部闭环：合并 + tag + GitHub Release；master 上本需求恰好 1 条提交、无 `wip()`。
- 唯一未完成：npm publish（等凭据）。完成后：关闭 Issue #75、`docs/tasks-state.md` 标记已交付。
- 环境坑备忘：
    - 根目录任何 `npm` 命令被 `devEngines` 拦 → 在 `packages/themes/glass` 内跑
    - 本机 `github.com:22` 超时 → `git -c core.sshCommand='ssh -p 443 -o HostName=ssh.github.com'`（一次性，勿落配置）
    - pnpm 11 每次跑脚本前会同步 lockfile → 跑完 `git status pnpm-lock.yaml`，脏了 `git checkout --`
    - `.vite-hooks/pre-commit` 的 `M` 是他人改动，全程未纳入任何提交