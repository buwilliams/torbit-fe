// gulp
var gulp = require('gulp');
var wiredep = require('wiredep').stream;
var rename = require("gulp-rename");
var connect = require('gulp-connect');

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

// ******************
// Main CLI
// ******************

gulp.task('connect', ['bower'], function () {
  connect.server({
    root: 'app/',
    port: 9000
  });
});
