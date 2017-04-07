define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // <show_image url="item.pic_url" width="100"></show_image>
        .directive('showImage', function ($state, $rootScope, $templateCache, $uibModal) {
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
                    // console.log($scope.url.substring($scope.url.length-4,$scope.url.length));
                    $scope.widthPx = $scope.width + 'px';
                    // $scope.type = supscope.url.substring(supscope.url.length - 4, supscope.url.length);
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            templateUrl: 'show.html',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.url = supscope.url;
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
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
