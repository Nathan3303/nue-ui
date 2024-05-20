export type DialogBeforeConfirmType = (done: () => void) => void;

export type DialogPropsType = {
    title?: string;
    modelValue?: boolean;
    width?: string;
    minWidth?: string;
    theme?: string;
    beforeConfirm?: DialogBeforeConfirmType;
};

export type DialogEmitsType = {
    (e: "update:modelValue", value: boolean): void;
    (e: "confirm"): void;
};
