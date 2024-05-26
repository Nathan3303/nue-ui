import type { IconNameType } from "../icon";

export type FitType = "fill" | "cover" | "contain" | "none" | "scale-down";

export type SizeType =
    | "tiny"
    | "small"
    | "normal"
    | "medium"
    | "large"
    | number;

export type SizeStringsValueType = Exclude<
    {
        [key in SizeType]: number;
    },
    number
>;

export type AvatarPropsType = {
    src?: string;
    icon?: IconNameType;
    size?: SizeType;
    theme?: string | string[];
    shape?: "square" | "round";
    title?: string;
    fit?: FitType;
};

export type AvatarEmitsType = {
    (e: "error", val: Event): void;
};
