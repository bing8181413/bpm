// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('menusController', menusController);

    menusController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    function menusController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.init_url = simpleCons.domain + '/accounts/menus/tree';
        $scope.update_url = simpleCons.domain + '/accounts/menus/';
        $scope.add_url = simpleCons.domain + '/accounts/menus';
        $scope.swap_url = simpleCons.domain + '/accounts/menus';
        $scope.getapi = function () {
            $rootScope.loading = true;
            widget.ajaxRequest({
                method: 'GET',
                url: $scope.init_url,
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.menus = json.data;
                    $scope.param = [];
                    $scope.param.push(
                        {key: 'id', val: '', name: 'id', isprimary: true},
                        {key: 'key', val: '', name: 'key', allownull: true},
                        {key: 'icon', val: '', name: '图标'},
                        {key: 'name', val: '', name: '名称'},
                        {key: 'type', val: '', name: '类型'},
                        {key: 'route', val: '', name: '路由'},
                        {key: 'sort', val: '', name: '排序'}
                    );
                    $scope.param_sub = [];
                    $scope.param_sub.push(
                        {key: 'id', val: '', name: 'id', isprimary: true},
                        {key: 'key', val: '', name: 'key', allownull: true},
                        {key: 'icon', val: '', name: '图标'},
                        {key: 'name', val: '', name: '名称'},
                        {key: 'type', val: '', name: '类型'},
                        {key: 'route', val: '', name: '路由'},
                        {key: 'sort', val: '', name: '排序'},
                        {key: 'pid', val: '', name: '父节点'}
                    );
                }
            });
        }
        $scope.refresh = function () {
            $scope.getapi();
        }
        $scope.getapi();
        $scope.swap = function (source_id, target_id) {
            $rootScope.loading = true;
            widget.ajaxRequest({
                method: 'PUT',
                url: $scope.swap_url + '/' + source_id + '/' + target_id,
                scope: $scope,
                data: {},
                success: function (json) {
                    $scope.getapi();
                }
            });
        }
    };
});
