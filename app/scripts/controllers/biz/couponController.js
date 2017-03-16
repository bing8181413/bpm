// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('coupon.addController', addController)

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.submit_disabled = true;
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $timeout(function () {
            $scope.is_nofity = 0;
        }, 1000);
        $scope.submit = function (status) {
            $scope.submit_disabled = false;
            $scope.param.scope_type = 3;
            if (!$scope.param.price || $scope.param.price <= 0) {
                widget.msgToast('金额不能小于等于0');
                $scope.submit_disabled = true;
                return false;
            }
            if (!$scope.param.mobile_list) {
                widget.msgToast('手机号码没有填写');
                $scope.submit_disabled = true;
                return false;
            }
            widget.ajaxRequest({
                url: '/coupons',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    $scope.submit_disabled = true;
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.coupon.list');
                }
            })
        }
    };
});
