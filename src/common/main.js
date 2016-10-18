angular
    .module("myApp", [
    	"ngRoute",
		"ngAnimate",
		"module.home"
    ])
    .run([
    	"$location",
    	"$rootScope",
    	"$q",
    	function($location, $rootScope, $q){


    	$location.path("/home");
    	//检查是否已经加载过模块
    	/*$rootScope("$routeChangeStart", function(evt, next, cur){
    		var pathname = next.$$route;
			console.log(pathname);
    		if(!pathname){
    			return $location.url("/home");
    		}
    		//检查相应模块是否加载，若是已经加载，则直接进入，否则先
    		//加载模块js
    		
    		var module = pathname.split("/")[0]

    // 		if(!MC_GLOBAL.modules[module]){
				// loadModules()
				// 	.then(function(res){
				// 		MC_GLOBAL.modules.push(module)
				// 		// $location.path(next.$$route);
				// 	}, function(){
				// 		// $location.url("/home");
				// 	})
    // 		}else{
    // 			$location.path(next.$$route);
    // 		}
    	});*/
/*
    	function loadModules(module){
    		var defer = $q.defer();

    		var script = document.createElement('script');
    		script.src = module;

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
    	}*/
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
