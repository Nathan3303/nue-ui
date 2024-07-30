import type { IconNameType } from "../icon";

export type MessageType = "success" | "error" | "warning" | "info" | "log";
export type MessageSize = "small" | "large";

export type MessageNodeProps = {
    wrapper: HTMLElement;
    node: HTMLElement;
    icon?: IconNameType;
    type?: MessageType;
    size?: MessageSize;
    message?: string;
    duration?: number;
};

export type MessagePayloadType = {
    message: string;
    type?: MessageType;
    duration?: number;
    icon?: IconNameType;
    size?: MessageSize;
};

export type NueMessageSubFnType = (
    message: string,
    duration?: number,
    icon?: IconNameType,
    size?: MessageSize
) => void;

export type NueMessageType = {
    success: NueMessageSubFnType;
    error: NueMessageSubFnType;
    warn: NueMessageSubFnType;
    info: NueMessageSubFnType;
    log: NueMessageSubFnType;
} & Function;
