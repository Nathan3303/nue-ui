import postcssNano from 'cssnano';
import advancedPreset from 'cssnano-preset-advanced';
import postcssNested from 'postcss-nested';

export default {
    plugins: [
        postcssNano({
            preset: advancedPreset({
                discardComments: { removeAll: true },
                discardDuplicates: true,
                discardEmpty: true,
                // discardUnused: false
                // discardOverridden: false
                mergeRules: true,
                autoprefixer: true,
                normalizeWhitespace: true,
                calc: false
            }),
            plugins: [postcssNested]
        })
    ]
};
