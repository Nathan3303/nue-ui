import type { GlobalProps } from '@nue-ui/utils';

export interface NueContainerProps extends GlobalProps {
    id?: string;
    type?: 'grid' | 'flex';
    height?: string;
    width?: string;
}

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
    asideTitle?: string;
    // outline slot
    outlineWidth?: string;
    outlineMinWidth?: string;
    outlineMaxWidth?: string;
    allowResizeOutline?: boolean;
    allowCollapseOutline?: boolean;
    allowHideOutline?: boolean;
    outlineTitle?: string;
}

export interface NueAsideProps extends GlobalProps {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    collapsedWidth?: string;
}

export interface NueSeparatorProps extends GlobalProps {
    opTarget?: 'previous' | 'next' | HTMLElement;
}

export interface NueFooterProps extends GlobalProps {
    width?: string;
    height?: string;
}
