define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('orderRefunds', function ($templateCache, $filter, $compile, widget, $modal, $timeout, comfunc) {
                return {
                    restrict: 'AE',
                    replace: true,
                    scope: {
                        data: '=',
                    },
                    template: ' <a class="btn btn-primary btn-rounded btn-sm" ng-click="show_order_refunds();">批量退款</a>',
                    link: function ($scope, $element, $attrs) {
                        var supscope = $scope;
                        $scope.show_order_refunds = function () {
                            // console.log($scope);
                            var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    $scope.title = '批量退款';
                                    $timeout(function () {
                                        $scope.data = supscope.data;
                                        $scope.refund_ids = [];
                                        $scope.refunds = [];
                                        $scope.amounts = 0;
                                        angular.forEach($scope.data, function (val, key) {
                                            if (val._checked) {
                                                $scope.refund_ids.push(val.refund_id);
                                                $scope.refunds.push(val);
                                                $scope.amounts = comfunc.numAdd($scope.amounts, val.refund_price);
                                            }
                                        });
                                    }, 0);

                                    $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                        ' <div form-table ng-model="refunds" max="1000" config="{readonly:\'true\'}"' +
                                        'columns="[{\'name\': \'退款ID\', \'field\': \'refund_id\'},' +
                                        '{\'name\': \'订单金额\', \'field\': \'order_price\'},' +
                                        '{\'name\': \'退款金额\', \'field\': \'refund_price\'}]"></div>' +
                                        '<div class="col-sm-12"><span ng-bind="\'此次退款总金额:\'+amounts"></span></div>' +
                                        '<a class="btn btn-primary btn-rounded pull-right" ng-click="order_refunds()">确定</a>' +
                                        '</form>';
                                    $scope.order_refunds = function () {
                                        // console.log($scope.refund_ids);
                                        if ($scope.refund_ids.length == 0) {
                                            widget.msgToast('没有选中任何一个退款订单');
                                            return false;
                                        }
                                        if (confirm('确认退款吗?')) {
                                            widget.ajaxRequest({
                                                url: '/orders/refunds',
                                                method: 'PUT',
                                                scope: $scope,
                                                data: {refund_ids: $scope.refund_ids},
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
                                size: ''
                            });
                        }
                    }
                }
            }
        )
        .directive('orderSingleRefund', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="order-single-refund" ></p>',
                link: function ($scope, $element, $attrs) {
                    // console.log($scope.data);
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.refund_status == 2) {
                        status_title = '手动退款';
                        status_text = 'ng-bind="\'手动退款\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="orderSingleRefund(3);"';
                        $scope.show_text = true;
                    }
                    $scope.orderSingleRefund = function (status) {
                        if (confirm('确认要' + status_title + '吗?')) {
                            widget.ajaxRequest({
                                url: '/orders/refunds/' + $scope.data.refund_id || 0,
                                method: 'put',
                                scope: $scope,
                                data: {anew_refund: 1},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.order-single-refund').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
