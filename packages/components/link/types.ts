import type { GlobalProps } from '@nue-ui/utils';

export type NueLinkRoute = Record<string, unknown> | string;

export interface NueLinkProps extends GlobalProps {
    href?: string;
    disabled?: boolean;
    icon?: string;
    route?: NueLinkRoute;
    flex?: string;
    align?: string;
    size?: string;
    title?: string;
}
