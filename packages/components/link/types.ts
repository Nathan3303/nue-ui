import type { IconNameType } from "../icon";

export type RoutePropType = string | { name: string; params?: any, query?: any } | undefined;

export type LinkPropsType = {
    theme?: string | string[];
    href?: string;
    disabled?: boolean;
    icon?: IconNameType;
    route?: RoutePropType;
    flex?: string;
    align?: string;
    size?: string;
};
