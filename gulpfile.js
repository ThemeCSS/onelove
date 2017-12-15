// Load Gulp 
var gulp = require('gulp');

// CSS related plugins
var sass = require('gulp-sass');
var autoprefixer = require( 'gulp-autoprefixer' );

// Utility plugins
var plumber = require( 'gulp-plumber' );
var gutil = require('gulp-util');

// Browers related plugin
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

// Project related variables
var projectURL = 'http://localhost/';
var styleSRC = './sass/style.scss';
var styleURL = './';

var styleWatch = './sass/**/*.scss';
var jsWatch = './assets/js/**/*.js';

// Error Handler
var onError = function (err) {
  gutil.beep();
  console.log(err);
};

// Main Styles
gulp.task('styles', function () {
	gulp.src( [ styleSRC ] )
		.pipe(plumber({
      errorHandler: onError
    }))
		.pipe(sass())
		.pipe( autoprefixer({ browsers: [ 'last 2 versions', '> 5%', 'Firefox ESR' ] }) )
		.pipe(gulp.dest( styleURL ))
		.pipe(reload({stream: true}));
});

// Browser Sync
gulp.task( 'browser-sync', function() {
	browserSync.init({
		proxy: projectURL,
		injectChanges: true,
		open: false
	});

	gulp.watch( styleWatch , ['styles']);
	gulp.watch( jsWatch ).on('change', reload);
});

// Default
gulp.task( 'default', ['styles', 'browser-sync'] );