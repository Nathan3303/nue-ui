import type { Ref } from 'vue';
import type { GlobalProps } from '@nue-ui/utils';
import type { NueButtonSize } from '../button';
import type { NueDropdownItemProps } from '../dropdown/types';

export type NueSelectValue =
    | string
    | number
    | boolean
    | Record<never, never>
    | Array<never>
    | null
    | undefined;

export interface NueSelectOptionRaw {
    label: string;
    value: NueSelectValue;
    icon?: NueDropdownItemProps['icon'];
}

export interface NueSelectOption extends NueSelectOptionRaw {
    executeId: string;
}

export type NueSelectOptions = NueSelectOption[];

export interface NueSelectProps extends GlobalProps {
    modelValue?: NueSelectValue;
    placeholder?: string;
    size?: NueButtonSize;
    disabled?: boolean;
    clearable?: boolean;
    persistent?: boolean;
}

export type NueSelectEmits = {
    (e: 'update:modelValue', value: unknown): void;
    (e: 'change', value: unknown): void;
    (e: 'close'): void;
};

export type NueSelectContext = {
    optionRegister: (option: NueSelectOption) => void;
    selectedOption: Ref<NueSelectOption | undefined>;
};

export interface NueSelectOptionProps extends GlobalProps, NueSelectOptionRaw {
    loading?: NueDropdownItemProps['loading'];
    loadingIcon?: NueDropdownItemProps['loadingIcon'];
    disabled?: boolean;
}
