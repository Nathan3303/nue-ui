import type { GlobalProps } from '@nue-ui/utils';

export interface NueSwitchProps extends GlobalProps {
    modelValue?: boolean;
    size?: 'small' | 'large';
    disabled?: boolean;
    loading?: boolean;
    showText?: boolean;
    activeText?: string;
    inactiveText?: string;
    beforeSwitch?: (value: boolean) => Promise<boolean | void> | boolean | void;
}

export type NueSwitchEmits = {
    (event: 'update:modelValue', value: boolean): void;
    (event: 'change', value: boolean): void;
};
