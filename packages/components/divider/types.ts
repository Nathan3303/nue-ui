import { GlobalProps } from '@nue-ui/utils';

export interface NueDividerProps extends GlobalProps {
    vertical?: boolean;
    alignment?: 'start' | 'center' | 'end';
    lineWidth?: string;
    lineStyle?: 'solid' | 'dashed' | 'dotted';
    lineColor?: string;
    text?: string;
}
