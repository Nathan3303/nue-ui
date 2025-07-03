import type { NueInputProps, NueInputType, NueTextareaProps } from '../input';
import type { GlobalProps, NueGlobalPopupItemProps, NuePopupItemAnimation } from '@nue-ui/utils';

export type NuePromptClose = (isConfirmed: boolean, payload: unknown) => void;

export type NuePromptValidator = (value: unknown) => boolean | Error | Promise<boolean | Error>;

export type NuePromptBeforeConfirm = (value: unknown) => void;

export type NuePromptOnConfirm = (value: unknown) => unknown | Error | Promise<unknown | Error>;

export interface NuePromptCallerPayload {
    wrapperId?: string;
    title?: string;
    description?: string;
    placeholder?: string;
    inputType?: NueInputType;
    inputValue?: NueInputProps['modelValue'] | NueTextareaProps['modelValue'];
    confirmButtonText?: string;
    cancelButtonText?: string;
    closeOnError?: boolean;
    validator?: NuePromptValidator;
    beforeConfirm?: NuePromptBeforeConfirm;
    onConfirm?: NuePromptOnConfirm;
}

export type NuePromptCaller = (payload: NuePromptCallerPayload) => Promise<unknown>;

export interface NuePromptProps
    extends NuePromptCallerPayload,
        GlobalProps,
        NueGlobalPopupItemProps {
    overlayAnimation?: NuePopupItemAnimation;
    overlayCloseAnimation?: NuePopupItemAnimation;
    close: NuePromptClose;
    destroy: () => void;
}
