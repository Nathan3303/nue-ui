import shelljs from 'shelljs';

const removeDist = () => {
    shelljs.rm('-rf', './dist');
};

removeDist();
