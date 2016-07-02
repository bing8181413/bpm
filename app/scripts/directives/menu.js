define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
    //<menu></menu>
        .directive('menu', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {},
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'menu.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.tab_sm = false;
                    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                        // 为空 是刚打开的tab页面
                        if (!$state.current.name && Object.getOwnPropertyNames($state.params).length > 0) {
                            if ($rootScope.login_account.uname == 'cw') {
                                $rootScope.$state.go('refund');
                            } else {
                                $rootScope.$state.go('pintuan.list');
                            }
                        }
                    });
                    //监听路由跳转成功事件
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        $scope.rootState = $state.current.name;
                        $scope.rootState = $scope.rootState + (Object.getOwnPropertyNames($state.params).length == 0 ? '' : ("(" + JSON.stringify($state.params) + ")"));
                        $scope.rootState = $scope.rootState.replace(/\"/g, '');
                        $rootScope.hjm = $rootScope.hjm || '';
                        // 登陆成功后   初始化menu
                        if ($scope.menus !== $rootScope.hjm.menus) {
                            $scope.menus = ($rootScope.hjm || {}).menus;
                            angular.forEach($scope.menus, function (val, key) {
                                val.childs_route = [];
                                val.childs_route_array = [];
                                val.open = true;
                                angular.forEach(val.childs, function (v, k) {
                                    val.childs_route.push(v.route);
                                });
                                if (val.childs_route.indexOf($scope.rootState) > -1) {
                                    val.open = false;
                                }
                            });
                            console.log($scope.menus);
                        } else {
                            if (!$rootScope.hjm || Object.hasOwnProperty($rootScope.hjm).length < 1) {
                                if (toState.name != 'login') {
                                    $rootScope.tab_sm = true;
                                    $state.go('login');
                                    // event.preventDefault();
                                }
                            }
                        }
                    });
                    $scope.tab_sm_toggle = function () {
                        $rootScope.tab_sm = !$rootScope.tab_sm;
                        $scope.tab_sm = $rootScope.tab_sm;
                        angular.forEach($scope.menus, function (val, key) {
                            if (val.childs_route.indexOf($scope.rootState) > -1) {
                                val.open = false;
                            } else {
                                val.open = true;
                            }

                        });
                    }

                }
            };
        })


})
;
