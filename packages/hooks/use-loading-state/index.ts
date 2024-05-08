import { ref } from "vue";

type InitialValue = boolean | (() => boolean) | undefined;

export const useLoadingState = (initialValue: InitialValue = false) => {
    const isLoading = ref(initialValue);

    function done() {
        isLoading.value = false;
    }

    function load(callback: Function | undefined): void {
        isLoading.value = true;
        if (callback) {
            callback.call(null, done);
        }
    }

    function loadSync(action: Function): Promise<any> {
        isLoading.value = true;
        return new Promise((resolve) => {
            action((message?: any) => {
                isLoading.value = false;
                resolve(message);
            });
        });
    }

    return { isLoading, load, loadSync };
};
