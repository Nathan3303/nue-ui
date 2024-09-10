import type { VNode } from "vue";
import type { GlobalProps, Optional } from "@nue-ui/utils";

export type ConfirmClose = (isConfirmed: boolean) => void;

export interface ConfirmPropsType extends GlobalProps {
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    close: ConfirmClose;
}

export type ConfirmPayloadType = {
    wrapperId?: string;
} & Optional<ConfirmPropsType>;
