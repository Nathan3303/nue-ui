import type { InputPropsType, InputType, TextareaPropsType } from '../input';
import type { Optional } from '@nue-ui/utils';

export type PromptClose = (isConfirmed: boolean, payload: unknown) => void;

export type PromptValidator = (
    value: unknown
) => boolean | Error | Promise<boolean | Error>;

export type PromptBeforeConfirm = (value: unknown) => void;

export type PromptOnConfirm = (
    value: unknown
) => unknown | Error | Promise<unknown | Error>;

export type PromptPropsType = {
    title?: string;
    description?: string;
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
