define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
        // order_list
        //  <order_list ng-model="date" orderoption = "orderoption"></order_list>
        //  orderoption.activity_id;
        //  orderoption.community_id;
        //  orderoption.activity_title

        .directive('orderList', function ($parse, $http, widget, $modal, $filter, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=ngModel',
                    orderoption: '=orderoption'
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'order_list.html'),

                link: function ($scope, $element, $attrs) {
                    var sup_scope = $scope;
                    $scope.list_param = {};
                    $scope.csvHeader = $scope.orderoption.csvHeader || ['a', 'b', 'c'];
                    $scope.export = [];
                    $scope.excel_data = [];
                    $scope.getapi = function (page) {
                        $scope.list_param.activity_id = $scope.orderoption.activity_id;
                        $scope.list_param.community_id = $scope.orderoption.community_id;
                        $scope.list_param.activity_title = $scope.orderoption.activity_title;
                        var list_url = simpleCons.domain + '/manage/tuan/order_list';
                        $scope.list_param.page = page ? page : $scope.list_param.page;
                        console.log($scope.list_param);
                        $http.post(list_url, $scope.list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.user_list = json.data.items;
                                    $scope.totalItems = json.data.page_info.record_count;
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
                                            '报名品类': value.option_info,
                                            '价格': value.option_price,
                                            '份数': value.order_count,
                                            '支付金额': value.order_price,
                                            '当前状态': $filter('order_status')(value.order_status),
                                            '订单时间': $filter('limitTo')(value.order_time, 19)
                                        });
                                        if (value.order_status == '3' || value.order_status == '5') {
                                            $scope.excel_data.push([
                                                k + 1,
                                                value.order_id,
                                                value.community_name,
                                                '联系人：' + value.contact_name + '\n电话：' + value.contact_mobile + '\n地址：' + value.contact_address,
                                                value.option_info,
                                                value.option_price,
                                                value.order_count,
                                                value.order_price,
                                                $filter('order_status')(value.order_status),
                                                $filter('limitTo')(value.order_time, 19)
                                            ]);
                                        }


                                    });
                                    $scope.excel_data.unshift(['排序', '订单号', '所在小区', '详细地址', '报名品类', '价格', '份数', '支付金额', '当前状态', '订单时间']);

                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }
                    $scope.export_excel = function () {
                        console.log($scope.excel_data);
                        $scope.export_param = {
                            name: 'orderlist' + $filter('date')(new Date(), '-yyyyMMddHHmmss-') + $scope.orderoption.activity_id,
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

                    $scope.$watch('orderoption', function () {
                        if (typeof ($scope.orderoption) !== 'undefined') {
                            $scope.getapi(1);
                        }
                        //console.log($scope.orderoption);
                    }, true);
                    $scope.activity_del_user = function (user_id, order_id, index) {
                        var modalInstance = $modal.open({
                            templateUrl: 'tuan_del_user.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.reason = '';
                                $scope.ok = function () {
                                    if (!$scope.reason || $scope.reason == '') {
                                        $scope.reason = '没填写原因';
                                    }
                                    var close_url = simpleCons.domain + '/manage/order/apply/remove';
                                    console.log(sup_scope.list_param);
                                    $http.post(close_url, {
                                        order_id: order_id,
                                        user_id: user_id,
                                        cancel_reason: $scope.reason,
                                        cancel_from: 1
                                    })
                                        .success(function (json) {
                                            if (json.code == 0) {
                                                alert('结束活动已经操作成功!请刷新列表查看');
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
                }

            };
        })
});
