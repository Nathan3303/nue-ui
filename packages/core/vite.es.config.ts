import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { readdir, readdirSync } from "fs";
import { delay } from "lodash-es";
import shell from "shelljs";
import hooksPlugin from "./hooks-plugin";
import terser from "@rollup/plugin-terser";

const isProd = process.env.NODE_ENV === "production";
const isDev = process.env.NODE_ENV === "development";
const isTest = process.env.NODE_ENV === "test";

const getComponentDirNames = () => {
    const entries = readdirSync("../components", { withFileTypes: true });
    const dirName = entries.filter((entry) => entry.isDirectory());
    return dirName.map((item) => item.name);
};

const moveStyles = () => {
    readdir("./dist/es/theme", (err) => {
        if (err) return delay(moveStyles, 800);
        shell.rm("-rf", "./dist/es/theme");
    });
};

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: "dist/types",
            tsconfigPath: "../../tsconfig.build.json",
        }),
        hooksPlugin({
            fileNames: ["./dist/es", "./dist/theme", "./dist/types"],
            afterBuild: moveStyles,
        }),
        terser({
            compress: {
                sequences: isProd,
                arguments: isProd,
                drop_console: isProd && ["log"],
                drop_debugger: isProd,
                passes: isProd ? 4 : 1,
                global_defs: {
                    "@PROD": JSON.stringify(isProd),
                    "@DEV": JSON.stringify(isDev),
                    "@TEST": JSON.stringify(isTest),
                },
            },
            format: {
                semicolons: false,
                shorthand: isProd,
                braces: !isProd,
                beautify: !isProd,
                comments: !isProd,
            },
            mangle: {
                toplevel: isProd,
                eval: isProd,
                keep_classnames: isDev,
                keep_fnames: isDev,
            },
        }),
    ],
    build: {
        outDir: "dist/es",
        minify: false,
        cssCodeSplit: true,
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "nue-ui",
            fileName: "index",
            formats: ["es"],
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") {
                        return "index.css";
                    }
                    if (
                        assetInfo.type === "asset" &&
                        (assetInfo.name as string).endsWith(".css")
                    ) {
                        return "theme/[name].[ext]";
                    }
                    return assetInfo.name as string;
                },
                manualChunks: (id) => {
                    if (id.includes("node_modules")) return "vendor";
                    if (id.includes("/packages/hooks")) return "hooks";
                    if (
                        id.includes("/packages/utils") ||
                        id.includes("plugin-vue:export-helper")
                    ) {
                        return "utils";
                    }
                    for (const item of getComponentDirNames()) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                    return "main";
                },
            },
        },
    },
});
