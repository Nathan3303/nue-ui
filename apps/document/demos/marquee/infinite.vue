<template>
    <nue-marquee infinite>
        <div class="marquee-item" v-for="item in 12" :key="item">
            {{ item }}
        </div>
    </nue-marquee>
</template>

<style scoped>
.marquee-item {
    width: 80px;
    height: 80px;
    background-color: var(--nue-ui-divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--nue-ui-primary-radius);
}
</style>
