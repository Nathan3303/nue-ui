import PromptNode from './prompt.vue';
import { createVNode, render } from 'vue';
import { usePopupPool } from '../popup-pool';
import type { PromptClose, PromptPayloadType } from './types';
import './prompt.css';

export default (payload: PromptPayloadType) => {
    const popupPool = usePopupPool(payload.wrapperId);

    return new Promise((resolve, reject) => {
        const promptWrapper = document.createElement('div');
        promptWrapper.classList.add('nue-confirm-prompt-wrapper');
        popupPool.appendChild(promptWrapper);

        const removeChild = () => {
            promptWrapper.dataset.closing = 'true';
            setTimeout(() => {
                popupPool.removeChild(promptWrapper);
            }, 240);
        };

        const close: PromptClose = (isConfirmed, payload) => {
            if (isConfirmed) {
                resolve(payload);
            } else {
                reject(payload);
            }
            removeChild();
        };

        render(createVNode(PromptNode, { ...payload, close }), promptWrapper);
    });
};
