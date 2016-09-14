// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('exchangecode.addController', addController)

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter) {
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            if ($scope.param.price <= 0) {
                widget.msgToast('金额不能小于等于0');
                return false;
            }
            if ($scope.param.total <= 0) {
                widget.msgToast('总数不能小于等于0');
                return false;
            }
            widget.ajaxRequest({
                url: '/exchangecodes',
                method: 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.exchangecode.list');
                }
            })
        }
    };
});
