export type CallbackType = (isConfirmed: boolean, payload: any) => void;

export type ConfirmNodePropsType = {
    title?: string;
    content?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
    callback: CallbackType;
};

export type PayloadType = {
    wrapperId?: string;
    content: string;
    title?: string;
    confirmButtonText?: string;
    cancelButtonText?: string;
};
