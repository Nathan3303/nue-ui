<template>
    <nue-dropdown
        :class="classes"
        :close-when-executed="closeWhenSelected"
        :size="size"
        keepalive
        @execute="handleExecute"
    >
        <template #trigger="{ trigger }">
            <nue-button :disabled="disabled" :size="size" @click="trigger">
                <template v-if="label">{{ label }}</template>
                <nue-text v-else color="gray">{{ placeholder }}</nue-text>
                <template #append>
                    <nue-icon name="select" />
                    <nue-icon
                        v-if="clearable && selectedOption"
                        name="clear"
                        @click.stop="handleClear"
                    />
                </template>
            </nue-button>
        </template>
        <slot />
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed, provide, shallowRef, watch, onMounted } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import NueButton from '../button/button.vue';
import NueDropdown from '../dropdown/dropdown.vue';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import type {
    NueSelectContext,
    NueSelectEmits,
    NueSelectOption,
    NueSelectOptions,
    NueSelectProps,
    NueSelectValue
} from './types';
import { NueSelectContextKey } from './constants';

defineOptions({ name: 'NueSelect' });
const props = withDefaults(defineProps<NueSelectProps>(), {
    closeWhenSelected: true,
    placeholder: 'Select here...',
    clearable: false
});
const emit = defineEmits<NueSelectEmits>();

const selectOptions = shallowRef<NueSelectOptions>([]);
const selectedOption = shallowRef<NueSelectOption | undefined>();

const classes = computed(() => {
    const prefix = 'nue-select';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const label = computed(() => {
    if (!selectedOption.value) return false;
    return selectedOption.value.label;
});

const optionRegister = (option: NueSelectOption) => {
    const _selectOptions = selectOptions.value;
    for (const _option of _selectOptions) {
        if (option.label === _option.label && option.value === _option.value) {
            return;
        }
    }
    selectOptions.value.push(option);
};

const handleClear = () => {
    selectedOption.value = void 0;
    emit('update:modelValue', void 0);
    emit('change', void 0);
};

const handleExecute = (executeId: string) => {
    const _selectOptions = selectOptions.value;
    const shouldSelectedOption = _selectOptions.find(option => option.executeId === executeId);
    console.log(
        '[NueSelect] handle execute:',
        executeId,
        selectOptions.value,
        shouldSelectedOption
    );
    if (!shouldSelectedOption) return;
    selectedOption.value = { ...shouldSelectedOption } as NueSelectOption;
    emit('update:modelValue', shouldSelectedOption.value);
    emit('change', shouldSelectedOption.value);
};

const handleSelect = (newValue: NueSelectValue) => {
    const _selectOptions = selectOptions.value;
    const shouldSelectedOption = _selectOptions.find(option => option.value === newValue);
    if (!shouldSelectedOption) return;
    selectedOption.value = { ...shouldSelectedOption } as NueSelectOption;
};

watch(
    () => props.modelValue,
    newValue => handleSelect(newValue)
);

onMounted(() => handleSelect(props.modelValue));

provide<NueSelectContext>(NueSelectContextKey, {
    optionRegister,
    selectedOption
});
</script>
