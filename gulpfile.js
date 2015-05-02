var path = require('path');
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var browserify = require('browserify');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var uglify = require('gulp-uglify');
var yargs = require('yargs');
var transform = require('vinyl-transform');

var BUILD = path.join(__dirname, 'build');

gulp.task('lint', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));
});

gulp.task('build', ['build-js', 'build-html', 'build-css']);

gulp.task('build-js', function() {

	var browserified = transform(function(filename) {
		var b = browserify(filename);
		b.transform('workerify');
		return b.bundle();
	});

	return gulp.src(['src/js/main.js'])
		 .pipe(browserified)
		 //.pipe(uglify())
		 .pipe(gulp.dest(path.join(BUILD, 'js')));
});

gulp.task('build-html', function() {
	return gulp.src('src/index.html')
		.pipe(gulp.dest(BUILD));
});

gulp.task('build-css', function() {
	return gulp.src('src/css/style.css')
		.pipe(gulp.dest(path.join(BUILD, 'css')));
});

gulp.task('watch', function() {
	gulp.watch('src/**/*', ['lint', 'build']);
});

gulp.task('default', ['lint', 'build', 'watch']);

