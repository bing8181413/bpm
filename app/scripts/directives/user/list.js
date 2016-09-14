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
                            template: '<div hjm-grid modid="couponList" config="config_by_user" columns="columns_by_user" ext-api="extApi" ext-search="extSearch"></div>',
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
        .directive('userToken', function ($rootScope, $templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="user-token" ></p>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_user_token = function () {
                        if ('admin,pm'.indexOf($rootScope.hjm.role) == -1) {
                            widget.msgToast('权限不够');
                            return false;
                        }
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="模拟登陆的URL" ng-model="rtn_url"' +
                                    ' placeholder = "URL" > </div > ' +
                                    '</form>';
                                $scope.title = '取消订单';
                                widget.ajaxRequest({
                                    url: '/users/' + supscope.data.user_id + '/token',
                                    method: 'get',
                                    scope: $scope,
                                    data: {},
                                    success: function (json) {
                                        $scope.rtn_url = json.data.url;
                                    }
                                })
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show_user_token();">模拟登陆</a>';
                    $element.find('.user-token').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
