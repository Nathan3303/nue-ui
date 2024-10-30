import { withInstall } from '@nue-ui/utils';
import Avatar from './avatar.vue';
import type { AvatarProps, AvatarEmits } from './types';

export const NueAvatar = withInstall(Avatar);
export type { AvatarProps, AvatarEmits };
