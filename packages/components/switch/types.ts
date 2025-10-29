import type { GlobalProps } from '@nue-ui/utils';

export type NueSwitchSize = 'small' | 'normal' | 'large';

export interface NueSwitchProps extends GlobalProps {
    // properties
    modelValue?: boolean;
    size?: NueSwitchSize;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    showText?: boolean;
    activeText?: string;
    inactiveText?: string;
    // methods
    beforeSwitch?: (value: boolean) => Promise<boolean>;
}

export type NueSwitchEmits = {
    (event: 'update:modelValue', value: boolean): void;
    (event: 'change', value: boolean): void;
};
