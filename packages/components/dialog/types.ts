export type DialogBeforeConfirmType = (
    done: () => void,
    back: () => void
) => void;

export type DialogPropsType = {
    title?: string;
    modelValue?: boolean;
    width?: string;
    minWidth?: string;
    beforeConfirm?: DialogBeforeConfirmType;
};

export type DialogEmitsType = {
    (e: "update:modelValue", value: boolean): void;
    (e: "confirm"): void;
};
