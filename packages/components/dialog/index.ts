import { withInstall } from "@nue-ui/utils";
import Dialog from "./dialog.vue";
import type { DialogPropsType, DialogEmitsType } from "./types";

export const NueDialog = withInstall(Dialog);
export type { DialogPropsType, DialogEmitsType };
