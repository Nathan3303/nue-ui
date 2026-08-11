import { TEXT_SIZE_VALUES } from './constants';
import type { GlobalProps } from '@nue-ui/utils';

export type NueTextTag = string;

export type NueTextSize = keyof typeof TEXT_SIZE_VALUES;

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