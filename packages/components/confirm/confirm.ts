import ConfirmNode from "./confirm.vue";
import { usePopupWrapper } from "../popup-wrapper";
import { createVNode, render } from "vue";
import type { ConfirmPayloadType } from "./types";
import "./confirm.css";

export default function (payload: ConfirmPayloadType) {
    const popupWrapper = usePopupWrapper(payload.wrapperId);

    return new Promise((resolve, reject) => {
        const confirmWrapper = document.createElement("div");
        confirmWrapper.classList.add("nue-confirm-wrapper");
        popupWrapper.appendChild(confirmWrapper);

        const removeChild = () => {
            confirmWrapper.dataset.closing = "true";
            setTimeout(() => {
                popupWrapper.removeChild(confirmWrapper);
            }, 240);
        };

        const close = async (confirmResult: any) => {
            if (confirmResult instanceof Error || !confirmResult) {
                reject(confirmResult);
            } else {
                resolve(confirmResult);
            }
            removeChild();
        };

        render(createVNode(ConfirmNode, { ...payload, close }), confirmWrapper);
    });
}
