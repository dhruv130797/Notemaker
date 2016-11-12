//gulpfile on Sun 10 Jan(01) 2016
//Author: Rohan M.

// Load PLUGIN
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minify = require('gulp-minify-css'),
    //jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    //rename = require('gulp-rename'),
    conc = require('gulp-concat'),
    //notify = require('gulp-notify'),
    //cache = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    //del = require('del'),
    plumber = require('gulp-plumber');


//JS
gulp.task('scripts', function(){
	gulp.src('app/js/**/*.js')
	.pipe(plumber())
	.pipe(uglify())
	.pipe(minify())
	//.pipe(conc())
	.pipe(gulp.dest('app/scripts/'))
	.pipe(browserSync.reload({stream:true}));
})

//CSS
gulp.task('styles',function(){
	gulp.src('app/scss/**/*.scss')
	.pipe(plumber())
	.pipe(sass())
	.pipe(autoprefixer('last 2 versions'))
	.pipe(minify())
	.pipe(gulp.dest('app/styles/'))
	.pipe(browserSync.reload({stream:true}));

})

//IMG
gulp.task('images',function(){
	gulp.src('app/img/**/*')
	.pipe(plumber())
	.pipe(imagemin())
	.pipe(gulp.dest('app/images'));
})

//HTML
gulp.task('html',function(){
	gulp.src('app/**/*.html')
	.pipe(browserSync.reload({stream:true}));
})


//WATCH
gulp.task('watch', function(){
	gulp.watch('app/js/**/*.js', ['scripts']);
	gulp.watch('app/scss/**/*.scss', ['styles']);
	gulp.watch('app/img/**/*', ['images']);
	gulp.watch('app/*.html', ['html'])

});


//RELOAD PAGE
gulp.task('live',function(){
	browserSync.init({
		server:{
			baseDir: "app"
		}
	})
})


//default
gulp.task('default', ['scripts','styles','live','images','html','watch']);