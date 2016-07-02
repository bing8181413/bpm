define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  1 : community  排除小区 包括小区 全部小区

    mod
        //index
        // <help str="" split="分割符号"></help>
        .directive('help', function ($state, $rootScope, $templateCache, $modal, $filter) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {},
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'help.html'),
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'help_tmp.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            };
        })


})
;
