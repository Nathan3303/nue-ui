import type { GlobalProps } from '@nue-ui/utils';

export type NueDrawerOnCloseDoneFn = () => void;

export type NueDrawerOnClose = (done: NueDrawerOnCloseDoneFn) => void;

export interface NueDrawerProps extends GlobalProps {
    modelValue?: boolean;
    title?: string;
    span?: string;
    minSpan?: string;
    allowCloseByOverlay?: boolean;
    openFrom?: 'left' | 'right' | 'top' | 'bottom';
    teleportTo?: string;
    onClose?: (done: () => void) => unknown;
}

export type NueDrawerEmits = {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'beforeOpen'): void;
    (e: 'afterOpen'): void;
    (e: 'beforeClose'): void;
    (e: 'afterClose'): void;
};
