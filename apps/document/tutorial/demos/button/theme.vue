<template>
    <nue-div>
        <nue-button theme="primary">主要</nue-button>
        <nue-button theme="primary,round">主要 + 圆角</nue-button>
        <nue-button :theme="['secondary', 'round']">次要 + 圆角</nue-button>
        <nue-button :theme="{ destructive: true }">破坏性</nue-button>
        <nue-button theme="custom">自定义</nue-button>
    </nue-div>
</template>

<style scoped>
.nue-button--custom {
    --nue-button-color: white;
    --nue-button-font-weight: bold;
    --nue-button-border-color: transparent;
    --nue-button-bg-color: #4992ff;
    --nue-button-hover-bg-color: #4381df;
    --nue-button-active-bg-color: #3f75c7;
    --nue-button-primary-radius: 0px;
}
</style>
