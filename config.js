var config = {
	base: [
		"./src/libs/angular.js"
	],
	src: {
		base: './src',
		modules: './src/modules/**/*.*',
		js: './src/**/*.js',
		html: './src/**/*.html',
		less: './src/**/*.less',
		libs: './src/libs/*.js'
	},

	dist: {
		base: './app1/www/',

		html: './app1/www/html',
		js: './app1/www/js',
		css: './app1/www/css',
		libs: './app1/www/libs'
	},

	args:{
		modules: []
	},

	server: {
		port: 3000,
		root: './app1/www'
		
	}

}
module.exports = config;