var gulp = require('gulp');
var less = require('gulp-less');
var livereload = require('gulp-livereload');
var connect = require('gulp-connect');
var minifyCss = require('gulp-minify-css');
var imageop = require('gulp-image-optimization');
var autoprefixer = require('gulp-autoprefixer');


//gulp webserver
gulp.task('webserver', function(){
	connect.server({
		root: '../schub_landing/',
		livereload: true
	});
});

//gulp less
gulp.task('less', function(){
	return gulp.src('bootstrap/less/main.less')
		.pipe(less())
		.pipe(gulp.dest('bootstrap/dist/css/'))
		.pipe(connect.reload());
});

gulp.task('default', function(){
	return gulp.src('bootstrap/less/main.less')
  .pipe(less({
    plugins: [autoprefix]
  }))
  .pipe(gulp.dest('bootstrap/dist/css/'));
});

//livereload
gulp.task('css', function(){
	gulp.src('bootstrap/dist/css/*.css')
		.pipe(connect.reload());
});

//css minify
gulp.task('minify-css', function(){
	return gulp.src('bootstrap/dist/css/*.css')
		.pipe(minifyCss({compatibility: 'ie8'}))
		.pipe(gulp.dest('bootstrap/cssmin'));
});


gulp.task('images', function(cb) {
    gulp.src('bootstrap/dist/img/**/*.+(png|jpg|gif|jpeg)').pipe(imageop({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('bootstrap/public/img--min/')).on('end', cb).on('error', cb);
});

gulp.task('html', function(){
	gulp.src('*.html')
		.pipe(connect.reload());
});


gulp.task('watch', function(){
	gulp.watch('bootstrap/less/*.less', ['less']);
	gulp.watch(['*.html'], ['html']);
	gulp.watch(['bootstrap/dist/*.css'], ['css']);
	gulp.watch('bootstrap/dist/css/*.css', ['minify-css'])
});

gulp.task('default', ['less','webserver', 'watch', 'minify-css', 'images']);