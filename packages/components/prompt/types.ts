import type { InputPropsType, InputType, TextareaPropsType } from '../input';
import type { Optional } from '@nue-ui/utils';

export type PromptClose = (isConfirmed: boolean, payload: unknown) => void;
export type PromptValidator = (value: unknown) => Promise<unknown> | boolean;
export type PromptBeforeConfirm = (
    value: unknown
) => Promise<unknown> | boolean;
export type PromptOnConfirm = (value: unknown) => Promise<unknown> | boolean;

export type PromptPropsType = {
    title?: string;
    label?: string;
    placeholder?: string;
    inputType?: InputType;
    inputValue?: InputPropsType['modelValue'] | TextareaPropsType['modelValue'];
    confirmButtonText?: string;
    cancelButtonText?: string;
    closeOnError?: boolean;
    close: PromptClose;
    validator?: PromptValidator;
    beforeConfirm?: PromptBeforeConfirm;
    onConfirm?: PromptOnConfirm;
};

export type PromptPayloadType = {
    wrapperId?: string;
} & Optional<PromptPropsType>;
