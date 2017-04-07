define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    //<common_form form_param="" form_init_data="" form_url="" form_title="" ></common_form>
    //form_data = {};
    //form_url:''
        .directive('baidumap', function ($rootScope, $state, $http, $uibModal, $filter, widget, $templateCache, $timeout) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    // lng: '=',
                    // lat: '=',
                    // city: '=',
                    // address: '=',
                    // district: '=',
                    // timeStamp: '=',
                    mapData: '=',
                    callback: '&'
                },
                //template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'baidu/map.html'),
                template: '<div id="baidumap" style="width: 100%;height:100%;overflow: hidden;margin:0;"></div>',
                link: function ($scope, $element, $attrs) {
                    // console.log(BMap);
                    var map = new BMap.Map("baidumap");
                    var count = 0;
                    var point = null;
                    var marker1 = null;
                    $scope.$watch('mapData', function (val) {
                        $scope.lng = val.lng;
                        $scope.lat = val.lat;
                        $scope.city = val.city;
                        $scope.address = val.address;
                        $scope.district = val.district;
                        $scope.timeStamp = val.timeStamp;
                        $scope.index = val.index;
                        // console.log(val);
                        $scope.callback($scope.index);
                    }, true);
                    $scope.$watch('city', function (value) {
                        // console.log(value);
                        if (!$scope.city) {
                            map.centerAndZoom('上海', 12);
                            // widget.msgToast('没有选择城市')
                            // return false;
                        }
                        if (count > 0) {
                            count++;
                            map.centerAndZoom($scope.city || '上海', 12);
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
                                        $scope.mapData.lng = e.point.lng;
                                        $scope.mapData.lat = e.point.lat;
                                        $scope.mapData.address = rs.address;
                                        $scope.mapData.district = rs.addressComponents.district;
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
                    $scope.$watch('timeStamp', function (newval) {
                        if (!newval) {
                            return false;
                        }
                        // if (count > 0) {
                        myGeo = new BMap.Geocoder();
                        // 将地址解析结果显示在地图上,并调整地图视野
                        myGeo.getPoint($scope.address, function (point) {
                            if (point) {
                                myGeo.getLocation(point, function (rs) {
                                    // console.log(point, rs);
                                    $timeout(function () {
                                        $scope.$apply(function () {
                                            $scope.mapData.lng = rs.point.lng;
                                            $scope.mapData.lat = rs.point.lat;
                                            // $scope.mapData.lng = point.lng;
                                            // $scope.mapData.lat = point.lat;
                                            // $scope.mapData.address = rs.address;
                                            $scope.mapData.district = rs.addressComponents.district;
                                        })
                                    }, 200);
                                });
                                map.removeOverlay(marker1);
                                map.centerAndZoom(point, 16);
                                marker1 = new BMap.Marker(point);
                                map.addOverlay(marker1);
                                marker1.setAnimation(BMAP_ANIMATION_BOUNCE);
                            } else {
                                $timeout(function () {
                                    $scope.$apply(function () {
                                        $scope.mapData.lng = '';
                                        $scope.mapData.lat = '';
                                    })
                                }, 200);
                            }
                        }, $scope.city || '上海');
                        // }
                    });
                }
            };
        })
});
