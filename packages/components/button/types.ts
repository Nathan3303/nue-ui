import type { GlobalProps } from '@nue-ui/utils';
import type { NueIconName } from '../icon';

export type NueButtonSize = 'small' | 'large';

export interface NueButtonProps extends GlobalProps {
    icon?: NueIconName;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: NueIconName;
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
