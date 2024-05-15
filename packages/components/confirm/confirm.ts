import ConfirmNode from "./confirm.vue";
import { getPopupWrapper } from "../popup-wrapper/src/popup-wrapper";
import { createVNode, render } from "vue";
import type { ConfirmPayloadType } from "./types";
import "./confirm.css";

export default function (payload: ConfirmPayloadType) {
    const popupWrapper = getPopupWrapper(payload.wrapperId ?? "");

    return new Promise((resolve, reject) => {
        const confirmWrapper = document.createElement("div");
        confirmWrapper.classList.add("nue-confirm-wrapper");
        popupWrapper.appendChild(confirmWrapper);

        function callback(isConfirmed: boolean, payload: any) {
            if (isConfirmed) {
                resolve(payload);
            } else {
                reject(payload);
            }
            popupWrapper.removeChild(confirmWrapper);
        }

        render(
            createVNode(ConfirmNode, { ...payload, callback }),
            confirmWrapper
        );
    });
}
