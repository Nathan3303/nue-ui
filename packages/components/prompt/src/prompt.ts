import { createVNode, render } from "vue";
import promptNodeInner from "./prompt-inner.vue";
import { usePopupWrapper, createPopupWrapper } from "../../popup-wrapper/index";
import "../style/prompt.css";
import type { popupWrapperFunctions } from "../../popup-wrapper/index";
import type { PayloadType, CallbackType } from "./types";

export default (payload: PayloadType) => {
    const { wrapperId } = payload;
    let wrapper: popupWrapperFunctions | null = null;

    if (wrapperId) {
        wrapper = usePopupWrapper(wrapperId);
    }

    if (!wrapper) {
        wrapper = createPopupWrapper();
    }

    return new Promise((resolve, reject) => {
        const confirmNode = document.createElement("div");
        confirmNode.classList.add("nue-prompt");
        wrapper.appendChild(confirmNode);

        const callback: CallbackType = (isConfirmed, payload) => {
            if (isConfirmed) {
                resolve(payload);
            } else {
                reject(payload);
            }
            wrapper.removeChild(confirmNode);
        };

        render(
            createVNode(promptNodeInner, { ...payload, callback }),
            confirmNode
        );
    });
};
