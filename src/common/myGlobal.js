/**
 * Created by my on 2016/10/18.
 */
angular
    .module("common.myGlobal", [])
    .factory("myGLOBAL", [
        "$window",
        "$location",
        function ($window, $location) {
            var myGLOBAL = {
                modules: ["home"],
                alerts : [],
                open: open
            };

            function open(url, type, callback){
                type = !type?0:type;
                if(!url){
                    return callback && callback.call();
                }
                switch (type){
                    case 0: {
                        $location.path(url);
                        break;
                    }
                    case 1: {
                        break
                    }
                    default: {

                    }
                }
            }
            return myGLOBAL;

        }
    ])
;