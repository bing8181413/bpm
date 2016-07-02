// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('pintuan.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.init_param = angular.extend({}, simpleCons.default_param, {
            status: 1,
            account_id: $rootScope.hjm.username == 'jinniu' ? '' : $rootScope.selected.account_id,
            accomplish_status: [],
            invalid: 0
        });
        //console.log($scope.init_param);
        $scope.init_param.keyword = $rootScope.search;
        $scope.init_url = simpleCons.domain + '/manage/tuan/items/list';
        $scope.getapi = function (page) {
            $scope.init_param.account_id = $rootScope.selected.account_id;
            //$rootScope.loading = true;
            $scope.init_param.page = page ? page : $scope.init_param.page;
            $scope.init_param.keyword = $rootScope.search || '';
            $http.post($scope.init_url, $scope.init_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.init_param.count;
                        $scope.currentPage = page ? page : $scope.init_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        widget.msgToast(json.msg);
                        $rootScope.loading = false;
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        // 修改 备注
        $scope.update_admin_remark = function (item, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_admin_remark.html',
                controller: function ($scope, $modalInstance) {
                    $scope.admin_remark = item.admin_remark;
                    $scope.ok = function () {
                        var update_url = simpleCons.domain + '/manage/activity/update';
                        $http.post(update_url, {
                            activity_id: item.activity_id,
                            admin_remark: $scope.admin_remark
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    sup_scope.list[sup_index].admin_remark = $scope.admin_remark;
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        // 修改成团状态
        $scope.update_group_buy_status = function (item, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_group_buy_status.html',
                controller: function ($scope, $modalInstance) {
                    console.log(item.accomplish);
                    $scope.group_end_time = item.accomplish ? item.accomplish.group_end_time : '';
                    $scope.community_id = item.accomplish ? item.accomplish.community_id : '';
                    $scope.group_buy_status = (item.accomplish ? item.accomplish.accomplish_status : '') + '';
                    //console.log($scope);
                    $scope.ok = function () {
                        if ($scope.community_id == '') {
                            alert('小区不存在');
                            return false;
                        }
                        if ($scope.group_buy_status == '') {
                            alert('状态不存在');
                            return false;
                        }
                        if (!$scope.group_end_time || $scope.group_end_time == '') {
                            alert('截团时间不存在');
                            return false;
                        }
                        var update_url = simpleCons.domain + '/manage/tuan/update_accomplish_info';
                        $http.post(update_url, {
                            activity_id: item.activity_id,
                            community_id: $scope.community_id,
                            group_end_time: $scope.group_end_time,
                            group_buy_status: $scope.group_buy_status
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    sup_scope.list[sup_index].accomplish.group_end_time = $scope.group_end_time;
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        // 添加团长
        $scope.add_header = function (item) {
            var modalInstance = $modal.open({
                templateUrl: 'add_header.html',
                controller: function ($scope, $modalInstance) {
                    $scope.user_type = 0;
                    $scope.user_id = item.tuan_header_info ? item.tuan_header_info.user_id : '';
                    //$scope.tuanoption = {
                    //    user_id: item.user_id,
                    //    //name: item.header_user_name,
                    //    //mobile: item.header_mobile,
                    //}
                    $scope.get_tuan_applicants = function () {
                        var edit_url = simpleCons.domain + '/manage/tuan/get_tuan_applicants';
                        $http.post(edit_url, {
                            activity_id: item.activity_id,
                            community_id: item.community.community_id
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.tuan_applicants = json.data;
                                    angular.forEach($scope.tuan_applicants, function (val, key) {
                                        if ($scope.user_id == $scope.tuan_applicants[key].user_id) {
                                            $scope.tuan_applicants[key].checked = 1;

                                        }
                                    })

                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.get_tuan_applicants();
                    $scope.changeTuanoption = function (item, index) {
                        $scope.user_id = item.user_id;
                    }
                    $scope.ok = function () {
                        var edit_url = simpleCons.domain + '/manage/tuan/add_header';
                        $http.post(edit_url, {
                            activity_id: item.activity_id,
                            community_id: item.community.community_id,
                            user_id: $scope.user_id,
                            user_type: $scope.user_type,
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('状态更新成功!请刷新列表查看');
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }
    };
});
