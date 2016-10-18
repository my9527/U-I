angular
    .module("myApp", [
    	"ngRoute",
		"ngAnimate",
		"module.home",
		"common.myGlobal",
		"common.routes"
    ])

    .run([
    	"$location",
    	"$rootScope",
    	"$q",
		"myGLOBAL",
    	function($location, $rootScope, $q, myGLOBAL){

		console.log("myGLOBAL: " , myGLOBAL)
    	$location.path("/home");
    	//检查是否已经加载过模块
    	$rootScope.$on("$routeChangeStart", function(evt, next, cur){



/*    		var pathname;
			if(next){
				pathname = next.$$route;
			}
			console.log(pathname);
    		if(!pathname){
    			return $location.url("/home");
    		}
    		//检查相应模块是否加载，若是已经加载，则直接进入，否则先
    		//加载模块js
    		
    		var module = pathname.originalPath.split("/")[1];
			console.log(myGLOBAL)

    		if(-1 == myGLOBAL.modules.indexOf(module)){
				evt.preventDefault();
				loadModules(module)
					.then(function(res){
						myGLOBAL.modules.push(module);
						$location.path(next.$$route.originalPath);
					}, function(){
						$location.url("/home");
					})
    		}else{
    			// $location.path(next.$$route.originalPath);
    		}*/
    	});
    	function loadModules(module){
    		var defer = $q.defer();

    		var script = document.createElement('script');
    		script.src = "js/"+module+"main.js";

    		document.body.appendChild(script);

    		script.onload = function(){
    			defer.resolve();
    			$timout(function(){
    				document.body.removeChild(script);
    				script.onload = null;
    				script = null;
    			},10)
    		};
    		script.onerror = function(err){
    			defer.reject(err);
    		};
    		return defer.promise;
    	}
    }])
 
    .controller("mainCtrl",[
        "$scope",
        "$location",
        "$timeout",
        function($scope, $location, $timeout){
            var view = this;

        }
    ])

	.animation(".app-animate", [
		"$timeout",
		"$route",
		function($timeout, $route){
			var
				flagStack = [""],
				isBack,

				// enterClass = ["slideInRight", "slideInLeft"],
				enterClass = ["fadeInRight", "fadeInLeft"],
				leaveClass = ["fadeOutLeft", "fadeOutRight"],

				animatedDuration = 500
				;

			return {

				enter: function(elem, done){
					var _currentFlag = $route.current.$$route.originalPath,
						className = enterClass[0]
						;

					isBack = false;

					if(flagStack.length > 2){

						if(_currentFlag === flagStack[flagStack.length - 2]){
							className = enterClass[1];
							isBack = true;
							flagStack.splice(flagStack.length - 1, 1);
						}else{
							flagStack.push(_currentFlag || "");
						}

					}else{
						flagStack.push(_currentFlag || "");
					}

					elem.addClass("animated");
					elem.addClass(className);

					$timeout(function(){
						done();
						elem.removeClass(className);
						elem.removeClass("animated");
					}, animatedDuration);
				},

				leave: function(elem, done){

					elem.addClass(isBack ? leaveClass[1] : leaveClass[0]);
					elem.addClass("animated");

					$timeout(function(){
						done();
					}, animatedDuration);
				}
			}
		}
	])

;

