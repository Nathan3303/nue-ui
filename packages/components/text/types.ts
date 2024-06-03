import { TEXT_SIZE_VALUES } from "./constants";

export type TextSizeType = keyof typeof TEXT_SIZE_VALUES | string;

export type TextProps = {
    theme?: string | Array<string>;
    tag?: string;
    size?: TextSizeType;
    color?: string;
    decoration?: string;
    weight?: string | number;
    align?: string;
    flex?: string;
};
