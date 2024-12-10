<template>
    <nue-div class="wrapper vp-raw">
        <nue-container>
            <nue-main
                aside-max-width="250px"
                aside-min-width="100px"
                aside-width="200px"
            >
                <template #aside>
                    <nue-link theme="btnlike,actived">计时</nue-link>
                    <nue-link icon="chat" theme="btnlike">聊天</nue-link>
                    <nue-link icon="setting" theme="btnlike">设置</nue-link>
                </template>
                <template #content>
                    <nue-div style="padding: 16px">内容区域</nue-div>
                </template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.wrapper {
    border: 1px solid var(--nue-ui-divider-color);
    border-radius: var(--nue-ui-primary-radius);
    height: 240px;
    overflow: hidden;
}
</style>
