import type { Ref } from 'vue';
import type { GlobalProps } from '@nue-ui/utils';
import type { ButtonSize } from '../button';

export type SelectOptionProps = {
    label: string;
    value: unknown;
    disabled?: boolean;
};

export type SelectOption = {
    executeId: string;
} & SelectOptionProps;

export type SelectOptions = SelectOption[];

export interface SelectProps extends GlobalProps {
    modelValue?: unknown;
    placeholder?: string;
    size?: ButtonSize;
    disabled?: boolean;
    hideOnSelect?: boolean;
    clearable?: boolean;
}

export type SelectEmits = {
    (e: 'update:modelValue', value: unknown): void;
    (e: 'change', value: unknown): void;
};

export type SelectOptionRegister = (option: SelectOption) => void;

export type SelectContext = {
    optionRegister: SelectOptionRegister;
    selectedOption: Ref<SelectOption | undefined>;
};
