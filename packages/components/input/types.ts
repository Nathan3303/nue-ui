import { type ShapeProp } from "@nue-ui/utils/types";

export type InputType = "text" | "password" | "number" | "email" | "url";
export type InputCounterType = "off" | "word-limit" | "word-left" | "both";
export type InputShapeType = "square" | "round" | "no-shape";

export type InputPropsType = {
    type?: InputType;
    modelValue?: string | number;
    id?: string;
    theme?: string | string[];
    shape?: ShapeProp;
    icon?: string;
    prefix?: string;
    suffix?: string;
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
};

export type InputEmitsType = {
    (e: "update:modelValue", value: string | number): void;
    (e: "input", value: InputEvent): void;
    (e: "blur", value: FocusEvent): void;
};

export type TextareaPropsType = {
    modelValue?: string;
    id?: string;
    placeholder?: string;
    theme?: string | string[];
    shape?: ShapeProp;
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
