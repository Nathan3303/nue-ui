import type { VNode } from 'vue';
import type { GlobalProps, NueGlobalPopupItemProps, NuePopupItemAnimation } from '@nue-ui/utils';

export interface NueConfirmCallerPayload extends GlobalProps, NueGlobalPopupItemProps {
    wrapperId?: string;
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    unuseCancelButton?: boolean;
    loading?: boolean;
    overlayAnimation?: NuePopupItemAnimation;
    overlayCloseAnimation?: NuePopupItemAnimation;
    onConfirm?: () => Promise<unknown> | unknown;
}

export type NueConfirmCallerReturnedUnpromise = unknown;

export type NueConfirmCallerReturned = Promise<NueConfirmCallerReturnedUnpromise>;

export interface NueConfirmProps extends NueConfirmCallerPayload {
    close: (confirmResult: NueConfirmCallerReturnedUnpromise) => void;
    destroy: () => void;
}
