/*
 * @Author: 刘祥祥 
 * @Date: 2019-04-08 08:48:32 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2019-04-08 11:26:52
 * function(){ 前台代理 }
 */

const gulp = require('gulp');
const sass = require('gulp-sass');
const webserver = require('gulp-webserver');

gulp.task('scss', function() { //编译scss
    return gulp.src('./src/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./src/css/'));
});

gulp.task('watch', function() { //监听scss
    gulp.watch('./src/scss/**/*.scss', gulp.series('scss'));
});

gulp.task('server', function() { //启动服务
    return gulp.src('./src')
        .pipe(webserver({
            prot: 9999,
            open: true,
            // livereload:true,
            proxies: [{
                source: '/api/findData', //查找数据
                target: 'http://localhost:3000/api/findData'
            }, {
                source: '/api/getData', //获取数据
                target: 'http://localhost:3000/api/getData'
            }, {
                source: '/api/addData', //添加数据
                target: 'http://localhost:3000/api/addData'
            }, {
                source: '/api/delData', //删除数据
                target: 'http://localhost:3000/api/delData'
            }, {
                source: '/api/upData', //修改数据
                target: 'http://localhost:3000/api/upData'
            }]
        }));
});
gulp.task('default', gulp.series('scss', 'server', 'watch'));