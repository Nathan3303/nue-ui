import { createVNode, render } from "vue";
import dialog from "./dialog.vue";
import { getPopupWrapper } from "../popup-wrapper/src/popup-wrapper";
import "./dialog.css";

export default function () {
    const wrapper = getPopupWrapper("");

    const dialogVNode = createVNode(dialog);

    const dialogWrapper = document.createElement("div");
    dialogWrapper.className = "dialog-wrapper";
    wrapper.appendChild(dialogWrapper);

    render
}
