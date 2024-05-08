import { generateId } from "@nue-ui/utils";

export interface popupWrapperFunctions {
    appendChild: (element: HTMLElement) => void;
    removeChild: (element: HTMLElement) => void;
}

const popupWrappers = new Map<string, HTMLElement>();

export function createPopupWrapper() {
    const element = document.createElement("div");
    element.classList.add("nue-popup-wrapper");
    registerPopupWrapper(element);
    document.body.appendChild(element);
    return usePopupWrapper(element.id)!;
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
    // console.log("registerPopupWrapper", popupWrappers);
}

export function usePopupWrapper(id: string): popupWrapperFunctions | null {
    const element = popupWrappers.get(id);

    if (!element) return null;

    function setZIndex() {
        const hasChildren = element?.childNodes.length;
        const activedClassName = "nue-popup-wrapper--actived";
        if (hasChildren) {
            element?.classList.add(activedClassName);
        } else {
            element?.classList.remove(activedClassName);
        }
    }

    function appendChild(child: HTMLElement) {
        element?.appendChild(child);
        setZIndex();
        // document.body.style.overflow = "hidden";
    }

    function removeChild(child: HTMLElement) {
        element?.removeChild(child);
        setZIndex();
        // document.body.style.overflow = "auto";
    }

    return { appendChild, removeChild };
}
