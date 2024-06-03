import PromptNode from "./prompt.vue";
import { createVNode, render } from "vue";
import { getPopupWrapper } from "../popup-wrapper";
import type { PromptPayloadType } from "./types";
import "./prompt.css";

export default (payload: PromptPayloadType) => {
    const popupWrapper = getPopupWrapper(payload.wrapperId ?? "");

    return new Promise((resolve, reject) => {
        const confirmNode = document.createElement("div");
        confirmNode.classList.add("nue-prompt-wrapper");
        popupWrapper.appendChild(confirmNode);

        function callback(isConfirmed: boolean, payload: any) {
            if (isConfirmed) {
                resolve(payload);
            } else {
                reject(payload);
            }
            popupWrapper.removeChild(confirmNode);
        }

        render(createVNode(PromptNode, { ...payload, callback }), confirmNode);
    });
};
