<template>
    <demo title="默认主题">
        <nue-collapse v-model="activeNames1">
            <nue-collapse-item name="c1" title="NueUI 组件库描述">
                <nue-text size="var(--nue-text-sm)">
                    NueUI 是一个基于 Vue 的 UI
                    组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                    帮助开发者快速上手。
                </nue-text>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
    <demo title="菜单主题" sub-title="menu">
        <nue-collapse v-model="activeNames2" theme="menu">
            <nue-collapse-item name="c1" title="链接 A - C">
                <nue-link theme="route,actived">Link A</nue-link>
                <nue-link theme="route">Link B</nue-link>
                <nue-link theme="route">Link C</nue-link>
            </nue-collapse-item>
            <nue-collapse-item name="c2" title="链接 D - E">
                <nue-link theme="route">Link D</nue-link>
                <nue-link theme="route">Link E</nue-link>
            </nue-collapse-item>
        </nue-collapse>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { NueCollapse, NueCollapseItem, NueText, NueLink } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';

const activeNames1 = ref(['c1']);
const activeNames2 = ref(['c1', 'c2']);
</script>
