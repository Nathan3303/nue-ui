import type { GlobalProps } from '@nue-ui/utils';

export interface NueContainerProps extends GlobalProps {
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
}

export interface NueAsideProps extends GlobalProps {
    width?: string;
    minWidth?: string;
    maxWidth?: string;
    collapsedWidth?: string;
}

export interface NueContentProps extends GlobalProps {
    pure?: boolean;
    fill?: boolean;
}

export interface NueSeparatorProps extends GlobalProps {
    opTarget?: 'previous' | 'next' | HTMLElement;
    disabled?: boolean;
}

export type NueSeparatorEmits = {
    (e: 'resize', width: number): void;
};

export interface NueFooterProps extends GlobalProps {
    width?: string;
    height?: string;
}
