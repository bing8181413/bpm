define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('userAddress', function (widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_address()" ng-bind="data.address.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_address = function (status) {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="addressList" config="config" columns="columns" ext-api="extApi"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/addresses';
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userOrder', function (widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_order()" ng-bind="data.order.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_order = function (status) {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_user" columns="columns_by_user" ext-search="extSearch"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userCoupon', function (widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show_user_coupon()" ng-bind="data.coupon.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show_user_coupon = function (status) {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="couponList" config="config" columns="columns" ext-api="extApi" ext-search="extSearch"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/coupons';
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
