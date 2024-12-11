<template>
    <nue-container class="container-view" theme="vertical,inner">
        <nue-header>
            <template #logo>
                <nue-text size="var(--nue-ui-text-default)">
                    Container 布局容器
                </nue-text>
            </template>
        </nue-header>
        <nue-main>
            <nue-div align="center" style="padding: 16px">
                <nue-div class="wrapper">
                    <nue-container>
                        <nue-header>头部</nue-header>
                        <nue-main aside-width="140px" outline-width="140px">
                            <template #aside>左侧栏</template>
                            <template #content>
                                <nue-div style="padding: 16px">主内容</nue-div>
                            </template>
                            <template #outline>右侧栏</template>
                        </nue-main>
                        <nue-footer>底部</nue-footer>
                    </nue-container>
                </nue-div>
                <nue-div class="wrapper">
                    <nue-container theme="horizontal" type="flex">
                        <nue-header>头部</nue-header>
                        <nue-main aside-width="140px" outline-width="140px">
                            <template #aside>左侧栏</template>
                            <template #content>
                                <nue-div style="padding: 16px">主内容</nue-div>
                            </template>
                            <template #outline>右侧栏</template>
                        </nue-main>
                        <nue-footer>底部</nue-footer>
                    </nue-container>
                </nue-div>
                <nue-div class="wrapper">
                    <nue-container theme="horizontal">
                        <nue-main aside-width="140px" outline-width="140px">
                            <template #aside>左侧栏</template>
                            <nue-container>
                                <nue-header>头部</nue-header>
                                <nue-main>
                                    <template #content>
                                        <nue-div style="padding: 16px"
                                            >主内容
                                        </nue-div>
                                    </template>
                                    <template #outline>右侧栏</template>
                                </nue-main>
                                <nue-footer>底部</nue-footer>
                            </nue-container>
                        </nue-main>
                    </nue-container>
                </nue-div>
                <nue-div class="wrapper">
                    <nue-container theme="vertical" type="flex">
                        <nue-main aside-width="140px" outline-width="140px">
                            <nue-container>
                                <nue-header>头部</nue-header>
                                <nue-main>
                                    <template #aside>左侧栏</template>
                                    <template #content>
                                        <nue-div style="padding: 16px">
                                            主内容
                                        </nue-div>
                                    </template>
                                </nue-main>
                                <nue-footer>底部</nue-footer>
                            </nue-container>
                            <template #outline>右侧栏</template>
                        </nue-main>
                    </nue-container>
                </nue-div>
                <nue-div class="wrapper">
                    <nue-container theme="vertical" type="flex">
                        <nue-header>头部</nue-header>
                        <nue-main
                            aside-width="140px"
                            outline-width="140px"
                            responsive
                        >
                            <template #aside>左侧栏</template>
                            <template #content>
                                <nue-div style="padding: 16px">
                                    主内容
                                </nue-div>
                            </template>
                            <template #outline>右侧栏</template>
                        </nue-main>
                        <nue-footer>底部</nue-footer>
                    </nue-container>
                </nue-div>
            </nue-div>
        </nue-main>
    </nue-container>
</template>

<script lang="ts" setup></script>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 360px;
    overflow: hidden;

    .nue-container {
        color: var(--nue-ui-primary-color-800);

        & > .nue-header {
            background-color: #eefaf2;
        }

        & > .nue-main {
            background-color: #f0f5fc;

            &:deep(.nue-aside) {
                background-color: #f8edfa;
            }
        }

        & > .nue-footer {
            background-color: #fdf5ef;
        }
    }
}
</style>
