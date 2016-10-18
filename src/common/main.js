angular
    .module("myApp", [
    	"ngRoute",
    	 "module.home"
    ])
    .run([
    	"$location",
    	"$rootScope",
    	"$timout",
    	"MC_GLOBAL",
    	"$q",
    	function($location, $rootScope, $timout, MC_GLOBAL, $q){


    	$location.path("/home");
    	//检查是否已经加载过模块
    	$rootScope("$routeChangeStart", function(evt, next, cur){
    		var pathname = next.$$route;
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
    	});

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
    		} 
    		script.onerror = function(err){
    			defer.reject(err);
    		}
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
    ]);
