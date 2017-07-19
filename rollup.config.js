import { minify } from 'uglify-es';
import multiEntry from 'rollup-plugin-multi-entry';
import typescript from 'rollup-plugin-typescript';
import uglify from 'rollup-plugin-uglify';

export default {
    entry: ['src/main.ts', 'src/model/calendar-type.enum.ts'],
    dest: 'dist/add2Calendar.js',
    format: 'cjs',
    moduleName: 'add2Calendar',
    plugins: [
        typescript(),
        multiEntry(),
        uglify({}, minify)
    ]
};
