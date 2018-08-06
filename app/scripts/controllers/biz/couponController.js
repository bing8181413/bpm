// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('coupon.addController', addController)

    addController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];

    function addController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        var count = 2000;
        $timeout(function () {
            $scope.is_nofity = 0;
        }, 1000);
        $scope.submit = function (status) {
            $scope.param.scope_type = 3;

            if (!$scope.param.mobile_list) {
                widget.msgToast('手机号码没有填写');
                return false;
            } else {
                $scope.param.mobile_list = $scope.param.mobile_list.replace(/\n/g, ',').replace(/，/g, ',');
                if ($scope.param.mobile_list.split(',').length > count) {
                    widget.msgToast('手机号码超过' +count+'个不能添加优惠券');
                    return false;
                }
            }
            if (!$scope.param.price || $scope.param.price <= 0) {
                widget.msgToast('优惠劵金额不能小于等于0');
                return false;
            }
            if ($scope.param.over_price && $scope.param.over_price <= 0) {
                widget.msgToast('满减优惠条件的金额不能小于等于0');
                return false;
            }
            if ($scope.param.price && $scope.param.over_price && ($scope.param.over_price <= $scope.param.price)) {
                widget.msgToast('满减优惠条件的金额不能小于等于优惠劵金额');
                return false;
            }
            widget.ajaxRequest({
                url: '/coupons',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('已发布成功！可继续发送优惠券', 2000);
                    // $state.go(con.state.main + '.coupon.list');
                }
            })
        }
    };
});
