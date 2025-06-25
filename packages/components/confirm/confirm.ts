import ConfirmNode from './confirm.vue';
import { usePopupPool } from '../popup-pool';
import { createVNode, render } from 'vue';
import { isString, isNumber } from 'lodash-es';
import type { NueConfirmPayload } from './types';

export default function (payload: NueConfirmPayload) {
    const popupPool = usePopupPool(payload.wrapperId);

    return new Promise((resolve, reject) => {
        const popupOverlay = document.createElement('div');
        popupOverlay.classList.add('nue-overlay');
        popupOverlay.classList.add('nue-confirm-overlay');
        popupPool.appendChild(popupOverlay);

        const removeChild = () => {
            const customTimeout = isString(payload.closeAnimation)
                ? 240
                : payload.closeAnimation?.duration;
            const timeout = isNumber(customTimeout) ? customTimeout : 240;
            popupOverlay.dataset.closing = 'true';
            popupOverlay.style.animationDuration = `${timeout}ms`;
            setTimeout(() => {
                popupPool.removeChild(popupOverlay);
            }, timeout);
        };

        const close = async (confirmResult: boolean | string | Error | undefined) => {
            removeChild();
            confirmResult instanceof Error || !confirmResult
                ? reject(confirmResult)
                : resolve(confirmResult);
        };

        render(createVNode(ConfirmNode, { ...payload, close }), popupOverlay);
    });
}
