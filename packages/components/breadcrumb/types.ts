import type { GlobalProps } from '@nue-ui/utils';
import type { IconNameType } from '../icon';

// NueBreadcrumb

export interface NueBreadcrumbProps extends GlobalProps {
    separator?: IconNameType;
}

export type NueBreadcrumbContext = {
    separator: IconNameType;
};

// NueBreadcrumbItem

export interface NueBreadcrumbItemProps extends GlobalProps {
    separator?: IconNameType;
}
