<script setup lang="ts">
import { computed, inject } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import { NueIcon } from '../icon';
import { NueText } from '../text';
import { NueDiv } from '../div';
import type { NueDropdownContext, NueDropdownItemProps } from './types';

defineOptions({ name: 'NueDropdownItem' });
const props = withDefaults(defineProps<NueDropdownItemProps>(), {
    closeWhenExecuted: false
});

// @inject 从 dropdown 组件提供的上下文获取 execute 方法
const dropdownContext = inject<NueDropdownContext>('NueDropdownContext');

// @computed 下拉菜单项上下文继承
const extendsAttr = computed(() => ({
    size: dropdownContext?.size || props.size,
    disabled: dropdownContext?.disabled || props.disabled
}));

// @computed 下拉菜单项的类名
const classes = computed(() => {
    const prefix = 'nue-dropdown-item';
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        extendsAttr.value.size ? `${prefix}--${extendsAttr.value.size}` : void 0,
        extendsAttr.value.disabled ? `${prefix}--disabled` : void 0,
        props.loading ? `${prefix}--loading` : void 0
    ];
});

// @computed 下拉菜单项的图标名称
const iconName = computed(() => {
    return props.loading ? props.loadingIcon || 'loading' : props.icon || '';
});

// @computed 下拉菜单项是否禁用
const disabled = computed(() => props.loading || extendsAttr.value.disabled);

// @method 执行下拉菜单项的操作
const handleExecute = () => {
    if (disabled.value) return;
    dropdownContext?.execute(props.executeId, props.closeWhenExecuted);
};
</script>

<template>
    <li
        :class="classes"
        :data-executeid="disabled ? void 0 : executeId"
        @click.stop="handleExecute"
    >
        <nue-icon
            v-if="iconName"
            class="nue-dropdown-item__icon"
            :name="iconName"
            :spin="loading"
            :hinting="false"
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
