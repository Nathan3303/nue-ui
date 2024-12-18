<template>
    <div ref="promptRef" class="nue-prompt">
        <div class="nue-prompt__header">
            <nue-text size="var(--nue-ui-text-md)">
                {{ title }}
            </nue-text>
            <nue-button
                :disabled="loading"
                icon="clear"
                theme="ico"
                @click.stop="handleClose(false)"
            />
        </div>
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
            <nue-button :disabled="loading" @click.stop="handleClose(false)">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button
                :loading="loading"
                theme="primary"
                @click.stop="handleClose(true)"
            >
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import NueButton from '../button/button.vue';
import NueInput from '../input/input.vue';
import NueTextarea from '../input/textarea.vue';
import NueText from '../text/text.vue';
import type { PromptPropsType } from './types';

defineOptions({ name: 'NuePromptNode' });

const props = withDefaults(defineProps<PromptPropsType>(), {
    title: '输入提示',
    description: '',
    placeholder: '请输入 ...',
    inputType: 'text',
    inputValue: '',
    confirmButtonText: '确定',
    cancelButtonText: '取消'
});

const promptRef = ref<HTMLDivElement>();
const promptInputRef = ref();
const inputValue = ref(props.inputValue);
const isInvalid = ref(false);
const invalidMessage = ref('无效的输入值');
const loading = ref(false);

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
        validateResult = new Error('无效的输入值');
    }
    if (validateResult instanceof Error) {
        isInvalid.value = true;
        invalidMessage.value = validateResult.message || '无效的输入值';
        loading.value = false;
        validateResult = false;
    }
    return validateResult;
};

const handleClose = async (isConfirmed: boolean) => {
    let onConfirmResult: unknown;
    const { close, onConfirm, closeOnError } = props;
    // 点击了取消按钮
    if (!isConfirmed) return close(false, '操作取消');
    // 验证器验证失败
    if (!(await handleValidate())) return;
    // 没有 onConfirm 回调
    if (!onConfirm) return close(true, inputValue.value);
    // 开启加载状态
    loading.value = true;
    try {
        // 获取 onConfirm 回调的返回值
        onConfirmResult = await onConfirm(inputValue.value);
    } catch (error) {
        console.warn('[NuePrompt/onConfirm] Await error:', error);
        onConfirmResult = false;
    }
    // 关闭还在状态
    loading.value = false;
    // 判断结果
    if (onConfirmResult instanceof Error) {
        // 判断是否 closeOnError
        if (closeOnError) {
            close(false, onConfirmResult.message);
            return;
        } else {
            isInvalid.value = true;
            invalidMessage.value = onConfirmResult.message || '确认失败';
            return;
        }
    }
    close(true, onConfirmResult);
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
