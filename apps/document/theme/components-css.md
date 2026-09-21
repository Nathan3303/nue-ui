# 按需引入组件样式

主题包发布物 `dist/` 保留与源码同构的目录结构，可按需引入单个组件的样式。

## dist 产物结构

```
nue-ui-theme-shadlike/dist/
├── index.css                    # 全量聚合（@import global + components）
├── global/
│   ├── index.css                # 全局基线聚合（推荐先引这个）
│   ├── variables.css            # 设计 token
│   ├── animations.css           # 共享 keyframes
│   ├── html-reset.css           # HTML 基础样式
│   └── scrollbar.css            # 滚动条样式
└── components/
    ├── index.css                # 全部组件样式聚合
    └── <name>.css               # 单个组件样式
```

## 组件样式清单

`dist/components/` 现有 35 个文件（与组件库一一对应）：

| 分组 | 组件 css                                                                                                                                          |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| 基础 | `avatar` `badge` `button` `button-group` `div` `icon` `link` `text`                                                                               |
| 布局 | `container` `divider` `scroll-bar`                                                                                                                |
| 表单 | `calendar` `checkbox` `collapse` `date-picker` `input` `select` `switch` `textarea`                                                               |
| 反馈 | `confirm` `dialog` `drawer` `dropdown` `empty` `infinite-scroll` `marquee` `message` `overlay` `popup-pool` `progress` `prompt` `table` `tooltip` |

## 依赖说明

- 组件样式可能依赖其它组件的样式（弹层类如 `dialog`/`drawer`/`tooltip` 依赖 `overlay`、`container`、`text` 等）；
- 按需引入时若出现"部分样式缺失"，先补 `global/index.css`，再补依赖组件 css；
- 拿不准依赖关系时，直接全量 `import 'nue-ui-theme-shadlike/dist/index.css'`。

## 查组件级变量

每个组件 css 文件顶部有一段"变量默认值块"，集中声明该组件的可定制变量（`--nue-<组件>-<属性>`）。想微调某个组件时，先在这里找变量名，再到[定制主题](./customize.md)看覆盖方法。