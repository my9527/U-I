/**
 * Created by my on 2016/11/9.
 */
angular
    .module('common.myDirectives', [])
    /**
     * myActionSheet
     *
     * 主要用于显示一些操作，可从底部上升，与ionic 的actionSheet类似
     */
    .directive('myActionSheet', [
        function () {
           function compile(ele, attr){
               var d = document;
               var fragment = d.createDocumentFragment();
           }

            return{
                scope: {

                },
                compile: compile,
                templateUrl:''
            }
        }
    ])
;