<template>
    <demo title="Marquee 跑马灯">
        <nue-div vertical>
            <nue-div theme="card">
                <nue-text tag="h3">循环</nue-text>
                <nue-marquee infinite>
                    <div
                        v-for="(item, idx) in 12"
                        :key="idx"
                        class="nue-marquee-item"
                    >
                        {{ item }}
                    </div>
                </nue-marquee>
            </nue-div>
            <nue-div theme="card">
                <nue-text tag="h3">单次后重复</nue-text>
                <nue-marquee :speed-ratio="2">
                    <div
                        v-for="(item, idx) in 12"
                        :key="idx"
                        class="nue-marquee-item"
                    >
                        {{ item }}
                    </div>
                </nue-marquee>
            </nue-div>
        </nue-div>
    </demo>
</template>

<script lang="ts" setup>
import { NueDiv, NueText, NueMarquee } from '@nue-ui/components';
import Demo from '../layouts/demo.vue';
</script>

<style scoped>
.nue-marquee-item {
    width: 80px;
    height: 80px;
    aspect-ratio: 1;
}
</style>
