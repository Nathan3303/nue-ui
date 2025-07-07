import { ref, reactive, computed } from 'vue';
import type {
    PopperAlignment,
    PopperDirection,
    PopperPlacement,
    PopperPositionStyleValue,
    UsePopperElementRef
} from './types';

export const usePopper = (wrapperRef: UsePopperElementRef, popperRef: UsePopperElementRef) => {
    const placement = ref('bottom-start');
    const rectInfo = reactive({
        popperX: 0,
        popperY: 0,
        popperW: 0,
        popperH: 0,
        wrapperX: 0,
        wrapperY: 0,
        wrapperW: 0,
        wrapperH: 0,
        gap: 8
    });

    const relativePosition = computed(() => {
        const [direction, alignment] = placement.value.split('-');
        return {
            direction: direction as PopperDirection,
            alignment: alignment as PopperAlignment,
            placement: placement.value
        };
    });

    const getRectInfo = () => {
        const popperBCR = popperRef.value?.getBoundingClientRect();
        rectInfo.popperX = popperBCR?.x || 0;
        rectInfo.popperY = popperBCR?.y || 0;
        rectInfo.popperW = popperBCR?.width || 0;
        rectInfo.popperH = popperBCR?.height || 0;
        const wrapperBCR = wrapperRef.value?.getBoundingClientRect();
        rectInfo.wrapperX = wrapperBCR?.x || 0;
        rectInfo.wrapperY = wrapperBCR?.y || 0;
        rectInfo.wrapperW = wrapperBCR?.width || 0;
        rectInfo.wrapperH = wrapperBCR?.height || 0;
    };

    const splitPlacement = (placement: PopperPlacement) => {
        const [direction, alignment] = placement.split('-');
        return {
            direction: direction as PopperDirection,
            alignment: alignment as PopperAlignment
        };
    };

    const makePlacement = (direction: PopperDirection, alignment: PopperAlignment) => {
        return `${direction}-${alignment}` as PopperPlacement;
    };

    const adjustPlacement = (placement: PopperPlacement) => {
        let { direction, alignment } = splitPlacement(placement);
        const { popperW, popperH, wrapperX, wrapperY, wrapperW, wrapperH, gap } = rectInfo;
        const windowH = window.innerHeight;
        const windowW = window.innerWidth;
        switch (direction) {
            case 'top':
            case 'bottom':
                {
                    if (wrapperY + wrapperH + gap + popperH > windowH) direction = 'top';
                    else if (wrapperY - gap - popperH < 0) direction = 'bottom';
                    if (alignment === 'end' && wrapperX + wrapperW - popperW < 0)
                        alignment = 'center';
                    else if (alignment === 'start' && wrapperX + popperW > windowW)
                        alignment = 'center';
                    if (alignment === 'center') {
                        if (wrapperX + wrapperW / 2 + popperW / 2 > windowW) alignment = 'end';
                        else if (wrapperX + wrapperW / 2 - popperW / 2 < 0) alignment = 'start';
                    }
                }
                break;
            case 'left':
            case 'right':
                {
                    if (wrapperX + wrapperW + gap + popperW > windowW) direction = 'left';
                    else if (wrapperX - gap - popperW < 0) direction = 'right';
                    if (alignment === 'end' && wrapperY + wrapperH - popperH < 0)
                        alignment = 'center';
                    else if (alignment === 'start' && wrapperY + popperH > windowH)
                        alignment = 'center';
                    if (alignment === 'center') {
                        if (wrapperY + wrapperH / 2 + popperH / 2 > windowH) alignment = 'end';
                        else if (wrapperY + wrapperH / 2 - popperH / 2 < 0) alignment = 'start';
                    }
                }
                break;
        }
        return makePlacement(direction, alignment);
    };

    const setPositionStyles = (left: PopperPositionStyleValue, top: PopperPositionStyleValue) => {
        if (!popperRef.value) return;
        popperRef.value.style.top = top ? `${top}px` : '';
        popperRef.value.style.left = left ? `${left}px` : '';
    };

    const calculatePosition = (originalPlacement?: PopperPlacement) => {
        getRectInfo();
        placement.value = adjustPlacement(originalPlacement || 'bottom-start');
        const { popperW, popperH, wrapperX, wrapperY, wrapperW, wrapperH, gap } = rectInfo;
        const direction = relativePosition.value.direction;
        switch (direction) {
            case 'top':
            case 'bottom':
                {
                    const x = {
                        start: wrapperX,
                        center: wrapperX + (wrapperW - popperW) / 2,
                        end: wrapperX + wrapperW - popperW
                    }[relativePosition.value.alignment];
                    const y =
                        direction === 'top' ? wrapperY - gap - popperH : wrapperY + wrapperH + gap;
                    setPositionStyles(x, y);
                }
                break;
            case 'left':
            case 'right':
                {
                    const x =
                        direction === 'left' ? wrapperX - gap - popperW : wrapperX + wrapperW + gap;
                    const y = {
                        start: wrapperY,
                        center: wrapperY + (wrapperH - popperH) / 2,
                        end: wrapperY + wrapperH - popperH
                    }[relativePosition.value.alignment];
                    setPositionStyles(x, y);
                }
                break;
            default:
                break;
        }
    };

    return {
        rectInfo,
        placement,
        relativePosition,
        getRectInfo,
        calculatePosition
    };
};
