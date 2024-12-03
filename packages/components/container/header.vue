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

defineOptions({ name: 'NueHeader' });
const props = defineProps<NueHeaderProps>();

const classes = computed(() => {
    const { theme } = props;
    const prefix = 'nue-header';
    let list: string[] = [prefix];
    if (theme) list = list.concat(parseTheme(theme, prefix));
    return list;
});

const styles = computed(() => {
    const { width, height } = props;
    return {
        '--nue-header-width': width,
        '--nue-header-height': height
    };
});
</script>
