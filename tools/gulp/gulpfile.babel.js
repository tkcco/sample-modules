import gulp from 'gulp';
import browserify from 'browserify';
import babelify from 'babelify';
import source from 'vinyl-source-stream';
import buffer from 'vinyl-buffer';
import pug from 'gulp-pug';
import autoprefixer from 'gulp-autoprefixer';
import cleanCSS from 'gulp-clean-css';
import plumber from 'gulp-plumber';
import sass from 'gulp-sass';
import notifier from 'node-notifier';
import notify from 'gulp-notify';
import uglify from 'gulp-uglify-es';
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
import del from 'del';

const dir = {
  src: 'src/',
  dist: 'public/'
};
const config = {
  pug: {
    src: `${dir.src}`,
    dist: `${dir.dist}`
  },
  style: {
    src: `${dir.src}stylesheets/`,
    dist: `${dir.dist}stylesheets/`
  },
  image: {
    src: `${dir.src}images/`,
    dist: `${dir.dist}images/`
  },
  script: {
    src: `${dir.src}javascripts/`,
    dist: `${dir.dist}javascripts/`
  }
};

const isProduction = process.env.NODE_ENV === 'production';
console.log('process.env.NODE_ENV === "production" => ', isProduction);

gulp.task('pug', () => {
  return gulp.src(`${config.pug.src}**/!(_)*.pug`)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(pug())
    .pipe(gulp.dest(config.pug.dist))
    .pipe(browserSync.stream());
});

gulp.task('sass', () => {
  return gulp.src(`${config.style.src}style.scss`)
    .pipe(plumber({ errorHandler: notify.onError("Error: <%= error.message %>") }))
    .pipe(sass())
    .pipe(autoprefixer({
      'browsers': [
        'ie >= 11',
        'last 2 Chrome versions',
        'last 2 Firefox versions',
        'last 2 Safari versions',
        'iOS >= 9',
        'Android >= 4.4',
        'last 2 ChromeAndroid versions',
        'last 2 FirefoxAndroid versions',
        'last 2 versions'
      ],
      cascade: false
    }))
    .pipe(cleanCSS({compatibility: 'ie11'}))
    .pipe(gulp.dest(config.style.dist))
    .pipe(browserSync.stream());
});

gulp.task('image', () => {
  return gulp.src(`${config.image.src}**/*`)
    .pipe(gulp.dest(config.image.dist))
    .pipe(browserSync.stream());
});

gulp.task('eslint', () => {
  return gulp.src(`${config.script.src}**/*.js`)
    .pipe(plumber({
      errorHandler: error => {
        let taskName = 'eslint';
        let title = `[task] ${taskName} ${error.plugin}`;
        let errorMsg = `error: ${error.message}`;
        console.error(`${title}\n${errorMsg}`);
        notifier.notify({
          title: title,
          message: errorMsg,
          time: 3000
        });
      }
    }))
    .pipe(eslint({ useEslintrc: true }))
    .pipe(eslint.format())
    .pipe(eslint.failOnError())
    .pipe(plumber.stop());
});

gulp.task('browserify', gulp.series('eslint', () => {
  return browserify(`${config.script.src}app.js`)
    .transform(babelify)
    .bundle()
    .on('error', function(err) {
      console.log(`Error : ${err.message}`);
      console.log(err.stack);
      this.emit('end');
    })
    .pipe(source('app.js'))
    .pipe(buffer())
    .pipe(uglify({
      output:{
        comments: /^!/
      }
    }))
    .pipe(gulp.dest(config.script.dist))
    .pipe(browserSync.stream());
}));

gulp.task('browserSync', () => {
  browserSync.init({
    server: {
      baseDir: dir.dist
    }
  });
});

gulp.task('watch', () => {
  gulp.watch(`${config.pug.src}**/*.pug`, gulp.task('pug'));
  gulp.watch(`${config.style.src}**/*.scss`, gulp.task('sass'));
  gulp.watch(`${config.image.src}**/*`, gulp.task('image'));
  gulp.watch(`${config.script.src}**/*.js`, gulp.task('browserify'));
});

gulp.task('clean', cd => {
  return del([`${dir.dist}**/*`], cd);
});

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('pug', 'sass', 'image', 'browserify', 'browserSync', 'watch'),
));

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('pug', 'sass', 'image', 'browserify'),
));


