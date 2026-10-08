# AGENTS.md

Behavioral guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

**These guidelines are working if:** fewer unnecessary changes in diffs, fewer rewrites due to overcomplication, and clarifying questions come before implementation rather than after mistakes.

---

## 项目约定：nao 舰队机制与 Git 钩子

### nao 舰队机制（0.12.0 起为 pi 包形态）

nao 协作舰队机制（角色卡、闸门、脚本）**不再存于本仓副本**，由 pi 包 `npm:@nathan33/nao-skill` 提供；项目内只剩一个入口 shim。

- **版本唯一事实来源 = 入库的 `.pi/settings.json`**：其 `packages` 字段 pin 机制版本（当前 `npm:@nathan33/nao-skill@0.12.0`）。新机器 clone 后执行 `pi install -l --approve`，即按该 pin 物化机制；升级机制 = 改 pin 后重装依赖。
- **机制资产引用一律走 `$NAO_SKILLS` 前缀**（nao 机制包根），例如 `$NAO_SKILLS/.agents/scripts/qq-notify`、`$NAO_SKILLS/.agents/roles.yaml`。不要再把机制文件复制回项目内，也不要再引用仓内同名副本。
- **入口 shim**：迁移写入项目根机制目录下的 `scripts/nao-fleet.sh`，自行解析机制包根并原样转发；旧命令（`check` / `status` / `ensure <role>`）照常可用，勿手工编辑。
- ⛔ **不再为对齐 fmt 而格式化机制资产目录**：`vite.config.ts` 的 `fmt.ignorePatterns` 已把机制资产目录、`.codegraph/**`、`.pi/**` 整目录排除，本仓 fmt 只作用于业务代码与文档。
- ⚠️ **已退役的判据**：0.11.0 及更早要求「项目内机制文件与上游 `sha256sum` 逐字节一致 / 逐字节同步校验」，0.12.0 起该判据**作废**，机制正确性改由 **pin 版本**保证。实测订正：原「完整 `vp check` 稳定报 3 个文件」的说法不成立 —— 两个机制文件早已被 `fmt.ignorePatterns` 整目录排除，第三个（本仓自有 CLI 入口 `packages/nue-ui-skill/bin/nue-ui-skill.mjs`）已 fmt 干净。

### Git 钩子职责划分

- `.vite-hooks/pre-commit`：只做 **staged 范围**的格式/lint（`pnpm run lint:lint-staged`）。
- `.vite-hooks/pre-push`：跑**全量测试**（`pnpm run test:run`）。
- 理由：提交要保持快（每次提交不必等全量测试），推送前把关（全量测试在进入远端前拦截）。
- 附注：staged 规则（`vite.config.ts` 的 `staged`）只匹配 `*.{js,jsx,ts,tsx,vue}` 与 `*.{json,css,scss,md}`，**不含 `.mts`/`.yaml`** ⇒ 这类文件不会被钩子归一化。这是**有意保留**的现状（机制资产目录已由 `fmt.ignorePatterns` 整体排除，无需为此让步）。