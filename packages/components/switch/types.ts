import type { GlobalProps } from "@nue-ui/utils";

export interface NueSwitchProps extends GlobalProps {
    modelValue?: boolean;
    size?: "small" | "large";
    disabled?: boolean;
}

export type NueSwitchEmits = {
    (event: "update:modelValue", value: boolean): void;
};
