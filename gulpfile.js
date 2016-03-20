var gulp = require('gulp');

// Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || './app/',
    dist: './dist/',
    dev: './dev/',
    ionic:'./bower_components/ionic/release/'
  };

//加载gulp-load-plugins插件，并马上运行它
var plugins = require('gulp-load-plugins')();

// 清空开发文件夹
gulp.task('build-clean-dev', function(cb) {
  return gulp.src([appConfig.dev], {read: false})
    .pipe(plugins.clean());
});
// 清空发布文件夹
gulp.task('build-clean-prod', function(cb) {
  return gulp.src([appConfig.dist], {read: false})
    .pipe(plugins.clean());
});

// jade解析
gulp.task('build-jade', function(){
   return gulp.src(appConfig.app+'**/*.jade',{ base: appConfig.app })
    .pipe(plugins.jade({pretty: true}))
    .pipe(gulp.dest(appConfig.dev))
});

// less解析
gulp.task('build-less', function(){
   return gulp.src(appConfig.app+'**/*.less',{ base: appConfig.app })
    .pipe(plugins.less())
    .pipe(gulp.dest(appConfig.dev))
});

// img拷贝
gulp.task('copy-img', function(){
   return gulp.src(appConfig.app+'**/*.+(png|jpg|gif|svg)',{ base: appConfig.app })
    .pipe(gulp.dest(appConfig.dev))
});

// js拷贝
gulp.task('copy-js', function(){
   return gulp.src(appConfig.app+'**/*.js',{ base: appConfig.app })
    .pipe(gulp.dest(appConfig.dev))
});

// html拷贝
gulp.task('build-html', function(){
   return gulp.src(appConfig.dev+'**/*.html',{ base: appConfig.dev })
   .pipe(gulp.dest(appConfig.dist))
});

// js/css合并
gulp.task('build-useref', ['build-html'], function(){
   return gulp.src(appConfig.dev+'**/*.html',{ base: appConfig.dev })
    .pipe(plugins.useref())
    .pipe(gulp.dest(appConfig.dist));
});

//压缩html/css/js
gulp.task('build-min', ['build-useref'], function(){
   gulp.src(appConfig.dist+'**/*.html',{ base: appConfig.dist })
    .pipe(plugins.minifyHtml())
    .pipe(gulp.dest(appConfig.dist));

    gulp.src(appConfig.dist+'**/*.js',{ base: appConfig.dist })
    .pipe(plugins.uglify())
    .pipe(gulp.dest(appConfig.dist));

    gulp.src(appConfig.dist+'**/*.css',{ base: appConfig.dist })
    .pipe(plugins.minifyCss())
    .pipe(gulp.dest(appConfig.dist));
});

// 拷贝压缩图片
gulp.task('build-images', function(){
   return gulp.src(appConfig.dev+'**/*.+(png|jpg|gif|svg)',{ base: appConfig.dev })
  .pipe(plugins.cache(plugins.imagemin({
      interlaced: true
    })))
  .pipe(gulp.dest(appConfig.dist))
});

// 拷贝bower字体
gulp.task('build-fonts', function(){
   return gulp.src(appConfig.ionic+'**/*.+(eot|svg|ttf|woff)',{ base: appConfig.ionic })
  .pipe(gulp.dest(appConfig.dist+"src"))
});


// 定义develop任务在日常开发中使用
gulp.task('develop',['build-clean-dev'],function(){
  return gulp.start('build-jade','build-less','copy-img','copy-js');
});

gulp.task('webserver-dev', function(){

      gulp.watch(appConfig.app+'**/*.jade', ['build-jade']);
      gulp.watch(appConfig.app+'**/*.less', ['build-less']);
      gulp.watch(appConfig.app+'**/*.+(png|jpg|gif|svg)', ['copy-img']);
      gulp.watch(appConfig.app+'**/*.js', ['copy-js']);
});

// 定义prod任务
gulp.task('prod',['build-clean-prod'],function(){
  return gulp.start('build-min','build-images','build-fonts');
});


// default
gulp.task('default', function() {
  return gulp.start('develop');
});

