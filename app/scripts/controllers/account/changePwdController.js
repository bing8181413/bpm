// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('account.changePwdController', changePwdController);

    changePwdController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function changePwdController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        if ($rootScope.hjm.account_id) {
            $scope.param_tmp = {
                account_id: $rootScope.hjm.account_id,
                // originpwd: '',
                // pwd: '',
                pwd1: ''
            }
        } else {
            widget.msgToast('账户密码失效,请重新登录');
        }
        $scope.save = function () {
            // if ($scope.param_tmp.originpwd != $rootScope.hjm.pwd) {
            //     widget.msgToast('原密码没输入或输入错误');
            //     return false;
            // }
            // if (!$scope.param_tmp.pwd1 || $scope.param_tmp.pwd1 != $scope.param_tmp.pwd2) {
            //     widget.msgToast('两次新密码不相同或者输入错误');
            //     return false;
            // }
            // if ($scope.param_tmp.originpwd == $scope.param_tmp.pwd2) {
            //     widget.msgToast('别zuo,新密码旧密码相同还要修改');
            //     return false;
            // }
            $scope.param = {
                account_id: $rootScope.hjm.account_id,
                userpass: $scope.param_tmp.pwd2
            }
            // console.log($scope.param);
            // return false;
            var update_url = simpleCons.domain + '/manage/account/update';
            $http.post(update_url, $scope.param)
                .success(function (json) {
                    if (json.code == 0) {
                        widget.msgToast('更新成功,重新登陆');
                        $rootScope.logout();
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
});
