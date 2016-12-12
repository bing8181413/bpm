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
                    $rootScope.hjm.act = {product_id: $stateParams.product_id};
                    $scope.param = angular.copy(json.data);
                    $scope.hours = comfunc.numDiv($scope.param.group_seconds || 0, 3600);
                }
            })
        }
        $scope.$watch('hours', function (val) {
            if (!!val) {
                $scope.hours = parseFloat(val);
                $scope.param.group_seconds = comfunc.numMulti(val, 3600);
            }
        });
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

        $scope.$watch('param.delivery_type', function (val) {
            if (!!val && val == '3') {
                $scope.param.frequency_num = 0;
            }
        });

        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            console.log($scope.param);
            if ($scope.param.video_url) {
                var reg_https = /^(([hH][tT]{2}[pP][sS]:\/\/)+[^\s]*)$/;
                var reg_http = /^(([hH][tT]{2}[pP]:\/\/)+[^\s]*)$/;
                if (!reg_https.test($scope.param.video_url) && !reg_http.test($scope.param.video_url)) {
                    widget.msgToast('视频或者音频网址不是以https://或者http://开头，或者不是网址！');
                    return false;
                }
            }
            if (comfunc.isEmptyArray($scope.param.pics)) {
                widget.msgToast('运营大图没有上传');
                return false;
            } else {
                var tmp_pics_err = 0;
                angular.forEach($scope.param.pics, function (val, key) {
                    if (!val.pic_url) {
                        tmp_pics_err++;
                    }
                })
                if (tmp_pics_err > 0) {
                    widget.msgToast('运营大图还没有完成上传');
                    return false;
                }
            }

            if ($scope.param.content_type == 1 && comfunc.isEmptyArray($scope.param.contents)) {
                widget.msgToast('图文详情没有上传');
                return false;
            }
            if ($scope.param.content_type == 2 && (!$scope.param.rich_text || $scope.param.rich_text == '')) {
                widget.msgToast('富文本内容未填写');
                return false;
            }
            if (comfunc.isEmptyArray($scope.param.visible_cities)) {
                widget.msgToast('配送城市没有选择');
                return false;
            }
            if ($scope.param.category == 2) {
                // 人数团 要填写 拼团人数 和 拼团时间
                if (!$scope.param.group_min_num && $scope.param.group_min_num <= 0) {
                    widget.msgToast('人数团de拼团人数要大于零');
                    return false;
                }
                if (!$scope.hours && $scope.hours <= 0) {
                    widget.msgToast('人数团de拼团有效时间要大于零');
                    return false;
                }
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
