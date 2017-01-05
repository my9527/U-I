/**
 * Created by my on 2016/11/20.
 */
const gulp = require("gulp");
const server = require("gulp-connect");
const config = gulp.config;


function initServer(){
    console.log("start server");
    server.server({
        root: config.server.root,
        port: config.server.port,
        livereload: true
    });
    return server;
}

module.exports = initServer;