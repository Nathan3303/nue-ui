import type { Ref } from "vue";
import type { GlobalProps } from "@nue-ui/utils";
import type { NueCheckboxProps } from "../checkbox/types";

export type CheckboxName = NueCheckboxProps["name"];

export interface NueCheckboxGroupProps extends GlobalProps {
    modelValue?: CheckboxName[];
    size?: NueCheckboxProps["size"];
    disabled?: NueCheckboxProps["disabled"];
    name?: string;
    useController?: boolean;
    controllerLabel?: string;
    min?: number;
    max?: number;
}

export type NueCheckboxGroupEmits = {
    (event: "update:modelValue", value: CheckboxName[]): void;
};

export type NueCheckboxGroupContext = {
    activeNames: Ref<CheckboxName[]>;
    size?: NueCheckboxProps["size"];
    disabled?: NueCheckboxProps["disabled"];
    maximized: Ref<boolean>;
    minimized: Ref<boolean>;
    pushName: (name: CheckboxName) => void;
    popName: (name: CheckboxName) => void;
    register: (name: CheckboxName) => void;
    unregister: (name: CheckboxName) => void;
};
