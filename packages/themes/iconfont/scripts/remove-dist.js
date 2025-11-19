import shell from 'shelljs';

const removeDist = () => {
    shell.rm('-rf', './dist');
};

removeDist();
