const gulp = require('gulp');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const sourcemaps = require('gulp-sourcemaps');
const watchPath = require('gulp-watch-path');
const pump = require('pump');

gulp.task('default', ['watchjs']);

gulp.task('compress', function (cb) {
    pump([
        gulp.src('src/*.js'),
        uglify(),
        gulp.dest('dist')
    ],
        cb
    );
});

gulp.task('uglifyjs', function () {
    gulp.src('src/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('dist/'))
});

gulp.task('watchjs', function () {
    gulp.watch('src/js/**/*.js', function (event) {
        var paths = watchPath(event, 'src/', 'dist/')
        /*
        paths
            { srcPath: 'src/js/log.js',
              srcDir: 'src/js/',
              distPath: 'dist/js/log.js',
              distDir: 'dist/js/',
              srcFilename: 'log.js',
              distFilename: 'log.js' }
        */
        gutil.log(gutil.colors.green(event.type) + ' ' + paths.srcPath)
        gutil.log('Dist ' + paths.distPath)

        gulp.src(paths.srcPath)
            .pipe(uglify())
            .pipe(gulp.dest(paths.distDir))
    })
});