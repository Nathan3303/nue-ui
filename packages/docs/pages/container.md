<script setup>
import {ref} from 'vue'

const inputValue = ref('')
</script>
<style scoped>
    .nue-container {
        border: 1px solid #efefef;
        border-radius: 6px;
        box-shadow: 0px 0px 3px 1px rgba(0,0,0,0.1);
    }
</style>

# Container 布局容器

用于快速搭建常见的页面布局。

## 基础使用

通过组件 `NueContainer`、`NueHeader`、`NueMain` 以及 `NueFooter` 配合使用形成常见布局。

<nue-container height="512px">
    <nue-header>Header</nue-header>
    <nue-main aside-width="30%">
        <template #aside>Aside</template>
        <template #content>Content</template>
    </nue-main>
    <nue-footer>Footer</nue-footer>
</nue-container>

```vue
<template>
    <nue-container height="512px">
        <nue-header>Header</nue-header>
        <nue-main aside-width="30%">
            <template #aside>Aside</template>
            <template #content>Content</template>
        </nue-main>
        <nue-footer>Footer</nue-footer>
    </nue-container>
</template>
```

## 内部子组件

### 组件 `NueHeader`

`NueHeader` 组件为容器头部，默认高度为 `60px`，可以通过属性 `height` 设置高度，接收 CSS `height` 属性值类型。

组件拥有四个具名插槽，分别是 `logo`、`nav`、`default`、`ops` 以及 `user`，对应常见头部的 “网站Logo区域”、“导航链接区域”、“中间区域”、“搜索或操作按钮区域” 以及 “用户信息区域”。

::: raw
<nue-container>
    <nue-header height="72px">
        <template #logo>Logo</template>
        <template #nav>
            <nue-link>Link1</nue-link>
            <nue-link>Link2</nue-link>
            <nue-link>Link3</nue-link>
        </template>
        <template #ops>
            <nue-button theme="icon-only" icon="search" />
        </template>
        <template #user>
            <nue-avatar src="https://picsum.photos/id/237/200/200" shape="round"/>
        </template>
        <template #default>
            <nue-text>Default slot</nue-text>
        </template>
    </nue-header>
</nue-container>
:::

```vue
<template>
    <nue-container>
        <nue-header height="72px">
            <template #logo>Logo</template>
            <template #nav>
                <nue-link>Link1</nue-link>
                <nue-link>Link2</nue-link>
                <nue-link>Link3</nue-link>
            </template>
            <template #ops>
                <nue-button theme="icon-only" icon="search" />
            </template>
            <template #user>
                <nue-avatar
                    src="https://picsum.photos/id/237/200/200" 
                    shape="round"/>
            </template>
            <template #default>
                <nue-text>Default slot</nue-text>
            </template>
        </nue-header>
    </nue-container>
</template>
```

### 组件 `NueMain`

`NueMain` 组件为容器主体，高度根据 `NueHeader` 以及 `NueFooter` 组件的高度自动计算，

组件拥有两个具名插槽，分别是 `aside` 以及 `content`，对应常见主体的 “侧边栏区域” 以及 “内容区域”。

通过属性 `aside-width` 设置侧边栏宽度，接收 CSS `width` 属性值类型。

::: raw
<nue-container height="512px">
    <nue-main aside-width="30%">
        <template #aside>Aside</template>
        <template #content>Content</template>
    </nue-main>
</nue-container>
:::

```vue
<template>
    <nue-container height="512px">
        <nue-main aside-width="30%">
            <template #aside>Aside</template>
            <template #content>Content</template>
        </nue-main>
    </nue-container>
</template>
```

### 组件 `NueFooter`

`NueFooter` 组件为容器底部，默认高度为 `60px`，可以通过属性 `height` 设置高度，接收 CSS `height` 属性值类型。

组件拥有默认插槽。

::: raw
<nue-container>
    <nue-footer height="72px">
        <nue-text>Footer content</nue-text>
    </nue-footer>
</nue-container>
:::

```vue
<template>
    <nue-container>
        <nue-footer height="72px">
            <nue-text>Footer content</nue-text>
        </nue-footer>
    </nue-container>
</template>
```
