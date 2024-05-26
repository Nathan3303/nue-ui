import type { SizeProp } from "@nue-ui/utils";

export type MessageType = "success" | "error" | "warning" | "info" | "log";

export type MessageNodeProps = {
    wrapper: HTMLElement;
    node: HTMLElement;
    icon?: string;
    type?: MessageType;
    size?: SizeProp;
    message?: string;
    duration?: number;
};

export type MessagePayloadType = {
    message: string;
    type?: MessageType;
    duration?: number;
    icon?: string;
};

export type NueMessageSubFnType = (
    message: string,
    duration?: number,
    icon?: string
) => void;

export type NueMessageType = {
    success: NueMessageSubFnType;
    error: NueMessageSubFnType;
    warn: NueMessageSubFnType;
    info: NueMessageSubFnType;
    log: NueMessageSubFnType;
} & Function;
