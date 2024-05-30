<template>
    <div ref="marqueeRef" class="nue-marquee">
        <div
            ref="marqueeTrackRef"
            class="nue-marquee__track"
            :class="trackClasses"
            :style="{
                animationPlayState: $slots.default ? 'running' : 'paused',
            }">
            <slot></slot>
            <slot v-if="infinite"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import type { MarqueePropsType } from "./types";
import "./marquee.css";

defineOptions({ name: "NueMarquee" });

const props = withDefaults(defineProps<MarqueePropsType>(), {
    direction: "left",
    speedRatio: 1,
    infinite: false,
});

const marqueeRef = ref<HTMLDivElement>();
const marqueeTrackRef = ref<HTMLDivElement>();

const trackClasses = computed(() => {
    return {
        "nue-marquee__track--infinite": props.infinite,
    };
});

onMounted(() => {
    const marqueeWidth = marqueeRef.value!.offsetWidth;
    const marqueeTrackWidth = marqueeTrackRef.value!.offsetWidth;
    const animationDuration =
        marqueeTrackRef.value!.children.length * props.speedRatio;
    marqueeRef.value!.style.setProperty("--marquee-width", `${marqueeWidth}px`);
    marqueeRef.value!.style.setProperty(
        "--marquee-track-width",
        `${marqueeTrackWidth}px`
    );
    marqueeTrackRef.value!.style.animationDuration = `${animationDuration}s`;
});
</script>
