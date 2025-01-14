<template>
    <div :class="classes">
        <slot />
        <component
            :is="$slots.default ? 'sup' : 'span'"
            v-if="!hidden && (content || dot)"
            class="nue-badge__content"
        >
            <nue-text :clamped="1">{{ content }}</nue-text>
        </component>
    </div>
</template>

<script lang="ts" setup>
import { computed, useSlots } from 'vue';
import { isString, parseTheme } from '@nue-ui/utils/';
import NueText from '../text/text.vue';
import type { BadgePropsType } from './types';
import './badge.css';

defineOptions({ name: 'NueBadge' });

const slots = useSlots();
const props = withDefaults(defineProps<BadgePropsType>(), {});

const classes = computed(() => {
    const prefix = 'nue-badge';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.dot && `${prefix}--dot`,
        !slots.default && !props.dot && `${prefix}--inner`
    ];
});

const content = computed(() => {
    if (props.dot) return '';
    if (isString(props.value) && !props.max) return props.value;
    if ((props.value as number) > props.max!) return `${props.max}+`;
    return props.value;
});
</script>
