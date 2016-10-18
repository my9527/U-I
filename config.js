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
		libs: './src/libs/*.js',
		common: 'src/common'
	},

	dist: {
		base: './app/www/',

		html: './app/www/html',
		js: './app/www/js',
		css: './app/www/css',
		libs: './app/www/libs'
	},

	args:{
		modules: []
	},

	server: {
		port: 3000,
		root: './app/www'
		
	}

};
module.exports = config;