<template>
    <nue-button @click="showConfirm">基础确认对话框</nue-button>
</template>

<script lang="ts" setup>
import { NueConfirm } from 'nue-ui';

const showConfirm = () => {
    NueConfirm({
        title: '自定义主题',
        content: '自定义了主题',
        confirmButtonText: '知道了',
        unuseCancelButton: true,
        theme: 'my-confirm'
    });
};
</script>

<style>
/* 要注意弹出层并非在组件内部渲染，因此不能使用组件范围的样式，即非 scoped */
.nue-confirm--my-confirm {
    --nue-confirm-animation-name: my-confirm-open;
    --nue-confirm-close-animation-name: my-confirm-close;

    width: 16rem;
    height: 9rem;
    background-color: #212121;

    .nue-confirm__header {
        font-size: 1rem;
        color: #f9f9f9;
    }

    .nue-confirm__content {
        font-size: 0.875rem;
        color: #c5c5c5;
    }

    .nue-confirm__footer .nue-button--primary {
        background-color: #f2f2f2;
        color: #212121;
    }
}

@keyframes my-confirm-open {
    from {
        transform: translateY(-50px);
        opacity: 0;
    }
    to {
        transform: translateY(0);
        opacity: 1;
    }
}

@keyframes my-confirm-close {
    from {
        transform: translateY(0);
        opacity: 1;
    }
    to {
        transform: translateY(-50px);
        opacity: 0;
    }
}
</style>
