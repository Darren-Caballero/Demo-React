/**
 * Created by Darren_YCDing on 16/5/14.
 */
//导入工具包 require('node_modules里对应模块')
var gulp = require('gulp');//本地安装gulp所用到的地方
var webpack = require('webpack');
var del=require('del');
var minifycss = require('gulp-minify-css');//压缩css
var uglify = require('gulp-uglify');//压缩js
var rename = require('gulp-rename');//重命名
var webpackconfig = require('./webpack.config');

/**
 *  清理生产目录文件
 */
gulp.task('clean', function(cb) {
    del(['./dist/*.js','./dist/*.css','./dist/*.map']).then(paths => {
        console.log('删除文件和文件夹成功\n', paths.join('\n'));
        cb();
    });
});

/**
 *  执行webpack打包
 */
gulp.task('webpack',['clean'], function(cb) {
    webpack(webpackconfig, cb)
});

/**
 *  压缩css文件
 */
gulp.task('style',function() {
    gulp.src('./dist/style.build.css')
        .pipe(rename({suffix:'.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('dist'));
});

/**
 *  压缩js文件
 */
gulp.task('script',function(){
    gulp.src('./dist/*.js')
        .pipe(rename({suffix:'.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('dist'));
});

//定义默认任务
gulp.task('default', ['webpack'], function(){
    gulp.start('style','script')
});

//gulp.task(name[, deps], fn) 定义任务  name：任务名称 deps：依赖任务名称 fn：回调函数
//gulp.src(globs[, options]) 执行任务处理的文件  globs：处理的文件路径(字符串或者字符串数组)
//gulp.dest(path[, options]) 处理完后文件生成路径