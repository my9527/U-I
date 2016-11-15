/**
 * Created by my on 2016/11/14.
 */

angular
	.module('module.gallary', [])
	.controller('gallaryCtrl', [
		"eventListener",
		function (eventListener) {
			var view = this;

			init();

			function init(){
				view.gallarys = [
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
                    },
                    {
                        url: 'http://pic.4j4j.cn/upload/pic/20160518/11d601e0b3.jpg',
                        desc: '4'
                    }
                ]
			}
			view.showBig = showBig;
			function showBig(e){
				var target = e.target;
				// console.log(target)
				var ele = angular.element(target);
				if(ele.attr('pic-url')){
					eventListener.trigger('myJigsawViewshow')(ele.attr('pic-url'))
				}

			}
		}

	])
	.directive('cardBlk', [
		"$parse",
		function($parse){

			function link($scope, $ele, $attrs) {

			}

			return {
				scope: {

				},
				link: link
			}
		}
	])

;