<template>
    <demo>
        <template #title>Container 布局容器</template>
        <template #default>
            <nue-div class="wrapper">
                <nue-container type="flex">
                    <nue-header>头部</nue-header>
                    <nue-main>
                        <template #aside>左侧栏</template>
                        <template #content>主体</template>
                        <template #outline>右侧栏</template>
                    </nue-main>
                    <nue-footer>底部</nue-footer>
                </nue-container>
            </nue-div>
        </template>
    </demo>
</template>

<script lang="ts" setup>
import {
    NueContainer,
    NueHeader,
    NueMain,
    NueFooter,
    NueDiv
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.wrapper {
    height: 512px;
}

.nue-header {
    background-color: #f8f0f0;
}

.nue-main {
    &:deep(.nue-aside) {
        background-color: #edf8ed;
    }

    &:deep(.nue-main__content) {
        background-color: #eaeaf5;
    }
}

.nue-footer {
    background-color: #dcdada;
}
</style>
