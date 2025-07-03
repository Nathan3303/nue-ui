import NueConfirm from './confirm.vue';
import { createVNode, render } from 'vue';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueConfirmCallerPayload, NueConfirmCallerReturned } from './types';

export default function NueConfirmCaller(
    payload: NueConfirmCallerPayload
): NueConfirmCallerReturned {
    return new Promise((resolve, reject) => {
        const { popupAnchor, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor(
            payload.wrapperId
        );
        mountPopupAnchor();
        render(
            createVNode(NueConfirm, {
                ...payload,
                close: (confirmResult: NueConfirmCallerReturned) => {
                    confirmResult instanceof Error || !confirmResult
                        ? reject(confirmResult)
                        : resolve(confirmResult);
                },
                destroy: () => {
                    unmountPopupAnchor();
                }
            }),
            popupAnchor
        );
    });
}
