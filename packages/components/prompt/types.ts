import type { InputType } from "../input";
import type { Optional } from "@nue-ui/utils";

export type CallbackType = (isConfirmed: boolean, payload: any) => void;
export type ValidatorType = (value: any) => boolean;
export type BeforeConfirmType = (value: any) => Promise<any> | boolean;

export type PromptPropsType = {
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

export interface PromptPayloadType extends Optional<PromptPropsType> {
    wrapperId?: string;
}
