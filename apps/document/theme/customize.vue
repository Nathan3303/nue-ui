<template>
    <nue-div direction="column" gap="var(--nue-gap-md)">
        <nue-div align="center" gap="var(--nue-gap-md)">
            <nue-text>默认主色：</nue-text>
            <nue-button theme="primary">按钮</nue-button>
        </nue-div>
        <nue-div align="center" gap="var(--nue-gap-md)">
            <nue-text>局部换主色：</nue-text>
            <nue-button theme="primary" class="brand-blue">按钮</nue-button>
        </nue-div>
        <nue-div align="center" gap="var(--nue-gap-md)">
            <nue-text>覆盖组件级变量：</nue-text>
            <nue-button theme="primary" class="font-lg">按钮</nue-button>
        </nue-div>
    </nue-div>
</template>

<style scoped>
/* 在组件实例上覆盖语义色阶（--nue-brand-hue 已在 :root 求值，需直接覆盖派生色） */
.brand-blue {
    --nue-primary-color-0: hsl(210, 60%, 100%);
    --nue-primary-color-500: hsl(210, 60%, 50%);
    --nue-primary-color-800: hsl(210, 60%, 20%);
}

/* 覆盖组件级变量：字号放大一档 */
.font-lg {
    --nue-button-font-size: var(--nue-text-lg);
}
</style>