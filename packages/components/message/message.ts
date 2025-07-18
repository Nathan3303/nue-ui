import { createVNode, ref, render } from 'vue';
import MessageNodeInner from './message-inner.vue';
import { generateId } from '@nue-ui/utils';
import type { NueMessageCallerPayload, NueMessageCaller } from './types';

const wrapperRef = ref<HTMLElement | null>(null);
const externalWrapperRef = ref<HTMLElement | null>(null);
const wrappers = ref<HTMLElement[]>([]);
const timer = ref<number>();
let time = 0;

// 创建消息容器
const createMessageWrapper = (e: HTMLElement) => {
    let wrapper: HTMLElement | null;
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
};

// 应用消息容器
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

// 处理弹出动作
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

// 创建消息体并弹出
const NueMessage: NueMessageCaller = (payload: NueMessageCallerPayload) => {
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
    const VNode = createVNode(MessageNodeInner, {
        ...payload,
        node: div,
        wrapper: wrapperRef.value
    });
    render(VNode, div);
};

// 魔术方法
NueMessage.success = (message, duration, icon) => {
    NueMessage({ message, type: 'success', duration, icon });
};
NueMessage.error = (message, duration, icon) => {
    NueMessage({ message, type: 'error', duration, icon });
};
NueMessage.warn = (message, duration, icon) => {
    NueMessage({ message, type: 'warning', duration, icon });
};
NueMessage.info = (message, duration, icon) => {
    NueMessage({ message, type: 'info', duration, icon });
};
NueMessage.log = (message, duration, icon) => {
    NueMessage({ message, type: 'log', duration, icon });
};

// 暴露创建消息体函数
export default NueMessage;
