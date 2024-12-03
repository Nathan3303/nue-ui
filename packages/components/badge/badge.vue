<template>
    <div :class="classes">
        <slot />
        <component
            :is="$slots.default ? 'sup' : 'span'"
            v-if="!hidden && (content || dot)"
            class="nue-badge__content"
        >
            {{ content }}
        </component>
    </div>
</template>

<script setup lang="ts">
    import { computed, useSlots } from 'vue';
    import { parseTheme, isString } from '@nue-ui/utils/';
    import type { BadgePropsType } from './types';
    import './badge.css';

    defineOptions({ name: 'NueBadge' });

    const slots = useSlots();
    const props = withDefaults(defineProps<BadgePropsType>(), {
        hidden: false,
        dot: false
    });

    const classes = computed(() => {
        const prefix = 'nue-badge';
        const { theme, dot } = props;
        let list: string[] = [];
        list.push(prefix);
        if (theme) list.push(...parseTheme(theme, prefix));
        if (dot) list.push(`${prefix}--dot`);
        if (!slots.default && !dot) list.push(`${prefix}--inner`);
        return list;
    });

    const content = computed(() => {
        if (props.dot) return '';
        if (isString(props.value) && !props.max) return props.value;
        if ((props.value as number) > props.max!) return `${props.max}+`;
        return props.value;
    });
</script>
