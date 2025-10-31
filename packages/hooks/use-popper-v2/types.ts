import { Ref } from 'vue';

export type HTMLElementRef = Ref<HTMLElement | undefined>;

export type Rect = DOMRect | null;

export type PopperPosition = { x: number; y: number };

export type PopperDirection = 'top' | 'bottom' | 'left' | 'right';

export type PopperAlignment = 'start' | 'center' | 'end';

export type PopperPlacement = `${PopperDirection}-${PopperAlignment}`;

export type PopperPlacementObject = { direction: PopperDirection; alignment: PopperAlignment };

export type CheckPopperPositionResult = {
    isOverflow: boolean;
    newPlacement: PopperPlacementObject;
};
