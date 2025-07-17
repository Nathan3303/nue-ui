import Badge from './badge.vue';
import { withInstall } from '@nue-ui/utils';
import type { NueBadgeProps } from './types';

export const NueBadge = withInstall(Badge);
export type { NueBadgeProps };
