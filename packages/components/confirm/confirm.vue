<template>
    <div ref="confirmRef" :class="classes" :data-closing="closing" :style="styles">
        <nue-text v-if="title" class="nue-confirm__header">
            {{ title }}
        </nue-text>
        <nue-text v-if="content" class="nue-confirm__content">
            {{ content }}
        </nue-text>
        <div class="nue-confirm__footer">
            <nue-button
                v-if="!unuseCancelButton"
                :disabled="loading"
                @click.stop="handleConfirm(false)"
            >
                {{ cancelButtonText }}
            </nue-button>
            <nue-button :loading="loading" theme="primary" @click.stop="handleConfirm(true)">
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import NueButton from '../button/button.vue';
import NueText from '../text/text.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseTheme } from '@nue-ui/utils';
import { isString } from 'lodash-es';
import type { NueConfirmProps, NueConfirmAnimation } from './types';
import './confirm.css';

defineOptions({ name: 'NueConfirmNodeInner' });
const props = withDefaults(defineProps<NueConfirmProps>(), {
    title: '确认提示',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
});

const loading = ref(false);
const closing = ref(false);
const confirmRef = ref<HTMLDivElement | null>(null);

const classes = computed(() => {
    const prefix = 'nue-confirm';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const styles = computed(() => {
    const { animation, closeAnimation } = props;
    const animationStyles = handleAnimationStyles(animation);
    const closeAnimationStyles = handleAnimationStyles(closeAnimation, true);
    return {
        ...animationStyles,
        ...closeAnimationStyles
    };
});

const handleAnimationStyles = (value: NueConfirmAnimation | undefined, isCloseState?: boolean) => {
    if (value === null || value === void 0) return {};
    let result: Record<string, string> = {};
    let target: Exclude<NueConfirmAnimation, string> = isString(value) ? { name: value } : value;
    const prefix = `--nue-confirm${isCloseState ? '-close' : ''}-animation`;
    const overlayPrefix = `--nue-popup-overlay${isCloseState ? '-close' : ''}-animation`;
    result[`${prefix}-name`] = target.name;
    result[`${prefix}-duration`] = `${target.duration || 240}ms`;
    result[`${overlayPrefix}-duration`] = `${target.duration || 240}ms`;
    return result;
};

const handleConfirm = async (isConfirmed: boolean) => {
    try {
        if (!isConfirmed) return props.close(false);
        if (!props.onConfirm) return props.close(true);
        loading.value = true;
        const onConfirmResult = await props.onConfirm();
        props.close(onConfirmResult);
    } catch (e) {
        const onConfirmResult = e instanceof Error ? e : new Error(e as string);
        props.close(onConfirmResult);
    } finally {
        closing.value = true;
        // loading.value = false;
    }
};
</script>
