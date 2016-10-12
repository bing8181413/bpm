// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('orders.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        $scope.param = {};
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.$watch('param.product_id', function (val) {
            $scope.options = [];
            $scope.param.option_id = '';
        });
        $scope.search = function () {
            widget.ajaxRequest({
                url: '/products/' + $scope.param.product_id,
                method: 'GET',
                scope: $scope,
                data: {},
                success: function (json) {
                    // console.log(json);
                    $scope.options = [];
                    angular.forEach(json.data.options, function (val, key) {
                        $scope.options.push({
                            text: '类目:' + val.option_name + '    /    价格:' + val.option_price,
                            value: val.option_id
                        });
                    })
                },
                failure: function (err) {
                    widget.msgToast('活动或者商品ID不存在');
                }
            })
        }
        $scope.submit = function () {
            if (!$scope.param.product_id) {
                widget.msgToast('商品或者活动ID没有');
                return false;
            }
            if (!$scope.param.option_id) {
                widget.msgToast('类目没有选择');
                return false;
            }
            if (!$scope.param.user_ids) {
                widget.msgToast('类目没有选择');
                return false;
            }
            widget.ajaxRequest({
                url: '/orders',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('订单数据维护成功！');
                }
            })
        }
    };
});
