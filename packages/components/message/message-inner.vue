<template>
    <div ref="nodeInnerRef" :class="classes">
        <nue-icon v-if="icon" :name="icon" />
        <nue-text class="nue-message-node-inner__text">{{ message }}</nue-text>
        <nue-icon v-if="!duration" name="clear" @click="handlePopAnimation" />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import { handlePop } from './message';
import type { NueMessageNodeProps } from './types';
import './message-inner.css';

defineOptions({ name: 'MessageNode' });

const props = withDefaults(defineProps<NueMessageNodeProps>(), {
    type: 'info',
    message: 'No content.',
    duration: 3000
});

const nodeInnerRef = ref();
const timer = ref<number | null>(null);

const classes = computed(() => {
    const prefix = 'nue-message-node-inner';
    return [
        prefix,
        props.type && `${prefix}--${props.type}`,
        props.size && `${prefix}--${props.size}`
    ];
});

function createTimer(callback: () => void, delay: number) {
    timer.value = setTimeout(callback, delay) as unknown as number;
}

function handleAnimation() {
    createTimer(() => {
        nodeInnerRef.value.classList.add('nue-message-node-inner--push');
        if (props.duration) createTimer(handlePopAnimation, props.duration);
    }, 0);
}

function handlePopAnimation() {
    const { node, wrapper } = props;
    nodeInnerRef.value.classList.remove('nue-message-node-inner--push');
    createTimer(() => handlePop(node, wrapper), 500);
}

watch(
    () => timer.value,
    (_, oldValue) => {
        if (oldValue) clearTimeout(oldValue);
    }
);

onMounted(() => {
    nodeInnerRef.value.style.marginTop = 0 - nodeInnerRef.value.clientHeight * 2 + 'px';
    handleAnimation();
});
</script>
