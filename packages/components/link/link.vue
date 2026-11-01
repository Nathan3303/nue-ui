<template>
    <component
        :is="isRouteMode ? 'router-link' : 'a'"
        :active-class="activeClass"
        :class="classes"
        v-bind="linkAttrs"
    >
        <nue-div v-if="$slots.prepend" class="nue-link__prepend">
            <slot name="prepend" />
        </nue-div>
        <nue-icon v-if="icon" :hinting="false" :name="icon" class="nue-link__icon" />
        <nue-text v-if="$slots.default" :clamped="1" class="nue-link__content">
            <slot>{{ href }}</slot>
        </nue-text>
        <nue-div v-if="$slots.append" class="nue-link__append">
            <slot name="append" />
        </nue-div>
    </component>
</template>

<script lang="ts" setup>
import { computed, mergeProps, useAttrs } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import { NueText } from '../text';
import { NueDiv } from '../div';
import type { NueLinkProps, NueLinkRoute } from './types';

defineOptions({ name: 'NueLink' });
const props = withDefaults(defineProps<NueLinkProps>(), {});

const attrs = useAttrs();
const routeTarget = computed<NueLinkRoute | undefined>(() => props.route || props.to);
const isRouteMode = computed(() => !props.disabled && !props.href && Boolean(routeTarget.value));
const activeClass = computed(() => (routeTarget.value && !props.href ? 'nue-link--actived' : ''));

// 只绑定当前形态真正需要的属性：路由形态绝不能绑 href（undefined 会盖掉 RouterLink 自算的
// href），非路由形态也不能绑 to（对象会被序列化成 DOM 属性）。
const linkAttrs = computed(() => {
    const navigation: Record<string, unknown> = isRouteMode.value
        ? { to: routeTarget.value }
        : props.href && !props.disabled
          ? { href: props.href }
          : {};
    return mergeProps(navigation, { title: props.href || props.title || void 0 }, attrs);
});

const classes = computed(() => {
    const prefix = 'nue-link';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.disabled ? `${prefix}--disabled` : void 0
    ];
});
</script>