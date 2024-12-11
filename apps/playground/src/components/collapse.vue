<template>
    <demo title="Collapse 折叠面板">
        <nue-collapse v-model="activeNames" accordion>
            <nue-collapse-item name="c1" title="设计风格简洁现代">
                <nue-text>
                    组件以简洁现代的设计风格为主，提供了一个美观且统一的视觉体验。这种风格不仅适用于各种应用场景，还能确保用户界面的美观和一致性。
                </nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="c2">
                <template #header="{ collapse, state }">
                    <nue-button
                        :icon="`arrow-${state ? 'right' : 'down'}`"
                        theme="pure"
                        @click="collapse"
                    >
                        丰富且易于使用的组件
                    </nue-button>
                </template>
                <nue-text>
                    提供丰富且易于使用的预构建组件，开发者可以快速地将其集成到项目中，将更多的时间和精力放在业务逻辑的实现上，而不是花费大量时间在界面的搭建上。
                </nue-text>
            </nue-collapse-item>
            <nue-collapse-item name="c3" title="良好的文档和社区支持">
            </nue-collapse-item>
        </nue-collapse>
    </demo>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import Demo from '../layouts/demo.vue';

const activeNames = ref(['c1', 'c2', 'c3']);
</script>
