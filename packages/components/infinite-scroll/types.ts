export type InfiniteScrollPropsType = {
    triggerHeight?: string;
    height?: string;
    disabled?: boolean;
    loading?: boolean;
};

export type InfiniteScrollEmitsType = {
    (e: "loadMore"): void;
};
