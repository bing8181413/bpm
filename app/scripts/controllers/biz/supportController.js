// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('supports.opencitiesController', opencitiesController);
    mod.controller('supports.versionController', versionController);

    opencitiesController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    versionController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter', '$timeout'];
    function versionController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
        $scope.init = function () {
            widget.ajaxRequest({
                url: '/supports/version',
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.version = json.data.version;
                    $scope.param = {version: null};
                }
            })
        }
        $scope.init();
        $scope.submit = function () {
            if (!$scope.param || !$scope.param.version) {
                widget.msgToast('未输入新版本的日期');
                return false;
            }
            widget.ajaxRequest({
                url: '/supports/version',
                method: 'put',
                scope: $scope,
                data: {version: $scope.param.version},
                success: function (json) {
                    widget.msgToast('更新成功');
                    $scope.init();
                }
            })
        }
    };
    function opencitiesController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, $filter, $timeout) {
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
