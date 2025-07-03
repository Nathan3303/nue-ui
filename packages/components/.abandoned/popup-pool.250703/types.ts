import type { GlobalProps } from '@nue-ui/utils';

export type NuePopupPoolMethods = {
    appendChild: (child: HTMLElement) => void;
    removeChild: (child: HTMLElement) => void;
};

export interface NuePopupPoolProps extends GlobalProps {
    id?: string;
}

export type TopPopupPool = {
    id?: string;
    element?: HTMLDivElement;
    isExist?: () => boolean;
};
