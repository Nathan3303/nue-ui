import MessageWrapper from "./src/message-wrapper.vue";
import Message from "./src/message";
import { withInstall } from "@nue-ui/utils";

export const NueMessageWrapper = withInstall(MessageWrapper);
export const NueMessage = Message;
