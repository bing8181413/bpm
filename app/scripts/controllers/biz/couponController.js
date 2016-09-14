// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('coupon.addController', addController)

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $timeout(function () {
            $scope.is_nofity = 0;
        }, 1000);
        $scope.submit = function (status) {
            $scope.param.scope_type = 3;
            if ($scope.param.price <= 0) {
                widget.msgToast('金额不能小于等于0');
                return false;
            }
            if (!$scope.param.mobile_list) {
                widget.msgToast('手机号码');
                return false;
            }
            widget.ajaxRequest({
                url: '/coupons',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.coupon.list');
                }
            })
        }
    };
});
