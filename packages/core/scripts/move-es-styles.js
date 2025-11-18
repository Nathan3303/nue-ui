import shelljs from 'shelljs';

(() => {
    // 移动样式文件
    const moveResult = shelljs.mv('./dist/es/styles', './dist/styles');
    // 处理成功结果
    // console.log('[MoveESStyleFiles] moveResult:', moveResult);
    if (moveResult.code === 0) return;
    else console.warn('[MoveEsStyles] Failed');
    // 处理重试次数小于等于 0 的情况
    // if (retryTimes.moveESStyleFiles <= 0) {
    //     console.warn('[MoveESStyleFiles] Failed to move style files. (./dist/styles)');
    //     return;
    // }
    // 处理失败结果
    // retryTimes.moveESStyleFiles--;
    // delay(moveESStyleFiles, 1000);
})();
