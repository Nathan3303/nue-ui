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
    // properties
    transparent?: boolean;
    teleportTo?: string;
    text?: string;
    triggerText?: string;
    disabled?: boolean;
    dropType?: NueDropdownDropType;
    placement?: NueDropdownPlacement;
    size?: NueDropdownSize;
    closeWhenExecuted?: boolean;
    group?: NueDropdownGroupId;
    keepalive?: boolean; // Used to solve the nue-select-option register problem
    // methods
    beforeExecute?: () => void;
    afterExecute?: () => void;
}

export type NueDropdownEmits = {
    (e: 'execute', value: string): void;
    (e: 'open'): void;
    (e: 'close'): void;
};

export type NueDropdownGroupId = string;

export type NueDropdownGroupMember = { dropdownId: string; close: () => void };

export type NueDropdownGroup = NueDropdownGroupMember[];

export type NueDropdownGroups = Map<NueDropdownGroupId, NueDropdownGroup>;
