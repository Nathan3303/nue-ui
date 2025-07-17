import type { NueButtonSize } from '../button';
import type { GlobalProps } from '@nue-ui/utils';

export interface NueButtonGroupCtxType {
    size?: NueButtonSize;
    disabled?: boolean;
}

export interface NueButtonGroupProps extends NueButtonGroupCtxType, GlobalProps {}
