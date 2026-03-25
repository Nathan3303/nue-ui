import { generateId } from '@nue-ui/utils';
import type { NuePopupPoolMethods, TopPopupPool } from './types';

const topPopupPool: TopPopupPool = {
    isExist: function () {
        const element = document.getElementById(this.id as string);
        return !!element;
    }
};

const popupPools = new Map<string, HTMLDivElement>();

export function createPopupPool() {
    if (topPopupPool.element) {
        return topPopupPool.element;
    }
    const newPool = document.createElement('div');
    newPool.classList.add('nue-popup-pool');
    newPool.id = generateId();
    topPopupPool.element = newPool;
    document.body.appendChild(newPool);
    return newPool;
}

export function registerPopupPool(element: HTMLDivElement) {
    if (!element.id) {
        element.id = generateId();
    }
    popupPools.set(element.id, element);
}

export function unregisterPopupPool(element: HTMLDivElement) {
    if (popupPools.has(element.id)) {
        popupPools.delete(element.id);
    } else if (topPopupPool.element === element) {
        topPopupPool.element = undefined;
    }
}

export function usePopupPool(id?: string) {
    let element: HTMLDivElement | undefined;

    if (id) {
        element = popupPools.get(id);
    }

    if (!element && topPopupPool.element) {
        element = topPopupPool.element;
    } else {
        element = createPopupPool();
    }

    const setZIndex = () => {
        const hasChildren = element?.childNodes.length;
        element.dataset.actived = hasChildren ? 'true' : 'false';
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

    return { appendChild, removeChild } as NuePopupPoolMethods;
}

export function getPopupPool(id?: string) {
    return usePopupPool(id);
}
