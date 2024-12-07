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
    asideOptions?: NueAsideProps;
    // outline slot
    outlineWidth?: string;
    outlineMinWidth?: string;
    outlineMaxWidth?: string;
    allowResizeOutline?: boolean;
    allowCollapseOutline?: boolean;
    allowHideOutline?: boolean;
    outlineOptions?: NueAsideProps;
}

export interface NueAsideProps extends GlobalProps {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    allowResize?: boolean;
    allowCollapse?: boolean;
    allowHide?: boolean;
    resizerPlacement?: 'left' | 'right';
    float?: boolean;
    title?: string;
}

export interface NueFooterProps extends GlobalProps {
    width?: string;
    height?: string;
}
