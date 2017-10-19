// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('menusController', menusController);

    menusController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget'];
    function menusController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget) {
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
                    $rootScope.update_menus();//  获取最新的菜单
                    $scope.param = [];
                    if ($rootScope.common) {
                        $rootScope.common.menus_key_val = [];
                    }
                    var menus_options = '';
                    $scope.menus.map(function (val) {
                        menus_options += '<option value=' + val.id + ' >' + val.name + '</option>'
                        return val;
                    });
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
                        // {
                        //     name: '父节点ID',
                        //     fieldDirective: '<select class="form-control" ng-model="item.pid">' +
                        //     '<option value="">--  请选择  --</option>' + menus_options +
                        //     '</select>'
                        // }
                        {key: 'pid', val: '', name: '父节点ID'}
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
