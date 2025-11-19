<template>
    <nue-overlay
        class="nue-confirm-overlay"
        :animation="overlayAnimation"
        :close-animation="overlayCloseAnimation"
        :theme="theme"
        :visible="visible"
        @escape="handleCancel"
    >
        <div
            :class="classes"
            :style="styles"
            :data-visible="visible"
            @animationstart="handleAnimationStart"
            @animationend="handleAnimationEnd"
        >
            <nue-text v-if="title" class="nue-confirm__header">
                {{ title }}
            </nue-text>
            <nue-text v-if="content" class="nue-confirm__content">
                {{ content }}
            </nue-text>
            <div class="nue-confirm__footer">
                <nue-button
                    v-if="!unuseCancelButton"
                    :disabled="loading || !visible"
                    @click="handleCancel"
                >
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button
                    :disabled="!visible"
                    :loading="loading"
                    theme="primary"
                    @click="handleConfirm"
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
import { parseTheme, parsePopupItemAnimation } from '@nue-ui/utils';
import type { NueConfirmProps } from './types';

defineOptions({ name: 'NueConfirmNodeInner' });
const props = withDefaults(defineProps<NueConfirmProps>(), {
    title: 'Confirm',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
});

const loading = ref(false);
const visible = ref(true);

const classes = computed(() => {
    const prefix = 'nue-confirm';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const animation = computed(() => {
    return parsePopupItemAnimation(props.animation);
});

const closeAnimation = computed(() => {
    return parsePopupItemAnimation(props.closeAnimation);
});

const styles = computed(() => ({
    '--nue-confirm-animation-name': animation.value.name,
    '--nue-confirm-animation-duration': animation.value.duration,
    '--nue-confirm-close-animation-name': closeAnimation.value.name,
    '--nue-confirm-close-animation-duration': closeAnimation.value.duration
}));

const handleCancel = async () => {
    props.close(true, null, null);
    visible.value = false;
    props.afterCancel?.();
};

const handleConfirm = async () => {
    try {
        loading.value = true;
        const result = props.onConfirm ? await props.onConfirm() : null;
        props.close(false, result, null);
    } catch (e) {
        props.close(false, null, e as Error | string);
        visible.value = false;
    } finally {
        visible.value = false;
        loading.value = false;
        props.afterConfirm?.();
    }
};

const handleAnimationStart = () => {
    if (visible.value) {
        props.beforeOpen?.();
    } else {
        props.beforeClose?.();
    }
};

const handleAnimationEnd = () => {
    if (visible.value) {
        props.afterOpen?.();
    } else {
        props.destroy();
        props.afterClose?.();
    }
};
</script>
