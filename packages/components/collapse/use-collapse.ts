import { provide, ref, watchEffect } from 'vue';
import type {
    NueCollapseContext,
    NueCollapseEmit,
    NueCollapseProps,
    ActivedCollapseItems,
    CollapseItemName
} from './types';
import { COLLAPSE_CONTEXT_KEY } from './constants';

export function useCollapse(props: NueCollapseProps, emit: NueCollapseEmit) {
    const activedItems = ref<ActivedCollapseItems>([]);

    function setActivedItems(items: ActivedCollapseItems) {
        activedItems.value = items;
        const newValue = props.accordion ? activedItems.value[0] : activedItems.value;
        emit('update:modelValue', newValue);
    }

    function pushActivedItem(item: CollapseItemName) {
        if (props.accordion) {
            setActivedItems([activedItems.value[0] === item ? '' : item]);
            return;
        }
        const items = [...(activedItems.value as CollapseItemName[])];
        const itemIndex = items.indexOf(item);
        if (itemIndex > -1) {
            items.splice(itemIndex, 1);
        } else {
            items.push(item);
        }
        setActivedItems(items);
    }

    watchEffect(() => {
        if (!props.modelValue) return;
        if (Array.isArray(props.modelValue)) {
            setActivedItems(props.accordion ? [props.modelValue[0]] : props.modelValue);
        } else {
            setActivedItems([props.modelValue]);
        }
    });

    provide<NueCollapseContext>(COLLAPSE_CONTEXT_KEY, {
        activedItems,
        pushActivedItem
    });

    return { activedItems, pushActivedItem };
}
