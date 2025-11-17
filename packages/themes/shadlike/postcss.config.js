import cssnanoPlugin from 'cssnano';
import autoprefixer from 'autoprefixer';
import postcssNested from 'postcss-nested';

export default {
    plugins: [
        cssnanoPlugin({
            preset: 'default'
        }),
        autoprefixer(),
        postcssNested()
    ]
};
