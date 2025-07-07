import type { GlobalProps } from '@nue-ui/utils';
import type { PopperPlacement } from '@nue-ui/hooks';

type NueTooltipPlacement = PopperPlacement;

type NueTooltipSize = 'small' | 'normal' | 'large';

export interface NueTooltipProps extends GlobalProps {
    content?: string;
    placement?: NueTooltipPlacement;
    size?: NueTooltipSize;
    showTriangle?: boolean;
}
