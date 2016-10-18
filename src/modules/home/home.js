angular
    .module("module.home", [
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
    .directive("zyMedia", [
        function () {

            function link($scope, $ele) {
                console.log("this is a directive")
            }

            return {
                link: link
            }
        }
    ])
    .controller("homeCtrl", [
        "$scope",
        "$sce",
        "$timeout",
        function ($scope, $sce, $timeout) {
            var view = this;

            init();

            function init() {
                view.modules = [{
                    name: "吃货",
                    url: "/foodJunkie",
                    icon: 'fa fa-food'
                },{
                    name: "游玩",
                    url: "/tour",
                    icon: 'fa fa-tour'
                },{
                    name: "电影",
                    url: "/movies",
                    icon: 'fa fa-movies'
                },{
                    name: "服装",
                    url: "/clothes",
                    icon: 'fa fa-clothes'
                },{
                    name: "数码",
                    url: "/hightech",
                    icon: 'fa fa-tech'
                }];

                addEmptyModule(view.modules)

            }

            function addEmptyModule(modules){
                var emptyNum = modules.length%4;
                console.log("需添加："+(4-emptyNum));
                if(0 !== emptyNum){
                    var emptyModule = {
                        name: "",
                        url: "",
                        icon: ""
                    }
                    for(var i=0; i<4-emptyNum; i++){
                        modules.push(emptyModule)
                    }

                }
            }

        }
    ]);
