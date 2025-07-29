<template>
    <nue-button theme="custom">按钮 Button</nue-button>
</template>

<style scoped>
.nue-button--custom {
    --custom-color: 0 72.22% 50.59%;

    color: white;
    background-color: hsl(var(--custom-color));
    border-color: transparent;

    &:hover {
        background-color: hsl(var(--custom-color) / 0.9);
    }

    &:active {
        background-color: hsl(var(--custom-color) / 0.7);
    }
}
</style>
