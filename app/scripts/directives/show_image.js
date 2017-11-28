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
                    width: '@',
                    rotate: '=',
                    noShow: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'show_image.html'),
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    // console.log($scope.url.substring($scope.url.length-4,$scope.url.length));
                    $scope.widthPx = ($scope.width && $scope.width.indexOf('%') > -1) ? ($scope.width) : ($scope.width || 200) + 'px';
                    // $scope.type = supscope.url.substring(supscope.url.length - 4, supscope.url.length);
                    $scope.rotateObj = {};
                    //顺时针 度数
                    $scope.rotateImg = function (rotate) {
                        if (rotate != undefined && angular.isNumber(rotate)) {
                            $scope.rotateObj = {
                                "transform": "rotate(" + rotate + "deg)",
                                "max-height": $($element).width(),
                                "margin": "auto"
                            };
                        };
                    };
                    if ($scope.rotate) {
                        $scope.rotateImg(0);
                    }
                    $scope.show = function () {
                        if ($scope.noShow)return;
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
