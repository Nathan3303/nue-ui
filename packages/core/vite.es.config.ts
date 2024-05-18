import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import dts from "vite-plugin-dts";
import { readdirSync } from "fs";
import { get } from "http";

function getComponentDirNames() {
    const entries = readdirSync("../components", { withFileTypes: true });
    const dirName = entries.filter((entry) => entry.isDirectory());
    return dirName.map((item) => item.name);
}

export default defineConfig({
    plugins: [
        vue(),
        dts({
            outDir: "dist/types",
            tsconfigPath: "../../tsconfig.build.json",
        }),
    ],
    build: {
        outDir: "dist/es",
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
                    return assetInfo.name as string;
                },
                manualChunks: (id) => {
                    if (id.includes("node_modules")) return "vendor";
                    if (id.includes("/packages/hooks")) return "hooks";
                    if (id.includes("/packages/utils")) return "utils";
                    for (const item of getComponentDirNames()) {
                        if (id.includes(`/packages/components/${item}`)) {
                            return item;
                        }
                    }
                },
            },
        },
    },
});
