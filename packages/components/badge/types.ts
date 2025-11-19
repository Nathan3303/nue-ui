import type { GlobalProps } from '@nue-ui/utils';

export interface NueBadgeProps extends GlobalProps {
    value?: string | number;
    max?: number;
    hidden?: boolean;
    dot?: boolean;
    clamped?: number;
}
