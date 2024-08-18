import babel from '@rollup/plugin-babel';
import nodeResolve from '@rollup/plugin-node-resolve';

export default [
    {
        input: 'src/index.ts',
        output: [
            {
                format: 'cjs',
                file: 'lib/index.js',
            },
            {
                format: 'es',
                file: 'dist/index.js',
            },
        ],
        external: ['@angular/core'],
        plugins: [
            nodeResolve({
                extensions: ['.js', '.ts'],
            }),
            babel({
                extensions: ['.js', '.ts'],
                babelHelpers: 'bundled',
                presets: ['@babel/preset-typescript'],
                plugins: [
                    [
                        'babel-plugin-transform-rename-import',
                        {
                            original: 'rxcore',
                            replacement: '../../../src/core',
                        },
                    ],
                ],
            }),
        ],
    },
];
