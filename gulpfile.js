var gulp = require('gulp');
var sass = require('gulp-sass');
var autoprefixer = require('gulp-autoprefixer');
var nunjucksRender = require('gulp-nunjucks-render');
var data = require('gulp-data');


gulp.task('sass', function () {
  return gulp.src('./styles/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['last 2 versions']}))
    .pipe(sass({outputStyle: 'compressed'}))
    .pipe(gulp.dest('./styles'));
});
 
gulp.task('watch', function () {
  gulp.watch('./styles/*.scss', ['sass']);
});

gulp.task('nunjucks', function() {
  return gulp.src('./pages/*.nunjucks')
  .pipe(data(function() {
    return require('./stories.json')
  }))
  .pipe(nunjucksRender({
      path: ['./templates']
    }))
  .pipe(gulp.dest('./'))
});


gulp.task('default', ['sass', 'watch', 'nunjucks']);