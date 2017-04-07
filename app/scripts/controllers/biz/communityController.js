// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('community.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        $scope._param = {pics: []};
        $scope.param = {};
        if ($stateParams.community_id) {
            widget.ajaxRequest({
                url: '/communities/' + $stateParams.community_id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                    console.log($scope.param, $scope._param);
                }
            })
        }
        $scope.aaa = function () {
            console.log('$scope.param', $scope.param);
        }
        $scope.submit = function (status) {
            widget.ajaxRequest({
                url: '/communities' + ($stateParams.community_id ? ('/' + $stateParams.community_id) : ''),
                method: $stateParams.community_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.community.list');
                }
            })
        }
    };
});
