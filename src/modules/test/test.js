/*angular
	.module("myApp", ["ngRoute", "ii"])
	// .config(["$routeProvider", function($routeProvider){
	// 	$routeProvider
	// 		.when("/index", {
	// 			controller: "myCtrl",
	// 			// controllerAs: "myc",
	// 			templateUrl: "html/index/index.html"
	// 		})
	// }])
	.controller("myCtrl",[
		"$scope",
		"$location",
		function($scope, $location){
			var view = this;
			view.name = "my";
			$scope.name= "my";
			// console.log("go to the index")
		}
	]);

angular
	.module("ii",["ngRoute"])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/test", {
				controller: "iiCtrl",
				// controllerAs: "myc",
				templateUrl: "html/test/test.html"
			})
			.when("/testi", {
				controller: 'iCtrl',
				templateUrl: "html/test/testi.html"
			})
	}])
	.controller("iiCtrl",[
		"$scope",
		function($scope){
			var view = this;
			view.name = "my";
			view.age = "23";
			$scope.name= "my";
			$scope.age = 23;
		}
	]);*/