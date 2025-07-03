import Prompt from './prompt';
import type { NuePromptCaller, NuePromptCallerPayload } from './types';

export const NuePrompt = Prompt as NuePromptCaller;
export type { NuePromptCallerPayload };
