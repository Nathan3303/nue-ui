import type { Ref } from 'vue';

export type PopperDirection = 'top' | 'bottom' | 'left' | 'right';

export type PopperAlignment = 'start' | 'center' | 'end';

export type PopperPlacement = `${PopperDirection}-${PopperAlignment}`;

export type UsePopperElementRef = Ref<HTMLElement | undefined>;

export type PopperPositionStyleValue = number | null;
