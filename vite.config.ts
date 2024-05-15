import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
    build: {
        lib: {
            entry: "./packages/core/index.ts",
            name: "nue-ui",
            formats: ["es"],
            fileName: () => "index.js",
        },
        outDir: "./dist",
        target: "es2015",
        copyPublicDir: false,
        emptyOutDir: false,
        rollupOptions: {
            external: ["vue"],
            output: {
                globals: {
                    vue: "Vue",
                },
            },
        },
    },
    plugins: [vue()],
});
