var gulp = require('gulp');
var browserify = require('gulp-browserify');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var ts = require('gulp-typescript');
var uglify = require('gulp-uglify');

var tsProject = ts.createProject("tsconfig.json");

gulp.task("default", function () {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(gulp.dest("dist"));
});

gulp.task('clean', function () {
    return gulp
        .src([
            './tmp/',
            './dist/'
        ], { read: false })
        .pipe(clean());
});

gulp.task('transpile-ts', ['clean'], function () {
    return tsProject
        .src()
        .pipe(sourcemaps.init())
        .pipe(tsProject()).js
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./tmp/js'));
});

gulp.task('min-js', [ 'transpile-ts' ], function () {
    return gulp
        .src('./tmp/js/main.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('add2Calendar.min.js'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./dist/js'))
});

gulp.task('min', [ 'transpile-ts' ], function () {
    return gulp
        .src('./tmp/js/main.js')
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(browserify())
        .pipe(uglify())
        .pipe(concat('add2Calendar.min.js'))
        .pipe(sourcemaps.write('./sourcemaps'))
        .pipe(gulp.dest('./dist/js'))
});