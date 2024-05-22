import type { InputType } from "../../input/types";

export type CallbackType = (isConfirmed: boolean, payload: any) => void;
export type ValidatorType = (value: any) => boolean;
export type BeforeConfirmType = (value: any) => Promise<any> | boolean;

export type PromptInnerPropsType = {
    title?: string;
    label?: string;
    placeholder?: string;
    inputType?: InputType;
    confirmButtonText?: string;
    cancelButtonText?: string;
    callback: CallbackType;
    validator?: ValidatorType;
    beforeConfirm?: BeforeConfirmType;
};

export type PayloadType = {
    wrapperId?: string;
    title?: string;
    label?: string;
    inputType?: InputType;
    placeholder?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    validator?: ValidatorType;
    beforeConfirm?: BeforeConfirmType;
};
