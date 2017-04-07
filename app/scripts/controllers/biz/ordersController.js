// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('orders.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        $scope.param = {};
        $scope.user_ids = '';
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
                    if (json.data.category == 3 || json.data.category == 4) {
                        json.data.options.push(json.data.groupbuy_options);
                        angular.forEach(json.data.options, function (val, key) {
                            $scope.options.push({
                                text: '类目:' + val.option_name + '    /    价格:' + val.option_price,
                                value: val.option_id
                            });
                        })
                    } else {
                        widget.msgToast('该ID不是活动');
                    }
                },
                failure: function (err) {
                    widget.msgToast('活动ID不存在');
                }
            })
        }
        $scope.submit = function () {
            if (!$scope.param.product_id) {
                widget.msgToast('活动ID没有');
                return false;
            }
            if (!$scope.param.option_id) {
                widget.msgToast('类目没有选择');
                return false;
            }

            $scope.param.user_ids = [];
            $scope.param.user_ids = $scope.user_ids.split(',');

            if (comfunc.isEmptyArray($scope.param.user_ids)) {
                widget.msgToast('没有填写用户ID');
                return false;
            }
            widget.ajaxRequest({
                url: '/orders',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('订单数据维护成功！');
                    $scope.user_ids = '';
                    $scope.param.user_ids = [];
                    //  不跳转就清空user_ids  防止重复提交
                }
            })
        }
    };
});
