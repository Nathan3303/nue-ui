import type { GlobalProps } from "@nue-ui/utils";

export interface BadgePropsType extends GlobalProps {
    value?: string | number;
    max?: number;
    hidden?: boolean;
    dot?: boolean;
}
