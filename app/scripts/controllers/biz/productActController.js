// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('product.act.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        if ($stateParams.product_id) {
            widget.ajaxRequest({
                url: '/products/' + $stateParams.product_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    $scope.hours = comfunc.numDiv($scope.param.group_seconds || 0, 3600).toFixed(2);
                }
            })
        }
        //  获取地理位置信息 传入地址
        $scope.getlocation = function () {
            if (angular.isUndefined($scope.city_name)) {
                widget.msgToast('没有城市');
                return false;
            }
            if (angular.isUndefined($scope.param.act_detailed_address)) {
                widget.msgToast('没有地址');
                return false;
            }
            $scope.timeStamp = new Date().getTime();// 这个字段 有监听事件
        }
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.$watch('hours', function (val) {
            if (!!val) {
                $scope.hours = parseFloat(val).toFixed(2);
                $scope.param.group_seconds = comfunc.numMulti(val, 3600);
            }
        });

        $scope.$watch('param.delivery_type', function (val) {
            if (!!val && val == '3') {
                $scope.param.frequency_num = 0;
            } else if (!!val && val != '3') { // 有配送 至少为一次
                $scope.param.frequency_num = (($scope.param.frequency_num > 0) ? $scope.param.frequency_num : 1);
            }
        });
        $scope.$watch('param.frequency_num', function (frequency_num) {
            if (frequency_num || frequency_num == 0) {
                var delivery_type = ($scope.param || {}).delivery_type || '3';
                if (delivery_type == '3') {
                    $scope.param.frequency_num = 0;
                } else if (delivery_type != '3') { // 有配送 至少为一次
                    $scope.param.frequency_num = ((frequency_num > 0) ? frequency_num : 1);
                }
            }
        });

        $scope.submit = function (status) {
            if (comfunc.isEmptyArray($scope.param.visible_cities)) {
                widget.msgToast('配送城市没有选择');
                return false;
            }
            if (comfunc.isEmptyArray($scope.param.pics)) {
                widget.msgToast('运营大图没有上传');
                return false;
            }
            if (comfunc.isEmptyArray($scope.param.thumbnail_pics)) {
                widget.msgToast('缩略图片没有上传');
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
                    $state.go(con.state.main + '.product.list');
                }
            })
        }
    };
});
