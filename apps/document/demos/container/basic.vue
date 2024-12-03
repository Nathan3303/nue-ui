<template>
    <nue-div>
        <nue-container height="512px">
            <nue-header>
                <nue-div style="padding: 16px">容器头部</nue-div>
            </nue-header>
            <nue-main aside-width="140px" outline-width="140px">
                <template #aside>容器主体：侧栏</template>
                <template #content>
                    容器主体：内容
                    <nue-div align="center" justify="center" height="300px">
                        <nue-text size="12px" color="gray">
                            （垂直主题 - vertical）
                        </nue-text>
                    </nue-div>
                </template>
                <template #outline>容器主体：大纲</template>
            </nue-main>
            <nue-footer>容器底部</nue-footer>
        </nue-container>
        <nue-container height="512px" theme="horizontal">
            <nue-header width="60px">
                <nue-div style="padding: 16px">容器头部</nue-div>
            </nue-header>
            <nue-main aside-width="140px" outline-width="140px">
                <template #aside>容器主体：侧栏</template>
                <template #content>
                    容器主体：内容
                    <nue-div align="center" justify="center" height="420px">
                        <nue-text size="12px" color="gray">
                            （水平主题 - horizontal）
                        </nue-text>
                    </nue-div>
                </template>
                <template #outline>容器主体：大纲</template>
            </nue-main>
            <nue-footer width="60px">容器底部</nue-footer>
        </nue-container>
    </nue-div>
</template>

<style scoped>
    .nue-container {
        border: 1px solid var(--divider-color);
        border-radius: var(--primary-radius);
    }
</style>
