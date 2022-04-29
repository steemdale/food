const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('styles', function() {
    return gulp.src("css/*.+(scss|sass)")
            .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
            .pipe(rename({
                prefix:'',
                suffix: '.min'
            }))
            .pipe(autoprefixer({
                cascade: false
            }))
            .pipe(cleanCSS({compatibility: 'ie8'}))
            .pipe(gulp.dest('css'));
});

gulp.task('watch', function(){
    gulp.watch('css/*.+(scss|sass)', gulp.parallel('styles'));
});

gulp.task('default', gulp.parallel('styles'));

