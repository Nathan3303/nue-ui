import type { GlobalProps } from '@nue-ui/utils';

export type NueDatePickerType = 'date' | 'datetime';

export type NueDatePickerValue = string | null | undefined;

export interface NueDatePickerProps extends GlobalProps {
    modelValue?: NueDatePickerValue;
    type?: NueDatePickerType;
    placeholder?: string;
    disabled?: boolean;
    clearable?: boolean;
}

export type NueDatePickerEmits = {
    (e: 'update:modelValue', value: NueDatePickerValue): void;
    (e: 'change', value: NueDatePickerValue): void;
    (e: 'clear'): void;
};
