import type { GlobalProps } from '@nue-ui/utils';

type NueMarqueeDirection = 'left' | 'right';

export interface NueMarqueeProps extends GlobalProps {
    infinite?: boolean;
    speedRatio?: number;
    direction?: NueMarqueeDirection;
}
