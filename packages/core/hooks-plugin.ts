import { each, isFunction } from 'lodash-es';
import shell from 'shelljs';

export default ({
    fileNames = [],
    beforeBuild,
    afterBuild
}: {
    fileNames?: string[];
    beforeBuild?: () => void;
    afterBuild?: () => void;
}) => {
    return {
        name: 'hooks-plugin',
        buildStart() {
            each(fileNames, fileName => shell.rm('-rf', fileName));
            if (isFunction(beforeBuild)) beforeBuild();
        },
        buildEnd(err?: Error) {
            if (!err && isFunction(afterBuild)) afterBuild();
        }
    };
};
