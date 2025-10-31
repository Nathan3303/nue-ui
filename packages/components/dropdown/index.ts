import { withInstall } from '@nue-ui/utils';
import Dropdown from './dropdown.vue';
import DropdownItem from './dropdown-item.vue';
import type { NueDropdownProps, NueDropdownEmits } from './types';

export const NueDropdown = withInstall(Dropdown);
export const NueDropdownItem = withInstall(DropdownItem);
export type { NueDropdownProps, NueDropdownEmits };
