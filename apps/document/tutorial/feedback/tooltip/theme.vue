<template>
    <nue-div align="center">
        <nue-tooltip content="自定主题 1" theme="custom">
            <nue-button>主题 1</nue-button>
        </nue-tooltip>
        <nue-tooltip content="自定主题 2" theme="custom2">
            <nue-button>主题 2</nue-button>
        </nue-tooltip>
    </nue-div>
</template>

<style>
.nue-tooltip--custom {
    background: linear-gradient(to right, #ff416c, #ff4b2b);
}

.nue-tooltip--custom2 {
    --nue-tooltip-font-color: #303a49;
    background: linear-gradient(to left, #3cff97, #2dc7ff);
}
</style>
