var gulp = require('gulp');

var less = require('gulp-less');
// var LessPluginCleanCSS = require('less-plugin-clean-css'),
//     LessPluginAutoPrefix = require('less-plugin-autoprefix'),
//     cleancss = new LessPluginCleanCSS({ advanced: true }),
//     autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var ts = require('gulp-typescript');
var sass = require('gulp-sass');


gulp.task('default', ['sass', 'ts'], function() {
});

gulp.task('sass', function () {
  return gulp.src('./src/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./'));
});

gulp.task('ts', function(){

    // How to dest to different folders?
    return gulp.src(['./src/**/*.ts', '!/**/*.d.ts'])
        .pipe(ts({
            "target": "es6",
            "module": "commonjs",
            "moduleResolution": "node",
            "sourceMap": true,
            "emitDecoratorMetadata": true,
            "experimentalDecorators": true,
            "removeComments": false,
            "noImplicitAny": false   
        }))
        .pipe(gulp.dest('./'));
});
