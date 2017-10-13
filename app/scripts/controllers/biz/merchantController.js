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
