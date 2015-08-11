'use strict';

var gulp = require('gulp');
var server = require('gulp-express');
var plumber = require('gulp-plumber');

//styles
var sass = require('gulp-sass');
var prefixer = require('gulp-autoprefixer');
var minifycss = require('gulp-minify-css');

// js
var concat = require('gulp-concat-sourcemap');
var annotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');

gulp

  .task('copy', function() {
    gulp.src('./src/index.html')
      .pipe(gulp.dest('./dist'));

    gulp.src('./src/assets/templates/**/*.*')
      .pipe(gulp.dest('./dist/assets/templates'));

    gulp.src('./src/assets/img/**/*.*')
      .pipe(gulp.dest('./dist/assets/img/'));

  })

  .task('scss', function() {
    return gulp.src('./src/assets/scss/**/*.*')
      .pipe(plumber())
      .pipe(sass())
      .pipe(prefixer({
        browsers: ['last 2 versions'],
        cascade: false
      }))
      .pipe(minifycss())
      .pipe(plumber.stop())
      .pipe(gulp.dest('./dist/assets/css'))
  })

  .task('js', function() {
    return gulp.src(['./src/js/app.js', './src/js/**/*.js'])
      .pipe(plumber())
      .pipe(annotate())
      .pipe(uglify())
      .pipe(concat('app.js'))
      .pipe(plumber.stop())
      .pipe(gulp.dest('./dist/js/'))
  })

  .task('libs', function() {
    gulp
      .src('./node_modules/angular/*.js')
      .pipe(gulp.dest('./dist/assets/libs/angular/'));

    gulp
      .src('./node_modules/angular-animate/*.min.*')
      .pipe(gulp.dest('./dist/assets/libs/angular-animate/'));

    gulp
      .src('./node_modules/angular-aria/*.min.*')
      .pipe(gulp.dest('./dist/assets/libs/angular-aria/'));

    gulp
      .src('./node_modules/angular-material/*.min.*')
      .pipe(gulp.dest('./dist/assets/libs/angular-material/'));

    gulp
      .src('./node_modules/jquery/dist/*.min.js')
      .pipe(gulp.dest('./dist/assets/libs/jquery/'));

    gulp
      .src('./node_modules/angular-material-icons/angular-material-icons.min.js')
      .pipe(gulp.dest('./dist/assets/libs/angular-material-icons/'))
  })

  .task('serve', function() {
    server.run(['index.js']);

    gulp.watch('./src/**/*.*', function(event) {
      gulp.run('copy');
      gulp.run('scss');
      gulp.run('js');
      server.notify(event);
    });
  })
