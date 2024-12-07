<template>
    <div ref="marqueeRef" class="nue-marquee">
        <div
            ref="marqueeTrackRef"
            :class="trackClasses"
            :style="{
                animationPlayState: $slots.default ? 'running' : 'paused'
            }"
            class="nue-marquee__track"
        >
            <slot />
            <slot v-if="infinite" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import type { MarqueePropsType } from './types';
import './marquee.css';

defineOptions({ name: 'NueMarquee' });

const props = withDefaults(defineProps<MarqueePropsType>(), {
    direction: 'left',
    speedRatio: 1,
    infinite: false
});

const marqueeRef = ref<HTMLDivElement>();
const marqueeTrackRef = ref<HTMLDivElement>();

const trackClasses = computed(() => {
    return {
        'nue-marquee__track--infinite': props.infinite
    };
});

onMounted(() => {
    if (!marqueeRef.value || !marqueeTrackRef.value) return;
    marqueeRef.value.style.setProperty(
        '--marquee-width',
        `${marqueeRef.value.offsetWidth}px`
    );
    marqueeRef.value.style.setProperty(
        '--marquee-track-width',
        `${marqueeTrackRef.value.offsetWidth}px`
    );
    marqueeTrackRef.value.style.animationDuration = `${marqueeTrackRef.value.children.length * props.speedRatio}s`;
});
</script>
