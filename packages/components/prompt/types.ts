import type { InputPropsType, InputType, TextareaPropsType } from "../input";
import type { Optional } from "@nue-ui/utils";

export type PromptClose = (isConfirmed: boolean, payload: unknown) => void;
export type PromptValidator = (value: any) => Promise<any> | boolean;
export type PromptBeforeConfirm = (value: any) => Promise<any> | boolean;
export type PromptOnConfirm = (value: any) => Promise<any> | boolean;

export type PromptPropsType = {
    title?: string;
    label?: string;
    placeholder?: string;
    inputType?: InputType;
    inputValue?: InputPropsType["modelValue"] | TextareaPropsType["modelValue"];
    confirmButtonText?: string;
    cancelButtonText?: string;
    closeOnError?: boolean
    close: PromptClose;
    validator?: PromptValidator;
    beforeConfirm?: PromptBeforeConfirm;
    onConfirm?: PromptOnConfirm;
};

export type PromptPayloadType = {
    wrapperId?: string;
} & Optional<PromptPropsType>;
