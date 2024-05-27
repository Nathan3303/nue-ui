import { generateId } from "@nue-ui/utils";
import type { popupWrapperFunctions } from "./types";

const popupWrappers = new Map<string, HTMLElement>();

export function createPopupWrapper() {
    const element = document.createElement("div");
    element.classList.add("nue-popup-wrapper");
    registerPopupWrapper(element);
    document.body.appendChild(element);
    return element;
}

export function removePopupWrapper(id: string) {
    const element = document.getElementById(id);
    if (element && element.parentNode) {
        try {
            element.parentNode.removeChild(element);
            popupWrappers.delete(id);
        } catch (e) {
            console.warn(e);
        }
    }
}

export function registerPopupWrapper(element: HTMLDivElement, id?: string) {
    element.id = id || generateId();
    popupWrappers.set(element.id, element);
}

export function usePopupWrapper(id: string) {
    let element = popupWrappers.get(id);

    if (!element) {
        element = createPopupWrapper();
    }

    function setZIndex() {
        const hasChildren = element?.childNodes.length;
        const activedClassName = "nue-popup-wrapper--actived";
        if (hasChildren) {
            element?.classList.add(activedClassName);
        } else {
            element?.classList.remove(activedClassName);
        }
    }

    const appendChild = (child: HTMLElement) => {
        element?.appendChild(child);
        setZIndex();
    };

    const removeChild = (child: HTMLElement) => {
        element?.removeChild(child);
        setZIndex();
    };

    return { appendChild, removeChild } as popupWrapperFunctions;
}

export function getPopupWrapper(id: string) {
    const wrapper = usePopupWrapper(id);
    if (!wrapper) {
        const newWrapper = createPopupWrapper();
        return usePopupWrapper(newWrapper.id);
    }
    return wrapper;
}
