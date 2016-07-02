// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('goods.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.init_param = angular.extend({}, simpleCons.default_param, {
            status: 1,
            account_id: $rootScope.hjm.username == 'jinniu' ? '' : $rootScope.selected.account_id
        });
        //console.log($scope.init_param);
        $scope.init_param.keyword = $rootScope.search;
        $scope.init_url = simpleCons.domain + '/manage/tuan/goods/list';
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

        // 人工新增拼团
        $scope.tuan_new = function (item) {
            $rootScope.hjm.tuan_new_obj = item;
            $state.go('goods.new',{activity_id:item.activity_id});
        }
        // 修改状态
        $scope.update_status = function (item, status, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_status.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        var update_url = simpleCons.domain + '/manage/activity/update';
                        $http.post(update_url, {
                            activity_id: item.activity_id,
                            status: status
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    sup_scope.list[sup_index].status = status;
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
                size: 'sm'
            });
        }

        $scope.user_list = function (activityId, activityTitle, index) {
            var modalInstance = $modal.open({
                templateUrl: 'user_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.csvHeader = ['排序', '订单号', '所在小区', '详细地址', '报名品类', '价格', '份数', '支付金额', '当前状态', '订单时间'];
                    $scope.export = [];

                    $scope.activityTitle = activityTitle;
                    var sup_index = index;
                    $scope.prev_sort_field = '';
                    $scope.list_param = {};
                    $scope.list_param.activity_id = activityId;
                    var list_url = simpleCons.domain + '/manage/order/user/list';
                    $scope.getapi = function (page) {
                        $rootScope.loading = true;
                        $scope.list_param.page = page ? page : $scope.list_param.page;
                        $http.post(list_url, $scope.list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.user_list = json.data.list;
                                    $scope.totalItems = json.data.total;
                                    $scope.itemsPerPage = $scope.list_param.count;
                                    $scope.currentPage = page ? page : $scope.list_param.page;
                                    $scope.maxSize = '5';
                                    $scope.numPages = '';
                                    angular.forEach($scope.user_list, function (value, k) {
                                        $scope.export.push({
                                            '排序': k + 1,
                                            '订单号': value.order_id,
                                            '所在小区': value.community_name,
                                            '详细地址': '联系人：' + value.contact_name + '\n电话：' + value.contact_mobile + '\n地址：' + value.contact_address,
                                            '报名品类': value.order_body,
                                            '价格': value.price,
                                            '份数': value.order_count,
                                            '支付金额': value.order_price,
                                            '当前状态': $filter('order_status')(value.order_status),
                                            '订单时间': $filter('limitTo')(value.order_time, 19)
                                        });
                                    });
                                    $rootScope.loading = false;
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }
                    $scope.getapi(1);
                    $scope.sort_order = function (sort_field) {
                        $scope.list_param.sort_field = sort_field;
                        if (sort_field == $scope.prev_sort_field) {
                            $scope.list_param.sort_desc = $scope.list_param.sort_desc == 0 ? 1 : 0;
                        } else {
                            $scope.list_param.sort_desc = 1;
                        }
                        $scope.prev_sort_field = sort_field;
                        $scope.getapi(1);
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.activity_del_user = function (user_id, order_id, index) {
                        var modalInstance = $modal.open({
                            templateUrl: 'activity_del_user.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.reason = '';
                                $scope.ok = function () {
                                    if (!$scope.reason || $scope.reason == '') {
                                        alert('请填写原因');
                                        return false;
                                    }
                                    var close_url = simpleCons.domain + '/manage/order/apply/remove';
                                    $http.post(close_url, {
                                        //activity_id: activityId,
                                        //user_id: user_id,
                                        //order_id: order_id,
                                        //reason: $scope.reason
                                        order_id: order_id,
                                        user_id: user_id,
                                        cancel_reason: $scope.reason,
                                        cancel_from: 1
                                    })
                                        .success(function (json) {
                                            if (json.code == 0) {
                                                alert('结束活动已经操作成功!请刷新列表查看');
                                                sup_scope.activity_list[sup_index].apply_list[index].order_status = '5';
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
                            size: ''
                        });
                    }

                },
                size: 'lg'
            });
        }
    };
});
