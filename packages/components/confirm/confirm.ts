import ConfirmNode from "./confirm.vue";
import { usePopupWrapper } from "../popup-wrapper";
import { createVNode, render } from "vue";
import type { ConfirmClose, ConfirmPayloadType } from "./types";
import "./confirm.css";

export default function (payload: ConfirmPayloadType) {
    const popupWrapper = usePopupWrapper(payload.wrapperId);

    return new Promise((resolve, reject) => {
        const confirmWrapper = document.createElement("div");
        confirmWrapper.classList.add("nue-confirm-wrapper");
        popupWrapper.appendChild(confirmWrapper);

        const close: ConfirmClose = (isConfirmed) => {
            confirmWrapper.dataset.closing = "true";
            isConfirmed ? resolve(true) : reject(false);
            setTimeout(() => {
                popupWrapper.removeChild(confirmWrapper);
            }, 240);
        };

        render(createVNode(ConfirmNode, { ...payload, close }), confirmWrapper);
    });
}
