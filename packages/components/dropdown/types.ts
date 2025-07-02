import type { GlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';
import type { NueButtonSize } from '../button';

export type NueDropdownPlacement =
    | 'top-start'
    | 'top-center'
    | 'top-end'
    | 'bottom-start'
    | 'bottom-center'
    | 'bottom-end'
    | 'right-start'
    | 'right-center'
    | 'right-end'
    | 'left-start'
    | 'left-center'
    | 'left-end';

export type NueDropdownDropType = 'click' | 'hover';

export type NueDropdownSize = NueButtonSize;

export interface NueDropdownProps extends GlobalProps, NueGlobalPopupItemProps {
    transparent?: boolean;
    teleportTo?: string;
    text?: string;
    triggerText?: string;
    disabled?: boolean;
    dropType?: NueDropdownDropType;
    placement?: NueDropdownPlacement;
    size?: NueDropdownSize;
    closeWhenExecuted?: boolean;
    beforeExecute?: () => void;
    afterExecute?: () => void;
}

export type NueDropdownEmits = {
    (e: 'execute', value: string): void;
    (e: 'open'): void;
    (e: 'close'): void;
};

export type NueDropdownPoolId = string;

export type NueDropdownPoolItem = { id: string; handleDrop: () => void };

export type NueDropdownPool = Map<NueDropdownPoolId, NueDropdownPoolItem[]>;
