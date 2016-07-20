define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('sideMenu', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                //require: '?ngModel',
                scope: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'side-left/side-menu.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.cons = cons;
                    // console.log($rootScope.hjm.menus);
                    $rootScope.current_state = $state.current.name;
                    $scope.menus = ($rootScope.hjm || {}).menus;
                    $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                        if ($rootScope.hjm && $rootScope.hjm.menus) {
                            angular.forEach($rootScope.hjm.menus, function (menuval, key) {
                                if (menuval.route == $state.current.name.split('main.')[1]) {
                                    $scope.mainmenu = 'main.' + menuval.route;
                                }
                            });
                        }
                    });
                }
            };
        })
        .directive('sideWidgets', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                // replace: true,
                //require: '?ngModel',
                scope: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'side-left/side-widgets.html'),
                link: function ($scope, $element, $attrs) {

                }
            };
        })

})
;
