import NueConfirm from './confirm.vue';
import { createVNode, render, type VNode } from 'vue';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NueConfirmCallerPayload, NueConfirmCallerResult, NueConfirmProps } from './types';

const NueConfirmCaller = (payload: NueConfirmCallerPayload): Promise<NueConfirmCallerResult> => {
    return new Promise((resolve, reject) => {
        const popupAnchor = usePopupAnchor(payload.wrapperId);
        popupAnchor.mountPopupAnchor();
        let confirmVNode: VNode | null = createVNode(NueConfirm, {
            ...({
                ...payload,
                close: (isByCancel, onConfirmResult, onConfirmError) => {
                    if (onConfirmError) {
                        reject(onConfirmError);
                        return;
                    }
                    resolve([isByCancel, onConfirmResult]);
                },
                destroy: () => {
                    popupAnchor.unmountPopupAnchor();
                    confirmVNode = null;
                }
            } as NueConfirmProps)
        });
        render(confirmVNode, popupAnchor.popupAnchor);
    });
};

export default NueConfirmCaller;
