# 任务状态（接续快照）

> 重开会话先读本文件。更新时间：2026-10-25 → 2026-10-26（**v0.2.1 已发布 npm**）

## 当前：Glass v0.2.2 Frostline（重新设计 + 滚动契约）

| 项       | 内容                                                                                                                 |
| -------- | -------------------------------------------------------------------------------------------------------------------- |
| 包       | `nue-ui-theme-glass@0.2.2` — **已发布 npm**（`0.2.0` 因 description 元数据错误撤销、转 0.2.1；0.2.2 为滚动契约回归） |
| Issue    | [#81](https://github.com/Nathan3303/nue-ui/issues/81) CLOSED                                                         |
| PR       | [#82](https://github.com/Nathan3303/nue-ui/pull/82) MERGED（squash，8 提交 / 40 文件）                               |
| 合并提交 | `4b03151e`                                                                                                           |
| tag      | `glass-theme-v0.2.2` → `8a498519`（历史：`v0.2.1` → `84040e66`；`v0.2.0` 已删）                                      |
| Release  | https://github.com/Nathan3303/nue-ui/releases/tag/glass-theme-v0.2.2                                                 |
| 设计文档 | `docs/prds/2026-10-25-glass-v0.2-frostline.md`                                                                       |
| 发布说明 | `docs/releases/glass-theme-0.2.2.md`                                                                                 |
| 用户走查 | ✅ 通过（34 组件全套）                                                                                               |

### 设计系统（v0.1 → v0.2）

| 维度            | v0.1（Apple 临摹）         | **v0.2 Frostline**                          |
| --------------- | -------------------------- | ------------------------------------------- |
| 色相 / 主色饱和 | 211 / 90%                  | **192 / 38%**                               |
| 圆角            | 10px                       | **6px**                                     |
| 层次手段        | 多层阴影                   | **1px 描边 + 内高光**（阴影仅 `0 1px 2px`） |
| 玻璃            | `blur(20/180%)` α0.76·0.80 | **`blur(16/118%)`** α0.82·0.86              |
| 密度            | padding 1rem               | **0.875rem**                                |
| 标题字重        | 700–800                    | **500**（CJK 只有 400 的现实约束）          |

### 门禁（v0.2）

- `687 例 / 0 红`（36 文件）· 对比度 **254 组**（常规 184 + 退化 70；v0.1 是 148+64）
- 文本最紧 **4.738**（余量 0.238）· 非文本最紧 3.455
- A1–A11 零改动 · S1–S8 零放松（一处收紧）
- dist 106,181 B · gzip 13,414 B · 单文件 9,971 B（上限已调 12,000）

### v0.2 修掉的三个真缺陷（重写时算出，非设计推演）

1. `switch` 滑块 vs 轨道 **1.16:1**（v0.1 遗留，视觉上等于不存在）
2. `scroll-bar` 拇指玻璃面 **2.25:1**
3. 三处同源：**同一 token 在不同容器里对比度不同**（按实底算的，放进玻璃就失守）

根因：v0.1 矩阵只覆盖「对 `primary-0` 实底」，未覆盖「放进玻璃面」。

### 两笔 PM 授权的越界改动（留痕，不成为惯例）

1. `--nue-scroll-bar-thumb-bg` 600→700 / hover 700→800
2. `--nue-primary-color-700` 亮色 L 30%→29%（余量 0.04 → 0.238）

## 应用层（#85 / #88，已交付）

| 项  | 内容                                                                                                                                                                                                                                                                                                           |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| #85 | Playground 外壳优化 → PR [#89](https://github.com/Nathan3303/nue-ui/pull/89) MERGED（`326c2f8a`）：搜索（中英文 + `⌘K` + `Esc` + 空态）、aside 固定 240px + ≤900px 折叠、当前项高亮（沿用 `nue-link route` 的 `active-class`）、暗色 `aria-label`/`aria-pressed` + 持久化、header「30 个演示 · 版本 · GitHub」 |
| #88 | 滚动契约回归 → PR [#90](https://github.com/Nathan3303/nue-ui/pull/90) MERGED（`8a498519`）：**`.nue-content` 恢复为滚动容器**（`overflow: auto` + padding 10px）、`.nue-aside` 回 `auto`、`.nue-main` 补 **`min-height: 0`**；playground 外壳 `100vh`，页面不滚、header 固定                                   |

**#88 是行为反转**：0.2.x 曾把 content 改为 `visible`（为阴影完整），代价是 header/aside 跟着页面滚。0.2.2 把语义拿回来，用 padding 补视觉。消费方若做过「页面级滚动」适配，升级后会出现双层滚动条 —— 迁移表见 `docs/releases/glass-theme-0.2.2.md`。

**#85 的副产物**：撞出 6 项组件缺口 → [#86](https://github.com/Nathan3303/nue-ui/issues/86)（前两条为可访问性缺陷：`NueInput` 无法命名内部 input、clear 按钮键盘不可达）。

**#89 的静默回归（rebase 时发现并补回）**：合并后 `#PlaygroundAppContainer` 整块样式丢失，容器高度/底色靠主题默认值兜着；22/22 的 CDP 验收没发现——**门禁测的是行为，不是「某个样式块还在不在」**。

## 组件库缺陷治理（2026-10-27 全部收口）

用户授权「不打扰、完成即可、停在发布前一步」，按优先级顺序处理 4 个 issue。

| Issue   | 内容                                                                                     | 合并                                                                  |
| ------- | ---------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| **#91** | calendar 日期序列化：`toISOString()` 导致东八区差一天 + 非法输入 `RangeError`            | PR [#99](https://github.com/Nathan3303/nue-ui/pull/99) · `3057a7d6`   |
| **#95** | glass 暗色色阶五档撞底（`l80`–`l100` 全 10.0%）⇒ primary-0/100/200 同色                  | PR [#101](https://github.com/Nathan3303/nue-ui/pull/101) · `81d0074f` |
| **#94** | 同类可访问性：message 关闭键 · textarea `inputAttrs` · select/date-picker 清除按钮去嵌套 | PR [#102](https://github.com/Nathan3303/nue-ui/pull/102) · `ab2ad15a` |
| **#93** | CI 不检查 playground / hooks 类型                                                        | PR [#103](https://github.com/Nathan3303/nue-ui/pull/103) · `2995c0ff` |

### 关键决策与验证方式

- **#91 默认行为未改**：新增 `valueFormat: 'iso'（默认）| 'date'（推荐）| 'local-datetime'`。默认 `iso` 用**旧算式当 oracle 逐字符比对**证明零变化；跨 4 时区（UTC/上海/纽约/Kiritimati）41/41 绿。
- **#95 亮色端零变化**：8 个 `calc()` 亮色首项（99/97.5/96/94/92/89/86/81）逐条 grep 确认未动 ⇒ 数学上不可能变。暗色端改为 8/9.5/11/12.5/14/16/18/20.5（ΔL ≥1.5）。
- **#94 A1 视觉零变化**：清除按钮槽位**始终预留**（非「有值时加 padding」）⇒ 出现/消失对按钮尺寸贡献 **0px**，空值↔清除回空值 **Δ0.00px**。新增 `button button === 0` 回归锁。
- **#93 有失败演练**：临时 PR 注入 hooks 类型错误 ⇒ CI 红且日志指名 `packages/hooks/use-calendar/index.ts(245,14)`；演练产物已清理。emit 移到 `node_modules/.cache/tsc`（改前会往源码树写 339 个 `.d.ts`）。

### 待发布（版本已改，构建已完成）

| 包                      | 版本        | 类型                                             |
| ----------------------- | ----------- | ------------------------------------------------ |
| `nue-ui`                | **1.15.0**  | MINOR（`valueFormat` / `inputAttrs` / 结构改动） |
| `nue-ui-theme-glass`    | **0.2.4**   | PATCH（暗色色阶 + 清除按钮/message 样式）        |
| `nue-ui-theme-shadlike` | **0.13.30** | PATCH（清除按钮/message 样式）                   |

`core/dist` 410,743 B · glass 109,835 B · shadlike 104,468 B · lockfile 干净

### 仍 OPEN

- **#100**：`TZ=America/New_York` 下 date-picker 显示错一天（**master 上同样红**，既有）。hooks 的 tsconfig 部分已由 #93 顺带解决。

## 文档章节（已交付，无单独 Issue）

「主题」一章按**通用机制 / 主题个性**两层重构（master `28b7d7ce`）：

| 页面                      | 变化                                                          |
| ------------------------- | ------------------------------------------------------------- |
| `theme/shadlike.md`       | **新增**（对称 glass 的视觉语言页）                           |
| `theme/glass.md`          | 8 节 → 6 节（安装/深色/定制三节改为链接，消除与通用页的重复） |
| `theme/index.md`          | 重写为纯总览（选择表 + 导航），快速开始交给 install           |
| `theme/dark-mode.md`      | 修正写死的 `cos()` 实现，补两主题差异说明                     |
| `theme/customize.md`      | 换主色/密度/玻璃，两主题示例并列                              |
| `theme/components-css.md` | 路径改 `<theme-package>/dist/`，注明两主题结构一致            |
| `theme/install.md`        | 两主题并列 + 「先选主题再安装」指引                           |

**写作中查实并写进文档的关键事实**：shadlike 的 `--nue-brand-hue: 0` 看似红色，但 primary 色阶引用 `--nue-hsl-s0`（0% 饱和）⇒ **主色天然是灰的，改 hue 无效**，必须同时放开饱和阶梯。不写清楚会让人以为主题包坏了。

## 文档站（#83，已交付）

| 项    | 内容                                                                                      |
| ----- | ----------------------------------------------------------------------------------------- |
| Issue | [#83](https://github.com/Nathan3303/nue-ui/issues/83) CLOSED                              |
| PR    | [#84](https://github.com/Nathan3303/nue-ui/pull/84) MERGED（squash）· 合并提交 `d9ce2457` |
| 上线  | https://nathan3303.github.io/nue-ui/ （部署 ✅）                                          |

文档站现在支持 **glass / shadlike 二选一运行时切换**，默认仍是 shadlike（naotodo 仍在用，两者并列而非新旧关系）。

实现要点：主题 CSS 改为**静态资源 + 运行时 `<link>`**（原 `import '.../dist/index.css'` 会进 bundle、无法运行时移除）；切换时先 `querySelectorAll('link[data-nue-theme-css]').remove()` 再插入唯一新 link；`head` 内联引导脚本消除 FOUC；`scripts/sync-themes.mjs` 从 `dist/` 整棵复制；`verify-theme-switch.mjs` **14 项断言**接在 build 末尾。

## 历史：Glass v0.1.0（已发布 npm）

见 `docs/prds/2026-10-25-glass-theme.md` / `docs/releases/glass-theme-0.1.0.md`。三轮：主题包本体（#76）· backdrop-filter 阴影裁剪（#78）· content 裁剪 + 滚动职责契约（#80）。

## 未完成

| 项  | 状态 | 阻塞                                                                                                        |
| --- | ---- | ----------------------------------------------------------------------------------------------------------- |
| —   | 无   | 已发布 `0.2.1`（tarball 反查：hue 192 / radius 0.375rem / blur(16/118%) / Frostline description / 44 文件） |

发布命令：

```bash
# 登录/设 token 需在 /tmp 下（仓库根有 devEngines.packageManager=pnpm，npm 会被 EBADDEVENGINES 拦）
cd packages/themes/glass && npm publish
```

## 环境坑备忘

| 坑                                              | 应对                                                                                                                      |
| ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| 根目录任何 `npm` 命令被 `devEngines` 拦         | `env -C /tmp npm …`，或在包目录（有自己的 `package.json`）执行                                                            |
| 根 `.npmrc` registry 指向 npmmirror（只读镜像） | glass 包已加 `publishConfig.registry = npmjs`                                                                             |
| 本机 `github.com:22` 超时                       | `git -c core.sshCommand='ssh -p 443 -o HostName=ssh.github.com'`（一次性，勿落配置）                                      |
| `gh pr merge --delete-branch` 尾部本地清理失败  | 因他人 `M .vite-hooks/pre-commit`；改用 `git fetch <url> master:refs/remotes/origin/master` + `checkout master --ff-only` |
| pnpm 11 跑脚本前自动同步 lockfile               | 跑完 `git status pnpm-lock.yaml`，脏了 `git checkout --`                                                                  |
| 同 cwd 多会话并发 git                           | **index 是全局资源**，必须串行                                                                                            |
| `.vite-hooks/pre-commit` 的 `M`                 | 他人本地改动（`+ vp staged`），全程未纳入任何提交                                                                         |

## 后续可选

- playground 的 header/aside 加 `position: sticky`（v0.1 的 P1 改造后它们随页面滚动；用户未要求，搁置）
- 结构分离：外层承载 `backdrop-filter`、内层承载内容（彻底解决滤镜裁剪，需改组件 SFC）
- `variables.css` 9,971 B 距上限 12,000 已不多，审查新 token 需求