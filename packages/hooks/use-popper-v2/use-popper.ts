import type {
    CalculatePopperPositionResult,
    CheckPopperPositionResult,
    HTMLElementRef,
    PopperAlignment,
    PopperDirection,
    PopperPosition,
    Rect
} from './types';

type ResizeCallback = () => void;

const usePopper = (
    wrapperRef: HTMLElementRef,
    popperRef: HTMLElementRef,
    gap: number = 8,
    overflowPadding: number = 8
) => {
    let wrapperRect: Rect = null;
    let popperRect: Rect = null;
    let resizeObserver: ResizeObserver | null = null;
    let resizeCallback: ResizeCallback | null = null;

    // @method 获取 wrapper 位置宽高信息
    const getWrapperRect = (): Rect => {
        if (!wrapperRef.value) return null;
        return wrapperRef.value.getBoundingClientRect();
    };

    // @method 获取 popper 位置宽高信息
    const getPopperRect = (): Rect => {
        if (!popperRef.value) return null;
        return popperRef.value.getBoundingClientRect();
    };

    const directions: PopperDirection[] = ['top', 'right', 'bottom', 'left'];

    const isDirectionAvailable = (dir: PopperDirection): boolean => {
        if (!wrapperRect || !popperRect) return false;

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        const vpLeft = overflowPadding;
        const vpRight = viewportW - overflowPadding;
        const vpTop = overflowPadding;
        const vpBottom = viewportH - overflowPadding;

        switch (dir) {
            case 'top':
                return wrapperRect.y - gap - popperRect.height >= vpTop;
            case 'bottom':
                return wrapperRect.y + wrapperRect.height + gap + popperRect.height <= vpBottom;
            case 'left':
                return wrapperRect.x - gap - popperRect.width >= vpLeft;
            case 'right':
                return wrapperRect.x + wrapperRect.width + gap + popperRect.width <= vpRight;
            default:
                return false;
        }
    };

    const findNextAvailableDirection = (currentDir: PopperDirection): PopperDirection => {
        const currentIndex = directions.indexOf(currentDir);
        for (let i = 1; i < directions.length; i++) {
            const nextIndex = (currentIndex + i) % directions.length;
            const nextDir = directions[nextIndex];
            if (isDirectionAvailable(nextDir)) {
                return nextDir;
            }
        }
        return currentDir;
    };

    const checkAlignmentOverflow = (
        direction: PopperDirection,
        alignment: PopperAlignment
    ): PopperAlignment => {
        if (!wrapperRect || !popperRect) return alignment;

        const viewportW = window.innerWidth;
        const viewportH = window.innerHeight;
        const vpLeft = overflowPadding;
        const vpRight = viewportW - overflowPadding;
        const vpTop = overflowPadding;
        const vpBottom = viewportH - overflowPadding;

        let newAlignment = alignment;

        if (direction === 'top' || direction === 'bottom') {
            if (
                newAlignment === 'end' &&
                wrapperRect.x + wrapperRect.width - popperRect.width < vpLeft
            )
                newAlignment = 'center';
            else if (newAlignment === 'start' && wrapperRect.x + popperRect.width > vpRight)
                newAlignment = 'center';
            if (newAlignment === 'center') {
                if (wrapperRect.x + wrapperRect.width / 2 + popperRect.width / 2 > vpRight)
                    newAlignment = 'end';
                else if (wrapperRect.x + wrapperRect.width / 2 - popperRect.width / 2 < vpLeft)
                    newAlignment = 'start';
            }
        } else {
            if (
                newAlignment === 'end' &&
                wrapperRect.y + wrapperRect.height - popperRect.height < vpTop
            )
                newAlignment = 'center';
            else if (newAlignment === 'start' && wrapperRect.y + popperRect.height > vpBottom)
                newAlignment = 'center';
            if (newAlignment === 'center') {
                if (wrapperRect.y + wrapperRect.height / 2 + popperRect.height / 2 > vpBottom)
                    newAlignment = 'end';
                else if (wrapperRect.y + wrapperRect.height / 2 - popperRect.height / 2 < vpTop)
                    newAlignment = 'start';
            }
        }

        return newAlignment;
    };

    const checkPopperPosition = (
        direction: PopperDirection,
        alignment: PopperAlignment
    ): CheckPopperPositionResult => {
        const result: CheckPopperPositionResult = {
            isOverflow: false,
            newPlacement: { direction, alignment }
        };

        if (!wrapperRect || !popperRect) return result;

        const isCurrentAvailable = isDirectionAvailable(direction);

        if (!isCurrentAvailable) {
            const newDirection = findNextAvailableDirection(direction);
            result.newPlacement.direction = newDirection;
        }

        const newAlignment = checkAlignmentOverflow(result.newPlacement.direction, alignment);
        result.newPlacement.alignment = newAlignment;

        if (
            result.newPlacement.direction !== direction ||
            result.newPlacement.alignment !== alignment
        ) {
            result.isOverflow = true;
        }

        return result;
    };

    // @method 计算 popper 定位信息
    const calculatePopperPosition = (
        direction: PopperDirection,
        alignment: PopperAlignment
    ): CalculatePopperPositionResult => {
        // 定义变量
        const popperPosition: PopperPosition = { x: 0, y: 0 };
        const alignmentTemp = { start: 0, center: 0, end: 0 };
        // 获取 wrapperRect
        wrapperRect = getWrapperRect();
        if (!wrapperRect) {
            return popperPosition;
        }
        // 获取 popperRect
        popperRect = getPopperRect();
        if (!popperRect) {
            return popperPosition;
        }
        // 计算 popper 位置
        switch (direction) {
            case 'top':
            case 'bottom':
                alignmentTemp.start = wrapperRect.x;
                alignmentTemp.center = wrapperRect.x + (wrapperRect.width - popperRect.width) / 2;
                alignmentTemp.end = wrapperRect.x + wrapperRect.width - popperRect.width;
                popperPosition.x = alignmentTemp[alignment];
                popperPosition.y =
                    direction === 'top'
                        ? wrapperRect.y - gap - popperRect.height
                        : wrapperRect.y + wrapperRect.height + gap;
                break;
            case 'left':
            case 'right':
                popperPosition.x =
                    direction === 'left'
                        ? wrapperRect.x - gap - popperRect.width
                        : wrapperRect.x + wrapperRect.width + gap;
                alignmentTemp.start = wrapperRect.y;
                alignmentTemp.center = wrapperRect.y + (wrapperRect.height - popperRect.height) / 2;
                alignmentTemp.end = wrapperRect.y + wrapperRect.height - popperRect.height;
                popperPosition.y = alignmentTemp[alignment];
                break;
        }
        // 检查 popper 位置渲染后是否会超出视口
        const { isOverflow, newPlacement } = checkPopperPosition(direction, alignment);
        // 如果超出视口，则使用新的 placement 和 alignment 重新计算位置
        if (isOverflow) {
            const { x, y } = calculatePopperPosition(
                newPlacement.direction,
                newPlacement.alignment
            );
            popperPosition.x = x;
            popperPosition.y = y;
            return { ...popperPosition, direction: newPlacement.direction };
        }
        // 返回
        return { ...popperPosition };
    };

    const startResizeObserver = (callback: ResizeCallback) => {
        if (!popperRef.value) return;

        resizeCallback = callback;

        resizeObserver = new ResizeObserver((entries: ResizeObserverEntry[]) => {
            let shouldRecalculate = false;

            for (const entry of entries) {
                if (entry.target === popperRef.value) {
                    if (
                        entry.contentRect.width !== (popperRect?.width ?? 0) ||
                        entry.contentRect.height !== (popperRect?.height ?? 0)
                    ) {
                        shouldRecalculate = true;
                    }
                } else if (entry.target === wrapperRef.value) {
                    if (
                        entry.contentRect.width !== (wrapperRect?.width ?? 0) ||
                        entry.contentRect.height !== (wrapperRect?.height ?? 0)
                    ) {
                        shouldRecalculate = true;
                    }
                }
            }

            if (shouldRecalculate) {
                resizeCallback?.();
            }
        });

        resizeObserver.observe(popperRef.value);

        if (wrapperRef.value) {
            resizeObserver.observe(wrapperRef.value);
        }
    };

    const stopResizeObserver = () => {
        resizeObserver?.disconnect();
        resizeObserver = null;
        resizeCallback = null;
    };

    return { calculatePopperPosition, startResizeObserver, stopResizeObserver };
};

export default usePopper;
