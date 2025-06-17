import { IconNames } from './constants';

export type IconNameType = (typeof IconNames)[number];

export type IconPropsType = {
    name: IconNameType | undefined;
    size?: string;
    color?: string;
    spin?: boolean;
    spinSpeed?: string;
    theme?: string | string[];
};
