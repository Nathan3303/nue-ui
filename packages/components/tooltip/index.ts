import { withInstall } from '@nue-ui/utils';
import Tooltip from './tooltip.vue';
import type { NueTooltipProps, NueTooltipPlacement, NueTooltipSize } from './types';

export const NueTooltip = withInstall(Tooltip);

export type { NueTooltipProps, NueTooltipPlacement, NueTooltipSize };