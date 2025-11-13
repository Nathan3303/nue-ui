export default (options: { name?: string; beforeBuild: () => void; afterBuild: () => void }) => {
    const buildStart = () => options.beforeBuild?.();

    const closeBundle = () => options.afterBuild?.();

    return {
        name: options.name ?? `use-rollup-plugin`,
        buildStart,
        // buildEnd: (err?: Error) => {
        //     if (err || !options.afterBuild) return;
        //     options.afterBuild();
        // },

        /*
         * 构建结束时回调
         * - 替代原先的 buildEnd，确保在所有文件写入磁盘后调用
         */
        closeBundle
    };
};
