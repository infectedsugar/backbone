// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    browserify = require('gulp-browserify'),
    rename = require('gulp-rename');

// Compile our Sass into a css file
// Sends that file to css folder
gulp.task('sass', function() {
    return gulp.src('./public/css/scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./public/css'));
});
// Checks for js errors & reports
gulp.task('lint', function() {
    return gulp.src('./public/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));

});
// Joins all js files into join.js
// Compresses into joins.js
// Allows npm objects to work
// Renames joins.js to all.js
// Puts all.js into a min folder
gulp.task('scripts', function() {
    return gulp.src('./public/js/*.js')
        .pipe(concat('joins.js'))
        .pipe(uglify())
        .pipe(browserify())
        .pipe(rename("all.js"))
        .pipe(gulp.dest('./public/js/min'));
});



// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./public/js/*.js', ['lint','scripts']);
    gulp.watch('./public/css/scss/*.scss', ['sass']);
});

// Default Task defult just allows you to write gulp
gulp.task('default', ['scripts','sass','watch','lint']);
