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
                    // angular.forEach($scope.menus, function (val, key) {
                    //     val.childs_route = [];
                    //     angular.forEach(val.childs, function (v, k) {
                    //         // val.childs_route.push(v.route);
                    //         console.log(v.name);
                    //     });
                    // });
                    // $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                    //     $rootScope.current_state_name = $state.current.name;
                    // });
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
