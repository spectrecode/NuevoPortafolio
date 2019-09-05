'use strict';
var gulp        = require('gulp'),
    cache       = require('gulp-cache'),
    browserSync = require('browser-sync').create(),
    reload      = browserSync.reload,
    changed     = require('gulp-changed' ),
    sass        = require('gulp-sass'),
    deepExtend  = require('deep-extend-stream'),
    pug         = require('gulp-pug'),
    concat      = require('gulp-concat'),
    uglify      = require('gulp-uglify'),
    plumber     = require('gulp-plumber'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    prefix      = require('gulp-autoprefixer'),
    gutil       = require('gulp-util'),
    compass     = require('compass-importer'),
    webpack     = require('webpack-stream'),
    entorno,
    locals;

gulp.task('clear', function (done) {
  cache.clearAll(done);
});
gulp.task('javascript', function () {
    gulp.src('source/javascript/app.js')
        .pipe( plumber() )
        .pipe( changed('dist/js/') )
        .pipe(webpack({
            watch: true,
            output: {
                filename: 'bundle.js'
            }
        }))
        .pipe( entorno ? uglify({compress:{drop_console: true}}) : gutil.noop() )
        .pipe(gulp.dest('dist/js/'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('plugins', function() {
    gulp.src(
          [
            './source/javascript/plugins/jquery.1.10.1.min.js', 
            './source/javascript/plugins/fullpage.js', 
          ]
        )
        .pipe(concat('plugins.js') )
        .pipe(uglify({
          compress:{
            drop_console:true
          }
        }))
        .pipe( gulp.dest('dist/js/plugins'))
        .pipe(browserSync.reload({stream: true}));
});

gulp.task('sass', function () {
  gulp.src('./source/sass/*.scss')
      .pipe(plumber())
      .pipe(sass({
        importer: compass
      }))
      .pipe( entorno ? sass({outputStyle:'compressed'}) : gutil.noop())
      .pipe(prefix({browsers: ['last 2 versions', 'ie 8', 'ie 9', '> 1%', 'Firefox >= 20', 'Opera 12.1','iOS 7'], cascade: false}))
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('templates', function() {
  gulp.src('./source/layouts/*.pug')
      .pipe(plumber())
      .pipe( changed('./dist') )
      .pipe(pug({
        data: locals,
        pretty: true
      }))
      .pipe(gulp.dest('./dist'))
      .pipe(browserSync.reload({stream: true}));
});

gulp.task('images', function() {
  gulp.src('./source/images/*.{png,jpg,jpeg,gif,svg}')
      .pipe(imagemin({
        progressive: true,
        interlaced: true,
        optimizationLevel: 3,
        svgoPlugins: [{
          removeViewBox: false
        }],
        use: [pngquant({
          quality: '75-80',
          speed: 4
        })]
      }))
      .pipe(gulp.dest('dist/images/'));
});



gulp.task('watch', function () {
  gulp.watch('source/sass/**/**/*.scss', ['sass']);
  gulp.watch('source/javascript/**/*.js',  ['javascript']);
  gulp.watch('source/layouts/**/*.pug', ['templates']);
  gulp.watch('source/javascript/plugins/*.js', ['plugins'] );
  gulp.watch('source/images/**/*.*', ['images']);
});

// Static server
gulp.task('serve', function() {
  if (entorno === undefined || entorno === null) {
    browserSync.init({
      open: false,
      server: './dist',
      port: 4000,
    });
  }else {
    browserSync.init({
      open: false,
      server: './dist',
      port: 4000,
    });
  }
});

gulp.task('fonts', function() {
  gulp.src(['source/fonts/**/*.{eot,svg,ttf,woff,woff2}'])
      .pipe(gulp.dest('dist/fonts/'));
});
gulp.task('set-prod-env', function () {
    entorno  = process.env.NODE_ENV = 'prod';
});

var taskProd = [
    'fonts',    
    'clear',
    'set-prod-env',
    'templates',
    'sass',
    'javascript',
    'plugins',
    'images',
    'serve',
];

var taskDefault = [
    'fonts',
    'clear',
    'templates',
    'sass',
    'javascript',
    'plugins',
    'images',
    'watch',
    'serve'    
];

gulp.task('default', taskDefault);
gulp.task('prod', taskProd);
