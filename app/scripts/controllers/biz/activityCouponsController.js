// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('activitycoupons.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {};

        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/markets/activitycoupons/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                }
            })
        }


        $scope.submit = function (status) {
            $scope.param.scope_type = 3;
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
                url: '/markets/activitycoupons' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.activitycoupons.list');
                }
            })
        }
    };
});
