# Dropdown 下拉菜单

下拉菜单（Dropdown）是一种常见的交互组件，在页面中提供一个下拉菜单，用户可以从中选择某项操作或选项。

## 基础用法

通过标签 `<NueDropdown>` 创建一个基本的下拉菜单组件。

下拉菜单组件主体内部标签为 `<ul>`，每个下拉菜单选项为 `<li>` 标签，通过类名 `nue-dropdown-item` 应用基础样式。

### 触发按钮文本

通过属性 `trigger-text` 设置下拉菜单触发按钮中的文字。

::: preview
demo-preview=./basic.vue
:::

### 禁用状态

通过属性 `disabled` 设置下拉菜单组件的禁用状态。

::: preview
demo-preview=./disabled.vue
:::

### 大小

通过属性 `size` 设置下拉菜单组件的大小。属性可选值为 `small` 和 `large`。

::: preview
demo-preview=./size.vue
:::

### 菜单对齐方式

通过 `placement` 属性设置提示位置，可选值为
`[direction:top|bottom|left|right]-[alignment:start|center|end]`。其中 `direction` 表示提示框出现的位置，
`alignment` 表示提示框相对于触发元素的对齐方式。

::: preview
demo-preview=./placement.vue
:::

## 菜单选项事件处理

通过事件 `onExecute` 处理下拉菜单选项的点击事件。

通过给下拉菜单中的任意元素添加 `data-executeid` 属性来指定可执行选项的动作标识，并在 `execute` 事件所传递的
`id` 参数中获取该标识，根据标识执行对应的动作。

:::tip
在组件内部默认会为下拉菜单中的拥有 `nue-dropdown-option` 类名或标签为 `<li>`
的元素应用简单的下拉选项预设样式，若不希望应用对应样式可以采用其他元素或重写样式。
:::

::: preview
demo-preview=./execute.vue
:::

### 执行后关闭下拉菜单

通过属性 `close-when-executed` 设置下拉菜单在事件 `onExecute` 执行后自动收起。

::: preview
demo-preview=./close-when-executed.vue
:::

## 背景层穿透

默认情况下在下拉菜单打开时不允许同时点击其他元素，需要先将下拉菜单关闭。背景层穿透功能用于实现在菜单打开时同时可点击其他元素。

通过属性 `transparent` 启用背景层穿透。

::: preview
demo-preview=./transparent.vue
:::

## 自定义下拉菜单的触发元素

通过插槽 `#trigger` 自定义下拉菜单的触发元素。通过插槽传递出来的 `trigger` 方法来控制下拉菜单的显示与隐藏。

::: preview
demo-preview=./trigger-slot.vue
:::

## 自定义菜单头部与底部 <Badge text="1.8.53 以上版本" type="warning" />

通过插槽 `#header` 和 `#footer` 可以分别在菜单选项列表的顶部和底部插入自定义内容。

::: preview
demo-preview=./header-footer.vue
:::

## 下拉列表嵌套

::: preview
demo-preview=./nested.vue
:::

## 下拉菜单选项组件 <Badge text="1.1.14 以上版本" type="tip" />

通过标签 `<NueDropdownItem>` 创建下拉菜单中的选项。

选项组件支持更为丰富的属性和事件，满足更多的需求。

::: preview
demo-preview=./dropdown-item.vue
:::

### 选项组件属性

- `text`：选项的文字内容，通过默认插槽也可以指定选项内部的内容。
- `disabled`：是否禁用选项。
- `icon`：选项左侧的图标名称。
- `size`：选项的大小，可选值为 `small` 和 `large`。
- `loading`：是否显示加载状态。
- `loading-icon`：加载状态时显示的图标名称。
- `execute-id`：选项的执行标识，用于在事件处理中识别选项。
- `close-when-executed`：是否在执行后关闭下拉菜单（当下拉列表组件也设置了 `close-when-executed` 属性时，该属性无效，优先级低）。
- `useSuffixIcon`：是否在选项文字内容后添加状态标识图标，通常用于在列表嵌套时使用。

### 选项组件插槽

`#append` 选项内容的追加插槽，用于在选项文字内容后添加额外的元素，如状态标识图标

::: preview
demo-preview=./dropdown-item-append.vue
:::

## 注意事项

1. **触发方式**：`triggerType` 支持 `click` 和 `hover` 两种触发方式。
2. **执行标识**：通过 `executeId` 为每个选项设置唯一标识，在 `execute` 事件中获取并处理。
3. **分组管理**：`group` 属性可以用于分组管理多个下拉菜单。
4. **背景穿透**：`transparent` 属性启用后，下拉菜单打开时仍可与其他元素交互。

## 组件属性与事件

下方涵盖了 `NueDropdown` 和 `NueDropdownItem` 组件所有的可用属性与事件。

### NueDropdown 属性

| 属性                | Type                                            | 默认值         | 说明                           |
| ------------------- | ----------------------------------------------- | -------------- | ------------------------------ |
| `transparent`       | `boolean`                                       | `false`        | 背景层穿透                     |
| `teleportTo`        | `string`                                        | -              | 传送到指定 DOM 节点            |
| `text`              | `string`                                        | -              | 触发按钮文本                   |
| `triggerText`       | `string`                                        | -              | 触发按钮文本（备用）           |
| `disabled`          | `boolean`                                       | `false`        | 是否禁用                       |
| `triggerType`       | `'click' \| 'hover'`                            | `click`        | 触发方式                       |
| `size`              | `'small' \| 'large'`                            | -              | 尺寸                           |
| `placement`         | `string`                                        | `bottom-start` | 弹出位置                       |
| `closeWhenExecuted` | `boolean`                                       | `false`        | 执行后自动关闭（默认不关闭）   |
| `group`             | `string`                                        | -              | 分组ID，用于分组管理           |
| `beforeExecute`     | `() => void`                                    | -              | 执行前回调                     |
| `afterExecute`      | `() => void`                                    | -              | 执行后回调                     |
| `theme`             | `string \| string[] \| Record<string, boolean>` | -              | 主题样式（继承自 GlobalProps） |

### NueDropdown 事件

| 事件          | 参数            | 说明         |
| ------------- | --------------- | ------------ |
| `execute`     | `value: string` | 选项执行事件 |
| `open`        | -               | 打开事件     |
| `close`       | -               | 关闭事件     |
| `beforeOpen`  | -               | 打开前事件   |
| `afterOpen`   | -               | 打开后事件   |
| `beforeClose` | -               | 关闭前事件   |
| `afterClose`  | -               | 关闭后事件   |

### NueDropdownItem 属性

| 属性                | Type                                            | 默认值  | 说明                           |
| ------------------- | ----------------------------------------------- | ------- | ------------------------------ |
| `text`              | `string`                                        | -       | 选项文本                       |
| `disabled`          | `boolean`                                       | `false` | 是否禁用                       |
| `executeId`         | `string`                                        | -       | 执行标识                       |
| `size`              | `'small' \| 'large'`                            | -       | 尺寸（继承父级）               |
| `icon`              | `string`                                        | -       | 选项图标                       |
| `loading`           | `boolean`                                       | `false` | 加载状态                       |
| `loadingIcon`       | `string`                                        | -       | 加载图标                       |
| `closeWhenExecuted` | `boolean`                                       | -       | 执行后关闭（优先级高于父级）   |
| `useSuffixIcon`     | `boolean`                                       | `false` | 显示后缀图标（用于嵌套场景）   |
| `theme`             | `string \| string[] \| Record<string, boolean>` | -       | 主题样式（继承自 GlobalProps） |