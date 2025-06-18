import typescript from '@rollup/plugin-typescript';
import terser from '@rollup/plugin-terser';
import postcss from 'rollup-plugin-postcss';

export default {
    input: './index.ts',
    plugins: [
        typescript(),
        terser(),
        postcss({
            minimize: true
        })
    ],
    output: {
        dir: 'dist',
        format: 'esm'
    }
};
