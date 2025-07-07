<template>
    <demo>
        <template #title>Container 布局容器</template>
        <template #default>
            <nue-container height="521px">
                <nue-header>头部</nue-header>
                <nue-main>
                    <nue-aside max-width="32%" min-width="8%" width="16%">左侧栏</nue-aside>
                    <nue-separator op-target="previous" />
                    <nue-content fill>主体</nue-content>
                    <nue-separator op-target="next" />
                    <nue-aside max-width="32%" min-width="8%" width="16%">右侧栏</nue-aside>
                </nue-main>
                <nue-footer>底部</nue-footer>
            </nue-container>
        </template>
    </demo>
</template>

<script lang="ts" setup>
import {
    NueContainer,
    NueHeader,
    NueMain,
    NueFooter,
    NueSeparator,
    NueAside,
    NueContent
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-header {
    background-color: #f8f0f0;
}

.nue-aside {
    background-color: #edf8ed;
}

.nue-content {
    background-color: #eaeaf5;
}

.nue-footer {
    background-color: #fbe5ff;
}
</style>
