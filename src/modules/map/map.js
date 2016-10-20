angular
	.module("module.map", ["ngRoute"])
	.controller("mapCtrl", [
		"$scope",
		function($scope){
			var view = this;
			view.name = "yl";
		}
	])
	.directive("myMap", [
		"$window",
		"$parse",
		"$timeout",
		function($window, $parse, $timeout){

			function compile(ele, attr, ngModel) {
				var mapId = attr["mapId"];
				console.log(mapId);

				// 创建地图实例
				var map = new BMap.Map(mapId);    // 创建Map实例
				map.centerAndZoom(new BMap.Point(116.404, 39.915), 11);  // 初始化地图,设置中心点坐标和地图级别
				map.addControl(new BMap.MapTypeControl());   //添加地图类型控件
				map.setCurrentCity("北京");          // 设置地图显示的城市 此项是必须设置的
				map.enableScrollWheelZoom(true);


				var _icon = document.createElement("span");
				// _icon.className = "map-geo";
				document.querySelector("#"+mapId).appendChild(_icon);

				var icon = angular.element(_icon);
				icon.addClass("map-geo");
				// icon.addClass("")
				icon.addClass("animated")

				// 添加地图拖动事件，对 icon 进行class 的操作
				map.addEventListener("dragstart", function(){
					console.log("地图开始拖动");
					icon.addClass("my-map-drag");
				});
				map.addEventListener("dragend", function(){

					icon.addClass("bounce-icon");
					var center = map.getCenter();
						console.log("当前中心：",center)
					$timeout(function () {
						icon.removeClass("my-map-drag");
						icon.removeClass("bounce-icon");
					},800)
				});

				// return function(){
				// 	return{
				// 		postlink: function(){
				// 			console.log("This is postlink")
				// 		}
				// 	}
				// }
			}
			
			return{
				restrict: 'AEC',
				compile: compile
			}
		}
	])
;