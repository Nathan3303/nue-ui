<template>
    <nue-div align="center" class="vp-raw">
        <nue-link theme="btnlike">按钮式链接</nue-link>
        <nue-link theme="custom">自定义主题</nue-link>
    </nue-div>
</template>

<style scoped>
    .nue-link--custom {
        --color: orange;
        --font-weight: bolder;
        --text-decoration: none;
        --font-size: 16px;
        --hover-background-color: #a5a5a5;
        --hover-font-color: blue;
    }
</style>
