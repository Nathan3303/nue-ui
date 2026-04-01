<template>
    <nue-dropdown
        :class="classes"
        :disabled="disabled"
        placement="bottom-start"
        @close="emit('close')"
    >
        <template #trigger="{ trigger }">
            <nue-button :size="size" :disabled="disabled" @click="trigger">
                <template v-if="modelValue">{{ displayValue }}</template>
                <span v-else style="color: gray">{{ realPlaceholder }}</span>
                <template #append>
                    <nue-icon name="calendar" />
                    <nue-icon
                        v-if="clearable && modelValue"
                        name="clear"
                        @click.stop="handleClear"
                    />
                </template>
            </nue-button>
        </template>
        <date-picker-panel
            :size="size"
            :model-value="modelValue"
            :type="type"
            @update:model-value="handleDateSelect"
            @change="handleChange"
        />
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed, provide } from 'vue';
import { NueButton, NueDropdown, NueIcon } from '@nue-ui/components';
import { parseTheme } from '@nue-ui/utils';
import DatePickerPanel from './date-picker-panel.vue';
import { NUE_DATE_PICKER_CTX_KEY, PLACEHOLDERS } from './constants';
import type {
    NueDatePickerProps,
    NueDatePickerEmits,
    NueDatePickerValue,
    NueDatePickerContext
} from './types';

defineOptions({ name: 'NueDatePicker' });

const props = withDefaults(defineProps<NueDatePickerProps>(), {
    type: 'date',
    placeholder: '',
    disabled: false,
    clearable: false
});

const emit = defineEmits<NueDatePickerEmits>();

provide<NueDatePickerContext>(NUE_DATE_PICKER_CTX_KEY, {
    size: props.size,
    disabled: props.disabled
});

const classes = computed(() => {
    const prefix = 'nue-date-picker';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const realPlaceholder = computed(() => {
    if (props.placeholder) return props.placeholder;
    return PLACEHOLDERS.single;
});

const displayValue = computed(() => {
    return props.modelValue || '';
});

const handleClear = () => {
    emit('update:modelValue', null);
    emit('change', null);
    emit('clear');
};

const handleDateSelect = (value: NueDatePickerValue) => {
    emit('update:modelValue', value);
};

const handleChange = (value: NueDatePickerValue) => {
    emit('change', value);
};
</script>
