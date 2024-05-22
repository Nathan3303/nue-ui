import { withInstall } from "@nue-ui/utils";
import Dropdown from "./dropdown.vue";
import type { DropdownPropsType, DropdownEmitsType } from "./types";

export const NueDropdown = withInstall(Dropdown);
export type { DropdownPropsType, DropdownEmitsType };
