<template>
    <nue-div align="center">
        <nue-link theme="btnlike" icon="theme">按钮式链接</nue-link>
        <nue-link theme="custom" icon="theme">自定义主题</nue-link>
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
