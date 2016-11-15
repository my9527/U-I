angular
    .module("module.home", [
        "ngRoute",
        "ngSanitize",
        "common.eventListener"
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
        "eventListener",
        function ($scope, $sce, $timeout, myGLOBAL, utils, eventListener) {
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
                    icon: 'my-icon-zoom-in'
                },{
                    name: "游玩",
                    url: "",
                    icon: 'my-icon-stop'
                },{
                    name: "电影",
                    url: "",
                    icon: 'my-icon-friends'
                },{
                    name: "服装",
                    url: "",
                    icon: 'my-icon-send'
                },{
                    name: "数码",
                    url: "",
                    icon: 'my-icon-geo-flag'
                },{
                    name: "地图",
                    url: "/map",
                    icon: 'my-icon-geo'
                },{
                    name: "计步器",
                    url: "/walkMate",
                    icon: 'my-icon-upload'
                },{
                    url: "/gallary",
                    name: "gallary",
                    icon: "my-icon-edit"
                }];

                addEmptyModule(view.modules);

                view.bannerList = [
                    {
                        url: 'http://pic.4j4j.cn/upload/pic/20160421/7738daa141.jpg',
                        desc: '1'
                    },
                    {
                        url: 'http://pic.4j4j.cn/upload/pic/20160421/91d2478ef4.jpg',
                        desc: '2'
                    },
                    {
                        url: 'http://pic.4j4j.cn/upload/pic/20160518/11d601e0b3.jpg',
                        desc: '3'
                    }
                ]
                view.jigsawUrl = null;
            }

            view.showJigsaw = showJigsaw;
            function showJigsaw() {
                // view.jigsawUrl = view.bannerList[Math.floor(Math.random()*3)].url;
                console.log(view.jigsawUrl);
                eventListener.trigger("myJigsawViewshow")(view.bannerList[Math.floor(Math.random()*3)].url);
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
