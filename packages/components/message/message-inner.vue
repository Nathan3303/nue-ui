<template>
    <div ref="nodeInnerRef" :class="classes">
        <nue-icon v-if="icon" :name="icon" />
        <nue-text class="nue-message-node-inner__text">
            <slot>{{ message }}</slot>
        </nue-text>
        <span v-if="$slots.extension || extension" class="nue-message-node-inner__extension">
            <slot name="extension">
                <template v-if="typeof extensionContent === 'string'">{{
                    extensionContent
                }}</template>
                <component :is="extensionContent" v-else-if="extensionContent" />
            </slot>
        </span>
        <nue-icon v-if="!duration" name="clear" @click="handlePopAnimation" />
    </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import { handlePop } from './message';
import type { NueMessageNodeProps } from './types';

defineOptions({ name: 'MessageNode' });

const props = withDefaults(defineProps<NueMessageNodeProps>(), {
    type: 'info',
    message: 'No content.',
    duration: 3000
});

const nodeInnerRef = ref();
const timer = ref<number | null>(null);
const closed = ref(false);

const classes = computed(() => {
    const prefix = 'nue-message-node-inner';
    return [
        prefix,
        props.type && `${prefix}--${props.type}`,
        props.size && `${prefix}--${props.size}`
    ];
});

// 归一化扩展内容：渲染函数在渲染时调用，并注入 { close } 上下文
const extensionContent = computed(() => {
    const { extension } = props;
    if (typeof extension === 'function') return extension({ close: handlePopAnimation });
    return extension;
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
    if (closed.value) return;
    closed.value = true;
    const { node, wrapper } = props;
    nodeInnerRef.value.classList.remove('nue-message-node-inner--push');
    createTimer(() => handlePop(node, wrapper), 500);
}

defineExpose({ close: handlePopAnimation });

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