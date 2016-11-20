/**
 * Created by my on 2016/11/20.
 */
var gulp = require("gulp");
var utils = require("./utils");
var config = gulp.config;
var runSequence = require('gulp-sequence');


gulp.task("test", runSequence('get-modules', 'dev-res'));
