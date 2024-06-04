export type popupWrapperFunctions = {
    appendChild: (child: HTMLElement) => void;
    removeChild: (child: HTMLElement) => void;
};

export type TopPopupWrapper = {
    id?: string;
    element?: HTMLDivElement;
    isExist?: () => boolean;
};
