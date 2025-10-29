import type { GlobalProps, NueGlobalProps, NueGlobalPopupItemProps } from '@nue-ui/utils';

export interface NueOverlayProps extends GlobalProps, NueGlobalPopupItemProps {
    visible?: boolean;
    closing?: boolean;
}

export interface NueOverlayPropsV2 extends NueGlobalProps, NueGlobalPopupItemProps {
    visible?: boolean;
}

export type NueOverlayEmits = {
    (e: 'escape'): void;
    (e: 'animationstart', event: AnimationEvent): void;
    (e: 'animationend', event: AnimationEvent): void;
};
