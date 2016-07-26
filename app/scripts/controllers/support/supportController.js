// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('supports.opencitiesController', opencitiesController);

    opencitiesController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function opencitiesController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.param = {city_name: null};
        $scope.conDomain = simpleCons.domain;
        $scope.remoteUrlRequestFn = function (str) {
            return {city_name: str};
        };
        $scope.selectedCommunity = function (selected) {
            if (selected) {
                $scope.param.city_name = selected.originalObject.city_name;
            }
            else {
                $scope.param.city_name = null;
            }
        }
        $scope.submit = function () {
            if (!$scope.param.city_name) {
                widget.msgToast('未输入城市');
                return false;
            }
            widget.ajaxRequest({
                url: '/supports/cities',
                method: 'post',
                scope: $scope,
                data: {city_name: $scope.param.city_name},
                success: function (json) {
                    widget.msgToast('提交成功');
                    $state.go(simpleCons.state.main + '.support.opencities');
                }
            })
        }
    };
});
