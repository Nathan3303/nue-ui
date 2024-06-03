export type InfiniteScrollPropsType = {
    triggerHeight?: string;
    height?: string;
    disabled?: boolean;
    loading?: boolean;
    root?: Element | Document | null | "wrapper";
    rootMargin?: string;
    threshold?: number | number[];
};

export type InfiniteScrollEmitsType = {
    (e: "loadMore"): void;
};
