import { withInstall } from '@nue-ui/utils';
import MessageWrapper from './message-wrapper.vue';
import Message from './message';
import type {
    NueMessageNodeProps,
    NueMessageCallerPayload,
    NueMessageCaller,
    NueMessageSubCaller
} from './types';

export const NueMessageWrapper = withInstall(MessageWrapper);
export const NueMessage = Message as NueMessageCaller;
export type { NueMessageNodeProps, NueMessageCallerPayload, NueMessageCaller, NueMessageSubCaller };
