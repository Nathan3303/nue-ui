import type { GlobalProps } from '@nue-ui/utils';

export interface NueInfiniteScrollProps extends GlobalProps {
    triggerHeight?: string;
    height?: string;
    disabled?: boolean;
    loading?: boolean;
    root?: Element | Document | null | 'wrapper';
    rootMargin?: string;
    threshold?: number | number[];
}

export type NueInfiniteScrollEmits = {
    (e: 'loadMore'): void;
};
