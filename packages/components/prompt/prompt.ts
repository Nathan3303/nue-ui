import PromptNode from "./prompt.vue";
import { createVNode, render } from "vue";
import { usePopupWrapper } from "../popup-wrapper";
import type { PromptClose, PromptPayloadType } from "./types";
import "./prompt.css";

export default (payload: PromptPayloadType) => {
    const popupWrapper = usePopupWrapper(payload.wrapperId);

    return new Promise((resolve, reject) => {
        const promptWrapper = document.createElement("div");
        promptWrapper.classList.add("nue-prompt-wrapper");
        popupWrapper.appendChild(promptWrapper);

        const close: PromptClose = (isConfirmed, payload) => {
            promptWrapper.dataset.closing = "true";
            isConfirmed ? resolve(payload) : reject(payload);
            setTimeout(() => {
                popupWrapper.removeChild(promptWrapper);
            }, 240);
        };

        render(createVNode(PromptNode, { ...payload, close }), promptWrapper);
    });
};
