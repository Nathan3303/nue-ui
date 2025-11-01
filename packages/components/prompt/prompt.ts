import NuePrompt from './prompt.vue';
import { createVNode, render, type VNode } from 'vue';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NuePromptCallerPayload, NuePromptCallerResult, NuePromptProps } from './types';

const nuePromptCaller = (payload: NuePromptCallerPayload): Promise<NuePromptCallerResult> => {
    return new Promise((resolve, reject) => {
        const popupAnchor = usePopupAnchor(payload.wrapperId);
        popupAnchor.mountPopupAnchor();
        let promptVNode: VNode | null = createVNode(NuePrompt, {
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
                    promptVNode = null;
                }
            } as NuePromptProps)
        });
        render(promptVNode, popupAnchor.popupAnchor);
    });
};

export default nuePromptCaller;
