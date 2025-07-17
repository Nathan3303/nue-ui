import { withInstall } from '@nue-ui/utils';
import Avatar from './avatar.vue';
import type { NueAvatarProps, NueAvatarEmits } from './types';

export const NueAvatar = withInstall(Avatar);
export type { NueAvatarProps, NueAvatarEmits };
