import shell from 'shelljs';
import fs from 'node:fs';
import { delay } from 'lodash-es';

// 获取 components 的一级目录名称（即组件名称）
export const componentNames = (() => {
    const entries = fs.readdirSync('../components', { withFileTypes: true });
    const dirName = entries.filter(entry => entry.isDirectory());
    return dirName.map(item => item.name);
})();
export const getComponentNames = () => componentNames;

// 删除先前构建的产物
export const removeOldFiles = () => {
    shell.rm('-rf', './dist');
    // shell.rm('-rf', './dist/es');
    // shell.rm('-rf', './dist/theme');
    // shell.rm('-rf', './dist/types');
    // shell.rm('-rf', './dist/global.d.ts');
};

// 移动样式文件（es）
export const moveESStyleFiles = () => {
    fs.readdir('./dist/es/theme', err => {
        if (err) return delay(moveESStyleFiles, 800);
        shell.mv('./dist/es/theme', './dist/theme');
    });
};

// 移动样式文件（umd）
export const moveUMDStyleFiles = () => {
    fs.readFile('./dist/umd/index.css', err => {
        if (err) return delay(moveUMDStyleFiles, 800);
        shell.cp('./dist/umd/index.css', './dist/index.css');
    });
};

//短横线式命名转大驼峰命名
export const toCamelCase = (str: string) => {
    return str.replace(/-(\w)/g, (_, c) => c.toUpperCase());
};

// 移动全局类型文件
const moveGdtsFile = () => {
    const mvRes = shell.mv('./global.d.ts.temp', './dist/global.d.ts');
    if (mvRes) {
        fs.readFile('./dist/global.d.ts', err => {
            if (err) return delay(moveGdtsFile, 800);
            shell.rm('-rf', './global.d.ts.temp');
        });
    }
};

// 生成全局类型文件
export const touchGlobalTypesFile = () => {
    fs.appendFileSync('./global.d.ts.temp', '');
    const globalCompsText = componentNames
        .map(name => {
            const _n = toCamelCase('Nue-' + name);
            return `\t\t${_n}: (typeof import('nue-ui'))['${_n}'];`;
        })
        .join('\r\n');
    const ws = fs.createWriteStream('./global.d.ts.temp');
    ws.write(
        `declare module 'vue' {\r\n\texport interface GlobalComponents {\r\n` +
            globalCompsText +
            `\r\n\t}\r\n}\r\n\r\nexport {};`
    );
    ws.close(() => {
        moveGdtsFile();
    });
};
