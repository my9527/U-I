
angular
	.module("module.home",[
		"ngRoute",
		"ngSanitize"
		])
	// .config(["$routeProvider", function($routeProvider){
	// 	$routeProvider
	// 		.when("/home", {
	// 			controller: "homeCtrl",
	// 			controllerAs: "hc",
	// 			templateUrl: "html/home/main.html"
	// 		})
	// }])
  .directive("zyMedia",[
      function(){

        function link($scope, $ele){
         console.log("this is a directive")
        }

        return{
          link: link
        }
      }
    ])
	.controller("homeCtrl",[
		"$scope",
		"$sce",
		"$timeout",
		function($scope, $sce, $timeout){
			var view = this;

      init();


      function init(){
        view.name = "my";
        view.age = "23";
      }

		}
	]);
