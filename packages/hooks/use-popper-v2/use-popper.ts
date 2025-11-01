import type {
    CalculatePopperPositionResult,
    CheckPopperPositionResult,
    HTMLElementRef,
    PopperAlignment,
    PopperDirection,
    PopperPosition,
    Rect
} from './types';

const usePopper = (wrapperRef: HTMLElementRef, popperRef: HTMLElementRef, gap: number = 8) => {
    // @state wrapperRect & popperRect
    let wrapperRect: Rect = null;
    let popperRect: Rect = null;

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

    // @method 获取视口宽高信息
    const getViewportRect = (): Rect => {
        return document.body.getBoundingClientRect();
    };

    // @method 检查 popper 位置渲染后是否会超出视口
    const checkPopperPosition = (
        direction: PopperDirection,
        alignment: PopperAlignment
    ): CheckPopperPositionResult => {
        // 定义变量
        const result: CheckPopperPositionResult = {
            isOverflow: false,
            newPlacement: { direction, alignment }
        };
        // 获取 viewportRect
        const viewportRect = getViewportRect();
        // 判断是否获取了正常的宽高和位置信息
        if (!viewportRect || !wrapperRect || !popperRect) return result;
        // 判断是否超出
        switch (direction) {
            case 'top':
            case 'bottom':
                {
                    if (
                        wrapperRect.y + wrapperRect.height + gap + popperRect.height >
                        viewportRect.height
                    ) {
                        result.newPlacement.direction = 'top';
                    } else if (wrapperRect.y - gap - popperRect.height < 0)
                        result.newPlacement.direction = 'bottom';
                    if (
                        result.newPlacement.alignment === 'end' &&
                        wrapperRect.x + wrapperRect.width - popperRect.width < 0
                    )
                        result.newPlacement.alignment = 'center';
                    else if (
                        result.newPlacement.alignment === 'start' &&
                        wrapperRect.x + popperRect.width > viewportRect.width
                    )
                        result.newPlacement.alignment = 'center';
                    if (result.newPlacement.alignment === 'center') {
                        if (
                            wrapperRect.x + wrapperRect.width / 2 + popperRect.width / 2 >
                            viewportRect.width
                        )
                            result.newPlacement.alignment = 'end';
                        else if (wrapperRect.x + wrapperRect.width / 2 - popperRect.width / 2 < 0)
                            result.newPlacement.alignment = 'start';
                    }
                }
                break;
            case 'left':
            case 'right':
                {
                    if (
                        wrapperRect.x + wrapperRect.width + gap + popperRect.width >
                        viewportRect.width
                    )
                        result.newPlacement.direction = 'left';
                    else if (wrapperRect.x - gap - popperRect.width < 0)
                        result.newPlacement.direction = 'right';
                    if (
                        result.newPlacement.alignment === 'end' &&
                        wrapperRect.y + wrapperRect.height - popperRect.width < 0
                    )
                        result.newPlacement.alignment = 'center';
                    else if (
                        result.newPlacement.alignment === 'start' &&
                        wrapperRect.y + popperRect.width > viewportRect.height
                    )
                        result.newPlacement.alignment = 'center';
                    if (result.newPlacement.alignment === 'center') {
                        if (
                            wrapperRect.y + wrapperRect.height / 2 + popperRect.width / 2 >
                            viewportRect.height
                        )
                            result.newPlacement.alignment = 'end';
                        else if (wrapperRect.y + wrapperRect.height / 2 - popperRect.width / 2 < 0)
                            result.newPlacement.alignment = 'start';
                    }
                }
                break;
        }
        // 判断是否需要重新定位
        if (
            result.newPlacement.direction !== direction ||
            result.newPlacement.alignment !== alignment
        ) {
            result.isOverflow = true;
        }
        // 返回
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
            // console.warn('[UsePopperV2] Cannot get wrapper rect info. Wrapper:', wrapperRef);
            return popperPosition;
        }
        // 获取 popperRect
        popperRect = getPopperRect();
        if (!popperRect) {
            // console.warn('[UsePopperV2] Cannot get popper rect info. Popper:', popperRef);
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
            // console.log('[UsePopperV2] Popper position is overflow. Popper:', popperRef);
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

    // @returns
    return { calculatePopperPosition };
};

export default usePopper;
