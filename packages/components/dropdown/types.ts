import type { GlobalProps } from "@nue-ui/utils";

export type DropdownDirection = "top" | "bottom";
export type DropdownAlign = "left" | "center" | "right";

export interface DropdownPropsType extends GlobalProps {
    maxHeight?: string;
    disabled?: boolean;
    trigger?: "click" | "hover";
    text?: string;
    actionDelay?: number;
    hideOnClick?: boolean;
    align?: DropdownAlign;
}

export type DropdownEmitsType = {
    (e: "execute", value: string): void;
};
