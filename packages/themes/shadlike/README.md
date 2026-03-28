# NueUI Theme Shadlike

NueUI Theme Shadlike 是 NueUI 组件库的 Shadcn-like 风格主题包，提供了一套现代化、简洁美观的样式主题。

## 包信息

- **名称**: `nue-ui-theme-shadlike`
- **版本**: `0.11.15`
- **描述**: A shadcn-like theme for NueUI
- **作者**: Nathan Lee
- **许可证**: MIT
- **类型**: Module
- **仓库**: [GitHub](https://github.com/Nathan3303/nue-ui.git)

## 功能特性

- 🎨 **Shadcn 风格** - 采用 shadcn/ui 的设计风格，简洁现代
- 🌓 **深色模式** - 内置深色模式支持，通过 CSS 变量实现
- 🎯 **语义化颜色** - 提供语义化的颜色系统（Primary、Success、Warning、Error）
- 📐 **响应式设计** - 完善的间距、圆角、阴影等设计系统
- 🚀 **性能优化** - 使用 PostCSS 进行样式优化和压缩
- 🔧 **高度可定制** - 通过 CSS 变量轻松定制主题

## 主题系统

### 颜色系统

#### Primary 颜色（主色调）

主色调使用红色系，提供从 0 到 1000 的 11 个色阶：

```css
--nue-primary-color-0    /* 最浅 */
--nue-primary-color-100
--nue-primary-color-200
--nue-primary-color-300
--nue-primary-color-400
--nue-primary-color-500  /* 中间色 */
--nue-primary-color-600
--nue-primary-color-700
--nue-primary-color-800
--nue-primary-color-900
--nue-primary-color-1000 /* 最深 */
```

#### Success 颜色（成功色）

成功色使用绿色系，提供从 0 到 100 的 11 个色阶：

```css
--nue-success-color-0    /* 最浅 */
--nue-success-color-10
--nue-success-color-20
--nue-success-color-30
--nue-success-color-40
--nue-success-color-50  /* 中间色 */
--nue-success-color-60
--nue-success-color-70
--nue-success-color-80
--nue-success-color-90
--nue-success-color-100 /* 最深 */
```

#### Warning 颜色（警告色）

警告色使用橙黄色系，提供从 0 到 100 的 11 个色阶：

```css
--nue-warning-color-0    /* 最浅 */
--nue-warning-color-10
--nue-warning-color-20
--nue-warning-color-30
--nue-warning-color-40
--nue-warning-color-50  /* 中间色 */
--nue-warning-color-60
--nue-warning-color-70
--nue-warning-color-80
--nue-warning-color-90
--nue-warning-color-100 /* 最深 */
```

#### Error 颜色（错误色）

错误色使用红色系，提供从 0 到 100 的 11 个色阶：

```css
--nue-error-color-0    /* 最浅 */
--nue-error-color-10
--nue-error-color-20
--nue-error-color-30
--nue-error-color-40
--nue-error-color-50  /* 中间色 */
--nue-error-color-60
--nue-error-color-70
--nue-error-color-80
--nue-error-color-90
--nue-error-color-100 /* 最深 */
```

### 语义化颜色

```css
--nue-link-color           /* 链接颜色 */
--nue-divider-color       /* 分割线颜色 */
--nue-border-color        /* 边框颜色 */
--nue-disabled-color      /* 禁用颜色 */
--nue-primary-text-color  /* 主文本颜色 */
--nue-secondary-text-color /* 次要文本颜色 */
```

### 排版系统

#### 字体大小

```css
--nue-text-xs   /* 0.75rem */
--nue-text-sm   /* 0.875rem */
--nue-text-df   /* 1rem (默认) */
--nue-text-md   /* 1.125rem */
--nue-text-lg   /* 1.25rem */
--nue-text-xl   /* 1.375rem */
--nue-text-2xl  /* 1.5rem */
--nue-text-3xl  /* 1.75rem */
```

#### 字体设置

```css
--nue-primary-font-size-base /* 16px */
--nue-primary-font-family   /* 'Noto Color Emoji', sans-serif */
--nue-primary-font-size     /* 1rem */
--nue-primary-font-weight   /* 400 */
--nue-primary-line-height   /* normal */
```

### 间距系统

#### Padding

```css
--nue-padding-xs /* 0.25rem */
--nue-padding-sm /* 0.5rem */
--nue-padding-df /* 0.75rem */
--nue-padding-lg /* 1rem */
--nue-primary-padding    /* 1rem */
--nue-secondary-padding  /* 0.5rem */
```

#### Gap

```css
--nue-gap-xs /* 0.25rem */
--nue-gap-sm /* 0.5rem */
--nue-gap-df /* 0.875rem */
--nue-gap-lg /* 1rem */
--nue-primary-gap    /* 1rem */
--nue-secondary-gap  /* 0.5rem */
```

### 其他设计令牌

```css
--nue-primary-radius       /* 0.375rem */
--nue-primary-shadow       /* 主阴影 */
--nue-secondary-shadow     /* 次要阴影 */
--nue-box-size-sm          /* 1.75rem */
--nue-box-size-df          /* 2.25rem */
--nue-box-size-lg          /* 2.75rem */
```

### 动画系统

```css
--nue-animation-duration-xshort /* 0.06s */
--nue-animation-duration-short  /* 0.18s */
--nue-animation-duration        /* 0.36s */
--nue-animation-duration-long   /* 0.54s */
--nue-animation-timing-function /* ease-in-out */
```

## 深色模式

主题内置深色模式支持，通过 `--nue-dark-switch` 变量控制：

```css
/* 浅色模式 */
:root {
    --nue-dark-switch: 0;
}

/* 深色模式 */
:root {
    --nue-dark-switch: 1;
}
```

深色模式会自动调整：

- 饱和度（S）
- 亮度（L）
- 阴影颜色
- 文本颜色

## 组件样式

主题为以下组件提供样式：

### 基础组件

- Avatar（头像）
- Badge（徽标）
- Breadcrumb（面包屑）
- Button（按钮）
- Button Group（按钮组）
- Checkbox（复选框）
- Collapse（折叠面板）
- Container（容器）
- Div（布局）
- Divider（分割线）
- Icon（图标）
- Link（链接）
- Text（文本）

### 数据展示

- Empty（空状态）
- Infinite Scroll（无限滚动）
- Marquee（跑马灯）
- Progress（进度条）

### 表单组件

- Date Picker（日期选择器）
- Input（输入框）
- Select（选择器）
- Switch（开关）
- Textarea（文本域）

### 反馈组件

- Confirm（确认框）
- Dialog（对话框）
- Drawer（抽屉）
- Message（消息提示）
- Prompt（输入框）
- Tooltip（文字提示）

### 导航组件

- Dropdown（下拉菜单）

### 其他

- Overlay（遮罩层）
- Popup Pool（弹出层池）

## 使用方式

### 安装

```bash
pnpm install nue-ui-theme-shadlike
```

### 引入样式

#### 全量引入

在项目的入口文件中引入完整主题样式：

```css
@import 'nue-ui-theme-shadlike/dist/index.css';
```

#### 按需引入

引入特定组件的样式：

```css
@import 'nue-ui-theme-shadlike/dist/components/button.css';
@import 'nue-ui-theme-shadlike/dist/components/dialog.css';
```

#### 引入全局样式

```css
@import 'nue-ui-theme-shadlike/dist/global/index.css';
```

### 自定义主题

通过覆盖 CSS 变量来自定义主题：

```css
:root {
    /* 修改主色调 */
    --nue-brand-hue: 210; /* 改为蓝色 */

    /* 修改圆角 */
    --nue-primary-radius: 0.5rem;

    /* 修改字体 */
    --nue-primary-font-family: 'Inter', sans-serif;
}
```

### 切换深色模式

```css
/* 切换到深色模式 */
:root {
    --nue-dark-switch: 1;
}

/* 切换到浅色模式 */
:root {
    --nue-dark-switch: 0;
}
```

或使用 JavaScript 动态切换：

```javascript
// 切换深色模式
document.documentElement.style.setProperty('--nue-dark-switch', '1');

// 切换浅色模式
document.documentElement.style.setProperty('--nue-dark-switch', '0');
```

## 构建命令

```bash
# 构建 CSS
pnpm build-css

# 清理构建目录
pnpm remove-dist

# 完整构建
pnpm build
```

## 构建输出

构建完成后，会在 `dist` 目录下生成以下文件：

```
dist/
├── index.css              # 主入口文件
├── global/                # 全局样式
│   ├── index.css
│   ├── animations.css
│   ├── html-reset.css
│   ├── scrollbar.css
│   └── variables.css
└── components/            # 组件样式
    ├── avatar.css
    ├── badge.css
    ├── breadcrumb.css
    ├── button.css
    ├── button-group.css
    ├── checkbox.css
    ├── collapse.css
    ├── confirm.css
    ├── container.css
    ├── date-picker.css
    ├── dialog.css
    ├── div.css
    ├── divider.css
    ├── drawer.css
    ├── dropdown.css
    ├── empty.css
    ├── icon.css
    ├── infinite-scroll.css
    ├── input.css
    ├── link.css
    ├── marquee.css
    ├── message.css
    ├── overlay.css
    ├── popup-pool.css
    ├── progress.css
    ├── prompt.css
    ├── select.css
    ├── switch.css
    ├── text.css
    ├── textarea.css
    └── tooltip.css
```

## 技术栈

- **PostCSS** - CSS 处理工具
- **PostCSS Nested** - 嵌套语法支持
- **CSSNano** - CSS 压缩和优化

## 设计原则

1. **一致性** - 统一的设计语言和视觉风格
2. **可访问性** - 良好的对比度和可读性
3. **响应式** - 适配不同屏幕尺寸
4. **性能** - 优化的 CSS，快速加载
5. **可定制** - 通过 CSS 变量轻松定制

## 注意事项

1. **样式引入**: 使用组件前必须先引入对应的样式文件
2. **变量覆盖**: 自定义主题时，建议在引入主题样式后覆盖变量
3. **深色模式**: 深色模式通过 CSS 变量实现，无需额外的样式文件
4. **浏览器兼容**: 支持现代浏览器，使用 CSS 相对颜色语法

## 相关链接

- [GitHub 仓库](https://github.com/Nathan3303/nue-ui)
- [在线文档](https://nathan3303.github.io/nue-ui/)
- [Shadcn UI](https://ui.shadcn.com/)
