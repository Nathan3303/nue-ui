import type { InputType } from "../input";
import type { Optional } from "@nue-ui/utils";

export type PromptClose = (isConfirmed: boolean, payload: unknown) => void;
export type PromptValidator = (value: any) => boolean;
export type PromptBeforeConfirm = (value: any) => Promise<any> | boolean;

export type PromptPropsType = {
    title?: string;
    label?: string;
    placeholder?: string;
    inputType?: InputType;
    confirmButtonText?: string;
    cancelButtonText?: string;
    close: PromptClose;
    validator?: PromptValidator;
    beforeConfirm?: PromptBeforeConfirm;
};

// export interface PromptPayloadType extends Optional<PromptPropsType> {
//     wrapperId?: string;
// }

export type PromptPayloadType = {
    wrapperId?: string;
} & Optional<PromptPropsType>;
