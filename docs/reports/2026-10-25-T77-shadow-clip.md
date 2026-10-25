# T77-1 架构裁定 · 玻璃面阴影裁剪（Issue #77）

> 角色：arch-designer · 批次：T77（glass 主题阴影裁剪缺陷）
> 输入：PM 已定位的两条裁剪源 + 实测证据（`padding 1rem` / `--nue-primary-shadow` 24px / `.nue-container` 及 4 个 flex 子项的 `overflow: hidden`）
> 约束：不改组件 SFC/TS；不新增全局 token（`variables.css` 仅剩 **365 B**）；改后仍须过 148 组对比度 + A1–A11 + 体积上限
> 结论口径：本报告给数值与判定规则，实现由 rd-fe 落，门禁由 qa 落。

---

## 一、结论：**两个裁剪源分开处理**（C1 用 padding + 阴影收敛，C2 只放 4 个 flex 包装层）

| 裁剪源                                               | 机制                                                                                                                                     | 处理                                                                                                             | 决策要点                                                                                                                                                  |
| ---------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **C1 · `backdrop-filter` 离屏纹理边界 = border-box** | 玻璃面板自身被渲染成纹理，**子元素**阴影越出 border-box 即丢                                                                             | ①收敛 24px 阴影（B1）②Class-1 面板 padding 16px → **20px**（1.25rem）                                            | padding 是唯一的「预算」；纹理边界在 CSS 层无法扩展（`overflow-clip-margin` 也不行，见 §六）                                                              |
| **C2 · `.nue-container` 的 `overflow: hidden`**      | 面板本体（dialog/drawer/confirm/prompt 都 `class` 合并到 `.nue-container`）及其 `> .nue-header / > .nue-main / > .nue-footer` 都裁子元素 | **只把 header/main/footer 三处改 `visible`**；`.nue-container` 自身与 `.nue-container--nested` **保留 `hidden`** | 关键事实：dialog footer 的 `padding` 为 0，**光加面板 padding 修不了 footer 里的按钮阴影**——必须先放掉 footer 的 `hidden`                                 |
| 不采纳                                               | `overflow: clip` + `overflow-clip-margin`                                                                                                | **否决**                                                                                                         | `overflow-clip-margin` 在 **Safari 完全不支持**（BCD：`safari: false`，WebKit bug 236153），且它只解决 C2、对 C1 纹理边界无效；用在滚动容器上还会禁用滚动 |

**一句话**：C2 是「容器把子元素阴影裁在包装层」，C1 是「面板把自己子元素的阴影裁在 border-box」。前者靠 `overflow: visible`，后者靠 padding 预算 + 阴影收敛。二者不能互相替代。

**体积账（净减少，不触 365 B 上限）**

| 改动                                                                       | 字节                                       |
| -------------------------------------------------------------------------- | ------------------------------------------ |
| `--nue-primary-shadow` 24px → 12px                                         | **+4**                                     |
| `--nue-glass-shadow` 4 层 → 3 层（64 → 32）                                | **−96**                                    |
| `dialog/confirm/prompt/drawer` padding `var(--nue-padding-df)` → `1.25rem` | **−15 × 3 + ≈ +30**（drawer 原无 padding） |
| container 3 处 `hidden` → `visible`                                        | **+6**                                     |
| **合计**                                                                   | **≈ −100 B**（`variables.css` 反而更小）   |

> 全程**只改既有名字的值**与 `overflow`/`padding` 声明，**不新增任何变量名** ⇒ D9/D10 双门禁（全局 149 / 组件层 `⊆ shadlike 同文件 ∪ 6 基元`）零影响。

---

## 二、Q1：7 个玻璃面各自的 padding（分类，不搞一刀切）

### 2.1 分类依据

判定「这个面需不需要 padding 预算」的唯一标准是：**它内部是否可能有「会画阴影」的直接子元素**。7 个面的实际构成（已核对源码）：

| 面         | 直接子元素                                                    | 是否有阴影子元素                   | 分类        |
| ---------- | ------------------------------------------------------------- | ---------------------------------- | ----------- |
| `dialog`   | `.nue-header/__main/__footer`（footer 里直接放 `nue-button`） | **有**（`--nue-secondary-shadow`） | **Class-1** |
| `confirm`  | `.nue-confirm__footer` 内直接放两个 `nue-button`              | **有**                             | **Class-1** |
| `prompt`   | footer 内 `nue-button`                                        | **有**                             | **Class-1** |
| `drawer`   | `> .nue-container`（本体无阴影，但 footer 按钮在 sheet 边缘） | **有（footer 按钮）**              | **Class-1** |
| `dropdown` | `.nue-dropdown-item` / `.nue-div--block`（均无 `box-shadow`） | 无                                 | Class-2     |
| `tooltip`  | `.nue-tooltip__text` / `__padding`（无阴影）                  | 无                                 | Class-2     |
| `message`  | `.nue-message-node-inner`（自身即面板，内部只有文本/图标）    | 无                                 | Class-2     |

### 2.2 定值

| 面                              | padding                                                     | 依据                                                                                                                                                                       |
| ------------------------------- | ----------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `dialog` / `confirm` / `prompt` | `var(--nue-padding-df)`（1rem/16px）→ **`1.25rem`（20px）** | 收敛后最大子阴影外溢 **16px**（`0 4px 12px`：12 + 偏移 4）＋ **4px 视觉余量** = 20px。留余量是因为纹理边界按 devicePixel 取整，0 slack 会在 2x/1.5x 屏上偶尔切出 1px 硬边  |
| `drawer`                        | **新增 `padding: 1.25rem`**                                 | 原为 0：panel 无 padding ⇒ footer 按钮的阴影 100% 被 C1 裁掉。sheet 内容内缩 20px 符合 HIG sheet 的内容留白，且 `box-sizing: border-box`（container 已设）不会改变外框尺寸 |
| `dropdown`                      | **不改**（`--nue-padding-2xs` = 4px）                       | 子元素（item/menu block）不画阴影；加 padding 会破坏列表紧凑度（PM 明确警告）                                                                                              |
| `tooltip`                       | **不改**（`calc(padding-sm/2) padding-sm`）                 | 无阴影子元素；`min-height` 2.25rem 的紧凑浮层                                                                                                                              |
| `message`                       | **不改**（`0 <vgap>`）                                      | toast 条，无阴影子元素                                                                                                                                                     |

> **规则（写进 README / qa 判据）**：`Class-1 面板的四面 padding 最小值 ≥ maxChildExtent + 4px`；`maxChildExtent` 由 §四 的解析规则从实际 `box-shadow` 值算出（当前 = **16px**）。反向约束：**Class-2 三类面的后代规则中不得出现 `box-shadow`**——将来若有人往 `dropdown` 里塞卡片/按钮，断言会立刻红，届时按 Class-1 提升 padding，而不是偷偷加豁免。

---

## 三、Q2：阴影收敛 —— **B1，且只需动 `--nue-primary-shadow` 一个 token**

### 3.1 先纠正一个前提（决定 B1/B2 的关键事实）

| token                                                                   | 谁在用（glass 全量实测）                                                                                                                   | 影响面                                 |
| ----------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------------- |
| `--nue-primary-shadow`（`0 1px 2px` + **`0 8px 24px`**，外溢 **32px**） | **只有** `input.css:20` / `textarea.css:32` 的 **focus 阴影**（`--nue-input-focus-shadow` / `--nue-textarea-focus-shadow`），shadlike 同构 | **2 个组件**，与 table/button **无关** |
| `--nue-secondary-shadow`（`0 1px 2px` + `0 4px 12px`，外溢 **16px**）   | button、button-group、checkbox、switch、input/textarea 常态、`.nue-div--card`                                                              | 6 类组件（观感敏感）                   |

⇒ PM 担心的「B1 会改变 table/button 观感」**不成立**：那个 24px 阴影只服务 input/textarea 的 focus。真正被 24px 撑爆的是「**dialog 里的输入框获得焦点**」这一场景。

### 3.2 B1 vs B2

| 方案                                     | 可行性                                                                                                                                                                                                                                              | 结论                                                                                                                                     |
| ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **B1 · 全局收敛 `--nue-primary-shadow`** | ✅ 一行，影响面仅 2 个 focus 场景                                                                                                                                                                                                                   | **采纳**：`0 1px 2px var(--nue-primary-shadow-color), 0 4px 12px var(--nue-secondary-shadow-color)`（24px → **12px**，外溢 32 → **16**） |
| B2 · 仅在玻璃面内覆盖                    | ❌ **被我们自己的门禁堵死**：D9/D10 规定组件文件只能定义 `defined(shadlike:同文件) ∪ 6 个 --nue-glass-*`，而 `--nue-primary-shadow` 在 shadlike 的 dialog/confirm/prompt/drawer.css 里**没有定义**；改用 `--nue-glass-*` 又违反 D2/D10「恰好 6 个」 | **否决**（不是偏好，是规则冲突）                                                                                                         |

**采用 B1 后的数字**

| 项                               | 值                            | 外溢半径                     |
| -------------------------------- | ----------------------------- | ---------------------------- |
| `--nue-secondary-shadow`（不变） | `0 1px 2px c, 0 4px 12px c`   | **16px**                     |
| `--nue-primary-shadow`（收敛）   | `0 1px 2px c1, 0 4px 12px c2` | **16px**                     |
| 结论                             | `maxChildExtent = 16px`       | padding 20 → **slack 4px** ✓ |

> 备选（未采纳）：把 focus 阴影改成 `0 0 0 3px` 焦点环。外溢只有 3px、字节更省，但 `--nue-primary-shadow-color` 的 alpha 0.5 叠白后对比度约 2.5:1，作焦点指示弱于 WCAG 2.2 SC 2.4.11 的 3:1 期望；现有「边框转 600（5.82/3.63）+ 柔和阴影」更稳。若 PM 后续想升级焦点样式，单独走一次评审。

---

## 四、Q3：AC 的机械断言口径（可执行，不靠人眼）

### 4.1 解析规则

1. **阴影外溢半径**：对每条声明 `box-shadow` 按顶层逗号切层（沿用现有 `splitTop` 思路），每层解析 `<offset-x> <offset-y> <blur> <spread>`（缺省 spread = 0）：
    - `inset` 层 → 外溢 **0**（不参与）；
    - 否则 `extent(axis) = blur + spread + |offset(axis)|`，取该层四向外溢的最大值；
    - 多层的 `extent` **取 max，不相加**。
2. **`maxChildExtent`**：对所有「可被任意嵌套进面板」的组件的 `box-shadow` 求 max，集合固定为 `{button, button-group, input, textarea, switch, checkbox, div.nue-div--card}`；`var()` 链必须解析到底（含 focus 变体：`--nue-input-focus-shadow`、`--nue-textarea-focus-shadow`）。
3. **padding 取值**：解析目标面板四个方向的 `padding`（含简写展开、`calc()` 求值），取 **最小值**。
4. **裁剪祖先**：解析 `overflow` / `overflow-x` / `overflow-y`，收集「在目标面板到阴影子元素之间」的包装层。

### 4.2 断言（qa 可直接照写；每条都能跑红）

| #   | 断言                                                                               | 期望                                                                                                  |
| --- | ---------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| S1  | `maxChildExtent`                                                                   | **= 16px**（`0 4px 12px`）。若有人把某个阴影放大，**这条先红**，而不是等视觉走查                      |
| S2  | Class-1 面板 `min(padding-*)`                                                      | `dialog/confirm/prompt/drawer ≥ 20px`，且 `≥ maxChildExtent + 4`                                      |
| S3  | Class-2 面板（`dropdown/tooltip/message`）后代规则的 `box-shadow` 声明数           | **0**（面板根自身的 `var(--nue-glass-shadow)` 不算后代）                                              |
| S4  | `container.css` 中 `> .nue-header` / `> .nue-main` / `> .nue-footer` 的 `overflow` | **`visible`**（3 条）                                                                                 |
| S5  | `.nue-container` 与 `.nue-container--nested` 的 `overflow`                         | **`hidden`**（保留兜底；`--nested` 为 360px 定高，必须保留）                                          |
| S6  | 允许出现 `overflow: auto` 的滚动容器                                               | 仅 `.nue-content` / `.nue-aside`（其内部子元素阴影被滚动边界裁 = 浏览器语义，**不属缺陷，不设阈值**） |
| S7  | `--nue-glass-shadow` 解析后最大外溢                                                | **≤ 48px**（当前目标值 44px）                                                                         |
| S8  | 禁止出现 `overflow: clip` / `overflow-clip-margin`                                 | **0 命中**（Safari 不支持，见 §六）                                                                   |

> S6 的意义：把「滚动区阴影被裁」显式排除，否则 qa 会把正常的滚动裁剪报成缺陷，或反过来为了它去放大 padding。

---

## 五、Q4：`--nue-glass-shadow` 要不要动 —— **要收**（4 层 → 3 层，最大 64px → 32px）

| 项       | 现值                             | 目标                             | 理由                                                                                                                                                                                                                                            |
| -------- | -------------------------------- | -------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 层数     | 4（inset 高光 + 3 层外阴影）     | **3**（inset 高光 + 2 层外阴影） | 24px 与 64px 两层视觉上几乎不可分辨，删掉远端那层不减质感                                                                                                                                                                                       |
| 最大外溢 | `0 24px 64px` → **88px**（下方） | `0 12px 32px` → **44px**         | ①paint 成本 ∝ 模糊面积×半径，外溢砍半 ≈ 光栅面积砍到 ~1/4；②浮层入场动画（transform/opacity）会逐帧重刷这层阴影；③`dialog--fullscreen` 的 `margin-top: 1.5rem`(24px) < 44px，仍会在视口边缘被裁，但裁切发生在屏幕边缘（视觉可接受），比 88px 好 |
| 字节     | 400 B                            | **304 B**                        | 解 365 B 上限的燃眉之急（净 −96 B）                                                                                                                                                                                                             |

**关于祖先裁剪（PM 问的第 4 点）**：`--nue-glass-shadow` 由面板自己绘制，**不受自身 `overflow` 与自身 `backdrop-filter` 裁剪**；会被「祖先」裁，实测祖先只有 `.nue-overlay`（100vw×100vh + `overflow:hidden`）⇒ 只在视口边缘裁，属正常。dropdown/tooltip/message 通过 `.nue-popup-pool`（0×0、无 `overflow`）挂载，同样不受祖先裁剪。**唯一残余**：消费方把浮层渲染在自定义 `overflow:hidden` 容器内（非 teleport）时会被裁——这是消费方用法问题，写进 README 的注意事项，不在主题内修。

---

## 六、Q5–Q8：`.nue-container` 系列 `overflow: hidden` 怎么处理（按「保守优先」）

### 6.1 Q5：`> .nue-header` / `> .nue-main` / `> .nue-footer` 能否改 `visible` → **能，改这 3 条**

| 检查项                                   | 结论                                                                                                                                                                                                       |
| ---------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 是否有 `border-radius`                   | **无**（PM 已核；本报告复核 `container.css:8-18` 无 radius）⇒ `hidden` 不是为了圆角裁切                                                                                                                    |
| 是否有 background                        | **无** ⇒ 不会因 `visible` 露底色                                                                                                                                                                           |
| 滚动由谁承担                             | `> .nue-main > .nue-aside { overflow: auto; overflow-x: hidden }`（container.css:76-77）与 `> .nue-main > .nue-content { overflow: auto }`（:100）；header/footer 不承担滚动 ⇒ 它们改 `visible` 不影响滚动 |
| flex 子项溢出风险                        | header 有固定 `height: 4rem`；改 `visible` 后溢出内容会画到面板 padding 区，**仍被 `.nue-container` 自身的 `hidden` 兜住**（见 6.2）⇒ 最坏情况与今天一致，只是多出 padding 区这一圈                        |
| `width: 100%` 子元素                     | 布局由 flex + `width/height` 决定，`overflow` 不参与尺寸计算 ⇒ 无布局位移                                                                                                                                  |
| `.nue-main` 是滚动区父级                 | 子级 `.nue-content` 自带 `overflow: auto`，其滚动条与 `overflow` 值无关 ⇒ 不受影响                                                                                                                         |
| `> .nue-main > .nue-aside` 那条 `hidden` | **实际是死声明**：被 :76 的 `overflow: auto` 覆盖。**不动它**（避免误伤滚动），只在报告中登记                                                                                                              |

**落地**：`.nue-header` / `.nue-main` / `.nue-footer` 三处 `overflow: hidden` → `visible`（**3 行**）；`.nue-aside` 那条保持原样。

### 6.2 Q6：`.nue-container` 自身 `overflow: hidden` 能否去掉 → **不能，保留**

| 理由            | 说明                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------- |
| 对 C1 无收益    | 面板本身是玻璃纹理，去不去掉都由纹理边界裁                                                                          |
| 对 C2 无必要    | 子元素阴影的预算由**面板 padding**（1.25rem）保证；容器自己那层 `hidden` 只是最后兜底                               |
| 去掉的真实代价  | 异常内容（不可断词长串、绝对定位装饰、第三方内嵌）会溢出到页面，属布局事故；shadlike 同构，改动会扩散到全部容器用户 |
| `--nested` 变体 | **必须保留**（360px 定高 + 内部横向滚动，去掉会让内容溢出容器）                                                     |

### 6.3 Q7：`overflow: clip` + `overflow-clip-margin` → **否决**

| 事实                   | 数据                                                                                                                                     |
| ---------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| `overflow: clip`       | Chrome/Edge **90**、Firefox **81**、Safari **16** ⇒ 目标「最近 2 版」够用                                                                |
| `overflow-clip-margin` | Chrome/Edge **90**（**partial**：仅当两轴都是 `clip`）、Firefox **102**、**Safari 完全不支持**（BCD `safari: false`，WebKit bug 236153） |
| 对 C1                  | **无效**：`backdrop-filter` 的纹理边界不是 CSS clip，`overflow-clip-margin` 扩不到纹理外                                                 |
| 对滚动容器             | **有害**：`overflow: clip` 不产生滚动容器，用在 `.nue-content`/`.nue-aside` 会**禁用滚动**                                               |
| 结论                   | Safari 缺口 + 只解决一半问题 + 有副作用 ⇒ **不引入**（与 AC-16「不引入超出目标浏览器的语法」同一原则）                                   |

### 6.4 Q8：总体取向 → **保守优先，符合 PM 的裁定**

- 只动「确证多余且有收益」的 3 条包装层规则 + 4 个面板 padding（+阴影 token 值）；
- 容器本体与 `--nested` 一律不动；
- 不引入 `overflow: clip`；
- 全部改动无新增变量名、不改选择器结构，`vp fmt` 与 A1–A11 不受影响（阴影/overflow 不参与任何对比度断言）。

---

## 七、改动清单（rd-fe 照此落地，共 9 处）

| #   | 文件                       | 改动                                                                                                               | 字节 |
| --- | -------------------------- | ------------------------------------------------------------------------------------------------------------------ | ---- |
| 1   | `global/variables.css`     | `--nue-primary-shadow` → `0 1px 2px var(--nue-primary-shadow-color), 0 4px 12px var(--nue-secondary-shadow-color)` | +4   |
| 2   | `global/variables.css`     | `--nue-glass-shadow` 删 `0 8px 24px` 层，末层 `0 24px 64px` → `0 12px 32px`，次层 `0 1px 2px` → `0 2px 6px`        | −96  |
| 3   | `components/dialog.css`    | `padding: var(--nue-padding-df)` → `1.25rem`                                                                       | −15  |
| 4   | `components/confirm.css`   | 同上                                                                                                               | −15  |
| 5   | `components/prompt.css`    | 同上                                                                                                               | −15  |
| 6   | `components/drawer.css`    | 面板新增 `padding: 1.25rem`                                                                                        | +30  |
| 7-9 | `components/container.css` | `> .nue-header` / `> .nue-main` / `> .nue-footer` 的 `overflow: hidden` → `visible`（`.nue-aside` 那行不动）       | +6   |

**不做**：`.nue-container` 本体、`--nested`、`overflow: clip`、任何新 token、任何组件 SFC/TS。

---

## 八、验收与回填

| 项                         | 结论                                                                                                                                                    |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| AC-03 原「阴影不被裁」口径 | 替换为 **S1–S8 八条机械断言**（§四），qa 静态解析即可判定                                                                                               |
| 对比度门禁（148 组）       | **零影响**：阴影/overflow/padding 不参与颜色配对                                                                                                        |
| A1–A11                     | **零影响**：不新增/改名 token，不触碰退化块                                                                                                             |
| 体积                       | 净 **≈ −100 B**（`variables.css` 400 → 304 的 glass-shadow 是主要贡献）                                                                                 |
| 视觉变化（需 PM 走查确认） | ①dialog/confirm/prompt 内边距 16 → 20px；②drawer 首次有 20px 内边距；③input/textarea focus 光晕 24 → 12px；④浮层投影最远 64 → 32px                      |
| 残余风险                   | R1：消费方非 teleport 渲染浮层时仍可能被自有 `overflow:hidden` 裁（文档说明）；R2：`.nue-aside` 上的 `overflow:hidden` 是死声明，本轮不动，登记为清理项 |
| 复审触发                   | 若将来允许 `dropdown/message/tooltip` 内嵌卡片/按钮 → S3 变红 → 按 Class-1 提升 padding（与新契约一起评审）                                             |

---

## 九、参考来源（访问日期 2026-10-25）

| #   | 来源                                                                                                                                                                                  | 用于支撑              |
| --- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------- |
| 1   | MDN BCD · `overflow-clip-margin`（Chrome 90 partial / Firefox 102 / **Safari false**）— https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow-clip-margin.json | §6.3 否决依据         |
| 2   | MDN BCD · `overflow`（`clip`：Chrome 90 / Firefox 81 / Safari 16；`visible`/`hidden` 全支持）— https://github.com/mdn/browser-compat-data/blob/main/css/properties/overflow.json      | §6.1、§6.3            |
| 3   | MDN · `box-shadow`（blur/spread/inset 语义）— https://developer.mozilla.org/en-US/docs/Web/CSS/box-shadow                                                                             | §四 extent 解析规则   |
| 4   | MDN · `backdrop-filter`（backdrop root / 描边采样的离屏纹理语义）— https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/backdrop-filter                              | §一 C1 机制           |
| 5   | CSS Overflow 3 · `overflow-clip-margin` 规范（clip 边界的唯一扩展手段）— https://drafts.csswg.org/css-overflow/#overflow-clip-margin                                                  | §6.3                  |
| 6   | 本仓实证：`container.css:17/31/76-77/100/128`、`dialog.css:15/81/92`、`variables.css:211-214/266`、PM 实测（padding 1rem vs 24px 阴影）                                               | §二、§三、§五全部数值 |