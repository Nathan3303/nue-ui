import type { GlobalProps } from '@nue-ui/utils';
import type { NueIconName } from '../icon';

// NueBreadcrumb

export interface NueBreadcrumbProps extends GlobalProps {
    separator?: NueIconName;
}

export type NueBreadcrumbContext = {
    separator: NueIconName;
};

// NueBreadcrumbItem

export interface NueBreadcrumbItemProps extends GlobalProps {
    separator?: NueIconName;
}
