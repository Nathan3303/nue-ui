import { ref, provide, watchEffect } from "vue";
import type { Ref } from "vue";

export type ItemType = string | number;
export type ActiveItemsType = ItemType[];
export type CollapsePropsType = {
    modelValue?: ItemType | ActiveItemsType;
    accordion?: boolean;
};
export type CollapseEmitType = {
    (e: "update:modelValue", value: ItemType | ActiveItemsType): void;
};
export type CollapseContextType = {
    activeItems: Ref<ActiveItemsType>;
    registActiveItem: (item: ItemType) => void;
};

export const useCollapse = (
    props: CollapsePropsType,
    emit: CollapseEmitType
) => {
    const activeItems = ref<ActiveItemsType>([]);

    function setActiveItems(_activeItems: ActiveItemsType) {
        activeItems.value = _activeItems;
        const newValue = props.accordion
            ? activeItems.value[0]
            : activeItems.value;
        emit("update:modelValue", newValue);
    }

    function registActiveItem(item: ItemType) {
        if (props.accordion) {
            setActiveItems([activeItems.value[0] === item ? "" : item]);
        } else {
            const _activeItems = [...activeItems.value];
            const itemIdx = _activeItems.indexOf(item);

            if (itemIdx > -1) {
                _activeItems.splice(itemIdx, 1);
            } else {
                _activeItems.push(item);
            }

            setActiveItems(_activeItems);
        }
    }

    watchEffect(() => {
        if (!props.modelValue) return;
        if (Array.isArray(props.modelValue)) {
            setActiveItems(
                props.accordion ? [props.modelValue[0]] : props.modelValue
            );
        } else {
            setActiveItems([props.modelValue]);
        }
    });

    provide<CollapseContextType>("collapseContext", {
        activeItems,
        registActiveItem,
    });

    return { activeItems, registActiveItem };
};
