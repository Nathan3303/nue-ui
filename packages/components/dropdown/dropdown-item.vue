<script setup lang="ts">
import { computed, ref, inject } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon, NueText, NueDiv } from '@nue-ui/components';
import type { NueDropdownContext, NueDropdownItemProps } from './types';

defineOptions({ name: 'NueDropdownItem' });
const props = withDefaults(defineProps<NueDropdownItemProps>(), {
    closeWhenExecuted: false
});

// @inject 从 dropdown 组件提供的上下文获取 execute 方法
const dropdownContext = inject<NueDropdownContext>('NueDropdownContext');

// @ref 下拉菜单项的 DOM 元素引用
const dropdownItemRef = ref<HTMLElement>();

// @computed 下拉菜单项的类名
const classes = computed(() => {
    const prefix = 'nue-dropdown-item';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        props.size && `${prefix}--${props.size}`,
        props.disabled && `${prefix}--disabled`,
        props.loading && `${prefix}--loading`
    ];
});

// @computed 下拉菜单项的图标名称
const iconName = computed(() => {
    return props.loading ? props.loadingIcon || 'loading' : props.icon || '';
});

// @computed 下拉菜单项是否禁用
const disabled = computed(() => props.loading || props.disabled);

// @method 执行下拉菜单项的操作
const handleExecute = () => {
    if (disabled.value) return;
    dropdownContext?.execute(props.executeId, props.closeWhenExecuted);
};
</script>

<template>
    <li
        ref="dropdownItemRef"
        :class="classes"
        :data-executeid="disabled ? void 0 : executeId"
        @click.stop="handleExecute"
    >
        <nue-icon
            v-if="iconName"
            class="nue-dropdown-item__icon"
            :name="iconName"
            :spin="loading"
        />
        <nue-text class="nue-dropdown-item__text" :clamped="1">
            <slot>{{ text }}</slot>
        </nue-text>
        <nue-div v-if="$slots.append || useSuffixIcon" class="nue-dropdown-item__append">
            <slot name="append"></slot>
            <nue-icon
                v-if="useSuffixIcon"
                class="nue-dropdown-item__append__suffix-icon state-icon"
                name="arrow-right"
            />
        </nue-div>
    </li>
</template>
