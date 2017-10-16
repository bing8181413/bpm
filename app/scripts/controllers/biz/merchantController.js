// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('merchant.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        $scope.param = {};
        if ($stateParams.merchant_id) {
            widget.ajaxRequest({
                url: '/merchant/merchants/' + $stateParams.merchant_id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                }
            })
        }
        $scope.randomString = function (len) {
            len = len || 8;
            var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
            /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
            var maxPos = $chars.length;
            var pwd = '';
            for (i = 0; i < len; i++) {
                pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
            }
            if (!$scope.param.account) {
                $scope.param.account = {};
            }
            $scope.param.account.userpass = pwd;
            // return pwd;
        }

        $scope.submit = function (status) {
            if (comfunc.isEmptyArray($scope.param.business_license)) {
                widget.msgToast('营业执照没有上传');
                return false;
            }
            widget.ajaxRequest({
                url: '/merchant/merchants' + ($stateParams.merchant_id ? ('/' + $stateParams.merchant_id) : ''),
                method: $stateParams.merchant_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.merchant.list');
                }
            })
        }
    };
});
