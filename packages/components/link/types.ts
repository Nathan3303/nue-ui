import type { GlobalProps } from "@nue-ui/utils";
import type { IconNameType } from "../icon";

export type RoutePropType =
    | string
    | { name: string; params?: any; query?: any; meta?: any }
    | undefined;

export interface LinkProps extends GlobalProps {
    href?: string;
    disabled?: boolean;
    icon?: IconNameType;
    route?: RoutePropType;
    flex?: string;
    align?: string;
    size?: string;
}
