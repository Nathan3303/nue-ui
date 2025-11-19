import shell from 'shelljs';
import fs from 'node:fs';
import { delay } from 'lodash-es';

const retryTimes = {
    removeOldFiles: 5,
    moveESStyleFiles: 5,
    moveUMDStyleFiles: 5,
    moveGdtsFile: 5
};

// 短横线式命名转大驼峰命名
export const toCamelCase = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};

// 转换字符串为蛇形命名
export const toKebabCase = (str: string): string => {
    return str.replace(/[A-Z]/g, (c, o) => (o > 0 ? '-' : '') + c.toLowerCase());
};

// 获取 components 的一级目录名称（即组件名称）
export const getComponentNames = (handler?: (name: string) => string): string[] => {
    try {
        const content = fs.readFileSync('./components.ts', { encoding: 'utf-8' });
        const names = content
            .match(/export\s+default\s+\[([^\]]+)\]/)?.[1]
            ?.split(',')
            .map(name => {
                const _name = name.trim().replace(/['"]/g, '');
                return handler ? handler(_name) : _name;
            });
        return names || [];
    } catch (err) {
        console.warn('[GetComponentNames] error:', err);
        return [];
    }
};

// 类型文件所属的大驼峰组件名称列表
export const dtsComponentNames = getComponentNames();

// 手动构建分块的短横线风格组件名称列表
export const mcComponentNames = getComponentNames(name => toKebabCase(name));

// 删除先前构建的产物
export const removeOldFiles = () => {
    // 删除 dist 目录
    const removeResult = shell.rm('-rf', './dist');
    // 处理成功结果
    // console.log('[RemoveOldFiles] removeResult:', removeResult);
    if (removeResult && removeResult.code === 0) return;
    // 处理重试次数小于等于 0 的情况
    if (retryTimes.removeOldFiles <= 0) {
        console.warn('[RemoveOldFiles] Failed to remove old files. (./dist)');
        return;
    }
    // 处理失败结果
    retryTimes.removeOldFiles--;
    delay(removeOldFiles, 1000);
};

// 移动样式文件（es）
export const moveESStyleFiles = () => {
    // 移动样式文件
    const moveResult = shell.mv('./dist/es/styles', './dist/styles');
    // 处理成功结果
    // console.log('[MoveESStyleFiles] moveResult:', moveResult);
    if (moveResult.code === 0) return;
    // 处理重试次数小于等于 0 的情况
    if (retryTimes.moveESStyleFiles <= 0) {
        console.warn('[MoveESStyleFiles] Failed to move style files. (./dist/styles)');
        return;
    }
    // 处理失败结果
    retryTimes.moveESStyleFiles--;
    delay(moveESStyleFiles, 1000);
};

// 移动样式文件（umd）
export const moveUMDStyleFiles = () => {
    // 复制样式文件
    const copyResult = shell.cp('./dist/umd/index.css', './dist/index.css');
    // 处理成功结果
    // console.log('[MoveUMDStyleFiles] copyResult:', copyResult);
    if (copyResult.code === 0) return;
    // 处理重试次数小于等于 0 的情况
    if (retryTimes.moveUMDStyleFiles <= 0) {
        console.warn('[MoveUMDStyleFiles] Failed to move style files. (./dist/index.css)');
        return;
    }
    // 处理失败结果
    retryTimes.moveUMDStyleFiles--;
    delay(moveUMDStyleFiles, 1000);
};

// 移动全局类型文件
const moveGdtsFile = () => {
    // 移动全局类型文件
    const moveResult = shell.mv('./global.d.ts.temp', './dist/global.d.ts');
    // 处理成功结果
    // console.log('[MoveGdtsFile] moveResult:', moveResult);
    if (moveResult.code === 0) return;
    // 处理重试次数小于等于 0 的情况
    if (retryTimes.moveGdtsFile <= 0) {
        console.warn('[MoveGdtsFile] Failed to move global.d.ts. (./dist/global.d.ts)');
        return;
    }
    // 处理失败结果
    retryTimes.moveGdtsFile--;
    delay(moveGdtsFile, 1000);
};

// 生成全局类型文件
export const touchGlobalTypesFile = () => {
    // 构建组件名称列表
    if (!dtsComponentNames || dtsComponentNames.length === 0) return;
    const globalCompsText = dtsComponentNames
        .map(name => `\t\t${name}: (typeof import('nue-ui'))['${name}'];`)
        .join('\r\n');
    // 创建全局类型文件
    fs.appendFile('./global.d.ts.temp', '\r\n', err => {
        // 处理创建文件错误
        if (err) return;
        // 写入全局类型文件内容
        const ws = fs.createWriteStream('./global.d.ts.temp');
        ws.write(
            `declare module 'vue' {\r\n\texport interface GlobalComponents {\r\n` +
                globalCompsText +
                `\r\n\t}\r\n}\r\n\r\nexport {};`
        );
        ws.close(() => moveGdtsFile());
    });
};
