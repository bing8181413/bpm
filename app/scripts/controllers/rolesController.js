// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('rolesController', rolesController);

    rolesController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    function rolesController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.init_url = simpleCons.domain + '/manage/account/roles/list';
        $scope.getapi = function () {
            $rootScope.loading = true;
            $http.post($scope.init_url, {})
                .success(function (json) {
                    if (json.code == 0) {
                        angular.forEach(json.data.list, function (val, key) {
                            val.menus_str = [];
                            angular.forEach(val.menus, function (v, k) {
                                val.menus_str.push(v.name);
                            });
                            // 为了快捷显示 菜单
                            val.menus_str = val.menus_str.join(',');
                        });
                        $scope.list = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = json.data.count;
                        $scope.currentPage = 1;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        widget.msgToast(json.msg);
                        $rootScope.loading = false;
                    }
                });
        }
        $scope.getapi();
        $scope.menu = function (id, menus) {
            var sup_scope = $scope;
            sup_scope.id = id;
            sup_scope.menus = menus;
            var modalInstance = $modal.open({
                templateUrl: 'roles_menu.html',
                controller: function ($scope, $modalInstance) {
                    $scope.tree_url = simpleCons.domain + '/manage/account/menus/tree';
                    $scope.init = function () {
                        $rootScope.loading = false;
                        $scope.menus = [];
                        $http.post($scope.tree_url, {})
                            .success(function (json) {
                                if (json.code == 0) {
                                    angular.forEach(json.data, function (val, key) {
                                        angular.forEach(sup_scope.menus, function (v, k) {
                                            if (val.id == v.menu_id) {
                                                val.checked = true;
                                            }
                                        });
                                        $scope.menus.push({id: val.id, name: val.name, checked: val.checked});
                                    });
                                    $rootScope.loading = false;
                                } else {
                                    widget.msgToast(json.msg);
                                    $rootScope.loading = false;
                                }
                            });
                    }
                    $scope.init();
                    $scope.toggle = function (menu) {
                        menu.checked = !menu.checked;
                    }
                    $scope.update_url = simpleCons.domain + '/manage/account/roles/update';
                    $scope.ok = function () {
                        $scope.post_data = {id: sup_scope.id, menu_ids: []};
                        angular.forEach($scope.menus, function (val, key) {
                            if (val.checked) {
                                $scope.post_data.menu_ids.push(val.id);
                            }
                        })
                        $http.post($scope.update_url, $scope.post_data)
                            .success(function (json) {
                                if (json.code == 0) {
                                    sup_scope.getapi();
                                    $scope.cancel();
                                    $rootScope.loading = false;
                                } else {
                                    widget.msgToast(json.msg);
                                    $rootScope.loading = false;
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }
    };
});
