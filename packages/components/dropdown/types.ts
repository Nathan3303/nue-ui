import type { GlobalProps } from '@nue-ui/utils';
import type { PopperPlacementV2 } from '@nue-ui/hooks/use-popper-v2';

export type NueDropdownPlacement = PopperPlacementV2;

export type NueDropdownTriggerType = 'click' | 'hover';

export type NueDropdownSize = 'small' | 'large';

export type NueDropdownGroupId = string;

export type NueDropdownGroupMember = { dropdownId: string; close: () => void };

export type NueDropdownGroup = NueDropdownGroupMember[];

export type NueDropdownGroups = Map<NueDropdownGroupId, NueDropdownGroup>;

export interface NueDropdownProps extends GlobalProps {
    transparent?: boolean;
    teleportTo?: string;
    text?: string;
    triggerText?: string;
    disabled?: boolean;
    triggerType?: NueDropdownTriggerType;
    size?: NueDropdownSize;
    placement?: NueDropdownPlacement;
    closeWhenExecuted?: boolean;
    group?: NueDropdownGroupId;
    beforeExecute?: () => void;
    afterExecute?: () => void;
}

export type NueDropdownEmits = {
    (e: 'execute', value: string): void;
    (e: 'open'): void;
    (e: 'close'): void;
    (e: 'beforeOpen'): void;
    (e: 'afterOpen'): void;
    (e: 'beforeClose'): void;
    (e: 'afterClose'): void;
};

export interface NueDropdownItemProps extends GlobalProps {
    text?: string;
    disabled?: boolean;
    executeId?: string;
    size?: NueDropdownSize;
    icon?: string;
    loading?: boolean;
    loadingIcon?: string;
    closeWhenExecuted?: boolean;
    useSuffixIcon?: boolean;
}

export type NueDropdownContext = {
    execute: (executeId: NueDropdownItemProps['executeId'], closeWhenExecuted: boolean) => void;
};
