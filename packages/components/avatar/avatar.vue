<template>
    <div :class="classes" :style="styles" :title="title">
        <img
            v-if="src && !error"
            :alt="alt"
            :src="src"
            class="nue-avatar__image"
            @error="handleError($event)"
        />
        <nue-icon v-else-if="icon" :name="icon" class="nue-avatar__icon" />
        <slot v-else-if="$slots.default" />
        <nue-text v-else-if="hasAlt" class="nue-avatar__text">{{ alt }}</nue-text>
        <nue-icon v-else class="nue-avatar__icon" name="logo" />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import type { NueAvatarEmits, NueAvatarProps } from './types';

defineOptions({ name: 'NueAvatar' });
const emit = defineEmits<NueAvatarEmits>();
const props = defineProps<NueAvatarProps>();

const error = ref(false);

const classes = computed(() => {
    const prefix = 'nue-avatar';
    return [prefix, ...parseTheme(props.theme, prefix), props.rounded && `${prefix}--rounded`];
});

const styles = computed(() => ({
    '--nue-avatar-size': props.size,
    '--nue-avatar-object-fit': props.fit
}));

// alt 为空白串不算命中，继续下探到默认插槽 / logo
const hasAlt = computed(() => Boolean(props.alt?.trim()));

const handleError = (e: Event) => {
    error.value = true;
    emit('error', e);
};

// 错误态是针对某个 src 的状态：src 实际变化才复位重试（同一 src 不重复重试，避免坏图抖动）
watch(
    () => props.src,
    () => {
        error.value = false;
    }
);
</script>