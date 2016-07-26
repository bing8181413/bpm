define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod
        .directive('navMessage', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {},
                // template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'nav-top/nav-message.html'),
                link: function ($scope, $element, $attrs) {

                }
            };
        })
        .directive('navAccount', function ($rootScope, $state, $http, $modal, $filter, widget, $templateCache) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {},
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'nav-top/nav-account.html'),
                link: function ($scope, $element, $attrs) {
                    $scope.logout = function () {
                        $http.defaults.headers.common.Authorization = '';
                        delete $rootScope.hjm;
                        delete $rootScope.selected;
                        delete $rootScope.login_account;
                        localStorage.clear();
                        // console.log('登出');
                        $rootScope.$state.go('login');
                    }
                    if ($rootScope.hjm) {
                        $scope.hjm = $rootScope.hjm || {};
                    } else {
                        $scope.logout();
                    }
                }
            };
        })


})
;
