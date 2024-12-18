<template>
    <div :class="classes" :style="styles" :title="title">
        <img
            v-if="src && !loadError"
            :alt="alt || `Avatar`"
            :src="src"
            class="nue-avatar__image"
            @error="handleError($event)"
        />
        <nue-icon v-else-if="icon" :name="icon" class="nue-avatar__icon" />
        <slot v-else>
            <span v-if="alt" class="nue-avatar__text">{{ alt }}</span>
            <nue-icon v-else class="nue-avatar__icon" name="logo" />
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import type { AvatarEmits, AvatarProps } from './types';
import './avatar.css';

defineOptions({ name: 'NueAvatar' });

const emit = defineEmits<AvatarEmits>();
const props = withDefaults(defineProps<AvatarProps>(), {});

const loadError = ref(false);

const styles = computed(() => {
    return {
        '--nue-avatar-size': props.size,
        '--nue-avatar-object-fit': props.fit
    };
});

const classes = computed(() => {
    const prefix = 'nue-avatar';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.rounded && 'nue-avatar--rounded'
    ];
});

const handleError = (e: Event) => {
    loadError.value = true;
    emit('error', e);
};
</script>
