angular
	.module("module.map", ["ngRoute"])
	.controller("mapCtrl", [
		"$scope",
		function($scope){
			var view = this;
			view.name = "yl";
		}
	])
;