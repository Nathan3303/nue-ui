import type { GlobalProps } from '@nue-ui/utils';
import type { IconNameType } from '../icon';

export type RoutePropType =
    | string
    | {
          name: string;
          params?: Record<string, unknown>;
          query?: Record<string, unknown>;
          meta?: Record<string, unknown>;
      }
    | undefined;

export interface LinkProps extends GlobalProps {
    href?: string;
    disabled?: boolean;
    icon?: IconNameType;
    route?: RoutePropType;
    flex?: string;
    align?: string;
    size?: string;
    title?: string;
}
