define([
    './directives',
    '../cons/simpleCons',
    './hjmdirectives',
    './community',
    './show_image',
    './select_city',
    './select_boards',// 负责人管理中 选择板块
    './order_list',// 订单列表
    './pintuan_order_list',// 拼团的订单列表
    './show_str',// 分割逗号隔开的字符串展示
    './help',// 帮助
    './menu',// 菜单
    './common_form',// 公用表单更新,添加
    './common_list',// 公用表单列表
    './bindHtmlCompile',// 编译带绑定的 bindHtmlCompile
    './baidumap',// 百度地图绑定
], function (mod,
             simpleCons) {
    mod

    /** 文本编辑器
     * <show-textarea ng-model="data" placeholder="你需要在文本框里默认显示文字"></show-textarea>
     * data: ng-model绑定输出的数据格式输出如下：
     * {
    *    'size'   : '', 字体大小
    *    'align'  : '', 字体对齐
    *    'weight' : '', 字体粗细
    *    'style'  : '', 字体斜体
    *    'color'  : '', 字体颜色
    *    'content': ''  文本内容
    * }
     */
        .directive('showTextarea', function ($state,
                                             $rootScope) {
            return {
                restrict: 'E',
                replace: true,
                require: '?ngModel',
                scope: {},
                template: '<div class="panel panel-default">' +
                '    <div class="panel-heading">' +
                '        <select ng-options="opts.id as opts.val for opts in FontOpts.size" ng-change="selectOpts()" ng-model="Update.font_size" style="width:100px;margin-left:10px;">' +
                '            <option value="" disabled="false">大小</option>' +
                '        </select>' +
                '        <input type="color" ng-model="Update.font_color" ng-change="selectOpts()" style="width:70px;margin-left:10px;border-radius:5px;">' +
                '        <select ng-options="opts.id as opts.val for opts in FontOpts.align" ng-change="selectOpts()" ng-model="Update.font_align" style="width:70px;margin-left:10px;">' +
                '            <option value="" disabled="false">对齐</option>' +
                '        </select>' +
                '        <select ng-options="opts.id as opts.val for opts in FontOpts.bold" ng-change="selectOpts()" ng-model="Update.font_bold" style="width:70px;margin-left:10px;">' +
                '            <option value="" disabled="false">粗细</option>' +
                '        </select>' +
                '        <select ng-options="opts.id as opts.val for opts in FontOpts.ita" ng-change="selectOpts()" ng-model="Update.font_ita" style="width:70px;margin-left:10px;">' +
                '            <option value="" disabled="false">斜体</option>' +
                '        </select>' +
                '    </div>' +
                '    <div class="panel-body">' +
                '        <textarea class="form-control" rows="3" contentEditable=true style="height:auto;" ng-model="Update.content" ng-style="FontStyle" placeholder="{{Attrs.placeholder}}"></textarea>' +
                '    </div>' +
                '</div>',
                link: function ($scope, $element, $attrs, ngModel) {
                    if (!ngModel) return;

                    ngModel.$render = function () {
                        $scope.Update = angular.extend({}, ngModel.$viewValue || {
                                'font_size': '',
                                'font_align': '',
                                'font_bold': '',
                                'font_style': '',
                                'font_color': '',
                                'font_ita': '',
                                'content': ''
                            });
                        $scope.selectOpts();
                    };

                    // 设置基础输出
                    $scope.Attrs = {
                        placeholder: $attrs.placeholder || ''
                    };

                    // 界面配置
                    $scope.FontOpts = {
                        size: [
                            {id: 'large', val: 'large'},
                            {id: 'medium', val: 'medium'},
                            {id: 'small', val: 'small'}
                        ],
                        align: [
                            {id: '1', val: 'left'},
                            {id: '2', val: 'center'},
                            {id: '3', val: 'right'}
                        ],
                        bold: [
                            {id: '1', val: 'bolder'},
                            {id: '0', val: 'normal'}
                        ],
                        ita: [
                            {id: '1', val: 'italic'},
                            {id: '0', val: 'normal'}
                        ]
                    };
                    $scope.obj_id2val = function (obj, id) {
                        var rtn = '';
                        angular.forEach(obj, function (v, k) {
                            if (v.id == id) {
                                rtn = v.val;
                            }
                        });
                        return rtn;
                    }
                    // 数据change
                    $scope.selectOpts = function () {
                        $scope.FontStyle = {
                            'font-size': $scope.obj_id2val($scope.FontOpts.size, $scope.Update.font_size) || '',
                            'text-align': $scope.obj_id2val($scope.FontOpts.align, $scope.Update.font_align) || '',
                            'font-weight': $scope.obj_id2val($scope.FontOpts.bold, $scope.Update.font_bold) || '',
                            'font-style': $scope.obj_id2val($scope.FontOpts.ita, $scope.Update.font_ita) || '',
                            'color': $scope.Update.font_color || ''
                            //'text-align': $scope.Update.font_align || '',
                            //'font-weight': $scope.Update.font_bold || '',
                            //'font-style': $scope.Update.font_style || '',
                            //'color': $scope.Update.font_color || ''
                        };

                        ngModel.$setViewValue($scope.Update);
                    };
                }
            };
        })


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
        .directive('showUpload', function ($state,
                                           $rootScope,
                                           $timeout,
                                           FileUploader) {
            return {
                restrict: 'E',
                replace: true,
                scope: {
                    images: '=',
                    hasimages: '='
                },
                template: '<div>' +
                '<style type="text/css">' +
                '.upload-image{width:60px;height:60px;overflow:hidden;background:#eee;-webkit-border-radius:0;position:relative;}' +
                '.upload-image:before{content:"+";line-height:50px;cursor:pointer;color:#000;font-size:40px;text-align:center;position:absolute;left:0;top:0;width:100%;height:100%;background:#eee;}' +
                '</style>' +
                '<table class="table table-hover table-bordered table-condensed">' +
                '<thead>' +
                '   <tr>' +
                '       <th width="50%">图片名称</th>' +
                '       <th width="10%" ng-show="uploader.isHTML5">大小</th>' +
                '       <th width="20%" ng-show="uploader.isHTML5">上传进度</th>' +
                '       <th width="10%">状态</th>' +
                '       <th width="10%">操作</th>' +
                '   </tr>' +
                '</thead>' +
                '<tbody>' +
                '   <tr ng-repeat="item in oldImages track by $index">' +
                '       <td>' +
                '           <a class="img_a">' +
                '               <img class="img-responsive" ng-src="{{item.url}}"/>' +
                '           </a>' +
                '       </td>' +
                '       <td></td>' +
                '       <td></td>' +
                '       <td class="text-center"></td>' +
                '       <td>' +
                '           <button type="button" class="btn btn-danger btn-xs" ng-click="removeImage($index)">' +
                '               <span class="glyphicon glyphicon-trash"></span> 移除' +
                '           </button>' +
                '       </td>' +
                '   </tr>' +
                '   <tr ng-repeat="(k,v) in uploader.queue track by $index" class="ng-scope">' +
                '       <td>' +
                '           <strong class="ng-binding" ng-bind="v.file.name"></strong>' +
                '           <div ng-show="uploader.isHTML5" ng-thumb="{ file: v._file, height: 100 , itemobj : v}"></div>' +
                '       </td>' +
                '       <td ng-show="uploader.isHTML5" nowrap="" class="ng-binding">{{v.file.size/1024/1024|number:2}}MB</td>' +
                '       <td ng-show="uploader.isHTML5">' +
                '           <div class="progress" style="margin-bottom: 0;">' +
                '               <div class="progress-bar" role="progressbar" style="width:{{v.progress}}%;" style="width: 0%;"></div>' +
                '           </div>' +
                '       </td>' +
                '       <td class="text-center">' +
                '           <span ng-show="v.isSuccess"><i class="glyphicon glyphicon-ok"></i></span>' +
                '           <span ng-show="v.isCancel"><i class="glyphicon glyphicon-ban-circle"></i></span>' +
                '           <span ng-show="v.isError"><i class="glyphicon glyphicon-remove"></i></span>' +
                '       </td>' +
                '       <td nowrap="">' +
                '           <button type="button" class="btn btn-success btn-xs" ng-click="v.upload()" ng-disabled="v.isReady || v.isUploading || v.isSuccess">' +
                '               <span class="glyphicon glyphicon-upload"></span> 上传' +
                '           </button>' +
                // '           <button type="button" class="btn btn-warning btn-xs" ng-click="v.cancel()" ng-disabled="!v.isUploading" disabled="disabled">'+
                // '               <span class="glyphicon glyphicon-ban-circle"></span> 取消'+
                // '           </button>'+
                // '           <button type="button" class="btn btn-danger btn-xs" ng-click="v.remove()">'+
                // '               <span class="glyphicon glyphicon-trash"></span> 移除'+
                // '           </button>'+
                '           <button type="button" class="btn btn-danger btn-xs" ng-click="delImage(v)">' +
                '               <span class="glyphicon glyphicon-trash"></span> 移除' +
                '           </button>' +
                '       </td>' +
                '   </tr>' +
                '</tbody>' +
                '</table>' +
                '<div>' +
                '   <div>' +
                '       上传过程:' +
                '       <div class="progress" style="">' +
                '           <div class="progress-bar" role="progressbar" style="width:{{uploader.progress}}%"></div>' +
                '       </div>' +
                '   </div>' +
                '   <button type="button" class="btn btn-success btn-s" ng-click="uploader.uploadAll()" ng-disabled="!uploader.getNotUploadedItems().length">' +
                '       <span class="glyphicon glyphicon-upload"></span> 全部上传' +
                '   </button>' +
                // '   <button type="button" class="btn btn-warning btn-s" ng-click="uploader.cancelAll()" ng-disabled="!uploader.isUploading">'+
                // '       <span class="glyphicon glyphicon-ban-circle"></span> 全部取消'+
                // '   </button>'+
                '   <button type="button" class="btn btn-danger btn-s" ng-click="removeAll()" ng-disabled="!uploader.queue.length">' +
                '       <span class="glyphicon glyphicon-trash"></span> 全部移除' +
                '   </button>' +
                '</div>' +
                '<br/>' +
                '<div class="col-sm-12 form-group">' +
                '   <input class="form-control upload-image" type="file" nv-file-select uploader="uploader" multiple />' +
                '</div>' +
                '</div>',
                controller: function ($scope, $element, $attrs) {

                    $scope.uploader = new FileUploader({
                        url: simpleCons.qiniu_domain + '/qiniu/controller.php?action=uploadimage'
                    });

                    $scope.$watch('hasimages', function () {
                        if ($scope.hasimages) return;

                        $scope.max = $attrs.max || 9;
                        $scope.oldImages = [];
                        if ($scope.images && $scope.images.length > 0) {
                            angular.forEach($scope.images, function (v, k) {
                                $scope.oldImages.push({
                                    url: v.url,
                                    width: v.width,
                                    height: v.height
                                });
                            });
                        }

                        // 删除历史数据
                        $scope.removeImage = function (key) {
                            var item = $scope.oldImages[key].url,
                                num;

                            angular.forEach($scope.images, function (v, k) {
                                if (v.url == item) {
                                    num = k;
                                    return;
                                }
                            });
                            if (typeof num !== 'undefined') {
                                $scope.images.splice(num, 1);
                            }
                            $scope.oldImages.splice(key, 1);
                        };

                        // 上传成功
                        $scope.uploader.onSuccessItem = function (fileItem, response, status, headers) {
                            // console.log(fileItem, response);
                            if (response) {
                                if (response.code == 1001) {
                                    //console.log(1,response);
                                    alert(response.msg);
                                    fileItem.qiniu_url == '';
                                    fileItem.isReady = false;
                                    fileItem.isError = true;
                                    fileItem.isUploaded = true;
                                    fileItem.isSuccess = false;
                                    return false;
                                } else if (!response.url || response.error == 'ERROR') {
                                    //console.log(2,response);
                                    fileItem.qiniu_url == '';
                                    fileItem.isReady = false;
                                    fileItem.isError = true;
                                    fileItem.isUploaded = true;
                                    fileItem.isSuccess = false;
                                    return false;
                                } else {
                                    //console.log(3,response);
                                    fileItem.qiniu_url = response.url;
                                    fileItem.width = response.width;
                                    fileItem.height = response.height;
                                    //console.log(fileItem);

                                    //console.log('success', $scope.uploader);
                                    updateImages();
                                }
                            }
                        };
                    }, true);


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
                            var len = $scope.images ? $scope.images.length : 0;
                            return this.queue.length < $scope.max - len;
                        }
                    });


                    // 全部取消
                    $scope.removeAll = function () {
                        $scope.uploader.clearQueue();
                        $scope.images = [];
                        $scope.oldImages = [];
                    }
                    // $scope.uploader.clearAll = function () {
                    //     $scope.images = [];
                    //     $scope.oldImages = [];
                    //     $scope.uploader.queue = [];
                    //     $scope.uploader.progress = 0;
                    // };


                    // 移除上传的数据
                    $scope.delImage = function (obj) {
                        // $scope.uploader.queue.splice(key, 1);

                        // // if ($scope.uploader.queue.length =)
                        // var len = $scope.uploader.queue.length,
                        //     num = 0;
                        // angular.forEach($scope.uploader.queue, function (v, k) {
                        //     if (v.isUploaded) num++;
                        // });
                        // $scope.uploader.progress = (num/len)*100;
                        // console.log('len',len);
                        // console.log('num',num);
                        // console.log('progress',$scope.uploader.progress);
                        obj.remove();

                        updateImages();
                    };


                    function updateImages() {
                        $scope.images = [];
                        if ($scope.oldImages.length > 0) {
                            angular.forEach($scope.oldImages, function (v, k) {
                                $scope.images.push({
                                    url: v.url,
                                    width: v.width,
                                    height: v.height
                                });
                            });
                        }
                        //console.log($scope.uploader);
                        angular.forEach($scope.uploader.queue, function (v, k) {
                            $scope.images.push({
                                url: v.qiniu_url,
                                width: v.width,
                                height: v.height
                            });
                        });
                    }
                }
            };
        })

});
