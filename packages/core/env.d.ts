declare const PROD: boolean;
declare const DEV: boolean;
declare const TEST: boolean;

declare module '*.png' {
    const value: string;
    export default value;
}
