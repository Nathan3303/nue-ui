<template>
    <teleport v-if="modelValue" :disabled="tpState.disabled" :to="tpState.to">
        <nue-overlay :closing="closing" :theme="theme" class="nue-dialog-overlay">
            <div ref="nueDialogRef" :class="classes" :data-closing="closing">
                <div class="nue-dialog__header">
                    <slot :close="handleClose" name="header">
                        <nue-text>{{ title }}</nue-text>
                        <slot name="header-actions" />
                    </slot>
                </div>
                <div class="nue-dialog__content">
                    <slot />
                    <slot name="content" />
                </div>
                <div class="nue-dialog__footer">
                    <slot :close="handleClose" :confirm="handleConfirm" name="footer" />
                </div>
            </div>
        </nue-overlay>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue';
import NueText from '../text/text.vue';
import NueOverlay from '../overlay/overlay.vue';
import { parseAnimationDurationToNumber, parseTheme } from '@nue-ui/utils';
import { isFunction } from 'lodash-es';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueDialogEmits, NueDialogHandleClose, NueDialogProps } from './types';
import './dialog.css';

defineOptions({ name: 'NueDialog' });

const props = withDefaults(defineProps<NueDialogProps>(), {
    title: 'Dialog title'
});
const emit = defineEmits<NueDialogEmits>();

const { tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const nueDialogRef = ref<HTMLDivElement>();
const closing = ref(false);

const classes = computed(() => {
    const prefix = 'nue-dialog';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

watch(
    () => props.modelValue,
    newValue => {
        const newVisible = !!newValue;
        nextTick(() => (newVisible ? handleOpen() : handleClose()));
    }
);

const waitForAnimation = async () => {
    let timeout = 240;
    if (nueDialogRef.value) {
        const closeAnimationDuration = window.getComputedStyle(
            nueDialogRef.value
        ).animationDuration;
        timeout = parseAnimationDurationToNumber(closeAnimationDuration);
    }
    return new Promise(resolve => setTimeout(() => resolve(1), timeout));
};

const handleOpen = async () => {
    closing.value = false;
    emit('update:modelValue', true);
    mountPopupAnchor();
};

const handleClose: NueDialogHandleClose = async afterAnimation => {
    closing.value = true;
    await waitForAnimation();
    if (afterAnimation && isFunction(afterAnimation)) afterAnimation();
    emit('update:modelValue', false);
};

const handleConfirm = async () => {
    try {
        const beforeConfirmCb = isFunction(props.beforeConfirm) ? props.beforeConfirm : () => true;
        const result = await beforeConfirmCb();
        if (!result) return false;
        emit('confirm');
        await handleClose();
    } catch (err) {
        console.log('[NueDialog] Confirm error:', err);
        return false;
    }
};

onUnmounted(() => {
    unmountPopupAnchor();
});

defineExpose({ open: handleOpen, close: handleClose, confirm: handleConfirm });
</script>
