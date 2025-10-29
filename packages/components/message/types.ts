export type NueMessageType = 'success' | 'error' | 'warning' | 'info' | 'log';

export type NueMessageSize = 'small' | 'large';

export type NueMessageNodeProps = {
    wrapper: HTMLElement;
    node: HTMLElement;
    icon?: string;
    type?: NueMessageType;
    size?: NueMessageSize;
    message?: string;
    duration?: number;
};

export type NueMessageCallerPayload = {
    message: string;
    type?: NueMessageType;
    duration?: number;
    icon?: string;
    size?: NueMessageSize;
};

export type NueMessageSubCaller = (
    message: string,
    duration?: number,
    icon?: string,
    size?: NueMessageSize
) => void;

export interface NueMessageCaller {
    (payload: NueMessageCallerPayload): void;

    success: NueMessageSubCaller;
    error: NueMessageSubCaller;
    warn: NueMessageSubCaller;
    info: NueMessageSubCaller;
    log: NueMessageSubCaller;
}
