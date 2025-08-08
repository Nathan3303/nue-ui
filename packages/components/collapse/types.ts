import type { GlobalProps } from '@nue-ui/utils';
import type { Ref } from 'vue';

export type CollapseItemName = string;
export type ActivedCollapseItems = CollapseItemName | CollapseItemName[];

export interface NueCollapseProps extends GlobalProps {
    modelValue?: ActivedCollapseItems;
    accordion?: boolean;
}

export type NueCollapseEmit = {
    (e: 'update:modelValue', value: ActivedCollapseItems): void;
};

export interface NueCollapseItemProps extends GlobalProps {
    title?: string;
    name?: string | number;
    hideWhenEmpty?: boolean;
}

export type NueCollapseContext = {
    activedItems: Ref<ActivedCollapseItems>;
    pushActivedItem: (item: CollapseItemName) => void;
};
