<template>
    <teleport to="body">
        <div
            v-if="modelValue"
            ref="dialogWrapperRef"
            :style="styles"
            class="nue-dialog-wrapper"
        >
            <div :class="classes">
                <div class="nue-dialog__header">
                    <slot :close="handleCancel" name="header">
                        <nue-text>{{ title }}</nue-text>
                        <nue-button
                            :disabled="!closable"
                            icon="clear"
                            theme="pure"
                            @click="handleCancel"
                        />
                    </slot>
                </div>
                <div class="nue-dialog__content">
                    <slot />
                </div>
                <div class="nue-dialog__footer">
                    <slot
                        :cancel="handleCancel"
                        :confirm="handleConfirm"
                        name="footer"
                    />
                </div>
            </div>
        </div>
    </teleport>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, watch } from 'vue';
import { NueButton, NueText } from '..';
import { isFunction, parseTheme } from '@nue-ui/utils';
import type { DialogEmitsType, DialogPropsType } from './types';
import './dialog.css';

defineOptions({ name: 'NueDialog' });

const props = withDefaults(defineProps<DialogPropsType>(), {
    title: 'Dialog Title',
    closable: true
});
const emit = defineEmits<DialogEmitsType>();

const dialogWrapperRef = ref<HTMLDivElement>();

const classes = computed(() => {
    const { theme } = props;
    const prefix = 'nue-dialog';
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const styles = computed(() => {
    const { width, minWidth } = props;
    return {
        '--aside-width': width,
        '--aside-min-width': minWidth
    };
});

function handleOpenAnimation() {
    requestAnimationFrame(() => {
        if (!dialogWrapperRef.value) return;
        dialogWrapperRef.value.dataset.open = 'true';
    });
}

function handleCloseAnimation(): Promise<boolean> {
    return new Promise(resolve => {
        if (!dialogWrapperRef.value) return;
        dialogWrapperRef.value.dataset.open = 'false';
        setTimeout(() => resolve(true), 240);
    });
}

async function handleCancel() {
    const { closable } = props;
    if (!closable) return;
    await handleCloseAnimation();
    emit('update:modelValue', false);
    return true;
}

async function handleConfirm() {
    if (isFunction(props.beforeConfirm)) {
        try {
            await new Promise(resolve =>
                props.beforeConfirm?.call(null, () => resolve(null))
            );
        } catch (e) {
            throw new Error(e as string);
        }
    }
    emit('confirm');
    await handleCancel();
}

watch(
    () => props.modelValue,
    newValue => {
        if (newValue) {
            nextTick(() => {
                handleOpenAnimation();
            });
        }
    }
);

defineExpose({ close: handleCancel });
</script>
