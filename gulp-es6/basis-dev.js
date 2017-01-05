/**
 * Created by my on 2017/1/5.
 */

const gulp = require("gulp");
const less = require("gulp-less");
const concat = require("gulp-concat");
const config = gulp.config;
const rename = require("gulp-rename");
const utils = require("./utils");
const gulpIf = require("gulp-if");
const path = require("path");
const server = require("./server");
const order = require("gulp-order");
const uglify = require("gulp-uglify");


let isCompress = Array.from(process.argv).includes('-p');

function resolvePaths(type, module) {
    let files = [];
    let dest = config.dist.base + "/" + type + "/";

    files.push(config.src.base+"/modules/"+module+"/**/*."+type);
    files.push(config.src.base+"/modules/"+module+"/*."+type);

    return {files, dest};
}

function dev_html(module, isArray) {
    let opts = resolvePaths("html", module);
    utils.log(module);
    utils.log(opts.files);
    return gulp.src(opts.files, {base: './src/modules'})
                .pipe(gulp.dest(opts.dest));
}

function dev_js(module) {
    let opts = resolvePaths("js", module);

    utils.log("dev " + module + " js");
    return gulp.src(opts.files)
                .pipe(concat(module + "main.js"))
                .pipe(gulp.dest(opts.dest))
                .on("end", ()=>{
                    utils.log(module + " js finished");
                });
}

function dev_less( module ) {
    let files = [];
    let dest = config.dist.base + "/css";

    files.push(config.src.base+"/modules/"+module+"/**/*.{less,css}");
    files.push(config.src.base+"/modules/"+module+"/*.{less,css}");

    return gulp.src(files)
        .pipe(less())
        .pipe(rename(module+".css"))
        .pipe(gulp.dest(dest));
}

function dev_res(file, type) {
    let isWatch = !!file && !!type;
    let _res = [];

    if(isWatch){
        let _filePath = path.join(config.src.res, file);

        utils.log(type);
        utils.log(_filePath);

        "less" == type && _res.push(resLess(file));
        "font" == type && _res.push(copyFile(_filePath, type));
        "img" == type && _res.push(copyFile(_filePath, type));
    }else{
        _res.push(resLess());
        _res.push(copyFile());
    }

    Promise.all(_res)
        .then(function () {
            utils.log("res finished");
            _res.length = 0;
        });

    function resLess(){
        return gulp.src(config.src.res+"/index.less")
            .pipe(less())
            .pipe(rename('res.css'))
            .pipe(gulp.dest(config.dist.css))
            .on("end",  ()=> {
                concatCss();
            })
    }

    function copyFile(file = ["./src/res/**/*.*", "./src/res/*.*","!./src/res/**/*.less", "!./src/res/*.less"], type) {

        let d = config.dist.css;
        if(type){
            d += "/"+type;
        }
        return gulp.src(file)
            .pipe(gulp.dest(d))
    }

    function copyImg(file = "./src/res/img/*.*"){
        return gulp.src(file)
            .pipe(gulp.dest(config.dist.css+"/img"))
    }
}

function dev_libs() {
    // var files = [config.src.libs+"/**/*.js", config.src.libs+"/*.js"];
    let files = ["src/libs/**/*.js", "src/libs/*.js"];
    let dest = config.dist.libs;

    return gulp.src(files, {base: '.'})
        .pipe(order(["src/libs/angular.js", "src/libs/*.js"], {base:'.'}))
        .pipe(concat("myLibs.js"))
        .pipe(gulp.dest(dest));
}

function concatCss() {
    return gulp.src(["www/css/*.css", "!www/css/style.css"])
        .pipe(order(["www/css/res.css", "www/css/index.css", "www/css/*.css"], {base: '.'}))
        .pipe(concat("style.css"))
        .pipe(gulp.dest("./www/css/"))

}
module.exports = {
    dev_html: dev_html,
    dev_js: dev_js,
    dev_less: dev_less,
    dev_res: dev_res,
    dev_libs: dev_libs,
    concat_css: concatCss
}