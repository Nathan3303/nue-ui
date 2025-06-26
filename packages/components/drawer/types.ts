import { GlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';

export type NueDrawerOpenFrom = 'left' | 'right' | 'top' | 'bottom';

export type NueDrawerHandleClose = (afterAnimation?: () => void) => Promise<void>;

export type NueDrawerBeforeClose = (done: () => void) => void;

export interface NueDrawerProps extends GlobalProps, NueGlobalPopupItemProps {
    modelValue?: boolean;
    title?: string;
    span?: string;
    minSpan?: string;
    allowCloseByOverlay?: boolean;
    openFrom?: NueDrawerOpenFrom;
    teleportTo?: string;
    beforeClose?: NueDrawerBeforeClose;
}

export type NueDrawerEmits = {
    (e: 'update:modelValue', value: boolean): void;
};
