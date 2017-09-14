// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod.controller('activitycoupons.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', 'comfunc', '$filter', '$timeout'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter, $timeout) {
        $scope.param = {};

        if ($stateParams.id) {
            widget.ajaxRequest({
                url: '/markets/liveshare/' + $stateParams.id,
                method: 'GET',
                scope: $scope,
                success: function (json) {
                    $scope.param = json.data;
                }
            })
        }


        $scope.submit = function (status) {

            widget.ajaxRequest({
                url: '/markets/liveshare' + ($stateParams.id ? ('/' + $stateParams.id) : ''),
                method: $stateParams.id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.liveShare.list');
                }
            })
        }
    };
});
