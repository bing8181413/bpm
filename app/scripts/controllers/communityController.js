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
            $scope.list_param = {page: 1, count: 20, poi_type: null};
            // if ($stateParams.mycommunity == 1) {
            //     $scope.list_param.account_id = $rootScope.hjm.account_id;
            // }
            //$scope.list_param.keyword = $rootScope.search;
            var list_url = simpleCons.domain + '/manage/community/list';
            $scope.getapi = function (page) {
                $scope.list_param.page = page ? page : $scope.list_param.page;
                $scope.list_param.keyword = $rootScope.search ? $rootScope.search : '';
                $http.post(list_url, $scope.list_param)
                    .success(function (json) {
                        if (json.code == 0) {
                            $scope.community_list = json.data.list;
                            $scope.totalItems = json.data.count;
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
            console.log($stateParams);
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
                        console.log($scope.community_param);
                        $scope.community_param = json.data;
                        //console.log($scope.activity);
                        $scope.init();
                    } else {
                        widget.msgToast(data.msg);
                    }
                });
            $scope.init = function () {
                $scope.community = {};
                // 删除不提交的数据
                delete $scope.community_param.first_letter;
                delete $scope.community_param.letter_spell;
                delete $scope.community_param.created_at;
                delete $scope.community_param.updated_at;
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
            }
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
