define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    //  1 : community  排除小区 包括小区 全部小区

    mod
        // <show_image url=""></show_image>
        .directive('showImage', function ($state, $rootScope, $templateCache, $modal) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    url: '='
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'show_image.html'),
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $modal.open({
                            templateUrl: 'show.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.url = supscope.url;
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            };
        })


})
;
