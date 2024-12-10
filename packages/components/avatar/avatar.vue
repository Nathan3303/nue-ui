<template>
    <div :class="classes" :style="styles" :title="title">
        <img
            v-if="src && !loadError"
            :src="src"
            alt="N"
            class="nue-avatar__image"
            @error="handleError($event)"
        />
        <nue-icon v-else-if="icon" :name="icon" class="nue-avatar__icon" />
        <slot v-else />
    </div>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { AvatarEmits, AvatarProps } from './types';
import { NueIcon } from '../icon';
import './avatar.css';

defineOptions({ name: 'NueAvatar' });

const emit = defineEmits<AvatarEmits>();
const props = withDefaults(defineProps<AvatarProps>(), {});

const loadError = ref(false);

const styles = computed(() => ({
    '--size': props.size,
    '--object-fit': props.fit,
    '--border-radius': props.rounded ? '50%' : void 0
}));

const classes = computed(() => {
    const { theme } = props;
    let list: string[] = [];
    const prefix = 'nue-avatar';
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const handleError = (e: Event) => {
    loadError.value = true;
    emit('error', e);
};
</script>
