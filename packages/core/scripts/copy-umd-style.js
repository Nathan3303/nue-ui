import shelljs from 'shelljs';

(() => {
    // 复制样式文件
    const copyResult = shelljs.cp('./dist/umd/index.css', './dist/index.css');
    // 处理成功结果
    // console.log('[MoveUMDStyleFiles] copyResult:', copyResult);
    if (copyResult.code === 0) return;
    else console.warn('[CopyUmdStyle] Failed');
    // 处理重试次数小于等于 0 的情况
    // if (retryTimes.moveUMDStyleFiles <= 0) {
    //     console.warn('[MoveUMDStyleFiles] Failed to move style files. (./dist/index.css)');
    //     return;
    // }
    // 处理失败结果
    // retryTimes.moveUMDStyleFiles--;
    // delay(moveUMDStyleFiles, 1000);
})();
