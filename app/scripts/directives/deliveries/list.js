define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // 修改配送模式时间类型
        .directive('changeDeliveriesStatus', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: true,
                // scope: {
                //     list: '=',
                // },
                template: ' <a class="btn btn-primary btn-rounded btn-sm" ng-click="show_deliveries_change_status();">修改子订单状态</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_deliveries_change_status = function () {
                        // console.log($scope);
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '修改子订单状态';
                                $scope.data = supscope.data;
                                $scope.delivery_ids = [];
                                angular.forEach($scope.data, function (val, key) {
                                    if (val._checked) {
                                        $scope.delivery_ids.push(val.delivery_id);
                                    }
                                });
                                var source = "[{text:'待发货',value:1},{text:'已发货',value:2},{text:'已签收',value:3}]";
                                // ,{text:'已取消',value:4}]";
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-radio text="修改状态为" type="radio" ng-model="delivery_status" required="true"' +
                                    'source="' + source + '" default=""></div>' +
                                    '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_deliveries_status()">确定</a>' +
                                    '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                    '</form>';
                                $scope.change_deliveries_status = function () {
                                    // console.log($scope.delivery_ids, $scope.delivery_status);
                                    if ($scope.delivery_ids.length == 0) {
                                        widget.msgToast('没有选中任何一个子订单');
                                        return false;
                                    }
                                    if (!$scope.delivery_status) {
                                        widget.msgToast('没有选中任何一种状态');
                                        return false;
                                    }
                                    if (confirm('确认修改子订单状态吗?')) {
                                        widget.ajaxRequest({
                                            url: '/orders/deliveries',
                                            method: 'PUT',
                                            scope: $scope,
                                            data: {
                                                delivery_ids: $scope.delivery_ids,
                                                delivery_status: $scope.delivery_status
                                            },
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        // 修改配送模式时间类型
        .directive('deliverDelay', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: ' <a class="btn btn-primary btn-rounded btn-sm" ng-click="show_deliver_delay();">延迟一周配送</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_deliver_delay = function () {
                        // console.log($scope.data);
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '延迟一周配送';
                                $scope.data = supscope.data;
                                $scope.expect_date = $scope.data.expect_date;
                                $scope.expect_date_new = new Date(Date.parse($scope.expect_date) + (86400000 * 7));
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<h5>当前子订单、及后续子订单配送时间都会顺延，是否确定延迟一周配送？</h5>' +
                                    '<h5>当前子订单预计配送时间：<span ng-bind="expect_date|limitTo :10"></span></h5>' +
                                    '<h5>延迟一周后预计配送时间：<span ng-bind="expect_date_new | date:\'yyyy-MM-dd\'"></span></h5>' +
                                    '<div class="panel panel-primary">' +
                                    '<div class="panel-body">' +
                                    '</div>' +
                                    '</div>' +
                                    '<a class="btn btn-primary btn-rounded pull-right" ng-click="deliver_delay()">确定</a>' +
                                    '</form>';
                                $scope.deliver_delay = function () {
                                    console.log(supscope.data.delivery_id);
                                    if (confirm('延迟一周配送?')) {
                                        widget.ajaxRequest({
                                            url: '/orders/deliveries/' + supscope.data.delivery_id + '/delay',
                                            method: 'PUT',
                                            scope: $scope,
                                            data: {},
                                            success: function (json) {
                                                widget.msgToast('已经修改为延迟一周配送,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            }
        })
});
