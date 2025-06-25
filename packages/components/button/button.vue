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
        <nue-text v-if="$slots.default" class="nue-button__text">
            <slot />
        </nue-text>
        <div v-if="$slots.append" class="nue-button__append">
            <slot name="append" />
        </div>
    </button>
</template>

<style src="./button.css"></style>

<script lang="ts" setup>
import { computed, inject } from 'vue';
import { parseFlex, parseTheme, throttle } from '@nue-ui/utils';
import { BUTTON_GROUP_CTX_KEY } from '../button-group/constants';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import type { NueButtonProps, NueButtonEmits } from './types';
import type { ButtonGroupCtxType } from '../button-group';

defineOptions({ name: 'NueButton' });

const ButtonGroupCtx = inject(BUTTON_GROUP_CTX_KEY, {} as ButtonGroupCtxType);
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
