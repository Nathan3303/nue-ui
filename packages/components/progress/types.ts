import type { GlobalProps } from '@nue-ui/utils';

export type ProgressType = 'line' | 'circle' | 'dashboard';

export interface ProgressProps extends GlobalProps {
    type?: ProgressType;
    percentage?: number;
    color?: string | string[];
    strokeWidth?: number;
    formatter?: (p: string) => void | string;
    showInnerText?: boolean;
    hideText?: boolean;
    scale?: number;
}

export type ProgressEmits = {
    (event: 'full'): void;
};
