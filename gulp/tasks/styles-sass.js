'use strict';

var browserSync = require('browser-sync');
var reload = browserSync.reload;
var sass = require('gulp-sass');

// Compile and Automatically Prefix Stylesheets
module.exports = function (gulp, plugins, config, stylesDir) { return function () {
  var sourcePath = 'app/styles/*.scss';
  var changeDir = stylesDir;

  if (stylesDir === 'elementsDeep' || stylesDir === '') {
    sourcePath = 'app/elements/**/*.scss';
  }
  if (stylesDir === 'elements') {
    sourcePath = 'app/elements/*.scss';
  }
  if (stylesDir === 'stylesDeep') {
    sourcePath = 'app/styles/**/*.scss';
  }

  if (stylesDir === '') {
    changeDir = 'elements';
  }

  return gulp.src(sourcePath)
    .pipe(plugins.changed(changeDir, {extension: '.scss'}))
    .pipe(sass().on('error', console.error.bind(console)))
    .pipe(plugins.autoprefixer(config.autoprefixer.browsers))
    .pipe(gulp.dest('.tmp/' + stylesDir))
    // Concatenate And Minify Styles
    .pipe(plugins.if('*.css', plugins.cssmin()))
    .pipe(gulp.dest('dist/' + stylesDir))
    .pipe(plugins.size({title: stylesDir}))
    .pipe(reload({stream: true, once: true}));
};};
