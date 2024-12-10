<template>
    <nue-div align="center" gap="24px">
        <nue-button icon="delete" theme="icon-only" />
        <nue-button icon="chat" theme="round">聊天</nue-button>
        <nue-button icon="plus-circle" theme="primary">添加</nue-button>
        <nue-button icon="subscribe" theme="pure">点赞</nue-button>
        <nue-button theme="custom">自定义主题</nue-button>
    </nue-div>
</template>

<style scoped>
.nue-button--custom {
    --color: white;
    --font-weight: bold;
    --border-color: transparent;
    --background-color: #4992ff;
    --hover-background-color: #4381df;
    --active-background-color: #3f75c7;
    --primary-radius: 0px;
}
</style>
