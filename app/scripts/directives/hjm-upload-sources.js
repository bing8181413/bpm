define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod

        .directive('hjmUploadSource', function ($state, $rootScope, $timeout, FileUploader, $templateCache, $parse, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    sources: '=',
                    required: '@',
                    token: '@',
                    type: '@',
                    hideBar: '=',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'upload/hjmUploadSources.html'),
                controller: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        // console.log($scope, $attrs.disabledRole);
                        // console.log($scope, $attrs, $scope.disabled);
                    }, 0);
                    $scope.upload_url = 'https://up.qbox.me/';
                    $scope.uploader = new FileUploader({
                        // url: simpleCons.qiniu_domain + '/qiniu/controller.php?action=uploadsource'
                        url: $scope.upload_url
                    });
                    var init = false;
                    $scope.$watch('sources', function (sourcesVal) {
                        // console.log(sourcesVal, $scope.uploader);
                        $scope.max = $attrs.max || 100;
                        // console.log('sources1111', sourcesVal, init, $scope.uploader.queue);
                        if (sourcesVal && (sourcesVal.length > 0 ) && !init && $scope.uploader.queue.length == 0) {
                            init = true;
                            if ($scope.sources && $scope.sources.length > 0) {
                                angular.forEach($scope.sources, function (v, k) {
                                    $scope.uploader.queue.push({
                                        id: v.id || undefined,
                                        name: v.name || '',
                                        url: (v.url == $scope.upload_url ) ? '' : v.url,
                                        width: v.width || 100,
                                        height: v.height || 100,
                                        size: v.size || 1,
                                        old: true,
                                        progress: 100,
                                        isUploaded: true,
                                        type: $scope.type || 1,
                                        duration: $scope.type != 1 ? v.duration : 0
                                    });
                                });
                            }
                        }
                    }, true);

                    // 删除历史数据
                    $scope.removeSource = function (key) {
                        $scope.uploader.queue.splice(key, 1);
                        updatesources();
                    };
                    //选择文件之后
                    $scope.uploader.onAfterAddingFile = function (fileItem) {
                        // $scope.uploader.onBeforeUploadItem = function (fileItem) {
                        // console.log('onAfterAddingFile', fileItem);
                        var fileItemTmpl = {name: fileItem._file.name, type: $scope.token};
                        widget.ajaxRequest({
                            url: '/supports/uptoken',
                            method: 'get',
                            scope: $scope,
                            data: fileItemTmpl,
                            success: function (json) {
                                // console.log(json);
                                // console.log(form, item.formData);
                                fileItem.formData.push({
                                    key: json.data.key,
                                    token: json.data.token,
                                    name: fileItem._file.name,
                                });
                            }
                        })
                    }
                    // 上传成功
                    $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                        // console.log(fileItem, response);
                        if (response) {
                            if (response.code == 1001) {
                                // console.log(1, response);
                                alert(response.msg);
                                fileItem.url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                updatesources();
                                // return false;
                            } else if (!response.url || response.state == 'ERROR') {
                                // console.log(2, response);
                                fileItem.url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                // return false;
                                updatesources();
                            } else {
                                // console.log(3, response);
                                fileItem.url = response.url;
                                fileItem.width = response.width;
                                fileItem.height = response.height;
                                fileItem.size = response.size;
                                fileItem.name = response.name;
                                fileItem.duration = response.duration >= 1 ? parseInt(response.duration) : 0;
                                //console.log(fileItem);

                                //console.log('success', $scope.uploader);
                                updatesources();
                            }
                        }
                    };

                    // FILTERS
                    $scope.uploader.filters.push({
                        name: 'sourceFilter',
                        fn: function (item /*{File|FileLikeObject}*/, options) {
                            var type = '|' + item.type.slice(item.type.lastIndexOf('/') + 1) + '|';
                            if ($scope.type == 1) {
                                return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
                            } else if ($scope.type == 2) {
                                return '|mp4|'.indexOf(type) !== -1;
                            } else if ($scope.type == 3) {
                                return '|mp3|'.indexOf(type) !== -1;
                            }

                        }
                    });

                    $scope.uploader.filters.push({
                        name: 'customFilter',
                        fn: function (item /*{File|FileLikeObject}*/, options) {
                            var len = ($scope.sources && $scope.sources != 'undefined') ? $scope.sources.length : 0;
                            return this.queue.length < $scope.max - len;
                        }
                    });

                    $scope.uploader.onAfterAddingAll = function (fileItems) {
                        $scope.sources = $scope.sources || [];
                        angular.forEach(fileItems, function (v, k) {
                            $scope.sources.push({});
                        });
                        $timeout(function () {
                            updatesources();
                        }, 0);
                    };

                    $scope.log = function () {
                        updatesources();
                        widget.msgToast('确认排序成功')
                        console.log($scope.uploader.queue);
                    }
                    // 全部取消
                    $scope.removeAll = function () {
                        // $scope.uploader.clearQueue();
                        if (!confirm('确定全部移除吗?')) {
                            return false;
                        }
                        $scope.sources = [];
                        $scope.uploader.queue = [];
                    }
                    // $scope.uploader.clearAll = function () {
                    //     $scope.sources = [];
                    //     $scope.uploader.queue = [];
                    //     $scope.uploader.progress = 0;
                    // };


                    // 移除上传的数据
                    $scope.confirm_del_source_notice = true;
                    $scope.delSource = function (key, obj) {
                        if ($scope.confirm_del_source_notice) {
                            if (confirm('确定移除,且本次操作此字段不再有删除提示?')) {
                                $scope.confirm_del_source_notice = false;
                            } else {
                                $scope.confirm_del_source_notice = true;
                                return false;
                            }
                        }
                        if (obj.updated_at || obj.pic_id || obj.old) {
                            $scope.uploader.queue.splice(key, 1);
                        } else {
                            obj.remove();
                        }
                        // console.log(obj);
                        updatesources();
                    };


                    function updatesources() {
                        // 重新填充 sources 对象
                        init = true;
                        $scope.default_sources = angular.copy($scope.sources);
                        $scope.sources = [];
                        angular.forEach($scope.uploader.queue, function (v, k) {
                            if (v.id || v.old) {
                                $scope.sources.push({
                                    id: v.id || undefined,
                                    url: (v.url == $scope.upload_url) ? '' : v.url,
                                    width: v.width,
                                    height: v.height,
                                    size: v.size,
                                    name: $scope.default_sources[k].name || v.name,
                                    type: $scope.type || 1,
                                    duration: ($scope.type != 1 ) ? v.duration : 0
                                });
                            } else {
                                $scope.sources.push({
                                    url: (v.url == $scope.upload_url) ? '' : v.url,
                                    width: v.width,
                                    height: v.height,
                                    size: v.size,
                                    name: $scope.default_sources[k].name || v.name,
                                    type: $scope.type || 1,
                                    duration: ($scope.type != 1) ? v.duration : 0
                                });
                            }
                        });
                        console.log($scope.sources);
                    }

                    $scope.getEle = function (eleKey) {
                        $scope.eleKey = eleKey;
                        // console.log($scope.eleKey,$scope.posIndex);
                        if (angular.isNumber($scope.eleKey) && angular.isNumber($scope.posIndex)) {
                            var a = $scope.eleKey < $scope.posIndex ? $scope.eleKey : ($scope.eleKey - 1);
                            var b = $scope.eleKey > $scope.posIndex ? $scope.posIndex : ($scope.posIndex - 1);
                            console.log($scope.eleKey + ' 插入到位置 ' + $scope.posIndex + '  ', a, b, $scope.uploader.queue);
                            var eleKeyObj = new Object($scope.uploader.queue[a]);//
                            var posIndexObj = new Object($scope.uploader.queue[b]);//
                            if ($scope.eleKey > $scope.posIndex) {
                                $scope.uploader.queue.splice(b, 0, eleKeyObj);
                                $scope.uploader.queue.splice(a + 1, 1);
                            } else if ($scope.eleKey < $scope.posIndex) {
                                $scope.uploader.queue.splice(b + 1, 0, eleKeyObj);
                                $scope.uploader.queue.splice(a, 1);
                            }
                            // console.log($scope.uploader.queue);
                        }
                        updatesources();

                    }
                    $scope.getPos = function (posIndex) {
                        $scope.posIndex = posIndex;
                    }
                }
            };
        })
});
