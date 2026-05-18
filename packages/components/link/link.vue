<template>
    <component
        :is="disabled ? 'a' : tag"
        :active-class="activeClass"
        :class="classes"
        :href="disabled || !href ? void 0 : href"
        :title="href || title || void 0"
        :to="to"
        v-bind="$attrs"
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
import { computed, ref, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import { NueText } from '../text';
import { NueDiv } from '../div';
import type { NueLinkProps, NueLinkRoute } from './types';

defineOptions({ name: 'NueLink' });
const props = withDefaults(defineProps<NueLinkProps>(), {});

const tag = ref('a');
const to = ref<NueLinkRoute>();
const activeClass = ref('');

watch(
    () => props.route,
    newValue => {
        if (!newValue) return;
        tag.value = 'router-link';
        to.value = newValue;
        activeClass.value = 'nue-link--actived';
    },
    { immediate: true }
);

const classes = computed(() => {
    const prefix = 'nue-link';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.disabled ? `${prefix}--disabled` : void 0
    ];
});
</script>
