import type { GlobalProps } from '@nue-ui/utils';
import type { IconNameType } from '../icon';

export type NueButtonSize = 'small' | 'large';

export interface NueButtonProps extends GlobalProps {
    icon?: IconNameType;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: IconNameType;
    title?: string;
    alignment?: 'start' | 'center' | 'end';
    flex?: string;
    size?: NueButtonSize;
    useThrottle?: boolean;
    throttleDuration?: number;
    flat?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

export type NueButtonEmits = {
    click: [payload: MouseEvent];
};
