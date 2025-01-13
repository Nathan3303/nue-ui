<template>
    <nue-div class="vp-raw">
        <nue-container>
            <nue-header>
                <template #logo>
                    <nue-text size="24px">Logo</nue-text>
                </template>
                <template #navigators>
                    <nue-link theme="btnlike,actived">首页</nue-link>
                    <nue-link theme="btnlike">关于我们</nue-link>
                </template>
                <template #actions>
                    <nue-button icon="search" theme="icon-only" />
                </template>
                <template #user>
                    <nue-avatar
                        shape="round"
                        src="https://picsum.photos/id/237/200/200"
                    />
                </template>
            </nue-header>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--nue-divider-color);
    border-radius: var(--nue-primary-radius);
}
</style>
