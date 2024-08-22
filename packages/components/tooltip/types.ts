import type { GlobalProps } from "@nue-ui/utils";

export interface NueTooltipProps extends GlobalProps {
    content: string;
    placement?:
        | "top-start"
        | "top-center"
        | "top-end"
        | "bottom-start"
        | "bottom-center"
        | "bottom-end"
        | "left-start"
        | "left-center"
        | "left-end"
        | "right-start"
        | "right-center"
        | "right-end";
    size?: "small" | "large";
}

export type NueTooltipEmits = {};
