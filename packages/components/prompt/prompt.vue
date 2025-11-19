<template>
    <nue-overlay
        class="nue-prompt-overlay"
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
                    @focus="() => (errorMessage = '')"
                />
            </div>
            <div class="nue-prompt__footer">
                <nue-text v-if="errorMessage" class="nue-prompt__value-error">
                    {{ errorMessage }}
                </nue-text>
                <nue-button :disabled="loading || !visible" @click.stop="handleCancel">
                    {{ cancelButtonText }}
                </nue-button>
                <nue-button
                    :disabled="!visible"
                    :loading="loading"
                    theme="primary"
                    @click.stop="handleConfirm"
                >
                    {{ confirmButtonText }}
                </nue-button>
            </div>
        </div>
    </nue-overlay>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref, watch } from 'vue';
import NueOverlay from '../overlay/overlay.vue';
import { NueButton, NueInput, NueTextarea, NueText } from '@nue-ui/components';
import { parseTheme, parsePopupItemAnimation } from '@nue-ui/utils';
import type { NuePromptProps } from './types';

defineOptions({ name: 'NuePromptNode' });
const props = withDefaults(defineProps<NuePromptProps>(), {
    placeholder: '请输入',
    inputType: 'text',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
});

const promptInputRef = ref<InstanceType<typeof NueInput | typeof NueTextarea>>();
const inputValue = ref(props.inputValue);
const errorMessage = ref('');
const loading = ref(false);
const visible = ref(true);

// @computed 组件类名
const classes = computed(() => {
    const prefix = 'nue-prompt';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

// @computed 计算组件起始动画
const animation = computed(() => {
    return parsePopupItemAnimation(props.animation);
});

// @computed 计算组件关闭动画
const closeAnimation = computed(() => {
    return parsePopupItemAnimation(props.closeAnimation);
});

// @computed 计算组件样式
const styles = computed(() => ({
    '--nue-prompt-open-animation-name': animation.value.name,
    '--nue-prompt-open-animation-duration': animation.value.duration,
    '--nue-prompt-close-animation-name': closeAnimation.value.name,
    '--nue-prompt-close-animation-duration': closeAnimation.value.duration
}));

// @method 处理取消操作
const handleCancel = async () => {
    props.close(true, null, null);
    visible.value = false;
    await props.afterCancel?.();
};

// @method 处理验证器
const handleValidate = async () => {
    // 当没有验证器时，直接返回 true
    if (!props.validator) return true;
    // 执行验证器
    try {
        loading.value = true;
        // 执行验证器 - 获取验证器结果
        const error = await props.validator(inputValue.value);
        // 处理验证失败结果
        if (error) {
            errorMessage.value =
                (error instanceof Error ? error.message : error) || 'Invalid value';
            return false;
        }
        // 处理验证成功结果
        errorMessage.value = '';
        return true;
    } catch (error) {
        // 处理验证器异常情况
        console.warn('[NuePrompt] Validate error:', error);
        return false;
    } finally {
        loading.value = !errorMessage.value;
    }
};

// @method 处理确认回调
const handleOnConfirm = () => {
    return new Promise((resolve, reject) => {
        // 当没有确认回调时，直接返回 true
        if (!props.onConfirm) {
            resolve(true);
            return;
        }
        // 执行确认回调
        const onConfirmRes = props.onConfirm(inputValue.value, () => resolve(true));
        // 处理确认回调返回值为非 Promise 的情况
        if (!(onConfirmRes instanceof Promise)) {
            // onConfirmRes 为错误，如果有错误则 reject 错误
            if (onConfirmRes) reject(onConfirmRes);
            return;
        }
        // 处理确认回调返回值为 Promise 的情况
        onConfirmRes.then(error => (error ? reject(error) : resolve(true))).catch(reject);
    });
};

// @method 处理确认操作
const handleConfirm = async () => {
    // 验证器
    const validateResult = await handleValidate();
    if (!validateResult) return;
    // 执行确认回调前的回调
    // await props.beforeConfirm?.(inputValue.value);
    // 执行确认回调
    loading.value = true;
    handleOnConfirm()
        .then(isDone => {
            visible.value = !isDone;
            props.close(false, inputValue.value, null);
        })
        .catch(e => {
            errorMessage.value = (e instanceof Error ? e.message : e) || 'Invalid value';
        })
        .finally(() => {
            loading.value = false;
            props.afterConfirm?.();
        });
};

// @method 处理动画开始事件
const handleAnimationStart = () => {
    if (visible.value) {
        props.beforeOpen?.();
    } else {
        props.beforeClose?.();
    }
};

// @method 处理动画结束事件
const handleAnimationEnd = () => {
    if (visible.value) {
        props.afterOpen?.();
    } else {
        props.destroy();
        props.afterClose?.();
    }
};

// @onmounted 组件挂载时，聚焦输入框
onMounted(() => promptInputRef.value!.innerInputRef.focus());

// @watch 监听输入值变化，清空错误信息
watch(
    () => inputValue.value,
    () => (errorMessage.value = '')
);
</script>
