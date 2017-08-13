// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('cctalkInfo.sendController', sendController);

    sendController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout', 'base64'];
    function sendController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout, base64) {
        $scope.mobile = '';
        $scope.info = {exchangecodes: []};
        $scope.search = function () {
            if (!$scope.mobile) {
                widget.msgToast('没有对应手机号码,不能发送短信');
                return false;
            }
            widget.ajaxRequest({
                url: '/cctalk/info',
                method: 'get',
                scope: $scope,
                data: {mobile: $scope.mobile},
                success: function (json) {
                    if (json.code == 0) {
                        $scope.info = angular.copy(json.data);
                    } else {
                        widget.msgToast('没有查询到信息!')
                        $scope.info = {};
                    }
                }
            });
        }
        $scope.send = function () {
            if (!$scope.info || !$scope.info.account || !$scope.info.account.mobile) {
                widget.msgToast('没有对应手机号码,不能发送短信');
                return false;
            }
            if (confirm('确认发送CCtalk账户和邀请码到手机号码为 ' + $scope.info.account.mobile + ' 的用户?')) {
                widget.ajaxRequest({
                    url: '/cctalk/sms',
                    method: 'POST',
                    scope: $scope,
                    data: {mobile: $scope.info.account.mobile},
                    success: function (json) {
                        if (json.code == 0) {
                            widget.msgToast('已发送!');
                        }
                    }
                });
            }
        }
    };

});
