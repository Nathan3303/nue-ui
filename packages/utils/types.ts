export type ObjectLikeThemes = Record<string, boolean>;

export interface GlobalProps {
    theme?: string | string[] | ObjectLikeThemes;
}

export type NuePopupItemAnimation = string | { name: string; duration?: number };

export type NueGlobalPopupItemProps = {
    animation?: NuePopupItemAnimation;
    closeAnimation?: NuePopupItemAnimation;
};

export type Optional<T> = {
    [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};
