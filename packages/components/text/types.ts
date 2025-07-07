import { TEXT_SIZE_VALUES } from './constants';
import type { GlobalProps } from '@nue-ui/utils';

export type NueTextTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'span' | 'p' | 'strong' | string;

export type NueTextSize = keyof typeof TEXT_SIZE_VALUES | string;

export type NueTextWeight = 'normal' | 'bold' | 'bolder' | 'lighter' | number;

export type NueTextAlign = 'left' | 'center' | 'right';

export type NueTextDecoration = 'none' | 'underline' | 'line-through' | 'overline';

export interface NueSizeProps extends GlobalProps {
    tag?: NueTextTag;
    size?: NueTextSize;
    color?: string;
    decoration?: NueTextDecoration;
    weight?: NueTextWeight;
    align?: NueTextAlign;
    clamped?: number;
}
