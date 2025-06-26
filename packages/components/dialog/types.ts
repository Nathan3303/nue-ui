import { GlobalProps } from '@nue-ui/utils';

export type NueDialogHandleClose = (afterAnimation?: () => void) => Promise<void>;

export type NueDialogBeforeConfirm = () => boolean | Promise<boolean>;

export interface NueDialogProps extends GlobalProps {
    title?: string;
    modelValue?: boolean;
    width?: string;
    minWidth?: string;
    beforeConfirm?: NueDialogBeforeConfirm;
    teleportTo?: string;
}

export type NueDialogEmits = {
    (e: 'update:modelValue', value: boolean): void;
    (e: 'confirm'): void;
};
