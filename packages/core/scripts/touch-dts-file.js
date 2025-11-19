import shell from 'shelljs';
import fs from 'node:fs';

(() => {
    // 类型文件所属的大驼峰组件名称列表
    try {
        const dtsComponentNames = fs
            .readFileSync('./components.ts', { encoding: 'utf-8' })
            .match(/export\s+default\s+\[([^\]]+)\]/)?.[1]
            ?.split(',')
            .map(name => name.trim().replace(/['"]/g, ''));
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
            ws.close(() => {
                // 移动全局类型文件
                const moveResult = shell.mv('./global.d.ts.temp', './dist/global.d.ts');
                // 处理成功结果
                // console.log('[MoveGdtsFile] moveResult:', moveResult);
                if (moveResult.code === 0) return;
                else console.warn('[TouchDtsFile/Move] Failed');
                // 处理重试次数小于等于 0 的情况
                // if (retryTimes.moveGdtsFile <= 0) {
                //     console.warn('[MoveGdtsFile] Failed to move global.d.ts. (./dist/global.d.ts)');
                //     return;
                // }
                // 处理失败结果
                // retryTimes.moveGdtsFile--;
                // delay(moveGdtsFile, 1000);
            });
        });
    } catch (err) {
        console.warn('[TouchDtsFile] Error:', err);
        return [];
    }
})();
