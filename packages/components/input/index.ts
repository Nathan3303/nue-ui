import { withInstall } from '@nue-ui/utils';
import Input from './input.vue';
import Textarea from './textarea.vue';
import type {
    NueInputProps,
    NueInputEmits,
    NueInputType,
    NueInputCounter,
    NueInputShape,
    NueTextareaProps
} from './types';

export const NueInput = withInstall(Input);
export const NueTextarea = withInstall(Textarea);
export type {
    NueInputProps,
    NueInputEmits,
    NueInputType,
    NueInputCounter,
    NueInputShape,
    NueTextareaProps
};
