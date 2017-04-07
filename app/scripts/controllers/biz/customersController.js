// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('user.customersAddController', customersAddController)

    customersAddController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', 'comfunc'];
    function customersAddController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, comfunc) {
        $scope.submit = function () {
            if (comfunc.isEmptyArray($scope.avatar)) {
                widget.msgToast('头像没有上传');
                return false;
            }
            $scope.param.gender = Number($scope.param.gender);
            $scope.param.mobile = $scope.mobile + '';
            $scope.param.avatar = $filter('arraySub2String')($scope.avatar, 'pic_url');
            widget.ajaxRequest({
                url: '/users/customers',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('添加马甲成功！');
                    $state.go('main.user.customers');
                }
            })
        }
    };
});
