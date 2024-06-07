import type { GlobalProps } from "@nue-ui/utils";
import type { Ref } from "vue";

export type CollapseItemName = string;
export type ActivedCollpaseItems = CollapseItemName | CollapseItemName[];

export interface CollapsePropsType extends GlobalProps {
    modelValue?: ActivedCollpaseItems;
    accordion?: boolean;
}

export type CollapseItemPropsType = {
    title?: string;
    name?: string | number;
    hideWhenEmpty?: boolean;
};

export type CollapseEmitType = {
    (e: "update:modelValue", value: ActivedCollpaseItems): void;
};

export type CollapseContextType = {
    activedItems: Ref<ActivedCollpaseItems>;
    pushActivedItem: (item: CollapseItemName) => void;
};
