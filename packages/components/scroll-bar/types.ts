import type { GlobalProps } from '@nue-ui/utils';

export type NueScrollBarMode = 'always' | 'hover' | 'hidden';
export type NueScrollBarThumbSize = 'small' | 'default' | 'large';

export interface NueScrollBarProps extends GlobalProps {
    /** 滚动条显示模式 */
    mode?: NueScrollBarMode;
    /** 启用垂直滚动 */
    vertical?: boolean;
    /** 启用水平滚动 */
    horizontal?: boolean;
    /** 拇指尺寸 */
    thumbSize?: NueScrollBarThumbSize;
    /** 拇指最小像素值 */
    minThumbSize?: number;
}

export interface NueScrollBarEmits {
    (e: 'scroll', evt: Event): void;
}
