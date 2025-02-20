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
        <div v-if="$slots.default" class="nue-button__text">
            <slot />
        </div>
        <div v-if="$slots.append" class="nue-button__append">
            <slot name="append" />
        </div>
    </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { parseFlex, parseTheme, throttle } from '@nue-ui/utils';
import { BUTTON_GROUP_CTX_KEY } from '../button-group/constants';
import { NueIcon } from '../icon';
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
    return props.loading ? props.loadingIcon : props.icon;
});

const disabled = computed(() => {
    return ButtonGroupCtx?.disabled || props.disabled || props.loading;
});

const styles = computed(() => {
    return {
        '--alignment': props.alignment,
        '--flex': props.flex && parseFlex(props.flex)
    };
});

const classes = computed(() => {
    const prefix = 'nue-button';
    const _size = props.size || ButtonGroupCtx.size;
    return [
        prefix,
        ...parseTheme(props.theme, prefix),
        _size && `${prefix}--${_size}`,
        disabled.value && `${prefix}--disabled`,
        props.flat && `${prefix}--flat`
    ];
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
