import type { GlobalProps } from '@nue-ui/utils';
import type { PopperPlacement } from '@nue-ui/hooks';

export type NueTooltipPlacement = PopperPlacement;

export type NueTooltipSize = 'small' | 'normal' | 'large';

export interface NueTooltipProps extends GlobalProps {
    content?: string;
    placement?: NueTooltipPlacement;
    size?: NueTooltipSize;
    showTriangle?: boolean;
}