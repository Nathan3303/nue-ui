export type ShapeProp =
    | 'circle'
    | 'round'
    | 'square'
    | 'no-border'
    | 'round-no-border'
    | 'square-no-border'
    | 'no-shape';

export type SizeProp =
    | 'tiny'
    | 'small'
    | 'normal'
    | 'medium'
    | 'large'
    | 'xlarge'
    | number;

export type ObjectLikeThemes = Record<string, boolean>;

export interface GlobalProps {
    theme?: string | string[] | ObjectLikeThemes;
}

export type Optional<T> = {
    [P in keyof T as T[P] extends Required<T>[P] ? never : P]: T[P];
};
