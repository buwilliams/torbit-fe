var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var rename = require("gulp-rename");
var connect = require('gulp-connect');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

// ******************
// Project Settings
// ******************

var project = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  views: {
    index: project.app + '/templates/index.html'
  }
};

// ******************
// Internal Tasks
// ******************

// Inject bower components into index file
gulp.task('bower', function () {
  return gulp.src(paths.views.index)
    .pipe(wiredep({
      directory: project.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe(rename('index.html'))
  .pipe(gulp.dest(project.app));
});

gulp.task('images', function () {
  return gulp.src(project.app + '/images/**/*')
    .pipe($.cache($.imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })))
    .pipe(gulp.dest(project.dist + '/images'));
});

gulp.task('clean:prod', function (cb) {
  rimraf(project.dist, cb);
});


gulp.task('build:prod', function (cb) {
});

gulp.task('build', ['clean:prod'], function (cb) {
  runSequence(['images', 'build:prod']);
});

// ******************
// Main CLI
// ******************

gulp.task('serve', ['bower'], function () {
  connect.server({
    root: 'app/',
    port: 9000
  });
});

gulp.task('serve:prod', ['build'], function () {
});
