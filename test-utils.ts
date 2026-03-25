import { VueWrapper } from '@vue/test-utils';
import { ComponentPublicInstance } from 'vue';

export async function waitFor(condition: () => boolean, timeout = 1000) {
    const start = Date.now();
    while (!condition()) {
        if (Date.now() - start > timeout) {
            throw new Error('Timeout waiting for condition');
        }
        await new Promise(resolve => setTimeout(resolve, 10));
    }
}

export async function flushPromises() {
    return new Promise(resolve => setTimeout(resolve, 0));
}

export function getComponentWrapper<T extends ComponentPublicInstance>(
    wrapper: VueWrapper,
    selector: string
): VueWrapper<T> {
    return wrapper.findComponent(selector) as VueWrapper<T>;
}

export async function nextTick() {
    return new Promise(resolve => setTimeout(resolve, 0));
}
