<template>
    <nue-overlay
        :animation="overlayAnimation"
        :close-animation="overlayCloseAnimation"
        :closing="closing"
        :theme="theme"
        class="nue-prompt-overlay"
    >
        <div ref="promptRef" :class="classes" :data-closing="closing" :style="styles">
            <nue-text v-if="title" class="nue-prompt__header">
                {{ title }}
            </nue-text>
            <div class="nue-prompt__content">
                <nue-text v-if="description" class="nue-prompt__description">
                    {{ description }}
                </nue-text>
                <component
                    :is="inputType === 'textarea' ? NueTextarea : NueInput"
                    ref="promptInputRef"
                    v-model="inputValue"
                    :disabled="loading"
                    :placeholder="placeholder"
                    :type="inputType"
                />
            </div>
            <div class="nue-prompt__footer">
                <nue-text v-if="isInvalid" class="nue-prompt__value-error">
                    {{ invalidMessage }}
                </nue-text>
                <nue-button :disabled="loading || closing" @click.stop="handleConfirm(false)">
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
import { computed, onMounted, ref, watch } from 'vue';
import NueButton from '../button/button.vue';
import NueInput from '../input/input.vue';
import NueTextarea from '../input/textarea.vue';
import NueText from '../text/text.vue';
import NueOverlay from '../overlay/overlay.vue';
import {
    type NuePopupItemAnimation,
    parseAnimationDurationToNumber,
    parseTheme
} from '@nue-ui/utils';
import { isString } from 'lodash-es';
import type { NuePromptClose, NuePromptProps } from './types';
import './prompt.css';

defineOptions({ name: 'NuePromptNode' });
const props = withDefaults(defineProps<NuePromptProps>(), {
    title: 'Prompt',
    description: '',
    placeholder: 'Input here...',
    inputType: 'text',
    inputValue: '',
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel'
});

const promptRef = ref<HTMLDivElement>();
const promptInputRef = ref();
const loading = ref(false);
const closing = ref(false);
const inputValue = ref(props.inputValue);
const isInvalid = ref(false);
const invalidMessage = ref('Invalid value');
const closeAnimationDuration = ref(0);

const classes = computed(() => {
    const prefix = 'nue-prompt';
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
    const prefix = `--nue-prompt${isCloseState ? '-close' : ''}-animation`;
    result[`${prefix}-name`] = target.name;
    result[`${prefix}-duration`] = `${target.duration || 240}ms`;
    if (isCloseState) closeAnimationDuration.value = target.duration || 240;
    return result;
};

const waitForAnimation = () => {
    const timeout = parseAnimationDurationToNumber(
        closeAnimationDuration.value || window.getComputedStyle(promptRef.value!).animationDuration
    );
    return new Promise(resolve => {
        setTimeout(() => resolve(1), timeout);
    });
};

const handleClose: NuePromptClose = (result, payload) => {
    closing.value = true;
    props.close(result, payload);
    waitForAnimation().then(() => {
        props.destroy();
    });
};

const handleValidate = async () => {
    const { validator } = props;
    let validateResult: boolean | Error = false;
    if (!validator) return true;
    isInvalid.value = false;
    loading.value = true;
    try {
        validateResult = await validator(inputValue.value);
    } catch (error) {
        console.warn('[NuePrompt/validator] Await error:', error);
        validateResult = false;
    }
    if (!validateResult) {
        validateResult = new Error('Invalid value');
    }
    if (validateResult instanceof Error) {
        isInvalid.value = true;
        invalidMessage.value = validateResult.message || 'Invalid value';
        loading.value = false;
        validateResult = false;
    }
    return validateResult;
};

const handleConfirm = async (isConfirmed: boolean) => {
    // 点击了取消按钮
    if (!isConfirmed) {
        return handleClose(false, null);
    }
    // 验证器验证失败
    try {
        const validateResult = await handleValidate();
        if (!validateResult) return;
    } catch (error) {
        console.warn('[NuePrompt] props.validator:', error);
    }
    // 没有 onConfirm 回调
    if (!props.onConfirm) {
        return handleClose(true, inputValue.value);
    }
    try {
        loading.value = true;
        // 获取 onConfirm 回调的返回值
        const onConfirmResult = await props.onConfirm(inputValue.value);
        handleClose(true, onConfirmResult);
    } catch (error) {
        console.warn('[NuePrompt] props.onConfirm:', error);
        // 判断结果
        if (!(error instanceof Error)) {
            handleClose(false, error);
        } else {
            // 判断是否 closeOnError
            if (props.closeOnError) {
                handleClose(false, error.message);
            } else {
                isInvalid.value = true;
                invalidMessage.value = error.message || 'Failed to confirm';
            }
        }
    } finally {
        loading.value = false;
    }
};

onMounted(() => {
    requestAnimationFrame(() => {
        promptInputRef.value!.innerInputRef.focus();
    });
});

watch(
    () => inputValue.value,
    () => (isInvalid.value = false)
);
</script>
