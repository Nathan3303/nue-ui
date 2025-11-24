<template>
    <demo title="Container 布局容器">
        <nue-container height="360px">
            <nue-header>头部</nue-header>
            <nue-main>
                <nue-aside max-width="32%" min-width="128px" width="128px">左侧栏</nue-aside>
                <nue-separator op-target="previous" />
                <nue-content fill>
                    <nue-div style="padding: 1rem">主体</nue-div>
                </nue-content>
                <nue-separator op-target="next" />
                <nue-aside max-width="32%" min-width="128px" width="128px">右侧栏</nue-aside>
            </nue-main>
            <nue-footer>底部</nue-footer>
        </nue-container>
        <nue-div height="1rem"></nue-div>
        <nue-container height="360px" style="flex-direction: row">
            <nue-container style="width: 128px; flex: none">
                <nue-header>头部</nue-header>
                <nue-main>
                    <nue-div style="padding: 1rem">侧边栏</nue-div>
                </nue-main>
            </nue-container>
            <nue-separator op-target="previous" />
            <nue-container>
                <nue-header>头部</nue-header>
                <nue-main>
                    <nue-content fill>
                        <nue-div style="padding: 1rem">主体</nue-div>
                    </nue-content>
                </nue-main>
                <nue-footer>底部</nue-footer>
            </nue-container>
        </nue-container>
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
    NueContent,
    NueDiv
} from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-header,
.nue-main,
.nue-footer {
    color: var(--nue-primary-text-color);
    background-color: var(--nue-primary-color-100);
}
</style>
