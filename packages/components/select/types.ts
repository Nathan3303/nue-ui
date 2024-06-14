import type { GlobalProps } from "@nue-ui/utils";

export type SelectOptionRecord = {
    label: string;
    value: unknown;
    disabled?: boolean;
};
export type SelectOption = string | SelectOptionRecord;
export type SelectOptions = SelectOption[];

export interface SelectProps extends GlobalProps {
    options?: SelectOptions;
    modelValue?: string;
    placeholder?: string;
    size?: "small" | "large";
    disabled?: boolean;
}

export type SelectEmits = {
    (e: "update:modelValue", value: unknown): void;
    (e: "change", value: unknown): void;
};
