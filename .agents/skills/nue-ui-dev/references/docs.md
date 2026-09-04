# 组件文档约定（apps/document）

文档站是 VitePress + `@vitepress-demo-preview` 插件（demo 实时预览）。所有内容用**中文**写。先读一份完整页面再动笔，最佳范本：`apps/document/tutorial/basic/button/index.md`。

## 1. 文件在哪、怎么组织

```
apps/document/
├── .vitepress/config.mts      # 导航 + 侧边栏（新增页面必须来这里登记）
├── .vitepress/theme/index.ts  # app.use(NueUI) + 引入主题/图标 css + 注册 demo-preview
└── tutorial/
    ├── index.md               # 教程章节引入页
    ├── usage/{install,use,resolver}.md   # 安装/使用/自动导入（不动）
    ├── features/theme/        # 全局特性（theme 属性专题）
    ├── basic/                 # 基础组件：button/container/div/icon/link/text
    ├── data/                  # 数据展示：avatar/badge/collapse/empty/infinite-scroll/marquee/progress
    ├── form/                  # 表单：calendar/checkbox/date-picker/input/select/switch/textarea
    ├── feedback/              # 反馈：confirm/dialog/drawer/message/prompt/tooltip
    ├── navigation/            # 导航：dropdown
    └── others/                # 其他：divider/scroll-bar
└── enhance/                   # 进阶专题（enhance/dropdown/）
```

新组件按语义进对应类别目录；**文档站代码里 `<nue-xxx>` 直接可用**（theme/index.ts 已 `app.use(NueUI)`），demo 里无需手动 import。

## 2. 一个组件页面 = index.md + 多个 demo vue

目录结构（以 button 为例）：

```
tutorial/basic/button/
├── index.md         # 讲解 + 引用 demo + 属性/事件表
├── basic.vue        # 每个用法小节对应一个独立 demo 文件
├── icon.vue
├── size.vue
└── ...
```

demo 文件命名：kebab-case、表达用法（`basic.vue`、`loading-icon.vue`、`button-group-basic.vue`）。文件很小，只展示一个点：

```vue
<template>
    <nue-button>按钮 (Button)</nue-button>
</template>
```

## 3. index.md 结构模板

```markdown
# Button 按钮

常用的操作按钮组件。 ← 一句话定位

## 基础用法

通过组件标签 `NueButton` 声明一个按钮组件。

::: preview
demo-preview=./basic.vue
:::

### 设置禁用状态 ← 用法小节：先说人话，再上 demo

通过属性 `disabled` 使按钮处于禁用状态...

::: tip ← 提示块
某属性只在 xxx 场景下有意义。
:::

::: preview
demo-preview=./disabled.vue
:::

## 注意事项 ← 编号列表：无障碍/边界/陷阱

1. **无障碍性**：...
2. **加载状态**：当 `loading` 为 `true` 时按钮自动禁用...

## 组件属性与事件

### NueButton 属性 ← 表格与 types.ts 严格一致

| 属性          | 类型                                            | 默认值    | 说明                           |
| ------------- | ----------------------------------------------- | --------- | ------------------------------ |
| `icon`        | `string`                                        | -         | 按钮图标                       |
| `loadingIcon` | `string`                                        | `loading` | 加载图标                       |
| `theme`       | `string \| string[] \| Record<string, boolean>` | -         | 主题样式（继承自 GlobalProps） |

### NueButton 事件

| 事件    | 参数         | 说明     |
| ------- | ------------ | -------- |
| `click` | `MouseEvent` | 点击事件 |
```

规律：

- 标题 `# Xxx 中文名`；正文是"用法讲解 + demo 预览块 + 边界说明"，不是 API 流水账；
- 每个功能点一个 `##`/`###` 小节 + 一个 demo；
- 特殊版本说明可用 `<Badge text="1.8.53 以上版本" type="warning" />` 挂在标题旁；
- 末尾固定"组件属性与事件"两张大表（组组件再加子组件/分组表）；**属性/事件表就是 types.ts 的人肉镜像，改 types 必须同步改表**（默认值写 `-` 表示无）。

## 4. 登记侧边栏（必做）

`apps/document/.vitepress/config.mts` 的 `themeConfig.sidebar['/tutorial/']` 按分组维护组件列表。在对应分组 items 里插入：

```ts
{
    text: 'Xxx 中文名',
    link: '/tutorial/<类别>/<name>/index.md'
}
```

组顺序参考现有文件（基础/数据/反馈/表单/导航/其他）。漏掉这步页面在站内"无入口"，属于常见遗漏。

## 5. 文档与代码的同步义务

一个组件改动往往同时是文档改动：

- props/emits/默认值变了 → 更新表格（还有 demo 里若有旧用法要跟着改）；
- 行为/语义变化 → 在对应小节补说明或改 demo；
- 加了版本门槛 → 标题或表格旁加 `<Badge>`；
- demo 跑不起来的改动 → 本地上 `pnpm document dev` 逐页验证（demo 预览依赖浏览器渲染，纯构建未必能暴露）。

## 6. 常见坑

- 忘记在 config.mts 登记 sidebar（页面无入口）；
- 表格与 types.ts 不同步（review 时一眼假）；
- demo 里用了未注册/未 import 的组件（站内是全局注册的，demo 里直接 kebab 即可，但别 import 不存在的子路径）；
- `::: preview` 块格式错（必须 `demo-preview=./<file>.vue` 那行单独成行），错误会导致页面构建失败——写完跑一次 `pnpm document dev` 或 build 确认。