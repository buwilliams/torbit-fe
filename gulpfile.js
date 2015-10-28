var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep').stream;
var rimraf = require('rimraf');
var runSequence = require('run-sequence');
var mainBowerFiles = require('main-bower-files');

// ******************
// Project Settings
// ******************

var project = {
  app: require('./bower.json').appPath || 'app',
  dist: 'dist'
};

var paths = {
  index: {
    dev: project.app + '/templates/dev.html',
    prod: project.app + '/templates/prod.html'
  }
};

// ******************
// Internal Tasks
// ******************

// Inject bower components into index file
gulp.task('bower', function () {
  return gulp.src(paths.index.dev)
    .pipe(wiredep({
      directory: project.app + '/bower_components',
      ignorePath: '..'
    }))
  .pipe($.rename('index.html'))
  .pipe(gulp.dest(project.app));
});

gulp.task('clean', function(cb) {
  rimraf(project.dist, cb);
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

gulp.task('lint', function() {
  gulp.src([project.app + '/**/*.js', '!' + project.app + '/bower_components/**'])
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.jshint.reporter('fail'));
});

gulp.task('minify-css', function() {
  var opts = {comments:true,spare:true};
  gulp.src([project.app + '/**/*.css', '!' + project.app + '/bower_components/**'])
    .pipe($.minifyCss(opts))
    .pipe($.concat('app.min.css'))
    .pipe(gulp.dest(project.dist + '/'))
});

gulp.task('minify-vendor-css', function() {
  var opts = {comments:true,spare:true};

  // Bootstrap
  gulp.src([project.app + '/bower_components/bootstrap/dist/**/*.min.css'])
    .pipe($.concat('bootstrap.min.css'))
    .pipe(gulp.dest(project.dist + '/bootstrap/css'))
});

gulp.task('minify-js', function() {
  gulp.src([project.app + '/features/app.js', project.app + '/**/*.js', '!' + project.app + '/bower_components/**'])
    .pipe($.uglify({mangle:false}))
    .pipe($.concat('app.min.js'))
    .pipe(gulp.dest(project.dist + '/'))
});

gulp.task('minify-vendor-js', function() {
  var filter = $.filter('**/*.js')
  gulp.src(mainBowerFiles())
    .pipe(filter)
    .pipe($.uglify({mangle:false}))
    .pipe($.concat('vendor.min.js'))
    .pipe(gulp.dest(project.dist + '/'))
});

gulp.task('copy-html-files', function () {
  gulp.src([project.app + '/**/*.html', '!' + project.app + '/templates/**', '!' + project.app + '/index.html'])
    .pipe(gulp.dest('dist/'));
});

gulp.task('copy-bootstrap-fonts', function () {
  gulp.src([project.app + '/bower_components/bootstrap/dist/fonts/**'])
    .pipe(gulp.dest(project.dist + '/bootstrap/fonts'));
});

gulp.task('copy-index', function () {
  gulp.src(paths.index.prod)
    .pipe($.rename('index.html'))
    .pipe(gulp.dest(project.dist));
});

// ******************
// Main CLI
// ******************

// Serves the development version
gulp.task('serve', ['bower'], function () {
  $.connect.server({
    root: project.app + '/',
    port: 9000
  });
});

// Run this task before serve:prod
gulp.task('build', function (cb) {
  runSequence(['clean'], ['images', 'lint', 'minify-css', 'minify-vendor-css', 'minify-js', 'minify-vendor-js', 'copy-html-files', 'copy-bootstrap-fonts', 'copy-index']);
});

// Serves the production version
gulp.task('serve:prod', function () {
  $.connect.server({
    root: project.dist + '/',
    port: 9000
  });
});
