import { isString, isNumber, isArray } from "./utils";
import { sizeStrValues } from "./values";

/**
 * Parse props.size
 * @description 将 props.size 解析为 css 单位 'px'
 * @param {string|number} size value of prop size
 * @return {string}
 */
export function parseSize(size: string | number): string {
    let parseResult: string = "";
    if (isNumber(size)) {
        parseResult = addUnit(size as number);
    } else if (isString(size) && size !== "") {
        parseResult = addUnit(sizeStrValues[size as string]);
    } else {
        console.warn("[parseSize warn] Invalid size value.");
        parseResult = addUnit(sizeStrValues["normal"]);
    }
    // console.log(parseResult);
    return parseResult;
}

/**
 * Parse props.width and props.height
 * @description 将 props.width 和 props.height 解析为 css 值，如果是数字则添加单位 'px'
 * @param {string|number} value value of prop width or height
 * @return {string}
 */
export function parseWidthAndHeight(
    value: string | number,
    isGetRaw = false
): number | string {
    if (isGetRaw) {
        return isNumber(value) ? value : parseInt(value as string);
    }
    return isNumber(value) ? `${value}px` : value;
}

/**
 * Parse props.theme
 * @description 将 props.theme 解析为类名数组，prefix 为类名前缀
 * @param {string|Array<string>} value value of prop theme
 * @param {string} prefix prefix of class name
 * @return {Array<string>}
 */
export function parseTheme(
    value: string | Array<string>,
    prefix: string
): Array<string> {
    let parseResult: Array<string> = [];
    if (isString(value) && value !== "") {
        parseResult.push(`${prefix}--${value}`);
    } else if (isArray(value)) {
        (value as Array<string>).forEach((item) => {
            if (isString(item) && item !== "") {
                parseResult.push(prefix + "--" + item);
            }
        });
    }
    return parseResult;
}

/**
 * Add css unit to value
 * @description 给 value 添加 css 单位 'px'
 * @param {number} value value to add unit
 * @return {string}
 */
export function addUnit(value: number): string {
    return `${value}px`;
}


export function parseFlexProp(value: string): string {
    if (value === "") return "auto";
    return value;
}
