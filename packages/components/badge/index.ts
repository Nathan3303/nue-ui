import Badge from "./badge.vue";
import { withInstall } from "@nue-ui/utils";
import type { BadgePropsType, BadgeEmitType } from "./types";

export const NueBadge = withInstall(Badge);
export type { BadgePropsType, BadgeEmitType };
