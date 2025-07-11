<template>
    <nue-marquee>
        <div v-for="(item, idx) in 12" :key="idx" class="nue-marquee-item">
            {{ item }}
        </div>
    </nue-marquee>
</template>

<style scoped>
.nue-marquee-item {
    width: 80px;
    height: 80px;
    aspect-ratio: 1;
}
</style>
