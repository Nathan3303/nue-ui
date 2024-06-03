import { withInstall } from "@nue-ui/utils";
import Input from "./input.vue";
import Textarea from "./textarea.vue";
import type {
    InputPropsType,
    InputType,
    InputCounterType,
    InputEmitsType,
    InputShapeType,
    TextareaPropsType,
} from "./types";

export const NueInput = withInstall(Input);
export const NueTextarea = withInstall(Textarea);

export type {
    InputPropsType,
    InputType,
    InputCounterType,
    InputEmitsType,
    InputShapeType,
    TextareaPropsType,
};
