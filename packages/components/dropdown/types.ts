import type { ShapeProp } from "@nue-ui/utils";

export type DropdownPropsType = {
    maxHeight?: string;
    disabled?: boolean;
    trigger?: "click" | "hover";
    theme?: string | string[];
    shape?: ShapeProp;
    text?: string;
    actionDelay?: number;
    hideOnClick?: boolean;
    align?: "left" | "center" | "right";
};

export type DropdownEmitsType = {
    (e: "execute", value: string): void;
};
