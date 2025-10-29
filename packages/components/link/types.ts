import type { GlobalProps } from '@nue-ui/utils';

export type NueLinkRoute =
    | {
          name: string;
          params?: Record<string, unknown>;
          query?: Record<string, unknown>;
          meta?: Record<string, unknown>;
      }
    | string;

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
