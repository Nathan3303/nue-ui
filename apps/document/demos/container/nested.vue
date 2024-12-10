<template>
    <nue-div class="wrapper">
        <nue-container class="vp-raw">
            <nue-header>
                <nue-header>
                    <nue-div style="padding: 16px">头部</nue-div>
                </nue-header>
            </nue-header>
            <nue-main aside-width="140px" outline-width="140px">
                <template #aside>左侧栏</template>
                <template #content>
                    <nue-container theme="vertical,inner">
                        <nue-header>嵌套头部</nue-header>
                        <nue-main>
                            <nue-div style="padding: 16px">内容区域</nue-div>
                        </nue-main>
                        <nue-footer>嵌套底部</nue-footer>
                    </nue-container>
                </template>
                <template #outline>右侧栏</template>
            </nue-main>
            <nue-footer>底部</nue-footer>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 512px;
    overflow: hidden;

    .nue-container {
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
