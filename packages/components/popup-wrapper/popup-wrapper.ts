import { generateId } from "@nue-ui/utils";
import type { popupWrapperFunctions, TopPopupWrapper } from "./types";

const topPopupWrapper: TopPopupWrapper = {
    isExist: function () {
        const element = document.getElementById(this.id as string);
        return !!element;
    },
};
const popupWrappers = new Map<string, HTMLDivElement>();

export function createPopupWrapper() {
    if (topPopupWrapper.element) {
        return topPopupWrapper.element;
    }
    const newWrapper = document.createElement("div");
    newWrapper.classList.add("nue-popup-wrapper");
    newWrapper.id = generateId();
    topPopupWrapper.element = newWrapper;
    document.body.appendChild(newWrapper);
    return newWrapper;
}

export function registerPopupWrapper(element: HTMLDivElement) {
    if (!element.id) {
        element.id = generateId();
    }
    popupWrappers.set(element.id, element);
}

export function unregisterPopupWrapper(element: HTMLDivElement) {
    if (popupWrappers.has(element.id)) {
        popupWrappers.delete(element.id);
    } else if (topPopupWrapper.element === element) {
        topPopupWrapper.element = undefined;
    }
}

export function usePopupWrapper(id?: string) {
    let element: HTMLDivElement | undefined;

    if (id) {
        element = popupWrappers.get(id);
    }

    if (!element && topPopupWrapper.element) {
        element = topPopupWrapper.element;
    } else {
        element = createPopupWrapper();
    }

    const setZIndex = () => {
        const hasChildren = element?.childNodes.length;
        element.dataset.actived = hasChildren ? "true" : "false";
    };

    const appendChild = (child: HTMLElement) => {
        // child.dataset.live = "true";
        element?.appendChild(child);
        setZIndex();
    };

    const removeChild = (child: HTMLElement) => {
        // child.dataset.live = "false";
        element?.removeChild(child);
        setZIndex();
    };

    return { appendChild, removeChild } as popupWrapperFunctions;
}

export function getPopupWrapper(id?: string) {
    return usePopupWrapper(id);
}
