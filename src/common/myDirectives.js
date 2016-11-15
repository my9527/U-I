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
    .factory('$$', [
        function () {
            var d = document;
            var $$ = function(target, parent){
                var result = null;
                parent = parent || d;
                if(/\./g.test(target)){
                    result = parent.querySelectorAll(target);
                }else if(/\#/g.test(target)){
                    result = parent.querySelector(target);
                }else{
                    result = parent.querySelectorAll(target);
                }
                return result;
            }
            return $$;
        }
    ])

    /**
     *  mySlideShow
     *  轮播图
     */
    .directive('mySlideShow', [
        "$parse",
        "$window",
        function ($parse, $window) {

            function compile(ele, attr){
                // 绑定滑动事件
                var moveflag = false;
                var startPos = {
                    x: 0,
                    y: 0
                };
                var endPos = {
                    x: 0,
                    y: 0
                };
                var d = {
                    dx: 0,
                    dy: 0
                };
                var eleW = ele[0].clientWidth;
                ele.bind('touchstart', function (evt) {
                    // console.log("Touched", evt)
                    startPos = {
                        x: evt.changedTouches[0].screenX,
                        y: evt.changedTouches[0].screenY
                    };
                });
                ele.bind('touchmove', function (evt) {
                    d.dx = evt.changedTouches[0].screenX-startPos.x;
                    d.dy = evt.changedTouches[0].screenY-startPos.y;
                    if(moveflag)return;
                    console.log('move start', evt);
                    moveflag = true;
                });
                ele.bind('touchend', function (evt) {
                    console.log('touchend', evt);
                    moveflag = false;
                    endPos.x = evt.changedTouches[0].screenX;
                    endPos.y = evt.changedTouches[0].screenY;

                    if(Math.abs(startPos.x - endPos.x)>eleW*0.5){
                        console.log('Changed')
                    }else{
                        console.log('stay')
                    }

                });
                console.log("This is slide show")
                return{
                    post: function ($scope, $ele, $attrs, $ngModel) {
                        // $scope.mySlidePics = $parse($scope.mySlidePics)($scope);
                        console.log('$scope.mySlidePics :',$scope.mySlidePics );
                        $scope.curPic = $scope.mySlidePics[1];
                        $scope.prePic = $scope.mySlidePics[0];
                        $scope.nextPic = $scope.mySlidePics[2];
                        var bgs = '';
                        $scope.mySlidePics.forEach(function (item, index) {
                            bgs += "url('"+item.url+"'),"
                        });
                        bgs = bgs.substr(0, bgs.length-1);
                        console.log(bgs);
                        angular.element($ele[0].children[1]).attr({
                            background: bgs,
                            "background-size": 'cover'
                        })
                    }
                }
            }

            return {
                scope: {
                    mySlidePics: "=",    // 图片
                    mySlideLen: '@',  // 图片数量，
                    mySlideShowClass: '@'// 非必须，提供挂钩，以便实现样式自定义
                },
                compile: compile,
                templateUrl: 'html/directivesTpls/mySlideShow.html'
            }

        }
    ])

    .directive('myJigsaw', [
        "$parse",
        "$$",
        "$timeout",
        "eventListener",
        function ($parse, $$, $timeout, eventListener) {
            function compile(ele, attr){
                // document.body.appendChild(ele[0]);
                // ele[0].className = "ng-hide";
                var jigsawUrl = null;
                // eventListenr.sub('showJigsawView',  showJigsawView, "showJigsawView");
                //
                // function showJigsawView($ele, $scope, jigsawUrl) {
                //     $ele.removeClass("ng-hide");
                //     $scope.jigsawUrl = jigsawUrl;
                // }
                
                return {
                    post: function ($scope, $ele, $attrs) {
                        $scope.jigsawBoxs = [0, 1, 2, 3, 4, 5, 6, 7, 8];
                        // eventListenr.sub('showJigsawView',  function () {
                        //     console.log(121)
                        // });



                        $ele.bind('click', function () {
                            $scope.$evalAsync(function () {
                                $scope.jigsawUrl = null;
                            });
                            console.log('clicked');
                            $$('.jigsaw-item', $ele[0]).forEach(function (item) {
                                var tmp = angular.element(item);
                                item.className = tmp.attr('class').replace(/tranform[RDLU]+/g, '');
                                angular.element($$('.jigsaw-pieace', item)).css('background-image',"");
                            })
                        });
                        
                        $scope.$watch("jigsawUrl", function (v) {
                            console.log(v);
                            $timeout(function () {
                                
                            })
                        });

                        $timeout(function () {
                            getherJigsaw()
                        }, 100);

                        function getherJigsaw(){
                            // 使用transform: translate 的时候，是相对于元素自身的长宽来实现的
                            // 所以需要比例计算
                            // 九宫格 单格宽 0.3，间距 0.05；
                            // 故移动比例 为 0.05/0.3
                            var transformClass = ["R", "D", "L", "U"];
                            $$('.jigsaw-item', $ele[0]).forEach(function (item, index) {
                                var toAdd = [];
                                var xd= index%2;
                                var yd= Math.floor(index/2);
                                var dy = Math.floor(index/3);
                                console.log(index, index%3, dy);
                                if(index%3 == 0){
                                    toAdd.push("R");

                                }else if(index%3 == 2){
                                    toAdd.push("L");
                                }
                                if(dy != 1 ){
                                    toAdd.push(transformClass[dy+1])
                                }
                                var $$ele = angular.element(item);
                                $$ele.addClass("transform"+toAdd.join(""))
                                /*toAdd.forEach(function (item) {
                                    $$ele.addClass('tranform'+item)
                                })*/
                            })
                        }
                        console.log($ele)
                        function setBg(){
                            var jigsawBoxContainer = $$('.jigsaw-item', $ele[0]);
                            return console.log(jigsawBoxContainer);
                            var jigsawBox = jigsawBoxContainer.children();
                            jigsawBox.forEach(function (item, index) {
                                var pos = {
                                    x: 0,
                                    y: 0,
                                };
                                pos.x = (index % 3)
                                pos.y = ~~(index/3)
                                item.attr('background-position', pos.x+" "+pos.y)
                            })
                        }
                    }
                }
            }

            return {
                scope: {
                    jigsawUrl: "=",
                    jigsawShow: '='
                },
                compile: compile,
                templateUrl: 'html/directivesTpls/myJigsaw.html'
            }

        }
    ])


    .directive('waterFallLayout', [
        "$timeout",
        function ($timeout) {
            function Waterfall(param){
                this.id = typeof param.container == 'string' ? document.getElementById(param.container) : param.container;
                this.colWidth = param.colWidth;
                this.colCount = param.colCount || 4;
                this.cls = param.cls && param.cls != '' ? param.cls : 'wf-cld';
                this.init();
            }
            Waterfall.prototype = {
                getByClass:function(cls,p){
                    var arr = [],reg = new RegExp("(^|\\s+)" + cls + "(\\s+|$)","g");
                    var nodes = p.getElementsByTagName("*"),len = nodes.length;
                    for(var i = 0; i < len; i++){
                        if(reg.test(nodes[i].className)){
                            arr.push(nodes[i]);
                            reg.lastIndex = 0;
                        }
                    }
                    return arr;
                },
                maxArr:function(arr){
                    var len = arr.length,temp = arr[0];
                    for(var ii= 1; ii < len; ii++){
                        if(temp < arr[ii]){
                            temp = arr[ii];
                        }
                    }
                    return temp;
                },
                getMar:function(node){
                    var dis = 0;
                    if(node.currentStyle){
                        dis = parseInt(node.currentStyle.marginBottom);
                    }else if(document.defaultView){
                        dis = parseInt(document.defaultView.getComputedStyle(node,null).marginBottom);
                    }
                    return dis;
                },
                getMinCol:function(arr){
                    var ca = arr,cl = ca.length,temp = ca[0],minc = 0;
                    for(var ci = 0; ci < cl; ci++){
                        if(temp > ca[ci]){
                            temp = ca[ci];
                            minc = ci;
                        }
                    }
                    return minc;
                },
                init:function(){
                    var _this = this;
                    var col = [],//列高
                        iArr = [];//索引
                    var nodes = _this.getByClass(_this.cls,_this.id),len = nodes.length;
                    for(var i = 0; i < _this.colCount; i++){
                        col[i] = 0;
                    }
                    for(var i = 0; i < len; i++){
                        nodes[i].h = nodes[i].offsetHeight + _this.getMar(nodes[i]);
                        iArr[i] = i;
                    }

                    for(var i = 0; i < len; i++){
                        var ming = _this.getMinCol(col);
                        // nodes[i].style.left = ming * _this.colWidth + "px";
                        nodes[i].style.left = "50%";

                        nodes[i].style.top = col[ming] + "px";
                        col[ming] += nodes[i].h;
                    }

                    _this.id.style.height = _this.maxArr(col) + "px";
                }
            };
            /*new Waterfall({
             "container":"wf-inner",
             "colWidth":77,
             "colCount":3,
             "cls":"inner"
             });*/
            /*new Waterfall({
             "container":"wf-main",
             "colWidth":244,
             "colCount":2
             });*/

            function link($scope, $ele, $attr){
                $scope.wfs = [1,2,3,4,5,6,7,8,9];
                $timeout(function () {
                    new Waterfall({
                        "container": $scope.wfContainer || 'gallaryWater',
                        "colWidth": $scope.wfCol || "50%",
                        "colCount": $scope.wfCount || 2
                    })
                }, 100)

            }
            return {
                scope: {
                    wfContainer: "@",
                    wfCol: "@",
                    wfCount: "@"
                },
                link: link,
                templateUrl: 'html/directivesTpls/water-fall.html'
            }
        }
    ])

    .directive('scrollListen',  [
        "$rootScope",
        "$timeout",
        function ($rootScope, $timeout) {
            function link($scope, $ele){
                var scrollFlag = false;
                var scrollTimer = null;
                var start = {
                    x: 0,
                    y: 0
                };
                var end={
                    x: 0,
                    y: 0
                };
                $ele.bind('touchstart', function (evt) {
                    if(scrollFlag)return;
                    start.x= evt.changedTouches[0].screenX;
                    start.y= evt.changedTouches[0].screenY;

                });
                $ele.bind('touchmove', function (evt, A) {
                    if(scrollFlag)return;
                    scrollTimer = $timeout(function () {
                            end.x= evt.changedTouches[0].screenX;
                            end.y= evt.changedTouches[0].screenY;
                            if(end.y<start.y){
                                console.log("scrollUp", Date.now());
                                $rootScope.$broadcast("scrollUp");
                            }else{
                                console.log("scrollDown" , Date.now());
                                $rootScope.$broadcast("scrollDown")
                            }
                            scrollFlag = true;
                            scrollTimer = null;
                    },100);

                });
                $ele.bind('touchend', function () {
                    scrollFlag = false;
                    scrollTimer = null;

                })


            }
            return{
                link: link
            }
        }
    ])
;