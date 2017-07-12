import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';
import { minify } from 'uglify-es';
import multiEntry from 'rollup-plugin-multi-entry';

export default {
    entry: ['src/main.ts', 'src/model/calendar-type.enum.ts'],
    dest: 'dist/add2Calendar.js', // equivalent to --output
    format: 'cjs',
    moduleName: 'add2Calendar',
    plugins: [
        typescript(),
        multiEntry(),
        uglify({}, minify)
    ]
};