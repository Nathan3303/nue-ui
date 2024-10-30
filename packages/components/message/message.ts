import { ref, createVNode, render } from 'vue';
import MessageNodeInner from './message-inner.vue';
import { generateId } from '@nue-ui/utils';
import type { MessagePayloadType, NueMessageType } from './types';

const wrapperRef = ref<HTMLElement | null>(null);
const externalWrapperRef = ref<HTMLElement | null>(null);
const wrappers = ref<HTMLElement[]>([]);
const timer = ref<number>();
let time = 0;

function createMessageWrapper(e: HTMLElement) {
    let wrapper: HTMLElement | null = null;
    if (externalWrapperRef.value) {
        wrapper = externalWrapperRef.value;
    } else {
        wrapper = document.createElement('div');
        const id = generateId();
        wrapper.id = `nue-message-wrapper--${id}`;
        wrapper.dataset.type = 'external';
        wrapper.classList.add('nue-message');
        e.appendChild(wrapper);
        externalWrapperRef.value = wrapper;
    }
    return wrapper;
}

export function useMessageWrapper(e: HTMLElement) {
    wrapperRef.value = e;
    wrappers.value.push(e);
    return () => {
        wrapperRef.value = null;
        const _wrappers = [...wrappers.value];
        _wrappers.splice(wrappers.value.indexOf(e), 1);
        wrappers.value = _wrappers;
    };
}

export function handlePop(node: HTMLElement, wrapper: HTMLElement) {
    time = timer.value ? time + 24 : 0;
    timer.value = setTimeout(() => {
        try {
            wrapper.removeChild(node);
            if (wrapper.children.length === 0) {
                const dom = document.getElementById(wrapper.id);
                if (!dom && wrapper.dataset.type === 'external') {
                    externalWrapperRef.value = null;
                    wrapperRef.value = null;
                }
            }
        } catch (e) {
            return e;
        }
    }, time) as unknown as number;
}

function NueMessage(payload: MessagePayloadType) {
    if (!wrapperRef.value) {
        if (!externalWrapperRef.value) {
            let target = document.getElementById('app');
            if (!target) {
                target = document.getElementsByTagName('body')[0];
            }
            target.style.position = 'relative';
            wrapperRef.value = createMessageWrapper(target);
        } else {
            wrapperRef.value = externalWrapperRef.value;
        }
    }

    const div = document.createElement('div');
    div.classList.add('nue-message-node');
    wrapperRef.value.appendChild(div);
    const vnode = createVNode(MessageNodeInner, {
        ...payload,
        node: div,
        wrapper: wrapperRef.value
    });
    render(vnode, div);
}

NueMessage.success = (message: string, duration: number, icon: string) => {
    NueMessage({
        message,
        type: 'success',
        duration,
        icon
    } as MessagePayloadType);
};

NueMessage.error = (message: string, duration: number, icon: string) => {
    NueMessage({
        message,
        type: 'error',
        duration,
        icon
    } as MessagePayloadType);
};

NueMessage.warn = (message: string, duration: number, icon: string) => {
    NueMessage({
        message,
        type: 'warning',
        duration,
        icon
    } as MessagePayloadType);
};

NueMessage.info = (message: string, duration: number, icon: string) => {
    NueMessage({
        message,
        type: 'info',
        duration,
        icon
    } as MessagePayloadType);
};

NueMessage.log = (message: string, duration: number, icon: string) => {
    NueMessage({
        message,
        type: 'log',
        duration,
        icon
    } as MessagePayloadType);
};

export default NueMessage as NueMessageType;
