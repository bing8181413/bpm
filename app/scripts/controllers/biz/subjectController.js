// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('subject.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.intro_pics = [];
        $scope.share_pics = [];
        $scope.searchparams = {};
        $scope.param = {};
        if ($stateParams.subject_id) {
            widget.ajaxRequest({
                url: '/subjects/' + $stateParams.subject_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.param = angular.copy(json.data);
                    json.data.intro_pic ? ($scope.intro_pics = [{
                        pic_id: json.data.intro_pic.pic_id,
                        pic_url: json.data.intro_pic.pic_url,
                        pic_width: json.data.intro_pic.pic_width || 100,// 为什么要加100默认值呢  不加的话 图片列表不显示
                        pic_height: json.data.intro_pic.pic_height || 100,
                        pic_size: json.data.intro_pic.pic_size || 100,
                    }]) : $scope.intro_pics.length = 0;
                    json.data.share_pic ? ($scope.share_pics = [{
                        pic_id: json.data.share_pic.pic_id,
                        pic_url: json.data.share_pic.pic_url,
                        pic_width: json.data.share_pic.pic_width || 100,
                        pic_height: json.data.share_pic.pic_height || 100,
                        pic_size: json.data.share_pic.pic_size || 100,
                    }]) : $scope.share_pics.length = 0;
                }
            })
        }
        $timeout(function () {
            $scope.param.products = [];
        }, 0);

        $scope.search = function () {
            widget.ajaxRequest({
                url: '/products/',
                method: 'get',
                scope: $scope,
                data: angular.extend($scope.searchparams, {page: 1, count: 50}),
                success: function (json) {
                    // console.log(json);
                    angular.forEach(json.data, function (val, key) {
                        angular.forEach(($scope.param || {}).products, function (v, k) {
                            if (v.product_id == val.product_id) {
                                val.in_subject = true;
                            }
                        });
                    });
                    $scope.products_source = json.data;
                }
            });
        }
        // 添加
        $scope.add_subject = function (item, index) {
            $scope.products_source[index].in_subject = true;
            console.log($scope.param);
            $scope.param.products.push(item);
        }
        // 删除
        $scope.sub_subject = function (item, index) {
            angular.forEach($scope.products_source, function (val, key) {
                if (item.product_id == val.product_id) {
                    $scope.products_source[key].in_subject = false;
                }
            });
            $scope.param.products.splice(index, 1);
        }
        $scope.$watch('orderby', function (val) {
            if (val) {
                val = val + '';
                console.log($scope.param);
                $scope.param.products = $filter('orderBy')(($scope.param || {}).products, val);
            }
        });
        $scope.$watch('searchparamsExt.status', function (val) {
            val = val + '';
            switch (val) {
                case '1':
                    $scope.searchparams.status = '';
                    $scope.searchparams.available_type = '';
                    break;
                case '2':
                    $scope.searchparams.status = '1';
                    $scope.searchparams.available_type = '1';
                    break;
                case '3':
                    $scope.searchparams.status = '2';
                    $scope.searchparams.available_type = '1';
                    break;
                case '4':
                    $scope.searchparams.status = '1';
                    $scope.searchparams.available_type = '2';
                    break;
            }
        });

        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            $scope.param.product_ids = {};
            var tmp_pid = $filter('arraySub2Array')($scope.param.products, 'product_id');
            angular.forEach(tmp_pid, function (val, key) {
                $scope.param.product_ids[val] = {order_by: tmp_pid.length - key};
            });
            if (Object.keys($scope.param.product_ids).length == 0) {
                widget.msgToast('专题活动和商品没有添加');
                return false;
            }

            if (comfunc.isEmptyArray($scope.share_pics)) {
                widget.msgToast('缩略图没有上传');
                return false;
            } else {
                $scope.param.share_pic = $scope.share_pics[0];
            }

            if (comfunc.isEmptyArray($scope.intro_pics)) {
                widget.msgToast('运营专题介绍图没有上传');
                return false;
            } else {
                $scope.param.intro_pic = $scope.intro_pics[0];
            }

            widget.ajaxRequest({
                url: '/subjects' + ($stateParams.subject_id ? ('/' + $stateParams.subject_id) : ''),
                method: $stateParams.subject_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.subject.list');
                }
            })
        }
    };
});
