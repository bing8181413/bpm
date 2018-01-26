// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('permissions.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.param = {};
        if ($stateParams.id) {
            widget.ajaxRequest({
                url: con.live_domain + '/live/permissions/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                }
            })
        }

        $scope.verify_obj_id = function (obj_id) {
            $scope.param.obj_id = '';
            if (!obj_id || obj_id == 0) {
                widget.msgToast('未选择视频组ID,不能查询添加!');
                return false;
            }
            return true;
        }
        $scope.add_obj_id = function (json) {
            if (json.code == 0) {
                $scope.param.obj_id = json.data.id;
            } else {
                widget.msgToast('添加失败,视频组ID不存在!');
            }
        }
        $scope.submit = function (status) {
            $scope.param.obj_type = '1';// 视频组
            widget.ajaxRequest({
                url: con.live_domain + '/live/permissions' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.permissions.list');
                }
            })
        }
    };
});
