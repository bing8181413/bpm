// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('account.addController', addController);

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        // $scope.iscompleted = false;
        // 错误 对象 针对选择小区的 储存错误对象的
        $scope.communityerr = {
            count: 0,
            cursor: 0
        };
        $scope.tmp_param = {
            weixin_qrcode: []
        };
        $scope.init = function () {
            //console.log(account);
            //图片格式化字段
            $scope.tmp_param.weixin_qrcode = [];
            $scope.iscompleted = true;
            $scope.param = {
                city_name: '',
                city_list: '',
                mobile: '',
                userpass: '123456',
                weixin_nickname: '',
                username: '',
                remark: '',
                type: ''
            }
        }
        $scope.init();
        // 1张封面图片
        $scope.save = function () {
            $scope.err = 0;
            //console.log($scope.communityerr.count);
            if ($scope.tmp_param.weixin_qrcode[0]) {
                $scope.param.weixin_qrcode = $scope.tmp_param.weixin_qrcode[0].url;
            }
            //else {
            //    widget.msgToast('微信二位码是给用户扫的你不上传一下吗？');
            //    $scope.err++;
            //    return false;
            //}
            //if (!$scope.param.weixin_nickname) {
            //    widget.msgToast('微信昵称是给用户看的你不填一下吗？');
            //    $scope.err++;
            //    return false;
            //}
            if (!$scope.param.username) {
                widget.msgToast('请填写负责人账号');
                $scope.err++;
                return false;
            }
            if (!$scope.param.userpass) {
                widget.msgToast('请填写初始密码');
                $scope.err++;
                return false;
            }
            if (!$scope.param.mobile) {
                widget.msgToast('请填写手机号码');
                $scope.err++;
                return false;
            }
            if (!$scope.param.type) {
                widget.msgToast('请选择一个角色');
                $scope.err++;
                return false;
            }
            if (!$scope.param.city_list) {
                widget.msgToast('至少添加一个城市');
                $scope.err++;
                return false;
            } else {
                // 默认选中第一个城市
                $scope.param.city_name = $scope.param.city_list.split(',')[0];
            }
            $scope.param.password = $scope.param.userpass;
            $scope.param.status = 1;
            // console.log($scope.param);
            // return false;
            $http.post(simpleCons.api.add_account, $scope.param)
                .success(function (json) {
                    if (json.code == 0) {
                        alert('添加成功！');
                        $state.go('account.list');
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
});
