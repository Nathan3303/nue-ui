<template>
    <nue-marquee infinite>
        <div class="nue-marquee-item" v-for="(item, idx) in 12" :key="idx">
            {{ item }}
        </div>
    </nue-marquee>
</template>
