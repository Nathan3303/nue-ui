import { type ShapeProp } from "@nue-ui/utils/types";

export type ButtonPropsType = {
    theme?: string | string[];
    shape?: ShapeProp;
    icon?: string;
    disabled?: boolean;
    loading?: boolean;
    loadingIcon?: string;
    title?: string;
    align?: string;
    flex?: string;
    size?: string;
    useThrottle?: boolean;
    throttleDuration?: number;
};

export type ButtonEmitsType = {
    click: [payload: MouseEvent];
};
