import { ref, reactive } from 'vue';
import type { Ref } from 'vue';
import type { UsePopperOptions } from './types';

export const usePopper = (
    wrapperRef: Ref<HTMLElement | undefined>,
    popperRef: Ref<HTMLElement | undefined>,
    options: UsePopperOptions
) => {
    const placement = ref(options.placement || 'top-center');
    const rectInfo = reactive({
        popperWidth: 0,
        popperHeight: 0,
        wrapperX: 0,
        wrapperY: 0,
        wrapperWidth: 0,
        wrapperHeight: 0
    });

    const getRectInfo = () => {
        const popperBCR = popperRef.value?.getBoundingClientRect();
        const wrapperBCR = wrapperRef.value?.getBoundingClientRect();
        rectInfo.popperWidth = popperBCR?.width || 0;
        rectInfo.popperHeight = popperBCR?.height || 0;
        rectInfo.wrapperX = wrapperBCR?.x || 0;
        rectInfo.wrapperY = wrapperBCR?.y || 0;
        rectInfo.wrapperWidth = wrapperBCR?.width || 0;
        rectInfo.wrapperHeight = wrapperBCR?.height || 0;
    };

    const updatePlacement = (
        direction?: 'top' | 'bottom' | 'left' | 'right',
        alignment?: 'start' | 'center' | 'end'
    ) => {
        const [_direction, _alignment] = placement.value.split('-');
        const newDirection = direction ?? _direction;
        const newAlignment = alignment ?? _alignment;
        const newPlacement = newDirection + '-' + newAlignment;
        placement.value = (newPlacement as UsePopperOptions['placement'])!;
    };

    const checkOverflow = () => {
        const [direction, alignment] = placement.value.split('-');
        const { popperWidth, popperHeight, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
            rectInfo;
        switch (direction) {
            case 'top':
                if (wrapperY - popperHeight < 8) {
                    updatePlacement('bottom');
                    return true;
                }
                break;
            case 'bottom':
                if (wrapperY + wrapperHeight + popperHeight > window.innerHeight - 8) {
                    updatePlacement('top');
                    return true;
                }
                break;
            case 'left':
                if (wrapperX - popperWidth < 8) {
                    updatePlacement('right');
                    return true;
                }
                break;
            case 'right':
                if (wrapperX + wrapperWidth + popperWidth > window.innerWidth - 8) {
                    updatePlacement('left');
                    return true;
                }
                break;
        }
        switch (alignment) {
            case 'start':
                if (wrapperX + popperWidth > window.innerWidth - 8) {
                    updatePlacement(void 0, 'center');
                    return true;
                }

                break;
            case 'end':
                if (wrapperX < 8) {
                    updatePlacement(void 0, 'center');
                    return true;
                }
                break;
            case 'center':
                if (wrapperX + popperWidth > window.innerWidth - 8) {
                    updatePlacement(void 0, 'end');
                    return true;
                }
                if (wrapperX < 8) {
                    updatePlacement(void 0, 'start');
                    return true;
                }
                break;
        }
        return false;
    };

    const calculatePosition = (initialPlacement?: UsePopperOptions['placement']) => {
        const popper = popperRef.value;
        if (!popper) return;
        getRectInfo();
        if (initialPlacement) placement.value = initialPlacement;
        if (checkOverflow()) {
            calculatePosition();
            return;
        }
        const { popperWidth, popperHeight, wrapperX, wrapperY, wrapperWidth, wrapperHeight } =
            rectInfo;
        let x = 0,
            y = 0;
        switch (placement.value) {
            case 'top-center': {
                x = wrapperX + wrapperWidth / 2 - popperWidth / 2;
                y = wrapperY - popperHeight - 8;
                break;
            }
            case 'top-start':
                x = wrapperX;
                y = wrapperY - popperHeight - 8;
                break;
            case 'top-end':
                x = wrapperX + wrapperWidth - popperWidth;
                y = wrapperY - popperHeight - 8;
                break;
            case 'bottom-center':
                x = wrapperX + wrapperWidth / 2 - popperWidth / 2;
                y = wrapperY + wrapperHeight + 8;
                break;
            case 'bottom-start':
                x = wrapperX;
                y = wrapperY + wrapperHeight + 8;
                break;
            case 'bottom-end':
                x = wrapperX + wrapperWidth - popperWidth;
                y = wrapperY + wrapperHeight + 8;
                break;
            case 'left-center':
                x = wrapperX - popperWidth - 8;
                y = wrapperY + wrapperHeight / 2 - popperHeight / 2;
                break;
            case 'left-start':
                x = wrapperX - popperWidth - 8;
                y = wrapperY;
                break;
            case 'left-end':
                x = wrapperX - popperWidth - 8;
                y = wrapperY + wrapperHeight - popperHeight;
                break;
            case 'right-center':
                x = wrapperX + wrapperWidth + 8;
                y = wrapperY + wrapperHeight / 2 - popperHeight / 2;
                break;
            case 'right-start':
                x = wrapperX + wrapperWidth + 8;
                y = wrapperY;
                break;
            case 'right-end':
                x = wrapperX + wrapperWidth + 8;
                y = wrapperY + wrapperHeight - popperHeight;
                break;
            default:
                break;
        }
        // popper.style.transform = `translate(${x}px, ${y}px)`;
        popper.style.left = `${x}px`;
        popper.style.top = `${y}px`;
    };

    return {
        rectInfo,
        placement,
        getRectInfo,
        calculatePosition
    };
};
