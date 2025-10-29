import type { VNode } from 'vue';
import type { GlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';

export interface NueConfirmCallerPayload extends GlobalProps, NueGlobalPopupItemProps {
    wrapperId?: string;
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    unuseCancelButton?: boolean;
    loading?: boolean;
    overlayAnimation?: NueGlobalPopupItemProps['animation'];
    overlayCloseAnimation?: NueGlobalPopupItemProps['closeAnimation'];
    onConfirm?: () => unknown;
    beforeOpen?: () => unknown;
    afterOpen?: () => unknown;
    afterConfirm?: () => unknown;
    afterCancel?: () => unknown;
    beforeClose?: () => unknown;
    afterClose?: () => unknown;
}

type NueConfirmIsByCancel = boolean;
type NueConfirmOnConfirmResult = unknown;
type NueConfirmOnConfirmError = Error | string | null;

export type NueConfirmCallerResult = [NueConfirmIsByCancel, NueConfirmOnConfirmResult];

export interface NueConfirmProps extends NueConfirmCallerPayload {
    close: (
        isByCancel: NueConfirmIsByCancel,
        onConfirmResult: NueConfirmOnConfirmResult,
        onConfirmError: NueConfirmOnConfirmError
    ) => void;
    destroy: () => void;
}
