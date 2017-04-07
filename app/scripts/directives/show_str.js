define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  1 : community  排除小区 包括小区 全部小区

    mod
        // account/list
        // <show_str str="" split="分割符号" title=""></show_str>
        .directive('showStr', function ($state, $rootScope, $templateCache, $uibModal, $filter) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    str: '=',
                    split: '=',
                    title: '=',
                    size: '=',
                    btn_str: '=btnStr',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'show_str.html'),
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    if (!$scope.btn_str) {
                        if ($scope.split && !angular.isArray($scope.str)) {
                            $scope.btn_str = $scope.str.split($scope.split)[0] + '..';
                        } else {
                            $scope.btn_str = $scope.str + '..';
                        }
                    }
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'show_str_tmp.html',
                            controller: function ($scope, $uibModalInstance) {
                                if (supscope.str) {
                                    $scope.str = supscope.str.split(supscope.split);
                                } else {
                                    $scope.str = angular.isArray(supscope.str) ? supscope.str : [supscope.str];
                                }
                                $scope.title = supscope.title || '查看';
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: supscope.size || ''
                        });
                    }
                }
            };
        })


})
;
