import shell from 'shelljs';

let retryTimes = 3;
let timer = null;

const moveWoff2 = () => {
    if (retryTimes <= 0) return;
    const copyResult = shell.cp('./src/iconfont.woff2', './dist/iconfont.woff2');
    if (copyResult && copyResult.code === 0) return;
    retryTimes--;
    timer = setTimeout(() => {
        moveWoff2();
        clearTimeout(timer);
        timer = null;
    }, 1000);
};
moveWoff2();
