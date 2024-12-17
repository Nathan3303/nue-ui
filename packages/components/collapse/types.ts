import type { GlobalProps } from '@nue-ui/utils';
import type { Ref } from 'vue';

export type CollapseItemName = string;
export type ActivedCollapseItems = CollapseItemName | CollapseItemName[];

export interface CollapsePropsType extends GlobalProps {
    modelValue?: ActivedCollapseItems;
    accordion?: boolean;
}

export type CollapseItemPropsType = {
    title?: string;
    name?: string | number;
    hideWhenEmpty?: boolean;
};

export type CollapseEmitType = {
    (e: 'update:modelValue', value: ActivedCollapseItems): void;
};

export type CollapseContextType = {
    activedItems: Ref<ActivedCollapseItems>;
    pushActivedItem: (item: CollapseItemName) => void;
};
