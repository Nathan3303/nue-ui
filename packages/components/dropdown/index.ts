import { withInstall } from '@nue-ui/utils';
import Dropdown from './dropdown.vue';
import type { NueDropdownProps, NueDropdownEmits } from './types';

export const NueDropdown = withInstall(Dropdown);
export type { NueDropdownProps, NueDropdownEmits };
