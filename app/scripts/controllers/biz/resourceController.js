// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('resource.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {

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
