import type { VNode } from 'vue';
import type { GlobalProps, Optional } from '@nue-ui/utils';

export type ConfirmClose = (confirmResult: unknown) => void;

export interface ConfirmPropsType extends GlobalProps {
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    loading?: boolean;
    onConfirm?: () => Promise<string | boolean | undefined> | boolean;
    close: ConfirmClose;
}

export type ConfirmPayloadType = {
    wrapperId?: string;
} & Optional<ConfirmPropsType>;
