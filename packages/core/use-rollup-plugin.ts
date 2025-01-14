type UseRollupPluginOptions = {
    name?: string;
    beforeBuild: () => void;
    afterBuild: () => void;
};

export default (options: UseRollupPluginOptions) => {
    return {
        name: options.name ?? `use-rollup-plugin`,
        buildStart: () => {
            if (!options.beforeBuild) return;
            options.beforeBuild();
        },
        buildEnd: (err?: Error) => {
            if (err || !options.afterBuild) return;
            options.afterBuild();
        }
    };
};
