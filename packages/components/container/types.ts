import type { GlobalProps } from '@nue-ui/utils';
import type { ComputedRef } from 'vue';

export interface NueContainerProps extends GlobalProps {
    id?: string;
    height?: string;
    width?: string;
}

export type NueContainerContext = {
    containerId: ComputedRef<string>;
};

export interface NueHeaderProps extends GlobalProps {
    width?: string;
    height?: string;
}

export interface NueMainProps extends GlobalProps {
    responsive?: boolean;
    // aside slot
    asideWidth?: string;
    asideMinWidth?: string;
    asideMaxWidth?: string;
    allowResizeAside?: boolean;
    allowCollapseAside?: boolean;
    allowHideAside?: boolean;
    // outline slot
    outlineWidth?: string;
    outlineMinWidth?: string;
    outlineMaxWidth?: string;
    allowResizeOutline?: boolean;
    allowCollapseOutline?: boolean;
    allowHideOutline?: boolean;
}

export interface NueFooterProps extends GlobalProps {
    width?: string;
    height?: string;
}
