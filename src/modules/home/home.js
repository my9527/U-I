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
    .controller("homeCtrl", [
        "$scope",
        "$sce",
        "$timeout",
        "myGLOBAL",
        "utils",
        function ($scope, $sce, $timeout, myGLOBAL, utils) {
            var view = this;

            init();

            view.open = function(url){
                myGLOBAL.open(url, null, function(){
                    utils.notice("努力开发中...");
                })
            };

            function init() {
                view.modules = [{
                    name: "吃货",
                    url: "",
                    icon: 'fa fa-food'
                },{
                    name: "游玩",
                    url: "",
                    icon: 'fa fa-tour'
                },{
                    name: "电影",
                    url: "",
                    icon: 'fa fa-movies'
                },{
                    name: "服装",
                    url: "",
                    icon: 'fa fa-clothes'
                },{
                    name: "数码",
                    url: "",
                    icon: 'fa fa-tech'
                },{
                    name: "地图",
                    url: "/map",
                    icon: 'fa fa-tech'
                }];

                addEmptyModule(view.modules)

            }


            /**
             * 补充空白应用，保持UI 布局
             * @param modules
             */
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
