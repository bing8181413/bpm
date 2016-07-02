// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('account.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        //console.log($rootScope.hjm.account_update_obj);
        var sup_scope = $scope;
        $scope.iscompleted = false;
        // 错误 对象 针对选择小区的 储存错误对象的
        $scope.communityerr = {
            count: 0,
            cursor: 0
        };
        $scope.tmp_param = {
            weixin_qrcode: []
        };
        $scope.init = function (account) {
            if (account) {
                //console.log(account);
                //图片格式化字段
                if (account.weixin_qrcode) {
                    $scope.tmp_param.weixin_qrcode.push({
                        url: account.weixin_qrcode,
                        width: 0,
                        height: 0
                    });
                } else {
                    $scope.tmp_param.weixin_qrcode = [];
                }
                $scope.iscompleted = true;
                $scope.param = {
                    account_id: account.account_id,
                    city_name: account.city_name,
                    city_list: account.city_list,
                    mobile: account.mobile,
                    email: account.email,
                    weixin_nickname: account.weixin_nickname,
                    username: account.username,
                    remark: account.remark,
                    type: account.type,
                    //areas:account.areas
                }
                //console.log($scope.param);
            } else {
                widget.msgToast('不要取巧，回到列表重新进来');
            }

        }
        $scope.init($rootScope.hjm.account_update_obj);
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
            }
            //console.log($scope.param);
            //return false;
            $http.post(simpleCons.api.update_account, $scope.param)
                .success(function (json) {
                    if (json.code == 0) {
                        alert('更新成功！');
                        $state.go('account.list');
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
});
