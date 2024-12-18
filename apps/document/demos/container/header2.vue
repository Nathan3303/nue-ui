<template>
    <nue-div class="vp-raw">
        <nue-container>
            <nue-header>
                <nue-div align="center" justify="space-between">
                    <nue-div align="center" gap="32px" width="fit-content">
                        <nue-text size="24px">Logo</nue-text>
                        <nue-div gap="4px" width="fit-content">
                            <nue-link theme="btnlike,actived">首页</nue-link>
                            <nue-link theme="btnlike">关于我们</nue-link>
                        </nue-div>
                    </nue-div>
                    <nue-div gap="32px" width="fit-content">
                        <nue-button icon="search" theme="icon-only" />
                        <nue-div width="fit-content">
                            <nue-avatar
                                shape="round"
                                src="https://picsum.photos/id/237/200/200"
                            />
                        </nue-div>
                    </nue-div>
                </nue-div>
            </nue-header>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
}
</style>
