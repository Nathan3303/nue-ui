import type { GlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';

export interface NueOverlayProps extends GlobalProps, NueGlobalPopupItemProps {
    visible?: boolean;
    closing?: boolean;
}
