import { h, render } from 'vue';
import NuePopupPool from './popup-pool.vue';

export function createPopupPoolVNode(id: string) {
    return h(NuePopupPool, { id: id });
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
