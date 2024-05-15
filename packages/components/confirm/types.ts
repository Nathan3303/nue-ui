import type { VNode } from "vue";
import type { Optional } from "@nue-ui/utils";

export type ConfirmCallbackType = (isConfirmed: boolean, payload: any) => void;

export type ConfirmPropsType = {
    title?: string;
    content?: string | VNode;
    confirmButtonText?: string;
    cancelButtonText?: string;
    callback: ConfirmCallbackType;
};

export interface ConfirmPayloadType extends Optional<ConfirmPropsType> {
    wrapperId?: string;
}
