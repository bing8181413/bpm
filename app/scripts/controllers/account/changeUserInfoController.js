// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('account.changeUserInfoController', changeUserInfoController);

    changeUserInfoController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function changeUserInfoController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.iscompleted = false;
        $scope.init = function () {
            if ($rootScope.hjm.account_id) {
                $scope.param = {
                    account_id: $rootScope.hjm.account_id,
                    username: $rootScope.hjm.username,
                    mobile: $rootScope.hjm.mobile,
                    email: $rootScope.hjm.email,
                    weixin_nickname: $rootScope.hjm.weixin_nickname,
                    remark: $rootScope.hjm.remark
                }
                $scope.tmp_param = {
                    weixin_qrcode: [],
                    type: $rootScope.hjm.type,
                    current_city_list: $rootScope.hjm.current_city_list,
                    current_city_name: $rootScope.hjm.current_city_name,
                };
                if ($rootScope.hjm.weixin_qrcode) {
                    $scope.tmp_param.weixin_qrcode.push({
                        url: $rootScope.hjm.weixin_qrcode,
                        width: 0,
                        height: 0
                    });
                } else {
                    $scope.tmp_param.weixin_qrcode = [];
                }
                $scope.iscompleted = true;
            } else {
                widget.msgToast('账户密码失效,请重新登录');
            }
        }
        $scope.init();
        $scope.save = function () {
            if ($scope.tmp_param.weixin_qrcode[0]) {
                $scope.param.weixin_qrcode = $scope.tmp_param.weixin_qrcode[0].url;
            }
            if (!$scope.param.mobile) {
                widget.msgToast('手机号没有填写');
                return false;
            }
            // console.log($scope.param);
            // return false;
            var update_url = simpleCons.domain + '/manage/account/update';
            $http.post(update_url, $scope.param)
                .success(function (json) {
                    if (json.code == 0) {
                        widget.msgToast('更新成功');
                        $rootScope.hjm.account_id = $scope.param.account_id;
                        $rootScope.hjm.username = $scope.param.username;
                        $rootScope.hjm.mobile = $scope.param.mobile;
                        $rootScope.hjm.email = $scope.param.email;
                        $rootScope.hjm.weixin_nickname = $scope.param.weixin_nickname;
                        $rootScope.hjm.remark = $scope.param.remark;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
});
