import { withInstall } from '@nue-ui/utils';
import DatePicker from './date-picker.vue';
import type { NueDatePickerProps, NueDatePickerEmits, NueDatePickerValue } from './types';

export const NueDatePicker = withInstall(DatePicker);

export type { NueDatePickerProps, NueDatePickerEmits, NueDatePickerValue };
