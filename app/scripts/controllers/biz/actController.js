// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('act.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter) {
        if ($stateParams.product_id) {
            widget.ajaxRequest({
                url: '/products/' + $stateParams.product_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                }
            })
        }
        // 目标金额 和option 事件
        var change_options = function () {
            $scope.options_goal_price = 0;
            if ($scope.param && $scope.param.options) {
                angular.forEach($scope.param.options, function (v, k) {
                    $scope.options_goal_price += comfunc.numMulti(v.option_price, v.option_inventory);
                });
                if ($scope.param && $scope.param.act_goal_price && $scope.param.act_goal_price > $scope.options_goal_price) {
                    $scope.param.act_goal_price = $scope.options_goal_price;
                }
            }
        }

        $scope.$watch('param.options', function (val) {
            change_options();
        }, true);
        $scope.$watch('param.act_goal_price', function (val) {
            change_options();
        });

        $scope.$watch('param.delivery_type', function (val) {
            if (!!val && val == '3') {
                $scope.param.frequency_num = 0;
            }
        });
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            if (comfunc.isEmptyArray($scope.param.pics)) {
                widget.msgToast('运营大图没有上传');
                return false;
            }
            if (comfunc.isEmptyArray($scope.param.contents)) {
                widget.msgToast('图文详情没有上传');
                return false;
            }
            if (status || status == 0) {
                $scope.param.status = status;
            } else {
                $scope.param.status = 1;
            }
            widget.ajaxRequest({
                url: '/products' + ($stateParams.product_id ? ('/' + $stateParams.product_id) : ''),
                method: $stateParams.product_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.act.list');
                }
            })
        }
    };
});
