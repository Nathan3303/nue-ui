import { ref } from 'vue';

type InitialValue = boolean | (() => boolean);

export const useLoadingState = (initialValue: InitialValue = false) => {
    const isLoading = ref(initialValue);

    const done = () => (isLoading.value = false);

    const load = (callback: (done: () => void) => void | undefined) => {
        isLoading.value = true;
        if (callback) callback(done);
    };

    const loadSync = (
        action: (fn: (message: unknown) => void) => void | undefined
    ) => {
        isLoading.value = true;
        return new Promise(resolve => {
            action((message: unknown) => {
                isLoading.value = false;
                resolve(message);
            });
        });
    };

    return { isLoading, load, loadSync };
};
