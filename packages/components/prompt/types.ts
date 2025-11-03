import type { NueInputProps, NueInputType, NueTextareaProps } from '../input';
import type { GlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';

type NuePromptErrorRaw = string | Error | null;
type NuePromptError = NuePromptErrorRaw | Promise<NuePromptErrorRaw>;

export interface NuePromptCallerPayload extends GlobalProps, NueGlobalPopupItemProps {
    wrapperId?: string;
    title?: string;
    description?: string;
    placeholder?: string;
    inputType?: NueInputType;
    inputValue?: NueInputProps['modelValue'] | NueTextareaProps['modelValue'];
    confirmButtonText?: string;
    cancelButtonText?: string;
    overlayAnimation?: NueGlobalPopupItemProps['animation'];
    overlayCloseAnimation?: NueGlobalPopupItemProps['closeAnimation'];
    validator?: (value: unknown) => NuePromptError;
    // beforeConfirm?: (value: unknown) => void | Promise<void>;
    onConfirm?: (value: unknown, done: () => void) => NuePromptError;
    afterConfirm?: () => void | Promise<void>;
    afterCancel?: () => void | Promise<void>;
    beforeOpen?: () => void;
    afterOpen?: () => void;
    beforeClose?: () => void;
    afterClose?: () => void;
}

type NuePromptIsByCancel = boolean;
type NuePromptInputValue = unknown;
type NuePromptOnConfirmError = Error | string | null;

export type NuePromptCallerResult = [NuePromptIsByCancel, NuePromptInputValue];

export interface NuePromptProps extends NuePromptCallerPayload {
    close: (
        isByCancel: NuePromptIsByCancel,
        inputValue: NuePromptInputValue,
        onConfirmError: NuePromptOnConfirmError
    ) => void;
    destroy: () => void;
}
