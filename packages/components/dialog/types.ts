export type DialogBeforeConfirmType = (done: () => void) => void;

export type DialogPropsType = {
    title?: string;
    modelValue?: boolean;
    width?: string;
    minWidth?: string;
    theme?: string;
    closable?: boolean;
    beforeConfirm?: DialogBeforeConfirmType;
};

export type DialogEmitsType = {
    (e: "update:modelValue", value: boolean): void;
    (e: "confirm"): void;
};
