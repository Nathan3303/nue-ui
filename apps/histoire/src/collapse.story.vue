<script lang="ts" setup>
import { ref } from 'vue';

const activeNames1 = ref(['c1']);
</script>

<template>
    <Story title="NueCollapse">
        <nue-collapse v-model="activeNames1" accordion>
            <nue-collapse-item name="c1" title="NueUI 组件库描述">
                <nue-text size="var(--nue-text-sm)">
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。NueUI
                    提供丰富且易于使用的预构建组件，开发者可以快速地将其集成到项目中，
                    将更多的时间和精力放在业务逻辑的实现上，而不是花费大量时间在界面的搭建上。
                </nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="c2">
                <template #header="{ collapse, state }">
                    <nue-button
                        :icon="`arrow-${state ? 'right' : 'down'}`"
                        theme="small"
                        @click="collapse"
                    >
                        HTML（超文本标记语言）介绍
                    </nue-button>
                </template>
                <nue-text size="var(--nue-text-sm)">
                    HTML（超文本标记语言——HyperText Markup Language）是构成 Web
                    世界的一砖一瓦。它定义了网页内容的含义和结构。除 HTML
                    以外的其他技术则通常用来描述一个网页的表现与展示效果（如
                    CSS），或功能与行为（如 JavaScript）。
                    “超文本”（hypertext）是指连接单个网站内或多个网站间的网页的链接。链接是网络的一个基本方面。只要将内容上传到互联网，并将其与他人创建的页面相链接，你就成为了万维网的积极参与者。
                </nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="c3" title="没有内容的折叠面板">
            </nue-collapse-item>
        </nue-collapse>
    </Story>
</template>

<style scoped></style>
