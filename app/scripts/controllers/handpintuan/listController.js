// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('handpintuan.listController', listController);

    listController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$templateCache'];
    function listController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $templateCache) {
        var sup_scope = $scope;
        $scope.extra = 1;
        $scope.init_url = simpleCons.domain + '/manage/tuan/items/list';
        $scope.getapi = function (page) {
            //$rootScope.loading = true;
            if ($scope.extra == 1) {
                $scope.init_param = angular.extend({
                    paied_section: [5, 9],
                    accomplish_status: [0]
                }, simpleCons.default_param);
            } else if ($scope.extra == 2) {
                $scope.init_param = angular.extend({
                    paied_section: [0, 4],
                    accomplish_status: [0]
                }, simpleCons.default_param);
            } else if ($scope.extra == 3) {
                $scope.init_param = angular.extend({
                    accomplish_flag: [1],
                    accomplish_status: [1, 5]
                }, simpleCons.default_param);
            } else if ($scope.extra == 4) {
                $scope.init_param = angular.extend({
                    accomplish_flag: [1],
                    accomplish_status: [2]
                }, simpleCons.default_param);
            } else {
                widget.msgToast('没有取到任何状态');
                return false;
            }
            $scope.init_param.account_id = $rootScope.hjm.username == 'jinniu' ? '' : $rootScope.hjm.account_id;
            $scope.init_param.page = page ? page : $scope.init_param.page;
            $scope.init_param.keyword = $rootScope.search || '';
            $http.post($scope.init_url, $scope.init_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
                        $scope.res_head = [];
                        $scope.res_data = [];
                        $scope.res_api = '';
                        $scope.res_title = '取消订单';
                        $scope.res_head.push(
                            {name: 'ID', key: 'activity_id', className: 'span50'},
                            {name: '标题', key: 'activity_title', className: 'span50'},
                            {name: '管理备注', key: 'admin_remark', className: 'span30'},
                            {name: '拼团状态', className: 'span70', template: $templateCache.get('accomplish.html')},
                            {name: '开团时间', key: 'activity_time', className: 'span50'},
                            {name: '开团用户', key: 'post_user_info.name', className: 'span70'},
                            {
                                name: '成团进度',
                                className: 'span70',
                                template: "<span ng-bind=\"(order.paied?order.paied.copies:0)+'/'+group_min_num\"></span>"
                            },
                            {name: '订单数量', key: 'order.count', className: 'span50'},
                            {name: '已支付人数', key: 'order.paied.user_count', className: 'span30'},
                            {
                                name: '剩余时间',
                                key: 'accomplish.group_end_time',
                                className: 'span70',
                                filter: 'remaining_time'
                            },
                            {name: '团长信息', className: 'span100', template: $templateCache.get('tuan_header_info.html')},
                            {name: '商品信息', className: 'span100', template: $templateCache.get('product_info.html')},
                            {
                                name: '操作',
                                className: 'span70',
                                template: $templateCache.get('update_group_buy_status_btn.html')
                            }
                        );
                        $scope.res_data = $scope.list;

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
        $scope.audit = function (item, index) {
            console.log(item);
            var modalInstance = $modal.open({
                templateUrl: 'audit.html',
                controller: function ($scope, $modalInstance) {
                    $scope.param = {
                        user_id: item.user_id,
                        order_id: item.order_id,
                        refund_id: item.refund_id,
                        status: 0,
                        refund_reason: ''
                    }
                    $scope.submit = function () {
                        $scope.audit_url = simpleCons.domain + '/manage/refund/audit';
                        $http.post($scope.audit_url, $scope.param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    //sup_scope.list[sup_index].status = status;
                                    $modalInstance.dismiss('cancel');
                                    $scope.getapi();
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
    };
});
