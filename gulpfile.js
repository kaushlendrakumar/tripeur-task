const gulp = require('gulp');
const sass = require('gulp-sass');
const fs = require('fs');

const cssPath = './assets/css';

if(!fs.existsSync(cssPath)) {
	fs.mkdirSync(cssPath);
}

gulp.task('sass', () => {
    return gulp.src('./assets/scss/*')
	.pipe(sass().on('error', sass.logError))
	.pipe(gulp.dest('./assets/css/'));
});


gulp.task('sass:watch', () => {
	gulp.watch('./assets/scss/*', ['sass']);
});


gulp.task('default', ['sass', 'sass:watch']);