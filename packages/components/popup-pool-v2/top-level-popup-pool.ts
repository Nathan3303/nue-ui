import { h, render } from 'vue';
import NuePopupPoolV2 from './popup-pool-v2.vue';

export function createPopupPoolVNode(id: string) {
    return h(NuePopupPoolV2, { id: id });
}

export function renderPopupPool(id: string, container: HTMLElement) {
    const nuePopupPoolVNode = createPopupPoolVNode(id);
    render(nuePopupPoolVNode, container);
}

export function getPopupPoolElement(id: string): HTMLElement | null {
    return document.getElementById(id);
}

export function useTopLevelPopupPool() {
    const poolId = 'TopLevelNuePopupPool';
    const poolElement = document.getElementById(poolId);
    if (!poolElement) renderPopupPool(poolId, document.body);
    return poolId;
}
