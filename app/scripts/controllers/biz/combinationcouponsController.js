// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('combinationcoupons.addController', addController)

    addController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function addController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.param = {};
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/markets/combinationcoupons/' + $stateParams.id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    if (json.code == 0) {
                        $scope.param = angular.copy(json.data);
                    } else {
                        widget.msgToast('数据返回错误!');
                    }
                }
            })
        }

        $scope.add = function () {
            if (!$scope.param.combination || $scope.param.combination.length == 0) {
                $scope.param.combination = [{}];
            } else if ($scope.param.combination.length < 15) {
                $scope.param.combination.push({});
            } else {
                widget.msgToast('最多只能添加15种优惠券');
            }
        }
        $scope.submit = function (status) {
            if (!$scope.param.combination || $scope.param.combination <= 0) {
                widget.msgToast('优惠券不能为空!');
                return false;
            }
            // if (!$scope.param.price || $scope.param.price <= 0) {
            //     widget.msgToast('优惠劵金额不能小于等于0');
            //     return false;
            // }
            // if ($scope.param.over_price && $scope.param.over_price <= 0) {
            //     widget.msgToast('满减优惠条件的金额不能小于等于0');
            //     return false;
            // }
            // if ($scope.param.price && $scope.param.over_price && ($scope.param.over_price <= $scope.param.price)) {
            //     widget.msgToast('满减优惠条件的金额不能小于等于优惠劵金额');
            //     return false;
            // }
            widget.ajaxRequest({
                url: '/markets/combinationcoupons' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.combinationcoupons.list');
                }
            })
        }
    };
});
