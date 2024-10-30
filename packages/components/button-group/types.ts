import type { ButtonSize } from '../button';
import type { GlobalProps } from '@nue-ui/utils';

export interface ButtonGroupCtxType {
    size?: ButtonSize;
    disabled?: boolean;
}

export interface ButtonGroupProps extends ButtonGroupCtxType, GlobalProps {}
