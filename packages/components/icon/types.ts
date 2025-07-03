import { IconNames } from './constants';

export type NueIconName = (typeof IconNames)[number];

export type NueIconProps = {
    name: NueIconName | string;
    size?: string;
    color?: string;
    spin?: boolean;
    spinSpeed?: string;
    theme?: string | string[];
};
