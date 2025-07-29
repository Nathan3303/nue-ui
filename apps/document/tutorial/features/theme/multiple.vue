<template>
    <nue-div>
        <nue-button theme="custom1,custom2">按钮 Button</nue-button>
        <nue-button :theme="['custom1', 'custom2']">按钮 Button</nue-button>
    </nue-div>
</template>

<style scoped>
.nue-button--custom1 {
    --custom-color: 0 72.22% 50.59%;

    color: white;
    background-color: hsl(var(--custom-color));
    border-color: transparent;
}

.nue-button--custom2 {
    &:hover {
        background-color: hsl(var(--custom-color) / 0.9);
    }

    &:active {
        background-color: hsl(var(--custom-color) / 0.7);
    }
}
</style>
