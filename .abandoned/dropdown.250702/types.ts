import type { GlobalProps } from '@nue-ui/utils';

export interface NueDropdownProps extends GlobalProps {
    // Old
    text?: string;
    hideOnClick?: boolean;
    // New
    disabled?: boolean;
    dropType?: 'click' | 'hover';
    triggerText?: string;
    placement?:
        | 'top-start'
        | 'top-center'
        | 'top-end'
        | 'bottom-start'
        | 'bottom-center'
        | 'bottom-end';
    size?: 'small' | 'large';
    keepAlive?: boolean;
    hideOnClicked?: boolean;
    beforeExecute?: () => void;
    afterExecute?: () => void;
}

export type NueDropdownEmits = {
    (e: 'execute', value: string): void;
};
