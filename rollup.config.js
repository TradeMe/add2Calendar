import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';

export default {
    entry: 'src/main.ts',
    dest: 'dist/add2Calendar.js', // equivalent to --output
    format: 'cjs',
    moduleName: 'add2Calendar',
    plugins: [
        typescript(),
        uglify({}, minify)
    ]
};