# ADR：Glass 主题包的 token 体系、玻璃性能边界与退化机制

| 项       | 内容                                                                                                                   |
| -------- | ---------------------------------------------------------------------------------------------------------------------- |
| 日期     | 2026-10-25                                                                                                             |
| 状态     | **已接受**（PM 2026-10-25 批准 D1–D7，采纳记录见下方「PM 拍板记录」）                                                  |
| 关联     | Issue #75 · PRD `docs/prds/2026-10-25-glass-theme.md` · 评审报告 `docs/reports/2026-10-25-T75-arch.md`                 |
| 决策者   | arch-designer（技术签字）· PM（trade-off 批准）                                                                        |
| 影响范围 | `packages/themes/glass/**` 新增；`packages/themes/package.json`、根 `package.json`、`apps/playground/src/main.ts` 接线 |

## 背景

需要新增第二个主题包 `nue-ui-theme-glass@0.1.0`（Apple HIG 玻璃拟态，34 组件全量，亮/暗双套，浮层玻璃 + 数据区实底），且**不得修改任何组件 SFC/TS**。组件样式完全由主题包的 BEM 类名 + `--nue-*` CSS 变量提供，因此本决策是「变量契约内如何表达第二套视觉语言」的问题。

硬约束：AC-12（变量名集合 ⊇ shadlike）、R3（只允许 `--nue-dark-switch` 驱动翻转，禁 media query）、R5（玻璃效果由有限变量驱动）、R6（三条退化路径）、R7（对比度按最坏背景实算）。

## 决策

1. **tokens 复用 shadlike 的 `hue + HSL 阶梯 + --nue-dark-switch` 机制，不自建静态双套色阶。**
    - 原语层（`--nue-hsl-sN/lN/oN`、hue、`--nue-dark-switch`）逐字复用；`--nue-dark-prefix` 改写为 `calc(var(--nue-dark-switch) * 2 - 1)`，去掉 `cos()`。
    - 语义层同名重算：`--nue-brand-hue: 211`，primary 阶梯恢复饱和度；`600` 专用于实心填充、`700` 专用于文字；语义填充色**两模式固定不翻转**（翻转后白字仅 2.2–3.5:1）。
    - 组件层照 shadlike 复制后只改映射值。
    - **AC-12 双门禁**（PM 2026-10-25 裁定）：主门禁 = `global/variables.css` 定义名 ⊇ shadlike 同文件 **143** 名 + glass 新增 6 名（批 1 可绿）；组件层 = 对每个已存在组件文件断言 `defined(glass:file) ⊆ defined(shadlike:同文件) ∪ {`variables.css`已定义的 6 个`--nue-glass-*` 基元}`（glass 名只能覆盖、不得发明——A9 的 4 条嵌套覆盖必须写在组件文件里，故不能纯 `⊆`；批 2 自然扩到 34 文件 / 276 局部名）+ 全量引用悬空 0。实测总量 418 = 143 + 276 唯一名 − 1 同名交集。
2. **glass 全量禁用现代颜色/三角语法**：`hsl(from …)` / `color(from …)` / `cos()` 出现次数 = 0；alpha 用 legacy 4 参数 `hsl(h, s, l, a)`，派生用阶梯步进。
3. **玻璃基元 6 个 `--nue-glass-*`**（bg / blur / border / solid / scrim / shadow）；模糊只由 `--nue-glass-blur` 驱动，退化 = 单点覆写 3 个变量（blur→`none`、bg→`solid`、border→`border-color`）。
4. **`backdrop-filter` 只落在 7 个类名**（dialog / drawer / dropdown / tooltip / message-inner / confirm / prompt）；`overlay` 只做半透明遮罩（全视口模糊禁做），`popup-pool` 为 0×0 容器不参与。同叠加链 ≤1（4 条后代覆盖规则降级为实底）、同屏 ≤2、半径 20px（≤24）、saturate 180%（≤200）、禁模糊动画、`will-change` 0 处。
5. **overlay 入场动画改为只动 `background-color` 的 scrim 关键帧**，恒定 `opacity: 1`——否则祖先 `opacity<1` 会使子浮层成为 backdrop root，模糊延迟 240ms 才出现。
6. **产物上限**：`dist` ≤ 125,000 B、gzip ≤ 16,000 B、单文件 ≤ 10,000 B、文件数 = 41。
7. **接线最小化**：`packages/themes/package.json`（files/exports）+ 根 `package.json`（依赖/script/build 链）+ playground `main.ts` 单静态 import（另一行注释）；workspace / vitest / vite 配置零改动。

## 对照过的备选模式（含不采纳理由）

| 备选                                                                           | 不采纳理由                                                                                                                                                                                                                                       |
| ------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| glass 自建两套静态色阶（亮块 + 暗块）                                          | R3 禁止 media query 后，CSS 不存在「以数值自定义属性为条件切换整块声明」的语法。剩余触发手段只有属性选择器（需 JS/标记）或 `light-dark()`（需 `color-scheme`，等于第二套开关机制）。强行实现只能逐条 calc 或重复声明，等价于采纳方案的下位实现。 |
| `light-dark()` + `color-scheme` 作为唯一开关                                   | 与 `--nue-dark-switch` 形成双机制（R3/N5 明确禁止），消费方切暗要改两处。                                                                                                                                                                        |
| 独立命名空间（`--nue-glass-token-*` 全套）                                     | 直接违反 AC-12/R1（变量名不可改名/缺失）。                                                                                                                                                                                                       |
| 浮层玻璃 = 9 个元素都上 `backdrop-filter`（含全屏 overlay）                    | overlay 是 100vw×100vh，全视口模糊是最贵单帧开销；且它是 4 个面板的父层，父+子模糊构成嵌套 backdrop root 双重采样。改为 overlay 只做遮罩。                                                                                                       |
| 退化规则写进每个玻璃组件文件                                                   | 单点 token 覆写被放弃后，「置 blur=none 即全站无模糊」的充分性无法静态证明（AC-06/07 只能靠浏览器 E2E），且 M5 门禁成本上升。                                                                                                                    |
| 用 `@supports not ((backdrop-filter) or (-webkit-backdrop-filter))` 双前缀判据 | 双判据下 Safari ≤17 会走「支持」分支，而 `-webkit-` 前缀是否产出取决于未配置的 browserslist，出现「判支持但无模糊」的半吊子态；目标浏览器（Safari 18+）已支持无前缀，单一判据更一致。                                                            |
| 用 Playwright/浏览器模式证明退化生效                                           | jsdom 无 CSS 引擎，浏览器测试需新增工具链（NFR 禁止且与 N7 视觉回归排除冲突）；改为静态结构断言 + 退化态对比度实算，浏览器实渲染交人工走查。                                                                                                     |
| playground 用 `VITE_NUE_THEME` 动态 import 切换                                | 无 AC 要求运行时可切；动态 CSS import 的注入顺序不确定，会与 iconfont 抢层叠顺序；AC-11「切回不残留」用单静态 import 最好证明。                                                                                                                  |

## PM 拍板记录（2026-10-25）

| ID  | 决策点                                                                      | 结论                 |
| --- | --------------------------------------------------------------------------- | -------------------- |
| D1  | `overlay` 不施加模糊（模糊面 7 / 玻璃底 9）                                 | **采纳**             |
| D2  | `--nue-glass-*` 取 6 个（3 主 + 3 辅助）                                    | **采纳**             |
| D3  | `--nue-border-color`（功能性 ≥3:1）与 `--nue-divider-color`（装饰豁免）解耦 | **采纳**             |
| D4  | 追加第三条退化触发 `@media (prefers-contrast: more)`                        | **采纳** → PRD AC-17 |
| D5  | 退化单测 = 静态结构 + 退化态对比度实算，不引浏览器测试链                    | **采纳**             |
| D6  | `glass-theme build` 纳入根 `pnpm build`                                     | **采纳**             |
| D7  | AC-16 改为静态断言（现代语法 0 处，不依赖版本矩阵）                         | **采纳**             |

上表已同步回 PRD：`docs/prds/2026-10-25-glass-theme.md`（§五 R4/R5/R6 · §六 NFR · §七 AC-05~17 · 附录 B RK-7/8/9 · 附录 C）。

## 批 2 值级订正（D11，2026-10-25 终裁）

| #   | 订正                                                                                                                                                                                      | 裁定                                 | 理由（实测）                                                                                                                                                                                                                                                                          |
| --- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | primary 500/700/800/900/1000 用**字面 `90%` 饱和**，不用 `--nue-hsl-s90`                                                                                                                  | 接受                                 | 本 ADR 的数值体系本身写字面值；阶梯 s90 暗阶降 80% 会偏离，且品牌饱和度不应随明度衰减                                                                                                                                                                                                 |
| 2   | `--nue-secondary-text-color` 暗阶 **70% → 75%**                                                                                                                                           | 接受                                 | 700 暗阶对玻璃最坏 4.39–4.41 <4.5；新值 4.89 / 5.11                                                                                                                                                                                                                                   |
| 3   | `--nue-link-color` 值改为与次文本同值（30/75），`.nue-link` 直接使用该 token                                                                                                              | 接受（改 token，不做组件重映射）     | 避免留下「README 教消费方使用、暗色玻璃上仅 4.41」的陷阱 token；AC-12 只锁名字                                                                                                                                                                                                        |
| 4   | input/textarea 常驻边框由 `--nue-divider-color` 改为 `--nue-border-color`；placeholder 由 500 改次文本                                                                                    | 要求本批修                           | 玻璃表单透明底 ⇒ 边框是唯一识别线索（1.4.11）；placeholder 属正文（1.4.3 无豁免），原值 4.06/4.31                                                                                                                                                                                     |
| 5   | **文本透明度口径**：文本链路禁止以 `opacity < 1` 弱化（仅 `.disabled`/`--disabled`/`--loading` 豁免）；断言若解析到 opacity，必须按 `color × Πopacity` 先合成底色、再合成文字后计算对比度 | 要求本批修 + 写入 qa 采集规则（A11） | `textarea::placeholder { color: inherit; opacity: .36 }` 声明色 800 看似达标，合成后仅 **2.09（亮）/ 2.44（暗）**；`input` 走 token、`textarea` 走 opacity，属双机制漏网                                                                                                              |
| 6   | **`--nue-primary-color-700` 暗阶 70% → 75%**；`button--destructive` 文字 `error-80` → `error-100`（边框可留 `-80` 或同改）                                                                | 接受（改 token 值，不改组件映射）    | 「实底达标 ≠ 玻璃达标」：700 与 error-80 分别在 collapse/calendar/date-picker（可嵌 `.nue-dropdown` 玻璃）与 dialog 底部出现，玻璃最坏 **4.39** / **4.14·3.52**。上提后 700 = 4.89/5.09、error-100 = 6.15/4.81；700 在 glass 中仅作文字/图标色（9 处，无背景/边框用途），故无附带影响 |

**继承债务（RK-10）—— 已并入本批（T75-3b，PM 2026-10-25 裁定）**：checkbox 标签、breadcrumb 主色/链接、collapse--menu header/title、calendar 时间标签原与 shadlike 逐字同值（实底 3.63–4.31），因 glass 为新发主题、无兼容包袱，首发即清零。分级映射：header → 700（8.19/7.78）、title → 800（12.91/10.27）以保留层级；其余 → `--nue-secondary-text-color`（8.73/8.94）；`--nue-link-color` 值改 30/75（玻璃面 4.89/5.11）。仅 `.other-month`（附属日期）与 `.disabled`（1.4.3 禁用态）保留豁免，AC-08 无其它排除项。

## 后果

- **正面**：零组件源码改动；一套开关切双模式；退化可被 10 条静态断言证明；AC-16 不再依赖浏览器版本矩阵；产物体积有硬上限。
- **代价**：① 亮/暗玻璃 alpha 被迫取到 0.76/0.80（可读性优先，透明度只提供 24%/20% 透视）；② 语义实心填充在暗色偏暗（绿/黄不上调）；③ `--nue-glass-*` 从「三件套」扩到 6 个（R5 需措辞修订）；④ 装饰高光描边不满足 3:1（WCAG 1.4.11 豁免，但需在 README 说明）。
- **已识别残余风险**：`prefers-reduced-transparency` 仅 Chromium 生效（RK-8）→ **已由 D4 消解**（新增第三条 `@media (prefers-contrast: more)`，PRD AC-17）；语义色文字在玻璃上的可用步进很窄（须走 `l20` 单步）。
- **复审触发**：组件库新增组件（覆盖清单变化）；R5 变量数量再扩；目标浏览器口径变化（届时可重新评估启用 RCS）；`backdrop-filter` 性能在新引擎上有实质变化。

## 参考来源（访问日期 2026-10-25）

- MDN · `backdrop-filter`（backdrop root 清单）— https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter
- web.dev · Create OS-style backgrounds with `backdrop-filter` — https://web.dev/articles/backdrop-filter
- Chrome for Developers · Animating a blur — https://developer.chrome.com/blog/animated-blur
- Can I use · `prefers-reduced-transparency` — https://caniuse.com/wf-prefers-reduced-transparency
- MDN · `prefers-reduced-transparency` — https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/At-rules/@media/prefers-reduced-transparency
- web-features explorer · Relative colors（Baseline 2024-09-16）— https://web-platform-dx.github.io/web-features-explorer/features/relative-color/
- Can I use · CSS Relative color syntax — https://caniuse.com/css-relative-colors
- Apple HIG · Materials — https://developer.apple.com/design/human-interface-guidelines/materials
- Figma · Design Token Architecture — https://www.figma.com/resource-library/design-token-architecture/
- Material Design 3 · Design tokens — https://m3.material.io/foundations/design-tokens