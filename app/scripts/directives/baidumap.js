define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    //<common_form form_param="" form_init_data="" form_url="" form_title="" ></common_form>
    //form_data = {};
    //form_url:''
        .directive('baidumap', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    lng: '=',
                    lat: '=',
                    city: '=',
                    address: '=',
                    district: '=',
                    callback: '=',
                },
                //template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'baidu/map.html'),
                template: '<div id="baidumap" style="width: 100%;height:100%;overflow: hidden;margin:0;"></div>',
                link: function ($scope, $element, $attrs) {
                    var map = new BMap.Map("baidumap");
                    var count = 0;
                    var point = null;
                    var marker1 = null;
                    $scope.$watch('city', function (value) {
                        if (!$scope.city) {
                            map.centerAndZoom('上海', 12);
                            return;
                        }
                        if (count > 0) {
                            count++;
                            map.centerAndZoom($scope.city, 12);
                        }
                        if (count == 0) {
                            // 只执行一次  初始化和绑定事件
                            count++;
                            point = new BMap.Point($scope.lng, $scope.lat);
                            map.centerAndZoom($scope.city, 8);
                            setTimeout(function () {
                                map.centerAndZoom(point, 16);
                                map.setZoom(16);
                            }, 2000);  //n秒后放大到16级
                            map.enableScrollWheelZoom(true);//可以滚动放大缩小
                            map.addControl(new BMap.CityListControl({
                                anchor: BMAP_ANCHOR_TOP_RIGHT,
                                offset: new BMap.Size(10, 20)
                            }));// 添加城市搜索标记
                            var marker = new BMap.Marker(point);  // 创建标注
                            map.addOverlay(marker);
                            map.addEventListener("click", function (e) {
                                var geoc = new BMap.Geocoder();
                                geoc.getLocation(e.point, function (rs) {
                                    $scope.$apply(function () {
                                        //console.log(rs);
                                        $scope.lng = e.point.lng;
                                        $scope.lat = e.point.lat;
                                        $scope.address = rs.address;
                                        $scope.district = rs.addressComponents.district;
                                    })
                                });
                                map.removeOverlay(marker1);
                                marker1 = new BMap.Marker(e.point);
                                map.addOverlay(marker1);
                                marker1.setAnimation(BMAP_ANIMATION_BOUNCE);
                            });
                        }
                    });
                    var myGeo = null;
                    $scope.$watch('callback', function (newval) {
                        if (count > 0) {
                            myGeo = new BMap.Geocoder();
                            // 将地址解析结果显示在地图上,并调整地图视野
                            myGeo.getPoint($scope.address, function (point) {
                                if (point) {
                                    myGeo.getLocation(point, function (rs) {
                                        $scope.$apply(function () {
                                            $scope.lng = point.lng;
                                            $scope.lat = point.lat;
                                            // $scope.address = rs.address;
                                            $scope.district = rs.addressComponents.district;
                                        })
                                    });
                                    map.removeOverlay(marker1);
                                    map.centerAndZoom(point, 16);
                                    marker1 = new BMap.Marker(point);
                                    map.addOverlay(marker1);
                                    marker1.setAnimation(BMAP_ANIMATION_BOUNCE);
                                } else {
                                    widget.msgToast("您选择地址没有解析到结果!");
                                }
                            }, $scope.city);
                        }
                    });
                }
            };
        })
});
