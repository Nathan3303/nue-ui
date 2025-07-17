<template>
    <nue-div align="center">
        <nue-text decoration="underline">下划线</nue-text>
        <nue-text decoration="line-through">删除线</nue-text>
        <nue-text decoration="var(--custom-decoration)">上划线</nue-text>
    </nue-div>
</template>

<style scoped>
.nue-text {
    --custom-decoration: overline;
}
</style>
