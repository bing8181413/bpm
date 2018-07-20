define([
    '../directives/directives',
    '../cons/simpleCons'
], function (mod, cons) {

    mod
        .directive('formImageText', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    token: '@',
                    callback: '&',
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_danger">*</span>') : '&nbsp;&nbsp;';
                    var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                    var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                    $timeout(function () {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            // '<content_or_img ng-model="ngModel"' + name + required + disabledRole + '></content_or_img>' +
                            '<img-or-rich-text ng-model="ngModel"' + name + required + disabledRole + token + '></img-or-rich-text>' +
                            // '<content_or_img ng-model="' + $scope.ngModelText + '"' + name + required + disabledRole + '></content_or_img>' +
                            '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);

                }
            }
        })
        .directive('imgOrRichText', function ($state, $rootScope, $timeout, $templateCache, $compile) {
            return {
                restrict: 'E',
                replace: true,
                // require: '^?showTextarea',
                scope: {
                    ngModel: '=',
                    token: '@',
                },
                template: $templateCache.get('app/' + cons.DIRECTIVE_PATH + 'hjm_img_text.html'),
                link: function ($scope, $element, $attrs) {
                    var init = false;
                    $timeout(function () {
                        $scope.disabled = ($attrs.disabled ? true : false);
                        $scope.disabledRole = $attrs.disabledRole || '';
                        var token = $scope.token ? (' token="' + $scope.token + '"') : (' token="activity"');
                        // console.log($element, $attrs, $scope.disabled);
                        var conent_tmp = '<div class="form-group " ng-repeat="item in list">' +
                            '<div class="col-sm-12" ng-class="{contents:onlyContent!=1}">' +
                            '<div class="col-sm-12 form-group" style="margin-bottom: 5px;" ng-class="{\'hide\':' + $scope.disabled + '}">' +
                            '<div class="col-sm-12 form-group" style="margin-bottom: 0;">' +
                            '<a class="btn btn-info btn-rounded" ng-bind="($index+1)"></a>' +
                            '<a class="btn btn-success btn-rounded" ng-show="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showContent,\'btn-danger\':item.showContent}"' +
                            'ng-click="toggleShow(item,\'showContent\')">' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showContent,\'glyphicon-trash\':item.showContent}">' +
                            '</span> {{item.showContentTitle}}' +
                            '</a>' +
                            '<a class="btn btn-success btn-rounded" ng-show="onlyContent!=1"' +
                            'ng-class="{\'btn-success\':!item.showImg,\'btn-danger\':item.showImg}"' +
                            'ng-click = "toggleShow(item,\'showImg\')" > ' +
                            '<span class="glyphicon"' +
                            'ng-class="{\'glyphicon-plus\':!item.showImg,\'glyphicon-trash\':item.showImg}">' +
                            '</span> {{item.showImgTitle}}' +
                            '</a>' +
                            '<a class="btn btn-danger btn-rounded" ng-show="onlyContent!=1" ng-click="del($index);">' +
                            '<span class="glyphicon glyphicon-trash"></span> 删除这一条图文</a>' +
                            '<div class="col-sm-12" ng-show="!!item.showContent" style="margin-top: 5px;">' +
                            '<show-rich-content ng-model="item.content" placeholder="填写你要说的"' +
                            'disabled-role="' + $scope.disabledRole + '"></show-rich-content>' +
                            '</div>' +
                            '<div class="col-sm-12" ng-show="!!item.showImg" style="margin-top: 5px;">' +
                            // '<show-upload images="item.sources" hasimages="" disabled-role="' + $scope.disabledRole + '"></show-upload>' +
                            '<div form-radio name="{{\'pic_padding\'+$index}}" text="图片间距" ng-model="item.pic_padding" default="0"' +
                            ' style="border-top: 1px solid #ccc;" ' +
                            'source="[{text:\'无\',value:0},{text:\'有\',value:20}]" source-api=""></div>' +
                            '<hjm-upload-source sources="item.sources" ' + token + ' type="1" disabled-role="' + $scope.disabledRole + '"></hjm-upload-source>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                        $element.find('.img-or-text').html(conent_tmp);
                        $compile($element.contents())($scope);
                    }, 0);

                    $scope.$watch('ngModel', function (defval) {
                        if (defval && !init) {
                            init = true;
                            // console.log(defval);
                            $scope.list = $scope.list || [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {
                                    sources: val.sources || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: 'imagetext',
                                };
                                $scope.list.push(angular.extend(obj, {
                                    showContent: $(obj.content).text() != '',
                                    showImg: obj.sources.length > 0 ? true : false,
                                    showContentTitle: $(obj.content).text() != '' ? '取消文字' : '文字模式',
                                    showImgTitle: obj.sources.length > 0 ? '取消图片' : '图片模式'
                                }));
                                // console.log($scope.list);
                            });
                        }
                        if (init && !defval) {
                            init = false;
                            $scope.list = [];
                        }
                    }, true);

                    $scope.$watch('list', function (defval) {
                        if (init) {
                            $scope.ngModel = [];
                            angular.forEach(defval, function (val, key) {
                                var obj = {
                                    sources: val.sources || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: 'imagetext',

                                };
                                $scope.ngModel.push(obj);
                            });
                        }
                        // console.log(defval && defval[1] && defval[1].contentData);
                    }, true);

                    $scope.add = function (obj) {
                        init = true;
                        obj = obj || {};
                        $scope.list = $scope.list || [];
                        $scope.list.push(angular.extend({
                            // contentData: {},
                            sources: [],
                            category: 'imagetext',
                            pic_padding: 0,
                            content: '',
                            showContent: false,
                            showImg: false,
                            showContentTitle: '文字模式',
                            showImgTitle: '图片模式'
                        }, obj))
                    }
                    //删除一条 list.new 的记录
                    $scope.del = function (index) {
                        $scope.list.splice(index, 1);
                    }
                    // 切换新增和删除图文
                    $scope.toggleShow = function (item, typeTitle) {
                        // 这一组判断是只准图片和文字选其一 去掉可以选择多种
                        if (!item.showContent && item.showImg && typeTitle == 'showContent') {
                            if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                                return false;
                            }
                            item.showImg = false;
                            item.showImgTitle = '图片模式';
                            item.sources = [];
                        } else if (!item.showImg && item.showContent && typeTitle == 'showImg') {
                            if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                                return false;
                            }
                            item.showContent = false;
                            item.showContentTitle = '文字模式';
                            item.content = '';
                        }
                        if (typeTitle == 'showContent') {
                            item.showContent = !item.showContent;
                            item.showContentTitle = item.showContent ? '取消文字' : '文字模式';
                            item.content = '';
                            item.category = 'imagetext';
                            item.pic_padding = 0;
                        }
                        if (typeTitle == 'showImg') {
                            item.showImg = !item.showImg;
                            item.showImgTitle = item.showImg ? '取消图片' : '图片模式';
                            item.sources = [];
                        }
                    }
                    $scope.conslog = function (index) {
                        console.log($scope.list);
                    }

                }
            };
        })

})
