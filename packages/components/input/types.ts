import type { GlobalProps } from '@nue-ui/utils';

export type NueInputType = 'text' | 'password' | 'number' | 'email' | 'textarea';

export type NueInputCounter = 'off' | 'word-limit' | 'word-left' | 'both';

export type NueInputShape = 'rounded' | 'noshape';

export interface NueInputProps extends GlobalProps {
    type?: NueInputType;
    modelValue?: string | number;
    id?: string;
    shape?: NueInputShape;
    icon?: string;
    placeholder?: string;
    maxlength?: string;
    disabled?: boolean;
    readonly?: boolean;
    clearable?: boolean;
    allowShowPassword?: boolean;
    counter?: NueInputCounter;
    width?: string;
    size?: 'small' | 'large';
    debounceTime?: number;
    flex?: string | boolean;
    name?: string;
}

export type NueInputEmits = {
    (e: 'update:modelValue', value: HTMLInputElement['value']): void;
    (e: 'input', value: Event): void;
    (e: 'blur', value: Event): void;
    (e: 'change', value: Event): void;
};

export interface NueTextareaProps extends GlobalProps {
    modelValue?: string;
    id?: string;
    placeholder?: string;
    theme?: string | string[];
    shape?: NueInputShape;
    disabled?: boolean;
    readonly?: boolean;
    rows?: number;
    resize?: boolean;
    autosize?: boolean | { minRows: number; maxRows: number };
    maxlength?: string;
    counter?: NueInputCounter;
    width?: string;
    size?: 'small' | 'large';
    debounceTime?: number;
    flex?: string;
}

export type NueTextareaEmits = {
    (e: 'update:modelValue', value: HTMLTextAreaElement['value']): void;
    (e: 'input', value: Event): void;
    (e: 'blur', value: Event): void;
    (e: 'change', value: Event): void;
};

export type WordCounterProps = {
    mode: NueInputCounter;
    length: number;
    maxlength: number;
};
