import { each, isFunction } from "lodash-es";
import shell from "shelljs";

export default ({
    fileNames = [],
    beforeBuild,
    afterBuild,
}: {
    fileNames?: string[];
    beforeBuild?: Function;
    afterBuild?: Function;
}) => {
    return {
        name: "hooks-plugin",
        buildStart() {
            each(fileNames, (fileName) => shell.rm("-rf", fileName));
            isFunction(beforeBuild) && beforeBuild();
        },
        buildEnd(err?: Error) {
            !err && isFunction(afterBuild) && afterBuild();
        },
    };
};
