# 任务状态（接续快照）

> 重开会话先读本文件。更新时间：2026-10-25（T75-2 验收后） · 批次：Glass 主题包 v0.1.0

## 当前批次

| 项       | 内容                                                                                              |
| -------- | ------------------------------------------------------------------------------------------------- |
| 需求     | 新增 `nue-ui-theme-glass@0.1.0`（Apple HIG 玻璃拟态 · C 端官网/落地页 · 34 组件全量 · 亮/暗双套） |
| Issue    | [#75](https://github.com/Nathan3303/nue-ui/issues/75)                                             |
| PRD      | `docs/prds/2026-10-25-glass-theme.md`（AC-01~17，已 fmt）                                         |
| 技术方案 | `docs/reports/2026-10-25-T75-arch.md`                                                             |
| ADR      | `docs/adr/2026-10-25-glass-theme-tokens-degradation.md`                                           |
| 需求分支 | `feat/75-glass-theme`（已创建，commit `08bba553` wip 批 1，未 push）                              |
| 基线     | `master`@`bb5c3901`；工作区 `M .vite-hooks/pre-commit` 属他人改动，**勿动勿提交**                 |

## 任务分解

| 编号   | 任务                                                             | 角色          | 状态                                                                 | 依赖      |
| ------ | ---------------------------------------------------------------- | ------------- | -------------------------------------------------------------------- | --------- |
| T75-1  | 架构评审                                                         | arch-designer | **done(full)** · 已结项                                              | —         |
| T75-2  | 批 1：骨架 + tokens + 9 浮层                                     | rd-fe         | **done(lite)** · PM 验收通过                                         | T75-1 ✅  |
| T75-3  | 批 2：25 个实底组件                                              | rd-fe         | **done(lite)** · PM 验收通过（`7c45c176`）· 3 处值级偏离 arch 已终裁 | T75-2 ✅  |
| T75-3b | 可访问性收口：F1/F2 + 继承债务 6 处 + link token 值修正          | rd-fe         | **done(lite)**（`473a2af5`）· 打回 1 处 + 追加                       | T75-3 ✅  |
| T75-3c | collapse 层级对调 + textarea placeholder opacity + 12px 计数文字 | rd-fe         | **进行中**（已派发）                                                 | T75-3b ✅ |
| T75-4  | 接线 + 发布配置（3 文件 + lockfile 3 行）                        | rd-infra      | **done(lite)** · PM 验收通过（`a7671c94`）                           | T75-2 ✅  |
| T75-5  | 门禁：对比度/悬空/退化/现代语法                                  | qa            | 待派发                                                               | T75-3     |

## T75-2 验收核对（PM 独立复核，非复跑 worker 门禁）

| 项                       | 回执                     | PM 复核                                                                                 | 结论         |
| ------------------------ | ------------------------ | --------------------------------------------------------------------------------------- | ------------ |
| 7 类名 `backdrop-filter` | 各 1 条                  | dist 逐文件 grep：7 个组件各 1 条；`variables.css` 那 1 处是 `@supports not` 条件非声明 | ✅           |
| overlay / popup-pool     | 0 / 0                    | 确认 0                                                                                  | ✅           |
| 悬空变量                 | 0                        | 定义名 220 = 143 + 71 + 6；两个 shadlike 悬空名未继承                                   | ✅           |
| 现代语法                 | 0                        | `hsl(from`/`color(from`/`cos(`/`sin(`/`tan(`/`oklch(`/`will-change` 全 0                | ✅           |
| 6 个 glass token         | —                        | `bg/blur/border/solid/scrim/shadow` 齐全                                                | ✅           |
| 三条退化块               | 各 3 条、位于基值后      | 逐条确认同构                                                                            | ✅           |
| 同链 ≤1                  | 4 条后代覆盖             | dialog/drawer/confirm/prompt 各 1 条（blur=none + bg=solid）                            | ✅           |
| RK-7                     | overlay scrim 关键帧     | `glass-scrim-in/out` 只动 background-color，基规则 `opacity: 1`                         | ✅           |
| message transition       | 已收窄                   | `margin-top, opacity`，不含 backdrop-filter                                             | ✅           |
| dist 体积                | 39,398 B / gzip 5,305 B  | 上限 125,000 / 16,000                                                                   | ✅           |
| 单文件最大               | 9,609 B（variables.css） | 上限 10,000 —— **余量仅 391 B**                                                         | ⚠️ 批 2 注意 |

## 关键口径（派发/验收都用这些数字）

- AC-05：`dist` 中 `backdrop-filter` 声明 = **7 条**；blur ≤24px、saturate ≤200%
- AC-08：非文本仅覆盖功能性边框与语义配对；divider 与 glass-border 豁免；受测配对 ≥80
- AC-10：引用未定义 = **0**；`--nue-glass-*` = 6 个
- AC-12（D9+D10）：主门禁 149（143+6）；组件层 `defined ⊆ defined(shadlike:同文件) ∪ {^--nue-glass-*}` 且 ∈ 6 基元白名单；批 1 = 9 文件 / 定义名 220；批 2 = 34 文件 / 276 名；全 src 418 = 143+276−1
- AC-15：`dist` ≤ 125,000 B · gzip ≤ 16,000 B · 单文件 ≤ 10,000 B · 文件数 41
- AC-16：现代语法 + `will-change` + 模糊动画 = 0；⚠️ **断言必须用跨行正则**（`hsl\s*\(\s*from` / `color\s*\(\s*from`）——rd-fe 实测 button.css **6** 处 + link.css **7** 处共 **13** 处均为跨行写法，单行 `hsl(from` 会全部漏掉（假绿灯）
- 退化断言：A1 = **3 块**；覆写合计 **9 条**（每块 3 条）
- RK-7：overlay 入场只动 `background-color`、恒定 `opacity: 1`

## 批 2 交接注意（T75-3）

1. 25 个实底组件照 shadlike 复制后改映射值；`--nue-text-font-style`（shadlike 悬空引用，仅 `text.css:14`）**直接删掉该声明**（`font-style` 是继承属性，删除即等价 inherit）——**不要**「补定义」（新名非 `--nue-glass-` 前缀会撞 AC-10）；若必须保留声明则写 `inherit`，**不要**写 `normal`（会覆盖父级 italic 场景）。
2. `variables.css` 已 9,609 B / 上限 10,000 B：批 2 **不新增任何全局 token**，组件局部名全部落组件文件。
3. select / date-picker 自身 `backdrop-filter` 必须为 0（浮层由 dropdown.css 承担）。
4. 批 2 结束才判 AC-12 全量：预期定义名 **424** = 418（shadlike 全部）+ 6，局部名 **275** 个已核对齐全。

## 批 2 验收核对（PM 独立复核）

| 项                      | 回执                                   | PM 复核                                                                    | 结论 |
| ----------------------- | -------------------------------------- | -------------------------------------------------------------------------- | ---- |
| 定义名                  | 424                                    | 精确计算 shadlike 418 ↔ glass 424：缺 **0**，多出恰好 6 个 `--nue-glass-*` | ✅   |
| `backdrop-filter`       | 7                                      | 34 文件中仍为 7（select/date-picker 各 0）                                 | ✅   |
| 悬空 / RCS              | 0 / 0                                  | 跨行正则 `rg -U` 复核 0                                                    | ✅   |
| `--nue-text-font-style` | 删除声明                               | glass/text.css 无 `font-style`；icon.css 的 `normal` 是 shadlike 原有      | ✅   |
| imports                 | 34                                     | `rg -c` = 34                                                               | ✅   |
| 体积                    | 102,997 / 13,191 / 41 文件 / max 9,591 | 逐项在上限内                                                               | ✅   |

## 批 2 三处值级偏离（arch 2026-10-25 终裁：全部接受）

| #   | 改动                                           | 裁定                                                                                              |
| --- | ---------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| 1   | primary 500/700/800/900/1000 用字面 `90%` 饱和 | **接受**（arch §3.3.1 本就写字面 90%，用阶梯才是偏离）                                            |
| 2   | `--nue-secondary-text-color` = 亮 30% / 暗 75% | **接受**（700 暗阶 4.39–4.41 < 4.5；新值 4.89/5.11）                                              |
| 3a  | `.nue-link` 改走次文本                         | **接受但改写法**：改 `--nue-link-color` 的值本身（30/75），组件直接用该 token，禁组件层偷偷重映射 |
| 3b  | dropdown empty/loading/menu 标题 → 次文本      | **接受**（500 最坏 2.28 暗 / 4.06 亮）                                                            |

## 批 2 追加修（arch 判定：否则 AC-08 假绿）

| ID    | 问题                                                                                         | 实测 → 目标                   | 状态                            |
| ----- | -------------------------------------------------------------------------------------------- | ----------------------------- | ------------------------------- |
| F1    | input/textarea 常驻边框用 `--nue-divider-color`（玻璃表单 bg 透明，边框是唯一识别线索）      | **1.33 / 1.56 → 6.06 / 7.49** | rd-fe 修中                      |
| F2    | placeholder 用 `primary-500`                                                                 | **4.06 / 4.31 → 8.73 / 8.94** | rd-fe 修中                      |
| RK-10 | 继承债务 6 处（checkbox 标签 / breadcrumb 600+link / collapse title+header / calendar 时间） | 4.06/4.31、5.82/**3.63** 等   | **PM 拍板本批清**（不另立批次） |

## T75-3b 打回 / 追加（2026-10-25）

| #   | 问题                                                                                                                  | 处理                                                                      |
| --- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------- |
| ①   | collapse 层级**做反**：rd-fe 做成 header=800 / title=secondary，arch 表是 header=700 / title=800（title 强于 header） | 打回对调                                                                  |
| ②   | `textarea::placeholder { color: inherit; opacity: 0.36 }` 是 F2 漏网机制，合成对比度估算 **≈2.31:1**                  | 改次文本 + `opacity: 1`；并让 arch 补「opacity<1 文本按合成色算」断言口径 |
| ③   | 12px 计数/提示文字（`.word-counter`、textarea 底栏）仍 primary-500（4.06/4.31）                                       | 按「12–14px 无豁免」改次文本                                              |
| ④   | 全量扫描「文本上的 `opacity < 1`」                                                                                    | 先要清单再决定，不自扩范围                                                |

保留不动（已同意）：breadcrumb 分隔符、collapse 菜单图标、checkbox 图标（非文本图形 ≥3:1）。

## 接续快照

- 已完成：PRD → 开工确认 → Issue #75 → arch 评审 `done(full)` + D1-D10 拍板 → 批 1 实现并**验收通过**（`08bba553`，23 文件，lockfile 18 行干净 importer）。
- 进行中：T75-3c（collapse 层级对调 / textarea placeholder opacity 0.36 / 12px 计数文字 / opacity 扫描清单）。
- 下一步：T75-3c 回执 → 派 T75-5（qa，arch ≈108 条矩阵 + opacity 合成口径）→ PM 终验 → RD squash 合并 → tag + npm publish。
- 环境：`nao-fleet.sh check` OK；`gh` 已认证；`docs/` 已 fmt 干净（`vp fmt --list-different docs/` = 0）。
- 坑：共享工作树里 `pnpm exec` 会触发整仓 install（registry 漂移 454 行）——统一走 `node_modules/.bin/…`。