export type DrawerBeforeCloseType = (done: () => void) => void;

export type DrawerPropsType = {
    title?: string;
    span?: string;
    minSpan?: string;
    beforeClose?: DrawerBeforeCloseType;
    closeByButtonOnly?: boolean;
    openFrom?: "left" | "right" | "top" | "bottom";
};
