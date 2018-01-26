define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {

    mod

        .directive('dndArray', function ($state, $rootScope, $timeout, $templateCache, $compile, $timeout, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    ngModel: '=',
                    max: '@',
                    config: '=?',
                    callback: '&',
                },
                controller: ['$scope', function ($scope) {
                }],
                template: '',
                link: function ($scope, $element, $attrs, $ctrl) {
                    var tmpHtml = '';
                    $timeout(function () {
                    }, 0);

                    $scope.$watch('ngModel', function (defval) {
                        if (!(defval && angular.isArray(defval))) {
                            $scope.ngModel = [];
                        }
                    }, true);

                    $scope.add = function (obj) {
                        if ($scope.ngModel && $scope.max && $scope.ngModel.length >= $scope.max) {
                            widget.msgToast('已超过最大行数 ' + $scope.max + ' !');
                            return false;
                        }
                        $scope.ngModel.push(obj);
                    }
                    $scope.del = function (index) {
                        $scope.ngModel.splice(index, 1);
                    }
                    $scope.conslog = function () {
                        console.log($scope.ngModel);
                    }

                }
            }
        })

})
;
