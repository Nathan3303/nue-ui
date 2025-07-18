import type { GlobalProps } from '@nue-ui/utils';
import type { NueIconName } from '../icon';

export interface NueAvatarProps extends GlobalProps {
    src?: string;
    icon?: NueIconName;
    size?: string;
    title?: string;
    fit?: 'fill' | 'cover' | 'contain' | 'none' | 'scale-down';
    rounded?: boolean;
    alt?: string;
}

export type NueAvatarEmits = {
    (e: 'error', payload: Event): void;
};
