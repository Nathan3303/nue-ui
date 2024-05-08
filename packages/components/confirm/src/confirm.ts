import { createVNode, render } from "vue";
import ConfirmNodeInner from "./confirm-node-inner.vue";
import { usePopupWrapper, createPopupWrapper } from "../../index";
import "../style/confirm.css";
import type { popupWrapperFunctions } from "../../index";
import type { PayloadType, CallbackType } from "./types";

export default (payload: PayloadType) => {
    const { wrapperId } = payload;
    let wrapper: popupWrapperFunctions | null = null;

    if (wrapperId) {
        wrapper = usePopupWrapper(wrapperId);
    }

    if (!wrapper) {
        console.warn(`[NueConfirm] popupWrapper with id ${wrapperId} not found.`);
        wrapper = createPopupWrapper();
    }

    return new Promise((resolve, reject) => {
        const confirmNode = document.createElement("div");
        confirmNode.classList.add("nue-confirm");
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
            createVNode(ConfirmNodeInner, { ...payload, callback }),
            confirmNode
        );
    });
};
