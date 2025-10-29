import type { GlobalProps } from '@nue-ui/utils';

export type NueButtonSize = 'small' | 'large';

export interface NueButtonProps extends GlobalProps {
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: string;
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
