<template>
    <component
        :is="disabled ? 'a' : tag"
        :active-class="activeClass"
        :class="classes"
        :href="disabled || !href ? undefined : href"
        :style="styles"
        :title="href || undefined"
        :to="to"
        v-bind="$attrs"
    >
        <nue-icon v-if="icon" :name="icon" />
        <span class="nue-link__content">
            <slot>{{ href }}</slot>
        </span>
        <slot name="append" />
    </component>
</template>

<script lang="ts" setup>
import { ref, computed, watch } from 'vue';
import { parseFlex, parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import type { LinkProps, RoutePropType } from './types';
import './link.css';

defineOptions({ name: 'NueLink' });

const props = withDefaults(defineProps<LinkProps>(), {});

const tag = ref('a');
const to = ref<RoutePropType>();
const activeClass = ref('');

watch(
    () => props.route,
    newValue => {
        if (newValue) {
            tag.value = 'router-link';
            to.value = newValue;
            activeClass.value = 'nue-link--actived';
        }
    },
    { immediate: true }
);

const classes = computed(() => {
    let list: string[] = [];
    const { theme, disabled } = props;
    const prefix = 'nue-link';
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (disabled) list.push(`${prefix}--disabled`);
    return list;
});

const styles = computed(() => {
    const { flex, align, size } = props;
    return {
        '--flex': flex ? parseFlex(flex) : void 0,
        '--text-align': align,
        '--font-size': size
    };
});
</script>
