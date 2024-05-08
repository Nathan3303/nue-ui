import { type Ref, ref } from "vue";

export type useBoolState_t = [Ref<boolean>, Function, Function];

export const useBoolState = (initialValue: boolean): useBoolState_t => {
    const state = ref(initialValue);

    function switchState() {
        state.value = !state.value;
    }

    function setState(newState: boolean) {
        state.value = newState;
    }

    return [state, switchState, setState];
};
