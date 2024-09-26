import type { GlobalProps } from "@nue-ui/utils";

export interface NueContainerProps extends GlobalProps {
    id?: string;
    height?: string;
    width?: string;
}

export type NueHeaderProps = {
    height?: string;
};

export type NueMainProps = {
    asideWidth?: string;
    asideMinWidth?: string;
    asideMaxWidth?: string;
    contentPadding?: string;
    allowResizeAside?: boolean;
    responsive?: boolean;
    useVisibleButton?: boolean;
};

export type NueFooterProps = {
    height?: string;
}
