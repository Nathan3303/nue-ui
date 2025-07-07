import type { GlobalProps } from '@nue-ui/utils';

export type NueProgressType = 'line' | 'circle' | 'dashboard';

export type NueProgressColor = string | string[];

export interface NueProgressProps extends GlobalProps {
    // properties
    type?: NueProgressType;
    color?: NueProgressColor;
    strokeWidth?: number;
    percentage?: number;
    showInnerText?: boolean;
    hideText?: boolean;
    scale?: number;
    // methods
    formatter?: (p: string) => void | string;
}

export type NueProgressEmits = {
    (event: 'full'): void;
};
