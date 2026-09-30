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

## 项目约定：上游同步资产与 Git 钩子

### 上游同步资产（`.agents/**`）以「原始未格式化」形态存储

`.agents/**` 是从上游（nao 协作舰队框架）逐字节同步的资产，**保持上游原始形态**，不随本仓格式化规则改写。

- 因此本仓完整 `vp check`（含 fmt）会**稳定报 3 个文件**的格式差异：
    1. `.agents/roles.yaml`
    2. `.agents/scripts/intercom-probe.mts`
    3. `packages/nue-ui-skill/bin/nue-ui-skill.mjs`
- ⛔ **不要为了通过 fmt 而去格式化前两个文件**（`.agents/roles.yaml`、`.agents/scripts/intercom-probe.mts`）——那会破坏「sha 与上游逐字节一致」的同步校验。同步完成后必须用 `sha256sum` 与上游同名文件逐字节对比。
- 判定口径：**前两个文件的格式差异不属缺陷**，是同步策略的有意结果；第三个文件（`packages/nue-ui-skill/bin/nue-ui-skill.mjs`）属**本仓自身**的格式债，可另单处理。

### Git 钩子职责划分

- `.vite-hooks/pre-commit`：只做 **staged 范围**的格式/lint（`pnpm run lint:lint-staged`）。
- `.vite-hooks/pre-push`：跑**全量测试**（`pnpm run test:run`）。
- 理由：提交要保持快（每次提交不必等全量测试），推送前把关（全量测试在进入远端前拦截）。
- 附注：staged 规则（`vite.config.ts` 的 `staged`）只匹配 `*.{js,jsx,ts,tsx,vue}` 与 `*.{json,css,scss,md}`，**不含 `.mts`/`.yaml`** ⇒ 这类文件不会被钩子归一化。这是**有意保留**的现状（理由同上：不改写上游同步资产）。