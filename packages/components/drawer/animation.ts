import type { NueDrawerOpenFrom } from './types';

export const playDrawerAnimation = (options: {
    visible: boolean;
    openFrom: NueDrawerOpenFrom;
    span: string;
    minSpan: string;
    elementRef: HTMLDivElement;
}) => {
    const { span, minSpan, openFrom, visible, elementRef } = options;
    switch (openFrom) {
        case 'top':
            animateFromTop(visible, elementRef, span, minSpan);
            break;
        case 'right':
            animateFromRight(visible, elementRef, span, minSpan);
            break;
        case 'left':
            animateFromLeft(visible, elementRef, span, minSpan);
            break;
        case 'bottom':
            animateFromBottom(visible, elementRef, span, minSpan);
            break;
    }
};

const animateFromTop = (
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) => {
    if (visible) {
        drawer.style.width = '100%';
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.top = `-${drawer.offsetHeight}px`;
        drawer.style.left = '0px';
        drawer.offsetHeight;
        drawer.style.top = '0px';
    } else {
        drawer.style.top = `-${drawer.offsetHeight}px`;
    }
};

const animateFromRight = (
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) => {
    if (visible) {
        drawer.style.height = '100%';
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.right = `-${drawer.clientWidth}px`;
        drawer.style.top = '0px';
        drawer.clientWidth;
        drawer.style.right = '0px';
    } else {
        drawer.style.right = `-${drawer.offsetWidth}px`;
    }
};

const animateFromLeft = (
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) => {
    if (visible) {
        drawer.style.height = '100%';
        drawer.style.width = span;
        drawer.style.minWidth = minSpan;
        drawer.style.left = `-${drawer.offsetWidth}px`;
        drawer.style.top = '0px';
        drawer.offsetWidth;
        drawer.style.left = '0px';
    } else {
        drawer.style.left = `-${drawer.offsetWidth}px`;
    }
};

const animateFromBottom = (
    visible: boolean,
    drawer: HTMLDivElement,
    span: string,
    minSpan: string
) => {
    if (visible) {
        drawer.style.width = '100%';
        drawer.style.height = span;
        drawer.style.minHeight = minSpan;
        drawer.style.bottom = `-${drawer.offsetHeight}px`;
        drawer.style.left = '0px';
        drawer.offsetHeight;
        drawer.style.bottom = '0px';
    } else {
        drawer.style.bottom = `-${drawer.offsetHeight}px`;
    }
};
