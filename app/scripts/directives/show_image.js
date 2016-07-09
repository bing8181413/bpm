define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // <show_image url="item.pic_url" width="100"></show_image>
        .directive('showImage', function ($state, $rootScope, $templateCache, $modal) {
            return {
                restrict: 'E',
                replace: true,
                //require: '?ngModel',
                scope: {
                    url: '=',
                    width: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'show_image.html'),
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.widthPx = $scope.width + 'px';
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
