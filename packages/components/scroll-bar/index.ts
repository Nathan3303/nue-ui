import { withInstall } from '@nue-ui/utils';
import ScrollBar from './scroll-bar.vue';
import type {
    NueScrollBarProps,
    NueScrollBarEmits,
    NueScrollBarMode,
    NueScrollBarThumbSize
} from './types';

export const NueScrollBar = withInstall(ScrollBar);
export type { NueScrollBarProps, NueScrollBarEmits, NueScrollBarMode, NueScrollBarThumbSize };
