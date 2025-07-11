<template>
    <nue-div>
        <nue-text color="red">红色</nue-text>
        <nue-text color="#00FF00">绿色</nue-text>
        <nue-text color="var(--custom-color)">蓝色</nue-text>
    </nue-div>
</template>

<style scoped>
.nue-text {
    --custom-color: rgb(0, 0, 255);
}
</style>
