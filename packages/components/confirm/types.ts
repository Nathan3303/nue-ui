import type { VNode } from "vue";
import type { Optional } from "@nue-ui/utils";

export type ConfirmClose = (isConfirmed: boolean) => void;

export type ConfirmPropsType = {
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    close: ConfirmClose;
};

export type ConfirmPayloadType = {
    wrapperId?: string;
} & Optional<ConfirmPropsType>;
