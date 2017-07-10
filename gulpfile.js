const gulp = require('gulp');
const rollup = require('rollup');
const rollupTypescript = require('rollup-plugin-typescript');

// gulp.task('build', async function () {
//     const bundle = await rollup.rollup({
//         entry: './src/main.ts',
//         plugins: [
//             rollupTypescript()
//         ]
//     });
//
//     await bundle.write({
//         format: 'umd',
//         moduleName: 'library',
//         dest: './dist/library.js',
//         sourceMap: true
//     });
// });
//
// gulp.task('build', async function () {
//     const bundle = await rollup.rollup({
//         entry: './src/main.ts',
//         plugins: [
//             rollupTypescript()
//         ]
//     });
//
//     await bundle.write({
//         format: 'umd',
//         moduleName: 'library',
//         dest: './dist/library.js',
//         sourceMap: true
//     });
// });
