angular
    .module("myApp", [
    	"ngRoute",
    	 "module.home"
    ])
    .run([
    	"$location",
    	function($location){


    	$location.path("/home");
    }])
 
    .controller("myCtrl",[
        "$scope",
        "$location",
        "$timeout",
        function($scope, $location, $timeout){
            var view = this;

            /**
             * 创建http 服务(单例);
             * @type {Object}
             */
            var http = {
            	init: function(){
            		// this.xhr = createXhr();
            		return this;

            	},
            	xhr : createXhr(),
            	post: function(){

            	},
            	get: function(data, url, prefix){
        			var self = this;
        			//转换
        			var toPostData = JSON.stringify(data);
            		toPostData = toPostData.replace(/[\{\}\'\"]/g, "").replace(/\:/g, "=").replace(/\,/g, "&")

        			var defer = new Promise(function(resolve, reject){
    					self.xhr.open('get', (prefix || "") + url + "?" + toPostData, true);
		            	self.xhr.onreadystatechange = function(res){
		            		if(('4' == self.xhr.readyState && '200' == self.xhr.status) || '304' == self.xhr.status){
		            			console.log(self.xhr.responseText);
		            			resolve(res);
			            	}else{
			            		reject(res);
			            	}
		            	}
	            		self.xhr.send(null);
        			});

        			return defer;
            		
            	},
            	jsonp: function(){

            	}
            }

           var c = http.get({name: 'YL'}, 'js/test.js');
            	c.then(function(res){
            	console.log(res)
            }, function(err){console.log(err)})

            /**
             * 生成xhr，并复写createXhr
             * @return {[type]} [description]
             */
            function createXhr(){
            	console.log("createXhr")
            	if(window.XMLHttpRequest){
            		createXhr = function(){
            			return new XMLHttpRequest();
            		};
            		return new XMLHttpRequest(); 
            	}else{
            		var IEXHRVers =["Msxml3.XMLHTTP","Msxml2.XMLHTTP","Microsoft.XMLHTTP"];
					for (var i=0,len=IEXHRVers.length;i< len;i++) {
						try {
							xhr = new ActiveXObject(IEXHRVers[i]);
							if(xhr){
								createXhr = function(){
									return new ActiveXObject(IEXHRVers[i]);
								}
								return xhr;
							}
						}catch(e) {
							continue;
						}
					}
            	}
            }


        }
    ]);

 angular
	.module("module.home",[
		"ngRoute",
		"ngSanitize",
		"com.2fdevs.videogular",
		"com.2fdevs.videogular.plugins.controls",
		"com.2fdevs.videogular.plugins.overlayplay",
		"com.2fdevs.videogular.plugins.poster"
		])
	.config(["$routeProvider", function($routeProvider){
		$routeProvider
			.when("/home", {
				controller: "homeCtrl",
				controllerAs: "myc",
				templateUrl: "html/home/main.html"
			})
	}])
  .directive("zyMedia",[
      function(){

        function link($scope, $ele){
          zymedia('video', {
            nativeControls: true
          })
        }

        return{
          link: link
        }
      }
    ])
	.controller("homeCtrl",[
		"$scope",
		"$sce",
		function($scope, $sce){
			var view = this;

      init();


      function init(){
        view.name = "my";
        view.age = "23";
      }

		}
	]);
