define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    /** 图片上传组件模块
     * <show-upload images="data" hasImages="true/false" max="9"></show-upload>
     * 返回的格式就是$scope.uploader.queue里的所有字段
     * @attrs:
     *   images: 绑定的图片数组对象
     *   nax: 容许最大上传数目，默认为9
     *   hasImages: 这个是拿取老数据必须填的true/false;
     *
     * @reponse/@request:
     * images: [{
    *   url:
    *   width:
    *   height:
    * }]
     */
        .directive('showUpload', function ($state, $rootScope, $timeout, FileUploader, $templateCache, $parse, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    images: '=',
                    required: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'upload/showUpload.html'),
                controller: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        // console.log($scope, $attrs.disabledRole);
                        // console.log($scope, $attrs, $scope.disabled);
                    }, 0);
                    $scope.uploader = new FileUploader({
                        url: simpleCons.qiniu_domain + '/qiniu/controller.php?action=uploadimage'
                    });
                    var init = false;
                    $scope.$watch('images', function (imagesVal) {
                        $scope.max = $attrs.max || 100;
                        // console.log('images1111', imagesVal, init, $scope.uploader.queue);
                        if (imagesVal && (imagesVal.length > 0 ) && !init && $scope.uploader.queue.length == 0) {
                            init = true;
                            if ($scope.images && $scope.images.length > 0) {
                                angular.forEach($scope.images, function (v, k) {
                                    $scope.uploader.queue.push({
                                        pic_id: v.pic_id || undefined,
                                        url: v.pic_url || v.url || '',
                                        width: v.pic_width || v.width || 100,
                                        height: v.pic_height || v.height || 100,
                                        size: v.pic_size || v.size || 1,
                                        updated_at: v.updated_at || undefined,
                                        old: true,
                                        progress: 100,
                                        isUploaded: true,
                                    });
                                });
                            }
                        }
                    }, true);

                    // 删除历史数据
                    $scope.removeImage = function (key) {
                        $scope.uploader.queue.splice(key, 1);
                        updateImages();
                    };
                    // 上传成功
                    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                        // console.log(fileItem, response);
                        if (response) {
                            if (response.code == 1001) {
                                // console.log(1, response);
                                alert(response.msg);
                                fileItem.qiniu_url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                updateImages();
                                // return false;
                            } else if (!response.url || response.state == 'ERROR') {
                                // console.log(2, response);
                                fileItem.qiniu_url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                // return false;
                                updateImages();
                            } else {
                                // console.log(3, response);
                                fileItem.qiniu_url = response.url;
                                fileItem.width = response.width;
                                fileItem.height = response.height;
                                // fileItem.size = response.size;
                                //console.log(fileItem);

                                //console.log('success', $scope.uploader);
                                updateImages();
                            }
                        }
                    };

                    // FILTERS
                    $scope.uploader.filters.push({
                        name: 'imageFilter',
                        fn: function (item /*{File|FileLikeObject}*/, options) {
                            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                            return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                        }
                    });

                    $scope.uploader.filters.push({
                        name: 'customFilter',
                        fn: function (item /*{File|FileLikeObject}*/, options) {
                            var len = ($scope.images && $scope.images != 'undefined') ? $scope.images.length : 0;
                            return this.queue.length < $scope.max - len;
                        }
                    });

                    $scope.uploader.onAfterAddingAll = function (fileItems) {
                        angular.forEach(fileItems, function (v, k) {
                            $scope.images.push({});
                        });
                        $timeout(function () {
                            updateImages();
                        }, 0);
                    };
                    $scope.log = function () {
                        updateImages();
                        widget.msgToast('确认排序成功')
                        console.log($scope.uploader.queue);
                    }
                    // 全部取消
                    $scope.removeAll = function () {
                        // $scope.uploader.clearQueue();
                        if (!confirm('确定全部移除吗?')) {
                            return false;
                        }
                        $scope.images = [];
                        $scope.uploader.queue = [];
                    }
                    // $scope.uploader.clearAll = function () {
                    //     $scope.images = [];
                    //     $scope.uploader.queue = [];
                    //     $scope.uploader.progress = 0;
                    // };


                    // 移除上传的数据
                    $scope.delImage = function (key, obj) {
                        if (!confirm('确定移除?')) {
                            return false;
                        }
                        if (obj.updated_at) {
                            $scope.uploader.queue.splice(key, 1);
                        } else {
                            obj.remove();
                        }
                        // console.log(obj);
                        updateImages();
                    };


                    function updateImages() {
                        // 重新填充 images 对象
                        init = true;
                        $scope.images = [];
                        angular.forEach($scope.uploader.queue, function (v, k) {
                            // console.log(v.url);
                            if (v.updated_at) {
                                $scope.images.push({
                                    // pic_id: v.pic_id || undefined,
                                    // old: v.old || undefined,
                                    updated_at: v.updated_at || undefined,
                                    pic_url: v.url,
                                    pic_width: v.width,
                                    pic_height: v.height,
                                    // pic_size: v.size
                                });
                            } else {
                                $scope.images.push({
                                    pic_url: v.qiniu_url,
                                    pic_width: v.width,
                                    pic_height: v.height,
                                    // pic_size: v.size
                                });
                            }
                        });
                    }

                    $scope.getEle = function (eleKey) {
                        $scope.eleKey = eleKey;
                        // console.log($scope.eleKey,$scope.posIndex,$scope);
                        if (angular.isNumber($scope.eleKey) && angular.isNumber($scope.posIndex)) {
                            var a = $scope.eleKey < $scope.posIndex ? $scope.eleKey : ($scope.eleKey - 1);
                            var b = $scope.eleKey > $scope.posIndex ? $scope.posIndex : ($scope.posIndex - 1);
                            console.log($scope.eleKey + ' 插入到位置 ' + $scope.posIndex + '  ', a, b, $scope.uploader.queue);
                            var eleKeyObj = new Object($scope.uploader.queue[a]);
                            var posIndexObj = new Object($scope.uploader.queue[b]);
                            $scope.uploader.queue.splice(a, 1, posIndexObj);
                            $scope.uploader.queue.splice(b, 1, eleKeyObj);
                            // console.log($scope.uploader.queue);
                        }
                        updateImages();

                    }
                    $scope.getPos = function (posIndex) {
                        $scope.posIndex = posIndex;
                    }
                }
            };
        })
});
