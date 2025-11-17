import type { Ref } from 'vue';
import type { GlobalProps } from '@nue-ui/utils';

export type NueCollapseItemName = string;

export type NueCollapseActivedItemNames = NueCollapseItemName[];

export interface NueCollapseProps extends GlobalProps {
    modelValue?: NueCollapseActivedItemNames;
    accordion?: boolean;
}

export type NueCollapseEmit = {
    (e: 'update:modelValue', value: NueCollapseActivedItemNames): void;
};

export type NueCollapseContext = {
    active: (itemName: NueCollapseItemName) => void;
    activedItemNames: Ref<NueCollapseItemName[]>;
};

export interface NueCollapseItemProps extends GlobalProps {
    title?: string;
    name?: string;
    maxHeight?: string;
}
