<template>
    <demo title="无限循环跑马">
        <nue-marquee infinite>
            <div v-for="(item, idx) in 12" :key="idx" class="nue-marquee-item">
                {{ item }}
            </div>
        </nue-marquee>
    </demo>
    <demo title="单次跑马后重复">
        <nue-marquee :speed-ratio="2">
            <div v-for="(item, idx) in 12" :key="idx" class="nue-marquee-item">
                {{ item }}
            </div>
        </nue-marquee>
    </demo>
</template>

<script lang="ts" setup>
import { NueMarquee } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-marquee-item {
    width: 80px;
    height: 80px;
    aspect-ratio: 1;
}
</style>
