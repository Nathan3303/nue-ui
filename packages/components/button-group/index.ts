import { withInstall } from '@nue-ui/utils';
import ButtonGroup from './button-group.vue';
import type { NueButtonGroupCtxType, NueButtonGroupProps } from './types';

export const NueButtonGroup = withInstall(ButtonGroup);
export type { NueButtonGroupCtxType, NueButtonGroupProps };
