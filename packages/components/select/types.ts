import type { GlobalProps } from "@nue-ui/utils";
import type { Ref } from "vue";

export type SelectOptionProps = {
    label: string;
    value: unknown;
    disabled?: boolean;
};

export type SelectOption = SelectOptionProps;

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

export type SelectOptionRegister = (option: SelectOption) => void;

export type SelectContext = {
    optionRegister: SelectOptionRegister;
    selectedOption: Ref<SelectOption | undefined>;
};
