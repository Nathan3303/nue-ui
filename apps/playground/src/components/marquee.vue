<template>
    <nue-text theme="h3">无尽跑马灯</nue-text>
    <nue-text>前后连续，动画没有间断点。</nue-text>
    <nue-marquee infinite>
        <div class="marquee-item" v-for="(item, idx) in 12" :key="idx">
            {{ item }}
        </div>
    </nue-marquee>
    <nue-text theme="h3">一次性跑马灯</nue-text>
    <nue-text>等待一次动画结束后，才会进行下一次动画。</nue-text>
    <nue-marquee :speed-ratio="2">
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
