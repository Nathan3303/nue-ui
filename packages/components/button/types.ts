import type { GlobalProps } from '@nue-ui/utils';
import type { IconNameType } from '../icon';

export type ButtonSize = 'small' | 'large';

export interface ButtonPropsType extends GlobalProps {
    icon?: IconNameType;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: IconNameType;
    title?: string;
    align?: string;
    flex?: string;
    size?: ButtonSize;
    useThrottle?: boolean;
    throttleDuration?: number;
    flat?: boolean;
    type?: 'submit' | 'reset' | 'button';
}

export type ButtonEmitsType = {
    click: [payload: MouseEvent];
};
