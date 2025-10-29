<template>
    <component
        :is="disabled ? 'a' : tag"
        :active-class="activeClass"
        :class="classes"
        :href="disabled || !href ? void 0 : href"
        :style="styles"
        :title="href || title || void 0"
        :to="to"
        v-bind="$attrs"
    >
        <nue-icon v-if="icon" :name="icon" class="nue-link__icon" />
        <span v-if="$slots.default" class="nue-link__content">
            <slot>{{ href }}</slot>
        </span>
        <slot name="append" />
    </component>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { parseFlex, parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import type { NueLinkProps, NueLinkRoute } from './types';
import './link.css';

defineOptions({ name: 'NueLink' });
const props = withDefaults(defineProps<NueLinkProps>(), {});

const tag = ref('a');
const to = ref<NueLinkRoute>();
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
    const prefix = 'nue-link';
    return [prefix, ...parseTheme(props.theme, prefix), props.disabled && `${prefix}--disabled`];
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
