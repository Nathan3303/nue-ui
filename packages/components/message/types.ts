import type { VNode } from 'vue';

export type NueMessageType = 'success' | 'error' | 'warning' | 'info' | 'log';

export type NueMessageSize = 'small' | 'large';

export type NueMessageExtensionCtx = {
    close: () => void;
};

export type NueMessageExtension = string | VNode | ((ctx: NueMessageExtensionCtx) => VNode);

export interface NueMessageHandle {
    close: () => void;
}

export type NueMessageNodeProps = {
    wrapper: HTMLElement;
    node: HTMLElement;
    icon?: string;
    type?: NueMessageType;
    size?: NueMessageSize;
    message?: string;
    duration?: number;
    extension?: NueMessageExtension;
};

export type NueMessageCallerPayload = {
    message: string;
    type?: NueMessageType;
    duration?: number;
    icon?: string;
    size?: NueMessageSize;
    extension?: NueMessageExtension;
};

export type NueMessageSubCaller = (
    message: string,
    duration?: number,
    icon?: string,
    size?: NueMessageSize
) => void;

export interface NueMessageCaller {
    (payload: NueMessageCallerPayload): NueMessageHandle;

    success: NueMessageSubCaller;
    error: NueMessageSubCaller;
    warn: NueMessageSubCaller;
    info: NueMessageSubCaller;
    log: NueMessageSubCaller;
}