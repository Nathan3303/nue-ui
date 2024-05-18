import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: "dist/types",
            tsconfigPath: "../../tsconfig.build.json",
        }),
    ],
    build: {
        outDir: "dist/umd",
        lib: {
            entry: resolve(__dirname, "./index.ts"),
            name: "nue-ui",
            fileName: "index",
            formats: ["umd"],
        },
        rollupOptions: {
            external: ["vue"],
            output: {
                exports: "named",
                globals: {
                    vue: "Vue",
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name === "style.css") {
                        return "index.css";
                    }
                    return assetInfo.name as string;
                },
            },
        },
    },
});
