/**
 * Created by my on 2017/1/5.
 */

const gulp = require("gulp");
const runSequence = require("gulp-sequence");
const through2 = require("through2");
// const utils = require("./utils");

gulp.task("get-modules", ()=>{
   let filePath = gulp.config.src.modules;
   return gulp.src(filePath)
               .pipe(through2.obj((file, enc, cb)=>{
                  let fileName = file.relative.split("\\");

                  gulp.config.args.modules.push(fileName[0]);
                  this.push(file);
                  cb();
               }))
               .on("end", ()=>{
                  gulp.config.args.modules = Array.from(new Set(gulp.config.args.modules));
                  console.log(gulp.config.args.modules);
               })
});

require("./tasks");
