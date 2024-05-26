import { type ShapeProp } from "@nue-ui/utils/types";
import type { IconNameType } from "../icon";

export type ButtonPropsType = {
    theme?: string | string[];
    shape?: ShapeProp;
    icon?: IconNameType;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: IconNameType;
    title?: string;
    align?: string;
    flex?: string;
    size?: string;
    useThrottle?: boolean;
    throttleDuration?: number;
    flat?: boolean;
};

export type ButtonEmitsType = {
    click: [payload: MouseEvent];
};
