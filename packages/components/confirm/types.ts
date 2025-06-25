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
    onConfirm?: () => Promise<Error | boolean | string> | boolean;
}

export type NueConfirmCallerReturnedUnpromise = Error | boolean | string;

export type NueConfirmCallerReturned = Promise<Error | boolean | string>;

export interface NueConfirmProps extends NueConfirmCallerPayload {
    close: (confirmResult: NueConfirmCallerReturnedUnpromise) => void;
    destroy: () => void;
}

// export type NueConfirmEmits = {
//     (e: 'close', confirmResult: Error | boolean | string): void;
// };
