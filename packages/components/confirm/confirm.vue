<template>
    <nue-overlay
        :animation="overlayAnimation"
        :close-animation="overlayCloseAnimation"
        :closing="closing"
        :theme="theme"
        class="nue-confirm-overlay"
    >
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
                    :disabled="loading || closing"
                    @click.stop="handleConfirm(false)"
                >
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button
                    :disabled="closing"
                    :loading="loading"
                    theme="primary"
                    @click.stop="handleConfirm(true)"
                >
                    {{ confirmButtonText }}
                </nue-button>
            </div>
        </div>
    </nue-overlay>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import NueButton from '../button/button.vue';
import NueText from '../text/text.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseTheme, parseAnimationDurationToNumber } from '@nue-ui/utils';
import { isString } from 'lodash-es';
import type { NuePopupItemAnimation } from '@nue-ui/utils';
import type { NueConfirmProps, NueConfirmCallerReturnedUnpromise } from './types';
import './confirm.css';

defineOptions({ name: 'NueConfirmNodeInner' });
const props = withDefaults(defineProps<NueConfirmProps>(), {
    title: 'Confirm',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
});

const confirmRef = ref<HTMLDivElement | null>(null);
const loading = ref(false);
const closing = ref(false);
const closeAnimationDuration = ref(0);

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

const handleAnimationStyles = (
    value: NuePopupItemAnimation | undefined,
    isCloseState?: boolean
) => {
    if (value === null || value === void 0) return {};
    let result: Record<string, string> = {};
    let target: Exclude<NuePopupItemAnimation, string> = isString(value) ? { name: value } : value;
    const prefix = `--nue-confirm${isCloseState ? '-close' : ''}-animation`;
    result[`${prefix}-name`] = target.name;
    result[`${prefix}-duration`] = `${target.duration || 240}ms`;
    if (isCloseState) closeAnimationDuration.value = target.duration || 240;
    return result;
};

const waitForAnimation = () => {
    const timeout = parseAnimationDurationToNumber(
        closeAnimationDuration.value || window.getComputedStyle(confirmRef.value!).animationDuration
    );
    return new Promise(resolve => {
        setTimeout(() => resolve(1), timeout);
    });
};

const handleClose = (result: NueConfirmCallerReturnedUnpromise) => {
    closing.value = true;
    props.close(result);
    waitForAnimation().then(() => {
        props.destroy();
    });
};

const handleConfirm = async (isConfirmed: boolean) => {
    if (!isConfirmed) {
        return handleClose(false);
    }
    if (!props.onConfirm) {
        return handleClose(true);
    }
    try {
        loading.value = true;
        handleClose(await props.onConfirm());
    } catch (e) {
        handleClose(e instanceof Error ? e : new Error(e as string));
    } finally {
        loading.value = false;
    }
};
</script>
