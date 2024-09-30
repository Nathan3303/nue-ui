<template>
    <nue-div class="vp-raw">
        <!-- 使用具名插槽 -->
        <nue-container>
            <nue-header height="72px">
                <template #logo>
                    <nue-text size="24px">Logo</nue-text>
                </template>
                <template #navigators>
                    <nue-link theme="btnlike,actived">首页</nue-link>
                    <nue-link theme="btnlike">关于我们</nue-link>
                </template>
                <template #actions>
                    <nue-button theme="icon-only" icon="search" />
                </template>
                <template #user>
                    <nue-avatar
                        src="https://picsum.photos/id/237/200/200"
                        shape="round" />
                </template>
            </nue-header>
        </nue-container>
        <!-- 使用默认插槽 -->
        <nue-container>
            <nue-header height="72px">
                <nue-div
                    align="center"
                    justify="space-between"
                    style="padding: 16px">
                    <nue-div gap="32px" width="fit-content">
                        <nue-text size="24px">Logo</nue-text>
                        <nue-div width="fit-content">
                            <nue-link theme="btnlike,actived">首页</nue-link>
                            <nue-link theme="btnlike">关于我们</nue-link>
                        </nue-div>
                    </nue-div>
                    <nue-div gap="32px" width="fit-content">
                        <nue-button theme="icon-only" icon="search" />
                        <nue-div width="fit-content">
                            <nue-avatar
                                src="https://picsum.photos/id/237/200/200"
                                shape="round" />
                        </nue-div>
                    </nue-div>
                </nue-div>
            </nue-header>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);
}
</style>
