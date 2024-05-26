import { withInstall } from "@nue-ui/utils";
import MessageWrapper from "./message-wrapper.vue";
import Message from "./message";
import type {
    MessageNodeProps,
    MessagePayloadType,
    NueMessageType,
    NueMessageSubFnType,
} from "./types";

export const NueMessageWrapper = withInstall(MessageWrapper);
export const NueMessage = Message as NueMessageType;
export type {
    MessageNodeProps,
    MessagePayloadType,
    NueMessageType,
    NueMessageSubFnType,
};
