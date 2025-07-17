import { withInstall } from '@nue-ui/utils';
import Dialog from './dialog.vue';
import type { NueDialogProps, NueDialogEmits } from './types';

export const NueDialog = withInstall(Dialog);
export type { NueDialogProps, NueDialogEmits };
