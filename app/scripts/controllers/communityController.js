// This is a file copied by your subgenerator
define([
        './controllers'
        , '../cons/simpleCons'
    ], function (mod, simpleCons) {
        mod.controller('communityController', communityController)
            .controller('communityupdateController', communityupdateController)
            .controller('communityaddController', communityaddController)

        communityController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
        communityupdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
        communityaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
        function communityController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
            $scope.list_param = {page: 1, count: 20};
            //$scope.list_param.keyword = $rootScope.search;
            var list_url = simpleCons.domain + '/manage/community/list';
            $scope.getapi = function (page) {
                $scope.list_param.page = page ? page : $scope.list_param.page;
                $scope.list_param.keyword = $rootScope.search ? $rootScope.search : '';
                $http.post(list_url, $scope.list_param)
                    .success(function (json) {
                        if (json.code == 0) {
                            $scope.community_list = json.data.community_list;
                            $scope.totalItems = json.data.community_count;
                            $scope.itemsPerPage = $scope.list_param.count;
                            $scope.currentPage = page ? page : $scope.list_param.page;
                            $scope.maxSize = '5';
                            $scope.numPages = '';
                        } else {
                            widget.msgToast(json.msg);
                        }
                    });
            }
            $scope.getapi(1);
            $rootScope.searchkeyword = function (event) {
                if (event.keyCode !== 13) return;
                $scope.getapi(1);
            }

        };
        function communityupdateController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
            //$rootScope.loading = 1;
            //$scope.loading_text = '加载中...';
            // $scope.callback = function (foo) {
            //     console.log(foo||'ahahaha');
            // }
            $scope.isshowmap = false;
            $scope.callback = 0;
            $scope.add = function () {
                $scope.callback++;
            }
            $scope.showmap = function () {
                $scope.isshowmap = !$scope.isshowmap;
                if ($scope.isshowmap)$scope.add();
            }
            $http.post(simpleCons.domain + '/manage/community/detail', {
                community_id: Number($stateParams.communityId),
                count: 1
            })
                .success(function (json) {
                    if (json.code == 0) {
                        //$scope.communityupdate = json.data;
                        $scope.community_param = json.data.community_info;
                        //console.log($scope.activity);
                        $scope.init();
                    } else {
                        widget.msgToast(data.msg);
                    }
                });
            $scope.init = function () {
                $scope.community = {};
                //$scope.communityupdate_param = {
                //
                //}
                $scope.ok = function () {
                    var param_tmp = 0;
                    var url = simpleCons.domain + '/manage/community/update';
                    if (!$scope.community_param.name || $scope.community_param.name == '') {
                        widget.msgToast('小区名称不能为空');
                        return false;
                    }
                    if (!$scope.community_param.address || $scope.community_param.address == '') {
                        widget.msgToast('小区地址不能为空');
                        return false;
                    }
                    if (!$scope.community_param.longitude || $scope.community_param.longitude == 0 || $scope.community_param.longitude == '') {
                        widget.msgToast('经度不能为空');
                        return false;
                    }
                    if (!$scope.community_param.latitude || $scope.community_param.latitude == 0 || $scope.community_param.latitude == '') {
                        widget.msgToast('维度不能为空');
                        return false;
                    }
                    if (!$scope.community_param.city_name || $scope.community_param.city_name == '') {
                        widget.msgToast('城市不能为空');
                        return false;
                    }
                    if (!$scope.community_param.district || $scope.community_param.district == '') {
                        widget.msgToast('行政区不能为空');
                        return false;
                    }
                    if (!$scope.community_param.area || $scope.community_param.area == '') {
                        widget.msgToast('板块不能为空');
                        return false;
                    }
                    $rootScope.loading = true;
                    $http.post(
                        url,
                        $scope.community_param)
                        .success(function (data) {
                            if (data.code == 0) {
                                $rootScope.loading = false;
                                $state.go('community');
                            } else {
                                $rootScope.loading = false;
                                $scope.addAlert(data.msg);
                            }
                        });
                }
                //$scope.initcomplate = function () {
                //    //var BMap = BaiduMap.load();
                //    //console.log(BMap);
                //    var map = new BMap.Map("baidumap");
                //    var point = new BMap.Point($scope.community_param.longitude, $scope.community_param.latitude);
                //    map.centerAndZoom(point, 8);
                //    //map.centerAndZoom(new BMap.Point(116.404, 39.915), 13);
                //    //map.centerAndZoom("北京", 12);
                //    //添加带有定位的导航控件
                //    //var navigationControl = new BMap.NavigationControl({
                //    //    // 靠左上角位置
                //    //    anchor: BMAP_ANCHOR_TOP_LEFT,
                //    //    // LARGE类型
                //    //    type: BMAP_NAVIGATION_CONTROL_LARGE,
                //    //    // 启用显示定位
                //    //    enableGeolocation: true
                //    //});
                //    //map.addControl(navigationControl);
                //    setTimeout(function () {
                //        map.setZoom(16);
                //    }, 3000);  //3秒后放大到16级
                //    map.enableScrollWheelZoom(true);//可以滚动放大缩小
                //    var size = new BMap.Size(10, 20);
                //    map.addControl(new BMap.CityListControl({
                //        anchor: BMAP_ANCHOR_TOP_RIGHT,
                //        offset: size,
                //        onChangeBefore: function () {
                //        },
                //        onChangeAfter: function () {
                //        }
                //    }));
                //    var marker = new BMap.Marker(point);  // 创建标注
                //    map.addOverlay(marker);
                //    marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                //    map.addEventListener("click", function (e) {
                //        map.removeOverlay(marker);
                //        marker = new BMap.Marker(e.point);
                //        map.addOverlay(marker);
                //        marker.setAnimation(BMAP_ANIMATION_BOUNCE);
                //        $scope.$apply(function () {
                //            $scope.community_param.longitude = e.point.lng;
                //            $scope.community_param.latitude = e.point.lat;
                //        });
                //    });
                //}
                //$scope.initcomplate();
            }
            //  获取地理位置信息 传入地址
            //$scope.getlocation = function () {
            //    //$scope.initcomplate()
            //    //return false;
            //    widget.get_baidu_location($scope.community_param.address, $scope.community_param.city_name, function (json) {
            //        if (json.status == 0) {
            //            if (json.result.length == 0) {
            //                $scope.community_param.longitude = '';
            //                $scope.community_param.latitude = ''
            //                widget.msgToast('在' + $scope.community_param.city_name + '未查询到' + $scope.community_param.address);
            //            } else {
            //                $scope.community_param.longitude = json.result[0].location.lng;
            //                $scope.community_param.latitude = json.result[0].location.lat;
            //                $scope.community_param.address = json.result[0].name;
            //            }
            //        }
            //    });
            //}
        }

        function communityaddController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
            //$rootScope.loading = 1;
            $scope.isshowmap = false;
            $scope.callback = 0;
            $scope.add = function () {
                $scope.callback++;
            }
            $scope.showmap = function () {
                $scope.isshowmap = !$scope.isshowmap;
                if ($scope.isshowmap)$scope.add();
            }
            $scope.communityadd = {};
            //$scope.community_param = {property_type: '住宅'};
            $scope.community_param = {poi_type: '1'};
            $scope.ok = function () {
                var param_tmp = 0;
                if (!$scope.community_param.name || $scope.community_param.name == '') {
                    widget.msgToast('小区名称不能为空');
                    return false;
                }
                if (!$scope.community_param.address || $scope.community_param.address == '') {
                    widget.msgToast('小区地址不能为空');
                    return false;
                }
                if (!$scope.community_param.longitude || $scope.community_param.longitude == 0 || $scope.community_param.longitude == '') {
                    widget.msgToast('经度不能为空');
                    return false;
                }
                if (!$scope.community_param.latitude || $scope.community_param.latitude == 0 || $scope.community_param.latitude == '') {
                    widget.msgToast('维度不能为空');
                    return false;
                }
                if (!$scope.community_param.city_name || $scope.community_param.city_name == '') {
                    widget.msgToast('城市不能为空');
                    return false;
                }
                if (!$scope.community_param.district || $scope.community_param.district == '') {
                    widget.msgToast('行政区不能为空');
                    return false;
                }
                if (!$scope.community_param.area || $scope.community_param.area == '') {
                    widget.msgToast('板块不能为空');
                    return false;
                }
                var url = simpleCons.domain + '/manage/community/add';
                $rootScope.loading = true;
                $http.post(
                    url,
                    $scope.community_param)
                    .success(function (data) {
                        if (data.code == 0) {
                            $rootScope.loading = false;
                            $state.go('community');
                        } else {
                            $rootScope.loading = false;
                            widget.msgToast(data.msg);
                        }
                    });
            }
            //  获取地理位置信息 传入地址
            $scope.getlocation = function () {
                widget.get_baidu_location($scope.community_param.address, $scope.community_param.city_name, function (json) {
                    if (json.status == 0) {
                        if (json.result.length == 0) {
                            $scope.community_param.longitude = '';
                            $scope.community_param.latitude = ''
                            widget.msgToast('在' + $scope.community_param.city_name + '未查询到' + $scope.community_param.address);
                        } else {
                            $scope.community_param.longitude = json.result[0].location.lng;
                            $scope.community_param.latitude = json.result[0].location.lat;
                            $scope.community_param.address = json.result[0].name;
                        }
                    }
                });
            }

        }
    }
)
;
