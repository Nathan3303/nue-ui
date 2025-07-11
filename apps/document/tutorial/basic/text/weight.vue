<template>
    <nue-div align="center">
        <nue-text weight="200">200</nue-text>
        <nue-text weight="bold">bold</nue-text>
        <nue-text weight="var(--custom-weight)">CustomWeight</nue-text>
    </nue-div>
</template>

<style scoped>
.nue-text {
    --custom-weight: 900;
}
</style>
