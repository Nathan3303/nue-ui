import { type ShapeProp } from "@nue-ui/utils/types";
import type { IconNameType } from "../icon";

export type InputType = "text" | "password" | "number" | "email" | "textarea";

export type InputCounterType = "off" | "word-limit" | "word-left" | "both";

export type InputShapeType = "rounded" | "noshape";

export type InputPropsType = {
    type?: InputType;
    modelValue?: string | number;
    id?: string;
    theme?: string | string[];
    shape?: ShapeProp;
    icon?: IconNameType;
    placeholder?: string;
    maxlength?: string;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    allowShowPassword?: boolean;
    counter?: InputCounterType;
    width?: string;
    size?: string;
    debounceTime?: number;
    flex?: string;
    name?: string;
};

export type InputEmitsType = {
    (e: "update:modelValue", value: HTMLInputElement["value"]): void;
    (e: "input", value: Event): void;
    (e: "blur", value: Event): void;
};

export type TextareaPropsType = {
    modelValue?: string;
    id?: string;
    placeholder?: string;
    theme?: string | string[];
    shape?: InputShapeType;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    resize?: boolean;
    autosize?: boolean | { minRows?: number; maxRows?: number };
    maxlength?: string;
    counter?: InputCounterType;
    width?: string;
    size?: string;
    debounceTime?: number;
    flex?: string;
};

export type WordCounterProps = {
    mode: InputCounterType;
    length: number;
    maxlength: number;
};
