define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // <show_image url="item.pic_url" width="100"></show_image>
        .directive('showImage', function ($state, $rootScope, $templateCache, $uibModal) {
            return {
                restrict: 'AE',
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
                    $scope.imgObj = {};
                    $scope.rotateGroupBtn = [];
                    //顺时针 度数
                    var oImg = new Image();
                    $scope.rotateImg = function (rotate, rotateGroupBtnIndex) {
                        if (rotateGroupBtnIndex != undefined) {
                            $scope.rotateGroupBtn = [0, 0, 0, 0];
                            $scope.rotateGroupBtn[rotateGroupBtnIndex] = 1;
                        }
                        if (!oImg.src) {
                            // $scope.url = 'http://resource.huijiame.com/media_f1f266a2fb57bbad95ea8ec6e70e4af4';
                            // $scope.url = 'http://resource.huijiame.com/media_24cd2941b85007d0b54fc1e0cf05f113';
                            oImg.src = $scope.url;
                            oImg.onload = function () {
                                $scope.imgObj.clientWidth = $($element).find('.imgObjClass').width();
                                $scope.imgObj.clientHeight = $($element).find('.imgObjClass').height();
                                console.log('imgObj : ',$scope.imgObj.clientWidth,$scope.imgObj.clientHeight);
                            }
                        } else {
                        }

                        // $($element).find('img')[0].width(), $($element).find('img')[0].height()
                        // console.log($($element));
                        if (rotate != undefined && angular.isNumber(rotate)) {
                            // console.log($($element).height());
                            $scope.rotateObj = {
                                "margin": "0 auto",
                                "transform": "rotate(" + rotate + "deg)",
                                "max-height": (rotate % 180 != 0) ? (($scope.imgObj.clientHeight < $scope.imgObj.clientWidth) ? $scope.imgObj.clientWidth : $scope.imgObj.clientWidth) : '1',
                                "min-height": (rotate % 180 != 0) ? (($scope.imgObj.clientHeight < $scope.imgObj.clientWidth) ? $scope.imgObj.clientWidth : $scope.imgObj.clientWidth) : '1',
                                "max-width": (rotate % 180 != 0) ? (($scope.imgObj.clientHeight < $scope.imgObj.clientWidth) ? $scope.imgObj.clientWidth : $scope.imgObj.clientWidth) : '1'
                            }
                        }
                    }
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
