<template>
    <demo title="Collapse 折叠面板">
        <nue-div>
            <nue-div style="padding: 4px 8px" theme="card">
                <nue-collapse v-model="activeNames1" accordion>
                    <nue-collapse-item name="c1" title="折叠面板 1">
                        <nue-text size="var(--nue-ui-text-sm)">
                            Nue UI 是一个基于 Vue 的 UI
                            组件库，它提供了丰富的组件，帮助开发者快速搭建项目，同时，它也提供了丰富的文档和社区支持，
                            帮助开发者快速上手。
                        </nue-text>
                    </nue-collapse-item>
                    <nue-collapse-item name="c2">
                        <template #header="{ collapse, state }">
                            <nue-button
                                :icon="`arrow-${state ? 'right' : 'down'}`"
                                style="--nue-button-vgap: 8px"
                                theme="pure"
                                @click="collapse"
                            >
                                折叠面板 2
                            </nue-button>
                        </template>
                        <nue-text size="var(--nue-ui-text-sm)">
                            提供丰富且易于使用的预构建组件，开发者可以快速地将其集成到项目中，
                            将更多的时间和精力放在业务逻辑的实现上，而不是花费大量时间在界面的搭建上。
                        </nue-text>
                    </nue-collapse-item>
                    <nue-collapse-item name="c3" title="折叠面板 3">
                    </nue-collapse-item>
                </nue-collapse>
            </nue-div>
            <nue-div style="padding: 4px 8px" theme="card">
                <nue-collapse v-model="activeNames2" theme="menu">
                    <nue-collapse-item name="c1" title="菜单 1">
                        <nue-link theme="rl,actived">链接 1</nue-link>
                        <nue-link theme="rl">链接 2</nue-link>
                    </nue-collapse-item>
                    <nue-collapse-item name="c2" title="菜单 2">
                        <nue-link theme="rl">链接 3</nue-link>
                    </nue-collapse-item>
                </nue-collapse>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import NueCollapse from '@nue-ui/components/collapse/collapse.vue';
import NueCollapseItem from '@nue-ui/components/collapse/collapse-item.vue';
import Demo from '../layouts/demo.vue';

const activeNames1 = ref(['c1', 'c2', 'c3']);
const activeNames2 = ref(['c1', 'c2', 'c3']);
</script>
