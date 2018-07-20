// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('redPacketCoupons.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $timeout) {
        $scope.init = function () {
            widget.ajaxRequest({
                url: '/markets/redpacketcoupons',
                method: 'get',
                scope: $scope,
                data: {status: 1},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        }
        $scope.init();

        $scope.$watch('param', function (lists) {
            angular.forEach(lists, function (val, key) {
                val.order_by = key + 1;
            })
        }, true);

        $scope.del = function (index) {
            if (!confirm('确认要删除吗?')) {
                return false;
            }
            $scope.param.splice(index, 1);
        }
        $scope.update = function (update_index) {
            $scope.add(update_index);
        }
        $scope.add = function (update_index) {
            var supscope = $scope;
            var modalInstance = $uibModal.open({
                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                controller: function ($scope, $uibModalInstance) {
                    $scope.search_product_id = function () {
                        if (!$scope.param.product_id) {
                            widget.msgToast('活动ID未填写');
                            return false;
                        }
                        widget.ajaxRequest({
                            url: '/products',
                            method: 'get',
                            scope: $scope,
                            data: {product_id: $scope.param.product_id},
                            success: function (json) {
                                if (json.data[0]) {
                                    $scope.param.title = json.data[0].title;
                                }
                            }
                        })
                    }
                    if (update_index || update_index == 0) {
                        // console.log(update_index, supscope.param[update_index]);
                        $scope.param = {
                            product_id: supscope.param[update_index].product.product_id,
                            title: supscope.param[update_index].product.title,
                            coupon_title: supscope.param[update_index].coupon_title,
                            coupon_price: supscope.param[update_index].coupon_price
                        }
                        $scope.search_product_id();
                    } else {
                        $scope.param = {};
                    }
                    $scope.title = '添加分享红包';
                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                        '<div class="form-group">' +
                        '    <label class="col-sm-2 control-label">对应活动ID' +
                        '    <span class="form_label_danger">*</span></label>' +
                        '    <div class="col-sm-2">' +
                        '       <input class="form-control" ng-model="param.product_id" required>' +
                        '    </div>' +
                        '     <div class="col-sm-1">' +
                        '    <a class="btn btn-primary btn-rounded" ng-click="search_product_id()">查询</a>' +
                        '    </div>' +
                        '    <div class="col-sm-5">' +
                        '    <input class="form-control" ng-disabled="true" ng-model="param.title" ' +
                        '       placeholder="点击查询确认活动存在" required>' +
                        '      </div>' +
                        '</div>' +
                        '<div form-input text="红包标题" ng-model="param.coupon_title"></div>' +
                        '<div form-input text="优惠券金额" ng-model="param.coupon_price"></div>' +
                        '<a class="btn btn-primary btn-rounded pull-right " ng-disabled="FormBody.$invalid" ng-click="submit()">确定</a>' +
                        '</form>';

                    $scope.submit = function () {
                        if (!$scope.param.product_id || !$scope.title) {
                            widget.msgToast('活动ID或名称未填写完整');
                            return false;
                        }
                        supscope.param.splice(
                            (update_index || update_index == 0) ? update_index : 0,
                            (update_index || update_index == 0) ? 1 : 0,
                            {
                                id: $scope.param.id,
                                order_by: undefined,
                                coupon_title: $scope.param.coupon_title,
                                coupon_price: $scope.param.coupon_price,
                                product_id: $scope.param.product_id,
                                product: {
                                    product_id: $scope.param.product_id,
                                    title: $scope.param.title
                                }
                            });
                        $scope.cancel();
                    }
                    $scope.$watch('param.product_id', function (val) {
                        $scope.param.title = '';
                    });
                    $scope.cancel = function () {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        $scope.submit = function (status) {
            if (!confirm('确认要提交此次更新吗?')) {
                return false;
            }
            // console.log($scope.param);
            // return false;
            widget.ajaxRequest({
                url: '/markets/redpacketcoupons',
                method: 'PUT',
                scope: $scope,
                data: {items: $scope.param},
                success: function (json) {
                    widget.msgToast('更新成功！', 500);
                    $scope.init();
                },
                failure: function (err) {
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
