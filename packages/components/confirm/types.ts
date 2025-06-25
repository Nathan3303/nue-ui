import type { VNode } from 'vue';
import type { GlobalProps, Optional } from '@nue-ui/utils';

export type ConfirmClose = (confirmResult: unknown) => void;
export type NueConfirmAnimation = string | { name: string; duration?: number };

export interface NueConfirmProps extends GlobalProps {
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    unuseCancelButton?: boolean;
    loading?: boolean;
    onConfirm?: () => Promise<string | boolean | undefined> | boolean;
    close: ConfirmClose;
    animation?: NueConfirmAnimation;
    closeAnimation?: NueConfirmAnimation;
}

export type NueConfirmPayload = {
    wrapperId?: string;
} & Optional<NueConfirmProps>;
