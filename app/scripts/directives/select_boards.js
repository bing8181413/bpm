define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
        //<select_boards areas="item.areas" account_id="item.account_id"
        //city_name="item.city_name"></select_boards>
        //areas = {
        //        count: 0,//  错误数量
        //        cursor: 0 // 错误的位置
        //    };
        .directive('selectBoards', function ($rootScope, $state, $http, $uibModal, $filter, widget, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    //areas: '=',
                    account_id: '=accountId',
                    city_name: '=cityName',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'select_boards.html'),
                link: function ($scope, $element, $attrs) {
                    //def : 默认值2  其中1:自己选中 2:都没选中 3:别人选中
                    //change : 默认值2   其中1:值已经改变了 2:默认未改变
                    //console.log($scope.areas);
                    var sup_scope = $scope;
                    $scope.community_boards = function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'community_boards.html',
                            controller: function ($scope, $uibModalInstance) {
                                // 赋 默认值
                                $scope.reset = function () {
                                    //$scope.areas = areas;
                                    angular.forEach($scope.all_boards, function (boards_val, boards_key) {
                                        $scope.all_boards[boards_key].self_count = 0;
                                        angular.forEach(boards_val.boards, function (value, key) {
                                            $scope.all_boards[boards_key].boards[key].def = 2;
                                            $scope.all_boards[boards_key].boards[key].change = 2;
                                        });
                                    });
                                    if ($scope.search_areas && $scope.search_areas.length > 0) {
                                        angular.forEach($scope.all_boards, function (boards_val, boards_key) {
                                            angular.forEach(boards_val.boards, function (value, key) {
                                                angular.forEach($scope.search_areas, function (val, k) {
                                                    if (val.area == value.area && val.district == value.district) {
                                                        if (val.account_id == sup_scope.account_id) {//自己选中的
                                                            $scope.all_boards[boards_key].self_count++;
                                                            $scope.all_boards[boards_key].boards[key].def = 1;
                                                            $scope.all_boards[boards_key].boards[key].change = 1;
                                                            $scope.all_boards[boards_key].boards[key].id = val.id + '';
                                                        } else {//别人选中的
                                                            $scope.all_boards[boards_key].boards[key].def = 3;
                                                            $scope.all_boards[boards_key].boards[key].change = 1;
                                                            $scope.all_boards[boards_key].boards[key].id = val.id + '';
                                                            $scope.all_boards[boards_key].boards[key].username = val.account ? val.account.username : '没找到的负责人';
                                                        }

                                                    }
                                                });
                                            });
                                        });
                                    }
                                }
                                $scope.init = function () {
                                    $scope.search_areas_url = simpleCons.domain + '/manage/account/search_areas';
                                    $scope.boards_url = simpleCons.domain + '/manage/community/boards';
                                    $http.post($scope.search_areas_url, {})
                                        .success(function (json) {
                                            if (json.code == 0) {
                                                $scope.search_areas = json.data;
                                                $http.post($scope.boards_url, {})
                                                    .success(function (json) {
                                                        if (json.code == 0) {
                                                            $scope.all_boards = json.data;
                                                            $scope.reset();
                                                        } else {
                                                            widget.msgToast(json.msg);
                                                        }
                                                    });
                                            } else {
                                                widget.msgToast(json.msg);
                                            }
                                        });
                                };
                                $scope.init();
                                $scope.toggle = function (sub) {
                                    sub.change = (sub.def == 3) ? sub.change : (sub.change == 1 ? 2 : 1);
                                }
                                $scope.select_all = function (sup) {
                                    angular.forEach(sup.boards, function (value, key) {
                                        value.change = (value.def == 3) ? value.change : 1;
                                    });
                                }
                                $scope.reverse_all = function (sup) {
                                    angular.forEach(sup.boards, function (value, key) {
                                        value.change = (value.def == 3) ? value.change : (value.change == 1 ? 2 : 1);
                                    });
                                }
                                $scope.regain = function (sup) {
                                    angular.forEach(sup.boards, function (value, key) {
                                        value.change = (value.def == 3) ? 1 : value.def;
                                    });
                                }
                                $scope.update = function () {
                                    $rootScope.loading = true;
                                    if (!sup_scope.account_id) {
                                        widget.msgToast('负责人不能为空，请刷新页面重新选择编辑');
                                        $rootScope.loading = false;
                                        return false;
                                    }
                                    $scope.param = {
                                        account_id: sup_scope.account_id,
                                        add_arr: [],
                                        del_ids: []
                                    };
                                    angular.forEach($scope.all_boards, function (boards_val, boards_key) {
                                        angular.forEach(boards_val.boards, function (value, key) {
                                            if (value.def == 2 && value.change == 1) {
                                                $scope.param.add_arr.push({
                                                    city_name: sup_scope.city_name,
                                                    area: value.area,
                                                    district: value.district
                                                });
                                            } else if (value.def == 1 && value.change == 2) {
                                                $scope.param.del_ids.push(value.id);
                                            }
                                        });
                                    });
                                    var update_url = simpleCons.domain + '/manage/account/update_areas';
                                    $http.post(update_url, $scope.param)
                                        .success(function (json) {
                                            if (json.code == 0) {
                                                widget.msgToast('更新成功');
                                                //$scope.areas = sup_scope.areas = json.data.areas;
                                                $http.post($scope.search_areas_url, {})
                                                    .success(function (json) {
                                                        if (json.code == 0) {
                                                            $scope.search_areas = json.data;
                                                            $scope.reset();
                                                        } else {
                                                            widget.msgToast(json.msg);
                                                        }
                                                    });
                                                $rootScope.loading = false;
                                            } else {
                                                $rootScope.loading = false;
                                                widget.msgToast(json.msg);
                                            }
                                        });
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }

                }
            };
        })


})
;
