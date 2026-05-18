<template>
    <button
        :class="classes"
        :disabled="disabled"
        :style="styles"
        :title="title"
        :type="type"
        @click="handleClick"
    >
        <nue-div
            v-if="$slots.prepend"
            class="nue-button__prepend"
            flex="1"
            align="center"
            justify="start"
            gap="var(--nue-gap-sm)"
        >
            <slot name="prepend" />
        </nue-div>
        <nue-icon
            v-if="iconName"
            :name="iconName"
            :spin="loading"
            :hinting="false"
            class="nue-button__icon"
        />
        <nue-text v-if="$slots.default" class="nue-button__text" :clamped="1">
            <slot />
        </nue-text>
        <nue-div
            v-if="$slots.append"
            class="nue-button__append"
            flex="1"
            align="center"
            justify="end"
            gap="var(--nue-gap-sm)"
        >
            <slot name="append" />
        </nue-div>
    </button>
</template>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { NueIcon } from '../icon';
import { NueText } from '../text';
import { NueDiv } from '../div';
import { parseFlex, parseTheme, throttle } from '@nue-ui/utils';
import { BUTTON_GROUP_CTX_KEY } from '../button-group/constants';
import type { NueButtonGroupCtxType } from '../button-group';
import type { NueButtonProps, NueButtonEmits } from './types';

defineOptions({ name: 'NueButton' });

const ButtonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, {} as NueButtonGroupCtxType);
const emit = defineEmits<NueButtonEmits>();
const props = withDefaults(defineProps<NueButtonProps>(), {
    type: 'button',
    loadingIcon: 'loading',
    useThrottle: false,
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
        '--nue-button-alignment': props.alignment,
        '--nue-button-flex': props.flex && parseFlex(props.flex)
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
