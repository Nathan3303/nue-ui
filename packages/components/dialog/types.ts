import type { GlobalProps } from '@nue-ui/utils';

export interface NueDialogProps extends GlobalProps {
    modelValue?: boolean;
    teleportTo?: string;
    title?: string;
}

export type NueDialogEmits = {
    (e: 'update:modelValue', value: NueDialogProps['modelValue']): void;
    (e: 'confirm'): void;
    (e: 'beforeOpen'): void;
    (e: 'afterOpen'): void;
    (e: 'beforeClose'): void;
    (e: 'afterClose'): void;
};
