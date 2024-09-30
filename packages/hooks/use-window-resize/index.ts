import { onMounted, onUnmounted } from "vue";
import { generateId, debounce } from "@nue-ui/utils";

type Callback = (e: Event) => void;

const cbPool = new Map<string, Set<Callback>>();

const debouncedCaller = debounce((e: Event) => {
    cbPool.forEach((cbSet) => {
        cbSet.forEach((cb: Callback) => {
            requestIdleCallback(() => cb(e));
        });
    });
}, 100);

const resizeHandler = (e: Event) => debouncedCaller(e);

window.addEventListener("resize", resizeHandler, false);

export const useWindowResize = () => {
    const cbSet: Set<Callback> | null = new Set();
    const poolId: string = generateId();

    const addCallback = (callback: Callback) => {
        cbSet.add(callback);
    };

    const removeCallback = (callback: Callback) => {
        cbSet.delete(callback);
    };

    onMounted(() => {
        if (cbSet.size === 0) return;
        cbPool.set(poolId, cbSet);
    });

    onUnmounted(() => {
        if (cbPool.has(poolId)) {
            cbPool.delete(poolId);
        }
        if (cbPool.size !== 0) return;
        window.removeEventListener("resize", resizeHandler, false);
    });

    return {
        addCallback,
        removeCallback,
    };
};