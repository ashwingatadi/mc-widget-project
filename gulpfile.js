var gulp = require('gulp');
var concat = require('gulp-concat');
var dir = './dist/build';

gulp.task('concat', function () {
  return gulp
    .src([
      `${dir}/runtime.js`, 
      `${dir}/polyfills.js`,
      `${dir}/main.js`])
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(`${dir}/`));
});

gulp.task('assets', function () {
  return gulp.src([`${dir}/assets/**/*`]).pipe(gulp.dest(`./docs/assets/`));
});
