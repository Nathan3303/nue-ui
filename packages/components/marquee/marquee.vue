<template>
    <div ref="marqueeRef" :class="classes">
        <div ref="marqueeTrackRef" class="nue-marquee__track" :style="trackStyles">
            <slot />
            <slot v-if="infinite" />
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, onUpdated, ref, useSlots } from 'vue';
import type { NueMarqueeProps } from './types';
import { parseTheme } from '@nue-ui/utils';

defineOptions({ name: 'NueMarquee' });

const props = withDefaults(defineProps<NueMarqueeProps>(), {
    direction: 'left',
    speedRatio: 1,
    infinite: false
});

const slots = useSlots();

const marqueeRef = ref<HTMLDivElement>();
const marqueeTrackRef = ref<HTMLDivElement>();

const classes = computed(() => {
    const prefix = 'nue-marquee';
    return [prefix, ...parseTheme(props.theme, prefix), props.infinite && `${prefix}--infinite`];
});

const trackStyles = computed(() => ({
    animationPlayState: slots.default ? 'running' : 'paused'
}));

const calculateWidth = () => {
    if (!marqueeRef.value || !marqueeTrackRef.value) return;
    const marqueeWidth = marqueeRef.value.clientWidth;
    const marqueeTrackWidth = marqueeTrackRef.value.offsetWidth;
    marqueeRef.value.style.setProperty('--nue-marquee-width', `${marqueeWidth}px`);
    marqueeRef.value.style.setProperty('--nue-marquee-track-width', `${marqueeTrackWidth}px`);
};

const calculateDuration = () => {
    if (!marqueeRef.value || !marqueeTrackRef.value) return;
    const marqueeTrackChildNodesLength = marqueeTrackRef.value.childNodes.length;
    const marqueeTrackAnimationDuration = marqueeTrackChildNodesLength * props.speedRatio;
    marqueeTrackRef.value.style.animationDuration = `${marqueeTrackAnimationDuration}s`;
};

onUpdated(() => {
    calculateWidth();
    calculateDuration();
});

onMounted(() => {
    calculateWidth();
    calculateDuration();
});
</script>
