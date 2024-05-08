export const sizeStrValues: { [key: string]: number } = {
    tiny: 12,
    small: 14,
    normal: 16,
    medium: 18,
    large: 20,
    xlarge: 24,
} as const;
export const widthAndHeightValues = ["auto", "max-content", "min-content"];
export const shapeStrValues = [
    "square",
    "round",
    "no-border",
    "round-no-border",
    "no-shape",
];
export const fitStrValues = ["fill", "cover", "contain", "none", "scale-down"];
export const decorationStrValues = ["none", "underline", "line-through"];
export const weightStrValues = ["normal", "bold", "bolder"];
