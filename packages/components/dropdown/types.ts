import type { GlobalProps } from "@nue-ui/utils";

export interface DropdownPropsType extends GlobalProps {
    maxHeight?: string;
    disabled?: boolean;
    trigger?: "click" | "hover";
    text?: string;
    actionDelay?: number;
    hideOnClick?: boolean;
    align?: "left" | "center" | "right";
}

export type DropdownEmitsType = {
    (e: "execute", value: string): void;
};
