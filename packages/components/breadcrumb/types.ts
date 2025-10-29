import type { GlobalProps } from '@nue-ui/utils';

// NueBreadcrumb

export interface NueBreadcrumbProps extends GlobalProps {
    separator?: string;
}

export type NueBreadcrumbContext = {
    separator: string;
};

// NueBreadcrumbItem

export interface NueBreadcrumbItemProps extends GlobalProps {
    separator?: string;
}
