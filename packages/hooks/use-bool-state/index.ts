import { ref } from 'vue';
import type { Ref } from 'vue';

export const useBoolState = (
    initialValue: boolean
): [Ref<boolean>, () => void, (newState: boolean) => void] => {
    const state = ref(initialValue);

    const switchState = () => {
        state.value = !state.value;
    };

    const setState = (newState: boolean) => {
        state.value = newState;
    };

    return [state, switchState, setState];
};
