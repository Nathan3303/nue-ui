<template>
    <div :class="classes" @click="handleClick">
        <nue-icon :name="iconName" :spin="loading" class="nue-checkbox__icon" />
        <nue-text class="nue-checkbox__label">
            <slot>{{ label }}</slot>
        </nue-text>
    </div>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeUnmount, onMounted } from 'vue';
import { isFunction } from 'lodash-es';
import { generateId, parseTheme } from '@nue-ui/utils';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import { CHECKBOX_GROUP_CTX_KEY } from '../checkbox-group/constants';
import type { NueCheckboxEmits, NueCheckboxProps } from './types';
import type { NueCheckboxGroupContext } from '../checkbox-group/types';
import './checkbox.css';

defineOptions({ name: 'NueCheckbox' });
const props = withDefaults(defineProps<NueCheckboxProps>(), {
    modelValue: void 0,
    disabled: false,
    loading: false,
    name: generateId(4)
});
const emit = defineEmits<NueCheckboxEmits>();

const checkboxGroupCtx = inject<NueCheckboxGroupContext | undefined>(
    CHECKBOX_GROUP_CTX_KEY,
    void 0
);

const checked = computed(() => {
    const { modelValue } = props;
    if (typeof modelValue === 'boolean') return modelValue;
    if (checkboxGroupCtx) {
        const { activeNames } = checkboxGroupCtx;
        const { name } = props;
        return activeNames.value.includes(name);
    }
    return false;
});

const disabled = computed(() => {
    if (props.disabled) return true;
    if (checkboxGroupCtx) {
        const { disabled, maximized, minimized } = checkboxGroupCtx;
        return (
            disabled ||
            (maximized.value && !checked.value) ||
            (minimized.value && checked.value)
        );
    }
    return false;
});

const classes = computed(() => {
    const prefix = 'nue-checkbox';
    let { theme, size } = props;
    if (checkboxGroupCtx) {
        theme = checkboxGroupCtx.theme;
        size = checkboxGroupCtx.size;
    }
    return [
        prefix,
        ...parseTheme(theme, prefix),
        size && `${prefix}--${size}`,
        props.loading && `${prefix}--loading`,
        disabled.value && `${prefix}--disabled`,
        (checked.value || props.indeterminate) && `${prefix}--checked`
    ];
});

const label = computed(() => {
    return props.label || props.name;
});

const iconName = computed(() => {
    const { loading, indeterminate } = props;
    if (loading) return 'loading';
    if (checked.value) return 'square-check-fill';
    if (indeterminate) return 'square-check';
    return 'square';
});

const handleClick = async () => {
    const { loading, beforeCheck } = props;
    if (loading || disabled.value) return;
    if (isFunction(beforeCheck)) {
        try {
            const result = await beforeCheck(checked.value);
            if (!result) return;
        } catch (e) {
            return e;
        }
    }
    handleSetState();
};

const handleSetState = () => {
    const newState = !checked.value;
    if (typeof props.modelValue === 'boolean') {
        emit('update:modelValue', newState);
    } else if (checkboxGroupCtx) {
        const { name } = props;
        const fnName = newState ? 'pushName' : 'popName';
        checkboxGroupCtx[fnName](name);
    } else {
        return;
    }
    emit('change', newState);
    if (newState) {
        emit('checked');
    } else {
        emit('unchecked');
    }
};

onMounted(() => {
    if (!checkboxGroupCtx) return;
    const { name } = props;
    if (name === 'NueCheckboxGroupController') return;
    checkboxGroupCtx.register(name);
});

onBeforeUnmount(() => {
    if (!checkboxGroupCtx) return;
    checkboxGroupCtx.unregister(props.name);
});
</script>
