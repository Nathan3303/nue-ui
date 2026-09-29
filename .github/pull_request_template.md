## 需求

- 关联任务 / Issue：<编号或链接；无则写「无」>
- 需求 / 设计说明：<链接或「无」>

## 用户可见变化

<!-- 一句话，用户可读；将作为 squash 提交的标题主体 -->

## 变更点

- <行为变化 1>
- <行为变化 2>

## 门禁（全量精确数字）

<!-- 本仓 CI「Test, build and deploy documentation」在 PR 上执行：pnpm test:run / pnpm core build / pnpm shadlike-theme build / pnpm iconfont build / pnpm document build（部署 job 仅 master push 触发） -->

- `pnpm test:run` → exit=<n> · 用例：<通过>/<总数>
- `pnpm build`（= core + shadlike-theme + iconfont） → exit=<n>
- `pnpm document build` → exit=<n>
- `pnpm check:lf` → exit=<n>（改动发布物 / 发布前必跑）

## 验收 / 预览

- 预览：本地 `pnpm document dev`（本仓无 PR 预览环境；文档站仅在 master push 时部署）
- PM 验收：<待验收 / 通过（日期）>

## 风险 / 回滚

- <风险 + 应对；无则写「无」>