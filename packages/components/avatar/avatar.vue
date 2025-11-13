<template>
    <div :class="classes" :style="styles" :title="title">
        <img
            v-if="src && !error"
            :alt="alt || `NueAvatar`"
            :src="src"
            class="nue-avatar__image"
            @error="handleError($event)"
        />
        <slot v-else-if="$slots.default">
            <nue-text v-if="alt" class="nue-avatar__text">{{ alt }}</nue-text>
            <nue-icon v-else class="nue-avatar__icon" name="logo" />
        </slot>
        <nue-icon v-else :name="icon" class="nue-avatar__icon" />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import type { NueAvatarEmits, NueAvatarProps } from './types';
import './avatar.css';

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

const handleError = (e: Event) => {
    error.value = true;
    emit('error', e);
};
</script>
