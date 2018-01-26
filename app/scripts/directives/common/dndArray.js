define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('dndArray', function ($state, $rootScope, $timeout, $templateCache, $compile, $timeout, widget) {
            return {
                restrict: 'E',
                replace: false,
                transclude: true,
                scope: false,
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'dnd/dnd-array.html'),
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.getContentUrl = function () {
                        return $scope.tmp_url || '';
                    }
                    $scope.$watch('ngModel', function (defval) {
                        if (!(defval && angular.isArray(defval))) {
                            $scope.ngModel = [];
                        }
                    }, true);

                    $scope.add = function () {
                        $scope.ngModel.push({});
                    }
                    $scope.del = function (index) {
                        $scope.ngModel.splice(index, 1);
                    }
                }
            }
        })

})
;
