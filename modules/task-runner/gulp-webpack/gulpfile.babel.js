import gulp from 'gulp';
import del from 'del';
import notify from 'gulp-notify';
import plumber from 'gulp-plumber';
import pug from 'gulp-pug';
import autoprefixer from 'autoprefixer';
import postcss from 'gulp-postcss';
import cleancss from 'gulp-clean-css';
import sass from 'gulp-sass';
import webpack from 'webpack';
import webpackConfig from './webpack.config.js';
import webpackStream from 'webpack-stream';
import browserSync from 'browser-sync';
import watch from 'gulp-watch';
import runSequence from 'run-sequence';

const config = {
  devDir: './_dev/',
  preDir: './_pre/',
  pubDir: './htdocs/',
  copyDevDir: {
    fonts: './_dev/assets/fonts/',
    images: './_dev/assets/images/'
  },
  copyPreDir: {
    fonts: './_pre/assets/fonts/',
    images: './_pre/assets/images/'
  }
};

const targetBrowsers = ['ie >= 9', 'iOS >= 9', 'Android >= 2'];

gulp.task('pugs', () => {
  return gulp.src([`${config.devDir}**/*.pug`, `!${config.devDir}**/_*.pug`])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug({
      basedir: config.devDir,
      pretty: true
    }))
    .pipe(gulp.dest(config.preDir));
});


gulp.task('styles', () => {
  return gulp.src([`${config.devDir}**/style.scss`])
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass())
    .pipe(postcss([
      autoprefixer({
        browsers: targetBrowsers,
        cascade: false
      })
    ]))
    // .pipe(cleancss())
    .pipe(gulp.dest(config.preDir));
});


gulp.task('scripts', () => {
  return webpackStream(webpackConfig, webpack)
    .pipe(gulp.dest(`${config.preDir}assets/scripts/`));
});


gulp.task('copy:images', () => {
  return gulp.src(`${config.copyDevDir.images}/**/*`)
    .pipe(gulp.dest(config.copyPreDir.images));
});
gulp.task('copy:fonts', () => {
  return gulp.src(`${config.copyDevDir.fonts}/**/*`)
    .pipe(gulp.dest(config.copyPreDir.fonts));
});


gulp.task('browserSync', () => {
  browserSync.init(null, {
    server: {
      baseDir: config.preDir
    }
  });
});

gulp.task('Reload::html', ['pugs'], () => browserSync.reload());
gulp.task('Reload::styles', ['styles'], () => browserSync.reload());
gulp.task('Reload::scripts', ['scripts'], () => browserSync.reload());
gulp.task('Reload::copy:images', ['copy:images'], () => browserSync.reload());
gulp.task('Reload::copy:fonts', ['copy:fonts'], () => browserSync.reload());

gulp.task('watch', ['browserSync'], () => {
  watch([`${config.devDir}**/*.pug`], () => gulp.start('Reload::html'));
  watch([`${config.devDir}**/*.scss`], () => gulp.start('Reload::styles'));
  watch([`${config.devDir}**/*.js`], () => gulp.start('Reload::scripts'));
  watch([`${config.copyDevDir.images}/**/*`], () => gulp.start('Reload::copy:images'));
  watch([ `${config.copyDevDir.fonts}/**/*`], () => gulp.start('Reload::copy:fonts'));
});


gulp.task('delPre', () => del([
  `${config.preDir}*`
]));
gulp.task('delPublic', () => del([
  `${config.pubDir}*`
]));

gulp.task('default', () =>  runSequence(
    'delPre',
     ['pugs', 'styles', 'scripts', 'copy:images', 'copy:fonts'],
    'watch'
  ));

gulp.task('build:copy', () => {
  return gulp.src(`${config.preDir}**/*`)
    .pipe(gulp.dest(`${config.pubDir}`));
});
gulp.task('build', () =>  runSequence(
    'delPre', 'delPublic',
    ['pugs', 'styles', 'scripts', 'copy:images', 'copy:fonts'],
    'build:copy'
  ));