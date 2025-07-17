import { withInstall } from '@nue-ui/utils';
import Button from './button.vue';
import type { NueButtonProps, NueButtonEmits, NueButtonSize } from './types';

export const NueButton = withInstall(Button);
export type { NueButtonProps, NueButtonEmits, NueButtonSize };
