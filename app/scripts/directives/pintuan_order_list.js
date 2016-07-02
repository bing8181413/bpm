define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    // pintuan_order_list
    //  <pintuan_order_list option = "option"></pintuan_order_lis>
    //  option.activity_id;
    //  option.community_id;
    //  option.activity_title

        .directive('pintuanOrderList', function ($parse, $http, widget, $modal, $filter, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    option: '=option',
                    ordercount: '=ordercount'
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'pintuan_order_list.html'),

                link: function ($scope, $element, $attrs) {
                    $scope.order_user_list = function () {
                        var sup_scope = $scope;
                        var modalInstance = $modal.open({
                            templateUrl: 'user_list.html',
                            size: 'lg',
                            controller: function ($scope, $modalInstance) {
                                $scope.list_param = {page: 1, count: 10000, sort_field: 'order_time', sort_desc: 1};
                                $scope.csv_data = [];
                                $scope.excel_data = [];
                                $scope.getapi = function (page) {
                                    $scope.list_param.activity_id = sup_scope.option.activity_id;
                                    $scope.list_param.community_id = sup_scope.option.community ? sup_scope.option.community.community_id : 0;
                                    $scope.list_param.activity_title = sup_scope.option.activity_title || '';
                                    // var list_url = simpleCons.domain + '/manage/tuan/order_list';
                                    var list_url = simpleCons.domain + '/manage/order/list';
                                    $scope.list_param.page = page ? page : $scope.list_param.page;
                                    $http.post(list_url, $scope.list_param)
                                        .success(function (json) {
                                            if (json.code == 0) {
                                                $scope.user_list = json.data.list;
                                                $scope.totalItems = json.data.count;
                                                $scope.itemsPerPage = $scope.list_param.count;
                                                $scope.currentPage = page ? page : $scope.list_param.page;
                                                $scope.maxSize = '5';
                                                $scope.numPages = '';
                                                $scope.order_status = '100';
                                                $scope.csvHeader = ['编号', '订单号', '所在小区', '联系人', '电话', '地址', '报名品类', '价格', '份数', '支付金额', '当前状态', '订单时间'];
                                                $scope.out = function () {
                                                    $scope.csv_data = [];
                                                    $scope.excel_data = [];
                                                    $scope.idx = 1;
                                                    angular.forEach($scope.user_list, function (value, k) {
                                                        if (value.show) {
                                                            value.idx = $scope.idx++;
                                                            $scope.csv_data.push({
                                                                '编号': value.idx,
                                                                '订单号': value.order_id,
                                                                '所在小区': value.community_name,
                                                                '联系人': value.contact_name,
                                                                '电话': value.contact_mobile,
                                                                '地址': value.contact_address,
                                                                '报名品类': value.option.name,
                                                                '价格': value.option.origin_price,
                                                                '份数': value.order_count,
                                                                '支付金额': value.order_price,
                                                                '当前状态': $filter('order_status')(value.order_status),
                                                                '订单时间': $filter('limitTo')(value.order_time, 19)
                                                            });
                                                            $scope.excel_data.push([
                                                                value.idx,
                                                                value.order_id,
                                                                value.community_name,
                                                                value.contact_name,
                                                                value.contact_mobile,
                                                                value.contact_address,
                                                                value.option.name,
                                                                value.option.origin_price,
                                                                value.order_count,
                                                                value.order_price,
                                                                $filter('order_status')(value.order_status),
                                                                $filter('limitTo')(value.order_time, 19)
                                                            ]);
                                                        }
                                                    });
                                                    $scope.excel_data.unshift(['排序', '订单号', '所在小区', '联系人', '电话', '地址', '报名品类', '价格', '份数', '支付金额', '当前状态', '订单时间']);
                                                }
                                                // 切换状态
                                                $scope.select_status = function () {
                                                    if (!angular.isArray($scope.order_status)) {
                                                        $scope.order_status_array = $scope.order_status.split(',');
                                                    } else {
                                                        $scope.order_status_array = $scope.order_status;
                                                    }
                                                    if ($scope.order_status_array[0] == 100) {
                                                        angular.forEach($scope.user_list, function (val, key) {
                                                            $scope.user_list[key].show = true;
                                                        });
                                                    } else if ($scope.order_status_array.length == 2) {
                                                        angular.forEach($scope.user_list, function (val, key) {
                                                            if (val.order_status == 3 || val.order_status == 5) {
                                                                $scope.user_list[key].show = true;
                                                            } else {
                                                                $scope.user_list[key].show = false;
                                                            }
                                                        });
                                                    } else if ($scope.order_status_array.length == 1) {
                                                        angular.forEach($scope.user_list, function (val, key) {
                                                            if (val.order_status == $scope.order_status_array[0]) {
                                                                $scope.user_list[key].show = true;
                                                            } else {
                                                                $scope.user_list[key].show = false;
                                                            }
                                                        });
                                                    }
                                                    $scope.out();
                                                }
                                                $scope.select_status();
                                            } else {
                                                widget.msgToast(json.msg);
                                            }
                                        });
                                    $scope.sort_order = function (sort_field) {
                                        $scope.list_param.sort_field = sort_field;
                                        $scope.list_param.sort_desc = $scope.list_param.sort_desc == 0 ? 1 : 0;
                                        $scope.getapi(1);
                                    }
                                }

                                // 导出excel
                                $scope.export_excel = function () {
                                    $scope.export_param = {
                                        name: 'orderlist' + $filter('date')(new Date(), '-yyyyMMddHHmmss-') + sup_scope.option.activity_id,
                                        data: $scope.excel_data
                                    };
                                    var export_url = simpleCons.domain + '/manage/public/export';
                                    $http.post(export_url, $scope.export_param)
                                        .success(function (json) {
                                            console.log(json);
                                            if (json.code == 0) {
                                                window.open(json.data.url);
                                            }
                                        });
                                }
                                $scope.getapi(1);
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                                // 取消订单
                                $scope.activity_del_user = function (user_id, order_id, index) {
                                    var modalInstance = $modal.open({
                                        templateUrl: 'tuan_del_user.html',
                                        controller: function ($scope, $modalInstance) {
                                            $scope.reason = '';
                                            $scope.cancel_from = 1;
                                            $scope.ok = function () {
                                                if (!$scope.reason || $scope.reason == '') {
                                                    alert('请填写原因');
                                                    return false;
                                                }
                                                var close_url = simpleCons.domain + '/manage/order/apply/remove';
                                                $http.post(close_url, {
                                                    order_id: order_id,
                                                    user_id: user_id,
                                                    cancel_reason: $scope.reason,
                                                    cancel_from: $scope.cancel_from
                                                }).success(function (json) {
                                                    if (json.code == 0) {
                                                        alert('已经操作成功!请刷新列表查看');
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
                            }
                        });
                    }

                }

            };
        })
});
