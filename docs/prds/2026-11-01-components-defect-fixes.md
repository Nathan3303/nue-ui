# PRD：组件缺陷三连修（NueLink href / NueAvatar error 复位 / NueSwitch 默认插槽）

- 状态：已定稿（2026-11-01 用户开工确认 · 验收中） · Owner：PM
- 更新：2026-11-01
- 指针：上游 Issue [#108](https://github.com/Nathan3303/nue-ui/issues/108) / [#109](https://github.com/Nathan3303/nue-ui/issues/109) / [#110](https://github.com/Nathan3303/nue-ui/issues/110) · 无 ADR · 基线 `packages/core@1.15.2`
- 优先级：Must（三单均为消费者可见缺陷，走 PATCH 1.15.3）

## TL;DR（≤5 行）

- **做什么**：修三处组件行为缺陷 —— `NueLink` 路由形态丢 `href`、`NueAvatar` 错误态不复位、`NueSwitch` 默认插槽被丢弃。
- **给谁**：使用 NueUI 的业务方（尤其 `nao-todo`，`NueLink` 路由形态被用作主导航/侧栏）、键盘与读屏用户。
- **成功标准**：三单各自 AC 全过，全量门禁从 774 例增至 792 例且全绿，无既有用例改动。
- **不做什么**：不动主题 CSS、不改 `href` 形态语义、不做组件 API 重构或新组件。

## 一、问题证据

- 三单均于 2026-11-01 由 1.15.2 真实挂载复现（`mount` + `html()`），非静态推断；PM 今日核对源码确认缺陷仍在 `master`：`link.vue` 恒绑 `:href="… : void 0"`、`avatar.vue` 的 `error` 无复位置位、`switch.vue` 只声明 `circle`/`text` 两个插槽。
- **5 Whys（#108）**：链接不可 Tab → `<a>` 无 `href` → `href=undefined` 经 `mergeProps` 覆盖 `RouterLink` 自算值 → 模板无条件绑定该属性 → 写模板时只覆盖了 `href` 形态，未验证路由形态的渲染结果。
- **5 Whys（#109）**：一次 404 后头像永久回不来 → `error` 置真后无复位路径 → 模板 `v-if="src && !error"` → 复位逻辑被遗漏 → 单测只覆盖「失败即回退」，未覆盖「换 `src` 后恢复」。
- **5 Whys（#110）**：文案静默消失 → 默认插槽未渲染 → 模板只开 `#circle`/`#text` → 未把「开关旁写文案」当作默认用法 → 缺少「未知插槽」的开发态兜底。

## 二、目标指标

- **北极星**：组件行为缺陷复发数（月度）。本批判定：三单归零，且闭环后同形态缺陷（同类插槽/状态/透传遗漏）在下一轮巡检中 0 新增。
- **过程指标**：用例数 774 → **792**（每单 6 条单测 + 1 条静态校验，QA 定稿 2026-11-01，新增差值恰 18）；核心包 PATCH 1.15.3 发布后 `nao-todo` 侧导航键盘可达性走查通过。
- **反指标**：为过门禁而放松既有断言 —— 出现即打回。

## 三、范围 / 非范围

- **范围 1（#108）**：`NueLink` 的 `route` 形态与 `to` 形态渲染出的链接元素具备可用 `href`、可聚焦可回车激活；`to` 不再以未声明属性形式落到 DOM；同一 PR 同步组件文档（`apps/document/tutorial/basic/link/index.md`：优先级、禁用态可聚焦性、`to` 属性、路由形态可达性说明）。
- **范围 2（#109）**：`NueAvatar` 在 `src` 变化时复位错误态并重试加载；`src` 置空时保持图标回退（首字母路径现状不可达，见 #117）。
- **范围 3（#110）**：`NueSwitch` 支持把默认插槽作为开关文案（等价 `show-text` + `slot#text`），并固化与 `#text` / 文案 prop 的优先级。
- **非范围**：主题包 CSS（三处均复用既有类名，理由：本条是行为缺陷，不是设计变更）。
- **非范围**：`href` 形态与 `<button>` 语义改造（理由：#108 的 `<button>` 备选未被采纳，保留超链接语义即可）。
- **非范围**：其它组件同类隐患的普查（理由：单独立项，避免批次蔓延；巡检发现另行建档）。
- **范围内附带（测试基础设施）**：root `devDependencies` 新增 `vue-router@^4.4.5`（QA 定稿接缝要求真实路由 resolve；纯测试依赖、零功能代码，随 #108 的 PR 落地）。

## 四、用户场景

- **画像**：A. 只用键盘的开发者/低视力用户；B. `nao-todo` 这类重导航应用的使用者；C. 头像来源会变的登录态用户。
- **场景卡（#108）**：Tab 走主菜单 → 焦点应落在每个导航项上 → Enter 跳转；右键「在新标签打开」应可用。
- **场景卡（#109）**：token 过期导致头像 404 → 重新登录后同一页面头像恢复显示，无需刷新或重建组件。
- **场景卡（#110）**：写 `<nue-switch>开启通知</nue-switch>` → 开关旁出现「开启通知」，与 `NueButton`/`NueCheckbox` 的写法一致。
- **关键路径**：挂载组件 → 触发状态变化（换 `src` / 键盘焦点 / 默认插槽）→ 断言渲染结果。
- **页面状态清单**：加载（无变化）/ 空（`src` 空值、无文案 → 只有开关本体）/ 错误（图片 404、非法路由）/ 成功（文案与 `href` 正常）。

## 五、业务规则

- **#108 规则**：`route`/`to` 形态的 `href` 必须等于目标路由解析值（`router.resolve(target).href`）；`href` prop 形态语义不变；三者互斥时以 `href` 为准并保留既有优先级；未声明属性（如 `to`）不得落到 DOM。
- **#109 规则**：错误态是「针对某个 `src`」的状态 —— `src` 实际变化即复位重试；同一 `src` 不重复重试（避免坏图抖动）；`src` 变空即回退。
- **#110 规则**：渲染条件 = `showText` 为真，或存在 `#text` 插槽，或存在默认插槽 ⇒ 渲染既有 `.nue-switch__text` 容器。
- **#110 文案优先级**：`#text` 插槽 > （仅当 `showText` 为真时的）`activeText`/`inactiveText` 状态文案 > 默认插槽；注意组件内 `text` 是 computed 而非 prop（本项目无 `text` prop）。
- **#110 空内容**：插槽仅为空串/空白且无状态文案时不渲染容器（不留空占位）。

## 六、NFRs

- **兼容性**：三单均为向后兼容的增量行为，不改既有 prop 语义与默认值 ⇒ PATCH 发布，无 major。
- **可访问性不回退**：`#110` 不得破坏既有 `role="switch"` / `tabindex` / Enter·Space 处理；`#108` 修复后焦点顺序不得新增可聚焦噪声。
- **构建与体积**：核心包 dist 体积增量 <1%（本批不加依赖、不加主题样式）。
- **不适用**：性能/并发/安全 —— 理由：改动均为单组件渲染与状态复位，无网络与数据面。

## 七、AC

- 验证接缝：三单均复用既有组件单测文件（`packages/components/{link,avatar,switch}/__tests__/*.test.ts`，jsdom `mount` 真实挂载），不新建接缝（**QA 已确认 2026-11-01**）；#108 必须装载**真实 `vue-router`**（`createRouter` + `createMemoryHistory` + `global.plugins`），禁用 `RouterLinkStub`。
- AC-108-1（主路径）：Given 装有 `vue-router` 的应用，When 挂载 `<nue-link route="/x">`，Then `a.getAttribute('href')` 非空且等于 `router.resolve('/x').href`。
- AC-108-2（异常）：Given `to` 形态，When 挂载 `<nue-link :to="{ name: 'y' }">`，Then DOM 上不出现 `to="[object Object]"`，且 `href` 可用。
- AC-108-3（边界）：Given `disabled` 为真，When 挂载路由形态，Then 链接不可聚焦（`tabindex="-1"` 或不参与 Tab），不产生可点击跳转，且 DOM 中不出现 `to="[object Object]"`。
- AC-108-4（负向闭环）：Given 修复后，When 断言 `focus()` 后 `document.activeElement === a` 且 `a.tabIndex >= 0`，Then 键盘可达性成立；`href` prop 形态渲染结果与修复前逐字符一致。
- AC-108-5（设计一致性）：Given 修复后，When 检查 `link.css`，Then 主题零改动（无新增类名/变量）。
- AC-109-1（主路径）：Given 挂载 `src="/a.png"` 并触发 `error`，When `setProps({ src: '/b.png' })`，Then `img` 重新存在且 `src === '/b.png'`。
- AC-109-2（异常）：Given `src` 为坏地址且未变化，When 再次渲染，Then 不重复发起加载（错误态保持，避免抖动）。
- AC-109-3（边界）：Given 已处于错误态，When `src` 被置为 `undefined`/空串，Then 保持图标回退且不抛错（首字母回退路径现状不可达，见 #117，不作本单判据）。
- AC-109-4（负向闭环）：Given 新 `src` 成功加载，When 触发 `load` 事件，Then 错误态清零且不重复 emit `error`。
- AC-109-5（设计一致性）：Given 复用既有 `.nue-avatar__icon` 回退路径，Then 主题零改动、不新增类名。
- AC-110-1（主路径）：Given 挂载 `<nue-switch>开启通知</nue-switch>`，When 渲染，Then 开关旁出现文案「开启通知」，文案容器类名为既有 `.nue-switch__text`。
- AC-110-2（异常）：Given 同时提供默认插槽与 `#text`，When 渲染，Then 仅渲染 `#text` 内容一次（无重复文案、无控制台报错）。
- AC-110-3（边界）：Given 默认插槽为空字符串或仅空白，When 渲染，Then 不渲染文案容器（不出现空占位）。
- AC-110-4（负向闭环）：Given 无任何插槽、仅 `showText` + `activeText`/`inactiveText`，When 渲染并切换 `modelValue`，Then 文案随状态变化且输出与修复前逐字符一致（既有用法零回归）。
- AC-110-5（设计一致性）：Given 修复后，When 检查 `role`/`tabindex`/键盘处理与主题 CSS，Then a11y 行为与样式零改动。

## 八、上线闭环

- 每单一条分支 `feat/<issue-id>-<slug>` + 一个 PR；Docs/台账（本 PRD、索引、`tasks-state`、QA 用例清单 `docs/reports/2026-11-01-C20261101-qa-cases.md`、收编后的 `.vite-hooks/pre-commit`）随**第一个** PR 一并进 `master`。
- PM 逐单核 AC 并在 PR 评论授权，RD 在 PR 上 `--squash` 合并；三条合并提交信息均用户可读、无 `wip()`。
- 三单合并后一次性发 `nue-ui 1.15.3`（PATCH），Release notes 落 `docs/releases/nue-ui-1.15.3.md`，逐条写用户可见行为变化与升级建议。
- 回滚：任一单出问题 `git revert <合并提交>` + 重发 PATCH；不删已发布 tag。

## 九、变更治理

- 三单为缺陷修复，走正式 PR 流程（Issue → 分支 → Draft PR → QA 门禁 → PM 验收 → squash）；无口头变更、无直落 `master`。
- Issue 与 `docs/` 不双源：Issue 已有细版现象/根因/验收判据，本 PRD 为权威正文，Issue 在**派发 / 验收 / 合并 / 发布**四个节点各留一条指针评论。
- 版本记录：`docs/releases/nue-ui-1.15.3.md` + `docs/prds/README.md` 索引行。
- 若修复过程中发现超出三单范围的真缺陷 ⇒ 停手、开新 Issue、回 PM 决定是否扩批（不得顺手扩范围）。

## 附录：战略筛子 / RICE 结论

- 战略筛子：三单全过（消费者可见缺陷 + 可访问性 + 静默失败，属「核心组件行为正确性」主线）。
- RICE（合并三单评估）：Reach 3（`NueLink` 影响主应用全部导航面，另两单影响所有使用该组件的页面）· Impact 2（可访问性与静默失败）· Confidence 0.9（根因与复现均已实测）· Effort 1.5 人日 ⇒ **RICE ≈ 5.6，MoSCoW: Must，Kano: Must-be**。
- 排序理由：#108 影响面最大且属可访问性合规，优先；#109/#110 紧随（均为单组件内部状态/渲染）。