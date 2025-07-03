import { useTopLevelPopupPool, getPopupPoolElement } from './top-level-popup-pool';

export function usePopupPool(id?: string) {
    const topLevelPopupPoolId = useTopLevelPopupPool();
    const popupPoolElement = getPopupPoolElement(id || topLevelPopupPoolId);

    const setZIndex = () => {
        if (!popupPoolElement) return;
        const hasChildren = popupPoolElement.childNodes.length;
        popupPoolElement.dataset.actived = hasChildren ? 'true' : 'false';
    };

    return { element: popupPoolElement, setZIndex };
}
