<template>
    <nue-div class="wrapper">
        <nue-container theme="horizontal">
            <nue-main aside-width="140px" outline-width="140px">
                <template #aside>侧栏</template>
                <nue-container
                    style="height: 100% !important"
                    theme="inner,vertical"
                >
                    <nue-header>头部</nue-header>
                    <nue-main>
                        <template #content>内容</template>
                        <template #outline>侧栏</template>
                    </nue-main>
                    <nue-footer>底部</nue-footer>
                </nue-container>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-divider-color);
    border-radius: var(--nue-primary-radius);
    height: 360px;
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
<script lang="ts" setup></script>
