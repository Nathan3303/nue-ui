import { withInstall } from "@nue-ui/utils";
import Avatar from "./avatar.vue";
import type { AvatarPropsType, AvatarEmitsType } from "./types";

export const NueAvatar = withInstall(Avatar);
export type { AvatarPropsType, AvatarEmitsType };
