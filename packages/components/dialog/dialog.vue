<template>
    <teleport v-if="modelValue" :disabled="tpState.disabled" :to="tpState.to">
        <nue-overlay
            class="nue-dialog-overlay"
            :theme="theme"
            :visible="visible"
            @escape="handleDialogClose"
        >
            <nue-container
                :class="classes"
                :data-visible="visible"
                @animationstart="handleAnimationStart"
                @animationend="handleAnimationEnd"
            >
                <slot name="reset" :close="handleDialogClose">
                    <nue-header class="nue-dialog__header">
                        <slot name="header" :close="handleDialogClose">
                            <nue-text class="nue-dialog__header__title">{{ title }}</nue-text>
                            <nue-button
                                class="nue-dialog__header__closebtn"
                                theme="icon,ghost,small"
                                icon="clear"
                                @click="handleDialogClose"
                            />
                        </slot>
                    </nue-header>
                    <nue-main v-if="$slots.content || $slots.default" class="nue-dialog__main">
                        <nue-content fill class="nue-dialog__content">
                            <slot />
                            <slot name="content" :close="handleDialogClose" />
                        </nue-content>
                    </nue-main>
                    <nue-footer v-if="$slots.footer" class="nue-dialog__footer">
                        <slot name="footer" :close="handleDialogClose" />
                    </nue-footer>
                </slot>
            </nue-container>
        </nue-overlay>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import NueOverlay from '../overlay/overlay.vue';
import {
    NueText,
    NueContainer,
    NueHeader,
    NueMain,
    NueContent,
    NueFooter,
    NueButton
} from '@nue-ui/components';
import { parseTheme } from '@nue-ui/utils';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueDialogEmits, NueDialogProps } from './types';

defineOptions({ name: 'NueDialog' });

const props = defineProps<NueDialogProps>();
const emit = defineEmits<NueDialogEmits>();

const { tpState, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor();
const visible = ref(false);

const classes = computed(() => {
    const prefix = 'nue-dialog';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const handleDialogOpen = () => {
    mountPopupAnchor();
    visible.value = true;
};

const handleDialogClose = () => {
    if (visible.value === false) return;
    visible.value = false;
};

const handleAnimationStart = () => {
    if (visible.value) {
        emit('beforeOpen');
    } else {
        emit('beforeClose');
    }
};

const handleAnimationEnd = () => {
    if (visible.value) {
        emit('afterOpen');
    } else {
        emit('afterClose');
        emit('update:modelValue', false);
        unmountPopupAnchor();
    }
};

watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            handleDialogOpen();
            return;
        }
        handleDialogClose();
    }
);

defineExpose({ open: handleDialogOpen, close: handleDialogClose });
</script>
