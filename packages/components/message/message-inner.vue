<template>
    <div ref="nodeInnerRef" :class="classes">
        <nue-icon v-if="icon" :name="icon" />
        <span class="nue-message-node-inner__text">{{ message }}</span>
        <nue-icon
            v-if="!duration"
            name="clear"
            style="cursor: pointer"
            @click="handlePopAnimation"
        />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import NueIcon from '../icon/icon.vue';
import { handlePop } from './message';
import type { MessageNodeProps } from './types';
import './message-inner.css';

defineOptions({ name: 'MessageNode' });

const props = withDefaults(defineProps<MessageNodeProps>(), {
    type: 'info',
    message: '',
    duration: 3000
});

const nodeInnerRef = ref();
const timer = ref<number | null>(null);

const classes = computed(() => {
    const { size } = props;
    let list = ['nue-message-node-inner'];
    list.push(`type--${props.type}`);
    if (size) list.push(`nue-message-node-inner--${size}`);
    return list;
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
    nodeInnerRef.value.style.marginTop =
        0 - nodeInnerRef.value.clientHeight * 2 + 'px';
    handleAnimation();
});
</script>
