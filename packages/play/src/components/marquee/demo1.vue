<template>
    <nue-text>Infinite Marquee</nue-text>
    <nue-marquee infinite>
        <div class="marquee-item" v-for="(item, idx) in 12" :key="idx">
            {{ item }}
        </div>
    </nue-marquee>
    <nue-text>One-time Marquee</nue-text>
    <nue-marquee>
        <div class="marquee-item" v-for="(item, idx) in 12" :key="idx">
            {{ item }}
        </div>
    </nue-marquee>
</template>

<style scoped>
.marquee-item {
    width: 80px;
    height: 80px;
    background-color: var(--divider-color);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: var(--primary-radius);
}
</style>
