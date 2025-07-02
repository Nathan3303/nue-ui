import NueConfirm from './confirm.vue';
import { usePopupPoolV2 } from '../popup-pool-v2';
import { createVNode, render } from 'vue';
import type { NueConfirmCallerPayload, NueConfirmCallerReturned } from './types';

export default function NueConfirmCaller(
    payload: NueConfirmCallerPayload
): NueConfirmCallerReturned {
    return new Promise((resolve, reject) => {
        const popupPool = usePopupPoolV2(payload.wrapperId);
        const confirmAnchor = document.createElement('div');
        confirmAnchor.classList.add('nue-confirm-anchor');
        if (!popupPool.element) {
            reject('Popup pool is not exist');
            return;
        }
        popupPool.element.appendChild(confirmAnchor);
        render(
            createVNode(NueConfirm, {
                ...payload,
                close: (confirmResult: NueConfirmCallerReturned) => {
                    confirmResult instanceof Error || !confirmResult
                        ? reject(confirmResult)
                        : resolve(confirmResult);
                },
                destroy: () => {
                    if (!popupPool.element) return;
                    popupPool.element.removeChild(confirmAnchor);
                    popupPool.setZIndex();
                }
            }),
            confirmAnchor
        );
        popupPool.setZIndex();
    });
}
