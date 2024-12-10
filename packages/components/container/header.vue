<template>
    <header :class="classes" :style="styles">
        <div v-if="$slots.logo" class="nue-header__slot nue-header__logo">
            <slot name="logo" />
        </div>
        <nav
            v-if="$slots.nav || $slots.navigators"
            class="nue-header__slot nue-header__navigators"
        >
            <slot name="nav" />
            <slot name="navigators" />
        </nav>
        <slot />
        <div
            v-if="$slots.ops || $slots.actions"
            class="nue-header__slot nue-header__actions"
        >
            <slot name="ops" />
            <slot name="actions" />
        </div>
        <div v-if="$slots.user" class="nue-header__slot nue-header__user">
            <slot name="user" />
        </div>
    </header>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import type { NueHeaderProps } from './types';
import './header.css';

defineOptions({ name: 'NueHeader' });
const props = defineProps<NueHeaderProps>();

const classes = computed(() => [
    'nue-header',
    ...parseTheme(props.theme, 'nue-header')
]);

const styles = computed(() => ({
    '--nue-header-width': props.width,
    '--nue-header-height': props.height
}));
</script>
