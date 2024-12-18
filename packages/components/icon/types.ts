import { IconNames } from './constants';

export type IconNameType = (typeof IconNames)[number];

export type IconPropsType = {
    name: IconNameType;
    size?: string;
    color?: string;
    spin?: boolean;
    spinSpeed?: string;
    theme?: string | string[];
};
