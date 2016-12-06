// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('banner.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter) {
        $scope._param = {pics: []};
        $scope.param = {};
        $scope.toggle = '1';
        if ($stateParams.banner_id) {
            widget.ajaxRequest({
                url: '/banners/' + $stateParams.banner_id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                    if ($scope.param.pic_url) {
                        $scope._param = {
                            pics: [{
                                pic_url: $scope.param.pic_url,
                                pic_width: $scope.param.pic_width,
                                pic_height: $scope.param.pic_height
                            }]
                        };
                    }
                    if ($scope.param.url) {
                        $scope.toggle = '2';
                    } else {
                        $scope.toggle = '1';
                    }
                    console.log($scope.param, $scope._param);
                }
            })
        }


        $scope.aaa = function () {
            $scope.param.pic_url = $scope._param.pics[0].pic_url;
            $scope.param.pic_width = $scope._param.pics[0].pic_width;
            $scope.param.pic_height = $scope._param.pics[0].pic_height;
            console.log('$scope.param', $scope.param, $scope._param);
        }
        $scope.submit = function (status) {
            $scope.param.category = '1';
            if (comfunc.isEmptyArray($scope._param.pics)) {
                widget.msgToast('运营图片没有上传');
                return false;
            } else {
                if ($scope._param.pics && $scope._param.pics[0].pic_url) {
                    $scope.param.pic_url = $scope._param.pics[0].pic_url;
                    $scope.param.pic_width = $scope._param.pics[0].pic_width;
                    $scope.param.pic_height = $scope._param.pics[0].pic_height;
                } else {
                    widget.msgToast('运营图片没有上传');
                    return false;
                }
            }
            if ($scope.toggle == '1') {
                $scope.param.url = '';
            } else if ($scope.toggle == '2' && !$scope.param.url) {
                widget.msgToast('没有填写URL');
                return false;
            }
            widget.ajaxRequest({
                url: '/banners' + ($stateParams.banner_id ? ('/' + $stateParams.banner_id) : ''),
                method: $stateParams.banner_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.banner.list');
                }
            })
        }
    };
});
