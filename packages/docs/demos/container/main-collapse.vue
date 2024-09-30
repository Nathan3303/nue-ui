<template>
    <nue-div class="vp-raw">
        <nue-container height="256px">
            <nue-main
                aside-width="200px"
                aside-max-width="250px"
                aside-min-width="100px">
                <template #aside>
                    <nue-link theme="btnlike,actived">计时</nue-link>
                    <nue-link theme="btnlike" icon="chat">聊天</nue-link>
                    <nue-link theme="btnlike" icon="setting">设置</nue-link>
                </template>
                <template #content> 内容区域 </template>
            </nue-main>
        </nue-container>
        <nue-container height="256px">
            <nue-main
                aside-width="200px"
                aside-max-width="250px"
                aside-min-width="110px"
                :allow-collapse-aside="false"
                :allow-hide-aside="false">
                <template #aside>
                    <nue-link theme="btnlike,actived">计时</nue-link>
                    <nue-link theme="btnlike" icon="chat">聊天</nue-link>
                    <nue-link theme="btnlike" icon="setting">设置</nue-link>
                </template>
                <template #content> 内容区域 </template>
            </nue-main>
        </nue-container>
    </nue-div>
</template>

<style scoped>
.nue-container {
    border: 1px solid var(--divider-color);
    border-radius: var(--primary-radius);

    .nue-main {
        border: none;
    }
}
</style>
