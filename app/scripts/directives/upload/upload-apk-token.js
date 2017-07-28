define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('showUploadApkToken', function ($state, $rootScope, $timeout, FileUploader, $templateCache, $parse, widget) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    apk: '=',
                    required: '@',
                    token: '@',
                },
                template: $templateCache.get('app/' + simpleCons.DIRECTIVE_PATH + 'upload/showApkUpload.html'),
                controller: function ($scope, $element, $attrs) {
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        // console.log($scope, $attrs.disabledRole);
                        // console.log($scope, $attrs, $scope.disabled);
                    }, 0);
                    $scope.uploader = new FileUploader({
                        // url: simpleCons.qiniu_domain + '/qiniu/controller.php?action=uploadimage'
                        url: 'https://up.qbox.me/'
                    });
                    var init = false;
                    $scope.$watch('apk', function (apkVal) {
                        $scope.max = $attrs.max || 100;
                        // console.log('apk1111', apkVal, init, $scope.uploader.queue);
                        if (apkVal && (apkVal.length > 0 ) && !init && $scope.uploader.queue.length == 0) {
                            init = true;
                            if ($scope.apk && $scope.apk.length > 0) {
                                angular.forEach($scope.apk, function (v, k) {
                                    $scope.uploader.queue.push({
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
                    $scope.removeApk = function (key) {
                        $scope.uploader.queue.splice(key, 1);
                        updateApk();
                    };
                    //选择文件之后
                    $scope.uploader.onAfterAddingFile = function (fileItem) {
                        // $scope.uploader.onBeforeUploadItem = function (fileItem) {
                        // console.log('onAfterAddingFile', fileItem);
                        // var fileItemTmpl = {name: fileItem._file.name, type: $scope.token};
                        var fileItemTmpl = {
                            name: fileItem._file.name,
                            // type: $scope.token,
                            type:'resource',
                            skey: 'uxThINf7Ns9Qy8tGQXm3'
                        };
                        widget.ajaxRequest({
                            url: '/supports/uptoken',
                            method: 'get',
                            scope: $scope,
                            data: fileItemTmpl,
                            success: function (json) {
                                // console.log(json);
                                // console.log(form, item.formData);
                                fileItem.formData.push({key: json.data.key, token: json.data.token});
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
                                fileItem.qiniu_url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                updateApk();
                                // return false;
                            } else if (!response.key || response.state == 'ERROR') {
                                // console.log(2, response);
                                fileItem.qiniu_url = '';
                                fileItem.isReady = false;
                                fileItem.isError = true;
                                fileItem.isUploaded = true;
                                fileItem.isSuccess = false;
                                // return false;
                                updateApk();
                            } else {
                                // console.log(3, response);
                                // fileItem.qiniu_url = 'http://ocamara.img.huijiame.com/' + response.key;
                                fileItem.qiniu_url = response.url;
                                // fileItem.name = fileItem.file && fileItem.file.name;
                                // fileItem.size = response.size;
                                //console.log('success', $scope.uploader);
                                updateApk();
                            }
                        }
                    };

                    // FILTERS
                    $scope.uploader.filters.push(
                        {
                            name: 'imageFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                // console.log(item);
                                var type = item.name.slice(item.name.lastIndexOf('.') + 1);
                                return '|apk|'.indexOf(type) !== -1;
                            }
                        },
                        {
                            name: 'customFilter',
                            fn: function (item /*{File|FileLikeObject}*/, options) {
                                var len = ($scope.apk && $scope.apk != 'undefined') ? $scope.apk.length : 0;
                                // console.log(this.queue.length < $scope.max - len);
                                return this.queue.length < $scope.max - len;
                            }
                        }
                    );

                    $scope.uploader.onAfterAddingAll = function (fileItems) {
                        $scope.apk = $scope.apk || [];
                        angular.forEach(fileItems, function (v, k) {
                            $scope.apk.push({name: v.file.name});
                        });
                        $timeout(function () {
                            updateApk();
                        }, 0);
                    };
                    $scope.log = function () {
                        updateApk();
                        widget.msgToast('确认排序成功')
                        console.log($scope.uploader.queue);
                    }
                    // 全部取消
                    $scope.removeAll = function () {
                        // $scope.uploader.clearQueue();
                        if (!confirm('确定全部移除吗?')) {
                            return false;
                        }
                        $scope.apk = [];
                        $scope.uploader.queue = [];
                    }
                    // $scope.uploader.clearAll = function () {
                    //     $scope.apk = [];
                    //     $scope.uploader.queue = [];
                    //     $scope.uploader.progress = 0;
                    // };


                    // 移除上传的数据
                    $scope.confirm_del_image_notice = true;
                    $scope.delApk = function (key, obj) {
                        // console.log(key, obj, $scope.uploader);
                        // if ($scope.confirm_del_image_notice) {
                        //     if (confirm('确定移除,且本次操作此字段不再有删除提示?')) {
                        //         $scope.confirm_del_image_notice = false;
                        //     } else {
                        //         $scope.confirm_del_image_notice = true;
                        //         return false;
                        //     }
                        // }
                        // removeApk
                        $scope.uploader.queue.splice(key, 1);
                        // if (obj.updated_at || obj.pic_id) {
                        //     $scope.uploader.queue.splice(key, 1);
                        // } else {
                        //     obj.remove();
                        // }
                        // console.log(obj);
                        updateApk();
                    };


                    function updateApk() {
                        // 重新填充 apk 对象
                        init = true;
                        $scope.apk = [];
                        angular.forEach($scope.uploader.queue, function (v, k) {
                            if (v.updated_at || v.old) {
                                $scope.apk.push({
                                    updated_at: v.updated_at || undefined,
                                    pic_url: v.url,
                                });
                            } else {
                                $scope.apk.push({
                                    pic_url: v.qiniu_url,
                                });
                            }
                        });
                    }

                }
            };
        })

})
;
