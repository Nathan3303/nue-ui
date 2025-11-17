import { ref } from 'vue';
import type {
    NueCollapseEmit,
    NueCollapseProps,
    NueCollapseItemName,
    NueCollapseActivedItemNames
} from './types';

const useCollapse = (props: NueCollapseProps, emit: NueCollapseEmit) => {
    // @state 激活项数组 - 用于子组件检测自己是否处于激活状态
    const activedItemNames = ref<NueCollapseActivedItemNames>([]);

    // @method 设置激活项
    const active = (itemName: NueCollapseItemName) => {
        // 检测 激活项数组 是否包含对应 激活项
        const isActived = activedItemNames.value.includes(itemName);
        // 检测 是否是 手风琴模式
        if (props.accordion) {
            activedItemNames.value = isActived ? [] : [itemName];
            emit('update:modelValue', activedItemNames.value);
            return;
        }
        // 非手风琴模式
        activedItemNames.value = isActived
            ? activedItemNames.value.filter(name => name !== itemName)
            : activedItemNames.value.concat(itemName);
        emit('update:modelValue', activedItemNames.value);
    };

    // @returns
    return { activedItemNames, active };
};

export default useCollapse;
