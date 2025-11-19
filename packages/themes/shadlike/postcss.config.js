import postcssNano from 'cssnano';
import advancedPreset from 'cssnano-preset-advanced';
import postcssNested from 'postcss-nested';

export default {
    plugins: [
        postcssNano({
            preset: advancedPreset({
                autoprefixer: true,
                discardComments: { removeAll: true },
                discardDuplicates: true,
                discardEmpty: true,
                discardUnused: false,
                discardOverridden: true,
                mergeRules: true,
                normalizeWhitespace: true,
                calc: false,
                zindex: false,
                reduceIdents: false
            }),
            plugins: [postcssNested]
        })
    ]
};
