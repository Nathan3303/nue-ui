<template>
    <nue-dropdown
        :class="classes"
        :hide-on-clicked="hideOnSelect"
        :keep-alive="!!$slots.default"
        :size="size"
        @execute="handleExecute"
    >
        <template #default="{ clickTrigger }">
            <nue-button :disabled="disabled" :size="size" @click="clickTrigger">
                <template #default>
                    <template v-if="label">{{ label }}</template>
                    <nue-text v-else color="gray">
                        {{ placeholder }}
                    </nue-text>
                </template>
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
        <template #dropdown>
            <slot />
        </template>
    </nue-dropdown>
</template>

<script lang="ts" setup>
import { computed, onMounted, provide, ref, watch } from 'vue';
import { parseTheme } from '@nue-ui/utils';
import NueButton from '../button/button.vue';
import NueDropdown from '../dropdown/dropdown.vue';
import NueIcon from '../icon/icon.vue';
import NueText from '../text/text.vue';
import type {
    SelectContext,
    SelectEmits,
    SelectOption,
    SelectProps
} from './types';

defineOptions({ name: 'NueSelect' });

const emit = defineEmits<SelectEmits>();
const props = withDefaults(defineProps<SelectProps>(), {
    hideOnSelect: true,
    placeholder: '请选择',
    clearable: false
});

const options = ref<SelectOption[]>([]);
const selectedOption = ref<SelectOption>();

const classes = computed(() => {
    const prefix = 'nue-select';
    return [prefix, ...parseTheme(props.theme, prefix)];
});

const label = computed(() => {
    return selectedOption.value && selectedOption.value?.label;
});

function optionRegister(option: SelectOption) {
    options.value.push(option);
}

function handleExecute(executeId: string) {
    handleSelect(executeId);
}

function handleSelect(payload: unknown, isParseMV = false) {
    let _option: SelectOption | undefined = void 0;
    if (isParseMV) {
        if (selectedOption.value && payload === selectedOption.value.value) {
            return;
        }
        for (const option of options.value) {
            if (payload === option.value) {
                _option = option;
                break;
            }
        }
    } else {
        if (
            selectedOption.value &&
            payload === selectedOption.value.executeId
        ) {
            return;
        }
        for (const option of options.value) {
            if ((payload as string) === option.executeId) {
                _option = option;
                break;
            }
        }
        emit('update:modelValue', _option?.value);
        emit('change', _option?.value);
    }
    selectedOption.value = _option || void 0;
}

function handleClear() {
    selectedOption.value = void 0;
    emit('update:modelValue', void 0);
    emit('change', void 0);
}

watch(
    () => props.modelValue,
    newValue => {
        handleSelect(newValue, true);
    }
);

onMounted(() => {
    handleSelect(props.modelValue, true);
});

provide<SelectContext>('SelectContext', {
    optionRegister,
    selectedOption
});
</script>
