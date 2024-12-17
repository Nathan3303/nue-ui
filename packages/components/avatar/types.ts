import type { GlobalProps } from '@nue-ui/utils';
import type { IconNameType } from '../icon';

export type ObjectFit = 'fill' | 'cover' | 'contain' | 'none' | 'scale-down';

export interface AvatarProps extends GlobalProps {
    src?: string;
    icon?: IconNameType;
    size?: string;
    title?: string;
    fit?: ObjectFit;
    rounded?: boolean;
    alt?: string;
}

export type AvatarEmits = {
    (e: 'error', payload: Event): void;
};
