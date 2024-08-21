import type { GlobalProps } from "@nue-ui/utils";

export interface NueCheckboxProps extends GlobalProps {
    modelValue?: boolean;
    label?: string;
    name?: string;
    size?: "small" | "large";
    disabled?: boolean;
    loading?: boolean;
    indeterminate?: boolean;
    // value?: string | number;
    // checked?: boolean;
    beforeCheck?: (state: boolean) => boolean | Promise<boolean>;
}

export type NueCheckboxEmits = {
    (event: "update:modelValue", value: boolean): void;
    (event: "change", value: boolean): void;
    (event: "checked"): void;
    (event: "unchecked"): void;
};
