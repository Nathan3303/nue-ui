import { ref, reactive } from "vue";
import type { Ref } from "vue";
import type { UsePopperOptions } from "./types";

export const usePopper = (
    wrapperRef: Ref<HTMLElement | undefined>,
    popperRef: Ref<HTMLElement | undefined>,
    options: UsePopperOptions
) => {
    const placement = ref(options.placement || "top-center");
    const rectInfo = reactive({
        popperWidth: 0,
        popperHeight: 0,
        wrapperX: 0,
        wrapperY: 0,
        wrapperWidth: 0,
        wrapperHeight: 0,
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
        direction?: "top" | "bottom" | "left" | "right",
        alignment?: "start" | "center" | "end"
    ) => {
        const [_direction, _alignment] = placement.value.split("-");
        const newDirection = direction ?? _direction;
        const newAlignment = alignment ?? _alignment;
        const newPlacement = newDirection + "-" + newAlignment;
        placement.value = (newPlacement as UsePopperOptions["placement"])!;
    };

    const checkOverflow = () => {
        const [direction, alignment] = placement.value.split("-");
        const {
            popperWidth,
            popperHeight,
            wrapperX,
            wrapperY,
            wrapperWidth,
            wrapperHeight,
        } = rectInfo;
        switch (direction) {
            case "top":
                if (wrapperY - popperHeight < 8) {
                    updatePlacement("bottom");
                    return true;
                }
                break;
            case "bottom":
                if (
                    wrapperY + wrapperHeight + popperHeight >
                    window.innerHeight - 8
                ) {
                    updatePlacement("top");
                    return true;
                }
                break;
            case "left":
                if (wrapperX - popperWidth < 8) {
                    updatePlacement("right");
                    return true;
                }
                break;
            case "right":
                if (
                    wrapperX + wrapperWidth + popperWidth >
                    window.innerWidth - 8
                ) {
                    updatePlacement("left");
                    return true;
                }
                break;
        }
        switch (alignment) {
            case "start":
                if (wrapperX + popperWidth > window.innerWidth - 8) {
                    updatePlacement(void 0, "center");
                    return true;
                }

                break;
            case "end":
                if (wrapperX < 8) {
                    updatePlacement(void 0, "center");
                    return true;
                }
                break;
            case "center":
                if (wrapperX + popperWidth > window.innerWidth - 8) {
                    updatePlacement(void 0, "end");
                    return true;
                }
                if (wrapperX < 8) {
                    updatePlacement(void 0, "start");
                    return true;
                }
                break;
        }
        return false;
    };

    const calculatePosition = (
        initialPlacement?: UsePopperOptions["placement"]
    ) => {
        const popper = popperRef.value;
        if (!popper) return;
        getRectInfo();
        if (initialPlacement) placement.value = initialPlacement;
        if (checkOverflow()) {
            calculatePosition();
            return;
        }
        const {
            popperWidth,
            popperHeight,
            wrapperX,
            wrapperY,
            wrapperWidth,
            wrapperHeight,
        } = rectInfo;
        switch (placement.value) {
            case "top-center":
                popper.style.left = `${
                    wrapperX + wrapperWidth / 2 - popperWidth / 2
                }px`;
                popper.style.top = `${wrapperY - popperHeight - 8}px`;
                break;
            case "top-start":
                popper.style.left = `${wrapperX}px`;
                popper.style.top = `${wrapperY - popperHeight - 8}px`;
                break;
            case "top-end":
                popper.style.left = `${
                    wrapperX + wrapperWidth - popperWidth
                }px`;
                popper.style.top = `${wrapperY - popperHeight - 8}px`;
                break;
            case "bottom-center":
                popper.style.left = `${
                    wrapperX + wrapperWidth / 2 - popperWidth / 2
                }px`;
                popper.style.top = `${wrapperY + wrapperHeight + 8}px`;
                break;
            case "bottom-start":
                popper.style.left = `${wrapperX}px`;
                popper.style.top = `${wrapperY + wrapperHeight + 8}px`;
                break;
            case "bottom-end":
                popper.style.left = `${
                    wrapperX + wrapperWidth - popperWidth
                }px`;
                popper.style.top = `${wrapperY + wrapperHeight + 8}px`;
                break;
            case "left-center":
                popper.style.left = `${wrapperX - popperWidth - 8}px`;
                popper.style.top = `${
                    wrapperY + wrapperHeight / 2 - popperHeight / 2
                }px`;
                break;
            case "left-start":
                popper.style.left = `${wrapperX - popperWidth - 8}px`;
                popper.style.top = `${wrapperY}px`;
                break;
            case "left-end":
                popper.style.left = `${wrapperX - popperWidth - 8}px`;
                popper.style.top = `${
                    wrapperY + wrapperHeight - popperHeight
                }px`;
                break;
            case "right-center":
                popper.style.left = `${wrapperX + wrapperWidth + 8}px`;
                popper.style.top = `${
                    wrapperY + wrapperHeight / 2 - popperHeight / 2
                }px`;
                break;
            case "right-start":
                popper.style.left = `${wrapperX + wrapperWidth + 8}px`;
                popper.style.top = `${wrapperY}px`;
                break;
            case "right-end":
                popper.style.left = `${wrapperX + wrapperWidth + 8}px`;
                popper.style.top = `${
                    wrapperY + wrapperHeight - popperHeight
                }px`;
                break;
            default:
                break;
        }
    };

    return {
        rectInfo,
        placement,
        getRectInfo,
        calculatePosition,
    };
};
