# PRD：NueAvatar 的 alt 首字母回退生效（并订正 icon / 插槽优先级）

- 状态：待用户开工确认（2026-11-03） · Owner：PM
- 更新：2026-11-03
- 指针：上游 Issue [#117](https://github.com/Nathan3303/nue-ui/issues/117) · 无 ADR · 基线 `nue-ui@1.15.3`
- 成熟度：命中 @.agents/skills/pm-to-spec.md §一 第 1 条（2026-11-03 用户拍板方向 = A、优先级 = 图片 > icon > alt > 插槽 > logo）
- 优先级：Must（消费者可见缺陷 + 文档承诺未兑现）；版本 = MINOR `1.16.0`

## TL;DR（≤5 行）

- **做什么**：让 `NueAvatar` 的 `alt` 首字母在无默认插槽时也能回退，并把 `icon` / 插槽 / `logo` 的渲染优先级改成文档承诺的顺序。
- **给谁**：只用 `src` + `alt` 的业务方（登录态头像、通讯录）；依赖文档「优先级」一节的组件使用者。
- **成功标准**：`<nue-avatar :src="u" alt="李四">` 加载失败后渲染「李四」；优先级按 A 方案五档可测；全量门禁 792 → 798 全绿。
- **不做什么**：不改主题 CSS、不改 `alt` 作为 `<img alt>` 的既有语义、不做组件 API 新增或重构。

## 一、问题证据

- 现象（Issue #117 实测，1.15.2/1.15.3 真实挂载）：`mount(NueAvatar, { props: { src, alt: '李四' } })` 触发 `error` 后 `.nue-avatar__text` 不存在、`.nue-avatar__icon` 存在。
- 代码：`packages/components/avatar/avatar.vue` 把 `alt` 分支写在 `<slot v-else-if="$slots.default">` 的 fallback 内 ⇒ 无插槽时整段不可达。
- 附带缺陷（PM 2026-11-03 核源码）：同一模板结构下，传了默认插槽即忽略 `icon` prop，且 fallback 写死 `name="logo"` —— 与 `apps/document/tutorial/data/avatar/index.md:58` 声明的「图片 > icon > 默认插槽」相反。
- 附带缺陷 2：`alt` 存在时会顶替插槽内容，与文档「`alt` = 图片替代文本」的定位冲突。
- **5 Whys**：头像无图时不显示名字首字母 → `alt` 分支被插槽条件挡住 → fallback 写在了错误的层级 → 写模板时按「插槽 fallback」组织，没把「回退链」当成一个整体 → 缺少覆盖「无插槽 + 有 alt」的用例（既有 `avatar.test.ts` 未断言该组合）。
- 缺口中立记录：本条判为 #109 范围外，已在 Issue 单列跟踪，未混入 1.15.3 发布。

## 二、目标指标

- **北极星**：组件回退链缺陷复发数（月度）。本单闭环后，同类「回退分支被上游条件遮蔽」缺陷在下一轮巡检中 0 新增。
- **过程指标**：用例数 792 → **798**（`avatar.test.ts` +6，QA 定稿用例清单后锁死，不得低于 6）；`nao-todo` 侧「头像 404 显示姓名首字母」走查通过。
- **反指标**：为过门禁而放松既有断言，或保留与新规则矛盾的旧断言 —— 出现即打回。

## 三、范围 / 非范围

- **范围 1（回退链）**：`avatar.vue` 模板改为显式五档：图片（`src && !error`）→ `icon` prop → `alt` 首字母文本（`.nue-avatar__text`）→ 默认插槽 → `nue-icon name="logo"`。
- **范围 2（插槽 vs icon）**：`icon` prop 优先于默认插槽，兑现文档第 58 行；插槽内容不再被 `alt` 顶替。
- **范围 3（文档）**：`apps/document/tutorial/data/avatar/index.md` 的「图标」「文本」两节与「注意事项 1 优先级」，改写为 A 方案的五档表述；`alt` 属性说明补「无图/坏图时作首字母回退」。
- **范围 4（既有用例订正授权）**：`avatar.test.ts` A-03 现断言「有 `alt` 时仍渲染 `.nue-avatar__icon`」，与本单新规则矛盾 —— **允许在保持其余断言不变的前提下改这一条**（原文注释亦须随之删除）。
- **非范围**：主题包 CSS 与新增类名（理由：`.nue-avatar` 已设 `font-size: calc(height/2.5)`，`.nue-text` 用 `inherit`，现成样式足够）。
- **非范围**：`alt` 截取几个字符 / 中文取姓还是全名等取词策略（理由：Issue 未提，按整串 `alt` 原样渲染，取词规则另议）。
- **非范围**：其它组件同类「回退链被遮蔽」的普查（理由：单独立项，避免批次蔓延）。
- **非范围**：`NueAvatar` 新增 `fallback` 之类的新 prop（理由：本单是修既有回退链，加 API 属新特性）。

## 四、用户场景

- **画像**：A. 通讯录/登录态业务方，只有用户名与图片地址；B. 资源图会 404、希望优雅降级的移动端用户；C. 读屏用户（`alt` 语义不得变化）。
- **场景卡（主路径）**：`<nue-avatar :src="u" alt="李四" />` → 图片 404 → 头像位显示「李四」而不是通用 logo。
- **场景卡（显式图标）**：`<nue-avatar icon="location" :src="u" />` → 404 后仍显示 `location` 图标（用户显式指定优先于首字母）。
- **场景卡（插槽）**：`<nue-avatar :src="u">A</nue-avatar>` → 404 后显示 `A`；若同时给了 `alt`，按 A 方案仍显示插槽内容。
- **关键路径**：挂载 → 触发 `error`（或 `src` 置空）→ 断言实际渲染的那一档。
- **页面状态清单**：加载（有 `src`，未失败）/ 空（无 `src`、无 `icon`、无 `alt`、无插槽 → `logo`）/ 错误（图片 404 → 逐档回退）/ 成功（`src` 加载成功 → 只有 `img`）。

## 五、业务规则

- **回退链（不变量）**：同一时刻只渲染一档，顺序固定 = 图片 → `icon` → `alt` 首字母 → 默认插槽 → `logo`；任一档命中即停止。
- **`alt` 语义不变**：渲染 `img` 时非空 `alt` 逐字符写入 `<img alt>`（不 trim、不改写）；`alt` 为空串时落成 `alt=""`（装饰图语义），不参与首字母回退。
- **`alt` 触发条件**：`alt` 为**非空且非全空白**字符串才算命中，否则继续下探到插槽 / `logo`。
- **插槽条件**：命中判据 = `$slots.default` 存在（Vue 插槽语义）；「空插槽不产生空占位」由 `<slot>` 自身语义保证，**不单列用例**（已定 2026-11-03，门禁保持 798）。
- **错误态复位**：沿用 #109 规则（`src` 实际变化即复位重试，同一 `src` 不重复重试），本单不改。
- **`rounded` / `size` / `fit` / `theme`**：行为与类名零变化。

## 六、NFRs

- **兼容性**：`alt` 首字母回退属新增行为（此前不可达），不破坏既有 prop 语义；但「插槽与 `icon` 同时给出」时渲染结果会变 ⇒ 按 MINOR `1.16.0` 发布并在 Release 说明。
- **可访问性不回退**：`img` 上的 `alt` 保持原样；首字母文本为纯可见文本，不加 `aria-hidden`、不加 `role`。
- **构建与体积**：不加依赖、不加主题样式，核心包 dist 体积增量 <1%。
- **不适用**：性能 / 并发 / 安全 —— 理由：改动仅限单组件模板分支与文档，无网络与数据面。

## 七、AC

- 验证接缝：复用 `packages/components/avatar/__tests__/avatar.test.ts`（jsdom + `mount` 真实挂载），不新建接缝；**待 QA 确认（2026-11-03 派单时同步确认）**。
- AC-117-1（主路径）：Given 无默认插槽，When 挂载 `{ src: '/a.png', alt: '李四' }` 并触发 `error`，Then `.nue-avatar__text` 存在且文本为「李四」、`.nue-avatar__icon` 不存在。
- AC-117-2（异常）：Given 同时有 `icon` 与 `alt`，When 触发 `error`，Then 渲染 `icon` 指定的图标且 `.nue-avatar__text` 不存在。
- AC-117-3（边界）：Given `alt` 为空串或全空白且无 `icon`，When 无 `src` 渲染，Then 回退到默认插槽（有插槽）或 `logo` 图标（无插槽），不出现空文本节点。
- AC-117-4（负向闭环）：Given 有默认插槽且同时给 `alt`，When 触发 `error`，Then 渲染插槽内容、`alt` 不顶替插槽；且 `img` 渲染时 `alt` 仍原样写在 `<img alt>` 上。
- AC-117-5（设计一致性）：Given 修复后，When 检查 `packages/themes/**/avatar.css`，Then 主题零改动（无新增类名/变量），`size`/`fit`/`rounded` 输出与修复前逐字符一致。
- AC-117-6（文档一致性）：Given 修复后，When 读 `apps/document/tutorial/data/avatar/index.md`，Then「注意事项 1 优先级」「图标」「文本」三处表述与五档规则一致，`alt` 属性说明含首字母回退。

## 八、上线闭环

- **发布**：随 `1.16.0`（MINOR）一次性发布，Release notes 落 `docs/releases/nue-ui-1.16.0.md`，标题=裸版本号，正文首段写明「头像无图时可用 `alt` 显示姓名首字母」。
- **监控**：不适用：组件库无服务端埋点；以门禁用例 + 文档一致性作为回归闸门。
- **回滚**：若发布后发现回退链引发回归，`revert` 对应 squash 提交并发下一 PATCH；已发布 tag 不删除。
- **验收方式**：QA 用例清单 + 门禁精确数字 + PM 读变更文件核对 AC，异常才复跑。

## 九、变更治理

- **流程**：Issue #117（已开）→ 需求分支 `feat/117-avatar-alt-fallback` → PR（squash 合并，RD 执行）→ PM 验收授权 → tag `v1.16.0`。
- **文档随任务 PR**：本 PRD、`docs/prds/README.md` 索引、`docs/tasks-state.md`、`docs/releases/nue-ui-1.16.0.md` 均在本需求分支路径级提交，随同一条 PR 进 `master`；不为文档单开 PR。
- **附带治理**（本 PR 内由 PM 提交，不占 RD 改动）：`.gitignore` 增加 `.codegraph/`（本机索引产物，不应入库）；删除远端残留分支 `feat/119-readme-sync`（内容已随 PR #120 进 master）。
- **版本记录**：`packages/core` 版本号由发布提交统一改为 `1.16.0`；本 PRD 在验收后更新状态为「已交付」。