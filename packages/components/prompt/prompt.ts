import PromptNode from './prompt.vue';
import { createVNode, render } from 'vue';
import { usePopupAnchor } from '@nue-ui/hooks';
import type { NuePromptCaller, NuePromptClose } from './types';

const nuePromptCaller: NuePromptCaller = payload => {
    return new Promise((resolve, reject) => {
        const { popupAnchor, mountPopupAnchor, unmountPopupAnchor } = usePopupAnchor(
            payload.wrapperId
        );
        const close: NuePromptClose = (isConfirmed, payload) => {
            isConfirmed ? resolve(payload) : reject(payload);
        };
        mountPopupAnchor();
        render(
            createVNode(PromptNode, {
                ...payload,
                close,
                destroy: () => unmountPopupAnchor()
            }),
            popupAnchor
        );
    });
};

export default nuePromptCaller;
