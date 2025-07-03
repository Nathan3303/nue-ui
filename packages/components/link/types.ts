import type { GlobalProps } from '@nue-ui/utils';
import type { NueIconName } from '../icon';

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
    icon?: NueIconName;
    route?: NueLinkRoute;
    flex?: string;
    align?: string;
    size?: string;
    title?: string;
}
