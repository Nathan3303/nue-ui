import { nextTick } from 'vue';
import type { Ref } from 'vue';

export const usePopperController = (visible: Ref<boolean>) => {
    let hideTimer: number | null = null;

    const show = (beforeShow?: () => void, afterShow?: () => void) => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
        if (beforeShow) beforeShow();
        visible.value = true;
        nextTick(() => {
            if (afterShow) afterShow();
        });
    };

    const hide = (
        delay: number,
        beforeHide?: () => void,
        afterHide?: () => void
    ) => {
        if (hideTimer) {
            clearTimeout(hideTimer);
            hideTimer = null;
        }
        hideTimer = setTimeout(() => {
            if (beforeHide) beforeHide();
            setTimeout(() => {
                visible.value = false;
                if (afterHide) afterHide();
                hideTimer = null;
            }, delay || 160);
        }) as unknown as number;
    };

    return {
        show,
        hide
    };
};
