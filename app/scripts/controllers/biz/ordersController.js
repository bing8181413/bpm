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
                url: '/products/' + $scope.param.product_id + '/options',
                method: 'GET',
                scope: $scope,
                data: {count: 200},
                success: function (json) {
                    $scope.options = [{text: '-请选择-', value: ''}];
                    angular.forEach(json.data, function (val, key) {
                        if (val.option_status == 1) {
                            $scope.options.push({
                                text: $filter('product_category')(val.option_type) + '  |  类目:' + val.option_name + '    /    价格:' + val.option_price,
                                value: val.option_id + '',
                                option_type: val.option_type
                            });
                        }
                    });
                    $scope.options = $filter('orderBy')($scope.options, 'option_type', 'desc');
                },
                failure: function (err) {
                    widget.msgToast('活动ID不存在');
                }
            })
        }

        $scope.$watch('param.option_id', function (val) {
            angular.forEach($scope.options, function (v, k) {
                if (val == v.value) {
                    if (v.option_type == 2) {
                        $scope.param.apply_mode = $scope.param.apply_mode == 3 ? 1 : $scope.param.apply_mode;
                    } else if (v.option_type == 3) {
                        $scope.param.apply_mode = 3;

                    }
                }
            });
        });

        $scope.$watch('param.apply_mode', function (val) {
            var option_type = '';
            angular.forEach($scope.options, function (v, k) {
                if ($scope.param.option_id == v.value) {
                    option_type = v.option_type;
                }
            });
            if (val == 3 && option_type != 3) {
                $scope.param.option_id = '';
            } else if (val != 3 && option_type == 3) {
                $scope.param.option_id = '';
            }
        });

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
