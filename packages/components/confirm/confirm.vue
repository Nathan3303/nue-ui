<template>
    <div ref="confirmRef" :class="classes">
        <div v-if="title" class="nue-confirm__header">{{ title }}</div>
        <div v-if="content" class="nue-confirm__content">{{ content }}</div>
        <div class="nue-confirm__footer">
            <nue-button :disabled="loading" @click.stop="handleConfirm(false)">
                {{ cancelButtonText }}
            </nue-button>
            <nue-button
                :loading="loading"
                theme="primary"
                @click.stop="handleConfirm(true)"
            >
                {{ confirmButtonText }}
            </nue-button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import NueButton from '../button/button.vue';
import type { ConfirmPropsType } from './types';
import { parseTheme } from '@nue-ui/utils';
import './confirm.css';

defineOptions({ name: 'NueConfirmNodeInner' });
const props = withDefaults(defineProps<ConfirmPropsType>(), {
    title: '确认提示',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
});

const loading = ref(false);

const classes = computed(() => {
    const prefix = 'nue-confirm';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const handleConfirm = async (isConfirmed: boolean) => {
    const { onConfirm, close } = props;
    if (!isConfirmed) return close(false);
    if (!onConfirm) return close(true);
    try {
        loading.value = true;
        const onConfirmResult = await onConfirm();
        close(onConfirmResult);
    } catch (e) {
        const onConfirmResult = e instanceof Error ? e : new Error(e as string);
        close(onConfirmResult);
    } finally {
        loading.value = false;
    }
};
</script>
