var gulp = require('gulp');

var less = require('gulp-less');
// var LessPluginCleanCSS = require('less-plugin-clean-css'),
//     LessPluginAutoPrefix = require('less-plugin-autoprefix'),
//     cleancss = new LessPluginCleanCSS({ advanced: true }),
//     autoprefix= new LessPluginAutoPrefix({ browsers: ["last 2 versions"] });

var ts = require('gulp-typescript');


gulp.task('default', ['less', 'nodejs'], function() {
});

gulp.task('less', function(){
	// gulp.src('./public/less/*.less')
	//   .pipe(less({
	//     plugins: [autoprefix, cleancss]
	//   }))
	//   .pipe(gulp.dest('./public/css'));
})

gulp.task('nodejs', function(){

    // How to dest to different folders?
    return gulp.src('./src/**/*.ts')
        .pipe(ts({
            noImplicitAny: true,
            target: "ES6",
            module: "commonjs"
            
        }))
        .pipe(gulp.dest('./'));
});