<template>
    <div ref="marqueeRef" class="nue-marquee">
        <div ref="marqueeTrackRef" class="nue-marquee__track">
            <div class="nue-marquee-item" v-for="(item, idx) in 12" :key="idx">
                {{ item }}
            </div>
            <div class="nue-marquee-item" v-for="(item, idx) in 12" :key="idx">
                {{ item }}
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import "./marquee.css";

defineOptions({ name: "NueMarquee" });

const marqueeRef = ref<HTMLDivElement>();
const marqueeTrackRef = ref<HTMLDivElement>();

onMounted(() => {
    if (!marqueeTrackRef.value && !marqueeRef.value) return;
    const marqueeTrackWidth = marqueeTrackRef.value!.offsetWidth;
    const animationTime = marqueeTrackRef.value!.children.length * 1.5;
    marqueeRef.value!.style.setProperty(
        "--marquee-transform-offset",
        `-${(marqueeTrackWidth + 36) / 2}px`
    );
    marqueeTrackRef.value!.style.animationDuration = `${animationTime}s`;
});
</script>
