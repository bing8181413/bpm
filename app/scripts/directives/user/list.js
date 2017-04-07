define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('userAddress', function (widget, $uibModal) {
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
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="addressList" config="config" columns="columns" ext-api="extApi"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/addresses';
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userOrder', function (widget, $uibModal) {
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
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_user" columns="columns_by_user" ext-search="extSearch"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userCoupon', function (widget, $uibModal) {
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
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="couponList" config="config_by_user" columns="columns_by_user" ext-api="extApi" ext-search="extSearch"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/coupons';
                                    $scope.extSearch = {user_id: supScope.data.user_id};
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('userToken', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
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
                        var modalInstance = $uibModal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $uibModalInstance) {
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
                                    $uibModalInstance.dismiss('cancel');
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
        .directive('vipUserInfoUpdate', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-warning" ng-click="show_act_change_notice()" >会员信息更新</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_act_change_notice = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '会员信息更新';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<h4>会员信息更新，请确认无误后操作。</h4>' +
                                        '<div form-input text="会员编号" ng-model="param.vip_number" required="true"></div>' +
                                        '<div form-input text="会员名称" ng-model="param.name" required="true"></div>' +
                                        '<div form-radio text="会员类型" ng-model="param.is_vip" default="1"' +
                                        'source="[{text:\'仅会员\',value:\'1\'},{text:\'会员+体验会员\',value:\'3\'},{text:\'不限制\',value:\'2\'}]"' +
                                        ' required="true"></div>' +
                                        '<div form-input text="手机号码" ng-model="param.mobile" required="true"></div>' +
                                        '<div form-date-time text="会员开始时间" ng-model="param.vip_start_time" required="true"></div>' +
                                        '<div form-date-time text="会员结束时间" ng-model="param.vip_end_time" required="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        $scope.param = {
                                            vip_number: supscope.data.vip_number,
                                            name: supscope.data.name,
                                            is_vip: supscope.data.is_vip,
                                            mobile: supscope.data.mobile,
                                            vip_start_time: supscope.data.vip_start_time,
                                            vip_end_time: supscope.data.vip_end_time,
                                        };
                                        // console.log($scope.param);
                                    }, 0);
                                    $scope.submit = function () {
                                        // console.log($scope);
                                        widget.ajaxRequest({
                                            url: '/users/' + (supscope.data.user_id || 0),
                                            method: 'patch',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('会员信息更新成功!');
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            }
                        );
                    }
                }
            }
        })
});
