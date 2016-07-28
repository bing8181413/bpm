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
                                $scope.list = supscope.list;
                                $scope.delivery_ids = [];
                                angular.forEach($scope.list, function (val, key) {
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
                    // var content = '<a class="btn btn-primary btn-rounded" ng-click="show_deliveries_change_status();">修改配送时间类型</a>';
                    // $element.find('.order-deliveries-status').html(content);
                    // $compile($element.contents())($scope);
                }
            }
        })
});
