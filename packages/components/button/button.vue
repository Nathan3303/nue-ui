<template>
    <button
        :class="classes"
        :disabled="disabled"
        :style="styles"
        :title="title"
        :type="type"
        @click="handleClick"
    >
        <nue-icon
            v-if="iconName"
            :name="iconName"
            :spin="loading"
            class="nue-button__icon"
        />
        <slot name="prepend" />
        <div v-if="$slots.default" class="nue-button__text">
            <slot />
        </div>
        <slot name="append" />
    </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { parseFlex, parseTheme, throttle } from '@nue-ui/utils';
import { BUTTON_GROUP_CTX_KEY } from '../button-group/constants';
import { NueIcon } from '..';
import type { ButtonEmitsType, ButtonPropsType } from './types';
import type { ButtonGroupCtxType } from '../button-group';
import './button.css';

defineOptions({ name: 'NueButton' });

const ButtonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, {} as ButtonGroupCtxType);
const emit = defineEmits<ButtonEmitsType>();
const props = withDefaults(defineProps<ButtonPropsType>(), {
    type: 'button',
    loadingIcon: 'loading',
    throttleDuration: 200
});

const iconName = computed(() => {
    const { loading, loadingIcon, icon } = props;
    return loading ? loadingIcon : icon;
});

const disabled = computed(() => {
    const { disabled, loading } = props;
    return ButtonGroupCtx?.disabled || disabled || loading;
});

const styles = computed(() => {
    const { flex, align } = props;
    return {
        '--align-y': align,
        '--flex': flex && parseFlex(flex)
    };
});

const classes = computed(() => {
    const { theme, flat, size } = props;
    let list: string[] = [];
    const prefix = 'nue-button';
    list.push(prefix);
    if (theme) list = list.concat(parseTheme(theme, prefix));
    if (size || ButtonGroupCtx.size) {
        let _size = size || ButtonGroupCtx.size;
        list.push(`${prefix}--${_size}`);
    }
    if (disabled.value) list.push(`${prefix}--disabled`);
    if (flat) list.push(`${prefix}--flat`);
    return list;
});

const throttledClick = throttle(e => {
    emit('click', e as MouseEvent);
}, props.throttleDuration);

function handleClick(e: MouseEvent) {
    if (props.useThrottle) {
        throttledClick(e);
    } else {
        emit('click', e);
    }
}
</script>
