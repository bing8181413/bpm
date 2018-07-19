define([
    '../../directives/directives',
    '../../cons/simpleCons',
], function(mod, con) {
    mod
    // 专题组 详情编辑
        .directive('liveSpecialActivitiesEdit', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="open()">编辑</a> ',
                link: function($scope, $element) {
                    var supScope = $scope;
                    $scope.open = function() {
                        var modalInstance = $uibModal.open({
                            template: $templateCache.get('app/' + con.live_path + 'special/activities.html'),
                            resolve: {
                                resolve_data: function() {
                                    return {
                                        id: supScope.data && supScope.data.id || '',
                                    };
                                },
                            },
                            controller: function($scope, $uibModalInstance, $filter, resolve_data) {
                                $scope.title = resolve_data.id ? '编辑' : '添加';
                                $scope.param = {};
                                $scope.init = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/special/activities/' + resolve_data.id,
                                        method: 'GET',
                                        scope: $scope,
                                        data: {},
                                        success: function(json) {
                                            $scope.param = json.data;
                                        },
                                    });
                                };

                                if (resolve_data.id) {
                                    $scope.init();
                                }

                                $scope.verify_activity_detail = function(id) {

                                    var ids = $filter('arraySub2Array')($scope.param.details, 'id');

                                    if (ids.indexOf(parseInt(id)) > -1) {
                                        widget.msgToast('专题 ID 已存在!');
                                        return false;
                                    }
                                    if (!id) {
                                        widget.msgToast('专题 ID 未填写!');
                                        return false;
                                    }
                                    return true;
                                };

                                $scope.add_activity_detail = function(json) {
                                    console.log(json);
                                    if (json.code === 0 && json.data && json.data.length === 1) {

                                        var data = json.data[0];
                                        var detail = {id: data.id, title: data.title};
                                        $scope.param.details.push(detail);

                                    } else {
                                        widget.msgToast('未查询到专题');
                                    }

                                };

                                $scope.submit = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/special/activities/' + resolve_data.id,
                                        method: 'PUT',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function(json) {
                                            widget.msgToast('提交成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        },
                                    });
                                };

                                $scope.cancel = function() {
                                    $uibModalInstance.dismiss('cancel');
                                };

                            },
                            size: 'lg',
                        });
                    };
                },
            };
        })
        // 专题 详情编辑
        .directive('liveSpecialActivityDetailEdit', function($templateCache, $rootScope, $compile, widget, $state, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm" ng-class="{\'btn-primary\':data,\'btn-success pull-right\':!data}" ng-click="open()" ng-bind="data?\'编辑\':\'添加\'"></a> ',
                link: function($scope, $element) {
                    var supScope = $scope;
                    $scope.open = function() {
                        var modalInstance = $uibModal.open({
                            template: $templateCache.get('app/' + con.live_path + 'special/activityDetail.html'),
                            resolve: {
                                resolve_data: function() {
                                    return {
                                        id: supScope.data && supScope.data.id || '',
                                    };
                                },
                            },
                            controller: function($scope, $uibModalInstance, $filter, resolve_data) {
                                $scope.title = resolve_data.id ? '编辑' : '添加';
                                $scope.param = {};
                                $scope.init = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/special/activity/details/' + resolve_data.id,
                                        method: 'GET',
                                        scope: $scope,
                                        data: {},
                                        success: function(json) {
                                            $scope.param = json.data;
                                        },
                                    });
                                };

                                if (resolve_data.id) {
                                    $scope.init();
                                }

                                $scope.submit = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/special/activities/' + resolve_data.id,
                                        method: 'PUT',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function(json) {
                                            widget.msgToast('提交成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        },
                                    });
                                };

                                $scope.cancel = function() {
                                    $uibModalInstance.dismiss('cancel');
                                };

                            },
                            size: 'lg',
                        });
                    };
                },
            };
        })
        //  专题的内容
        .directive('specialDetailContents', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: true,
                template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '@',
                    max: '@',
                    callback: '&',
                },
                link: function($scope, $element, $attrs) {

                    var init = false;
                    var required = $scope.required ? (' required') : '';
                    var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';

                    var initHtml = function() {
                        var content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                            '<div class="col-sm-8">' +
                            '<special-detail-content-list  ng-model="ngModel" name="name || ngModelText"></special-detail-content-list>' +
                            '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                    };

                    $scope.$watch('ngModel', function(defVal) {
                        if (!init && defVal) {
                            init = true;
                            initHtml();
                        }
                    });

                },
            };
        })
        // specialDetailContents 的内容
        .directive('specialDetailContentList', function($state, $rootScope, $timeout, $templateCache, $compile) {
            return {
                restrict: 'EA',
                replace: true,
                scope: {
                    ngModel: '=',
                },
                template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'special/specialDetailContentList.html'),
                link: function($scope, $element, $attrs) {

                    var init = false;

                    $scope.$watch('ngModel', function(defVal) {
                        if (defVal && !init) {
                            init = true;
                            // console.log(defVal);
                            $scope.list = $scope.list || [];
                            angular.forEach(defVal, function(val, key) {
                                var obj = {
                                    pics: val.pics || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: val.category,
                                };
                                $scope.list.push(angular.extend(obj, {
                                    showContent: $(obj.content).text() != '',
                                    showImg: obj.pics.length > 0 ? true : false,
                                    showContentTitle: $(obj.content).text() != '' ? '取消文字' : '文字模式',
                                    showImgTitle: obj.pics.length > 0 ? '取消图片' : '图片模式',
                                }));
                                // console.log($scope.list);
                            });
                        }

                    }, true);

                    $scope.$watch('list', function(defVal) {
                        if (init) {
                            $scope.ngModel = [];
                            angular.forEach(defVal, function(val, key) {
                                var obj = {
                                    pics: val.pics || [],
                                    pic_padding: val.pic_padding || 0,
                                    content_id: val.content_id,
                                    content: $(val.content).text() ? val.content : '',
                                    category: val.category,

                                };
                                $scope.ngModel.push(obj);
                            });
                        }
                        // console.log(defVal && defVal[1] && defVal[1].contentData);
                    }, true);

                    $scope.add = function(obj) {
                        init = true;
                        obj = obj || {};
                        $scope.list = $scope.list || [];
                        $scope.list.push(angular.extend({
                            // contentData: {},
                            pics: [],
                            pic_padding: 0,
                            content: '',
                            showContent: false,
                            showImg: false,
                            showContentTitle: '文字模式',
                            showImgTitle: '图片模式',
                        }, obj));
                    };
                    //删除一条 list.new 的记录
                    $scope.del = function(index) {
                        $scope.list.splice(index, 1);
                    };
                    // 切换新增和删除图文
                    $scope.toggleShow = function(item, typeTitle) {
                        // 这一组判断是只准图片和文字选其一 去掉可以选择多种
                        if (!item.showContent && item.showImg && typeTitle == 'showContent') {
                            if (!window.confirm('图片和文字只能选其一,确定切换吗')) {
                                return false;
                            }
                            item.showImg = false;
                            item.showImgTitle = '图片模式';
                            item.pics = [];
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
                            item.category = '';
                            item.pic_padding = 0;
                        }
                        if (typeTitle == 'showImg') {
                            item.showImg = !item.showImg;
                            item.showImgTitle = item.showImg ? '取消图片' : '图片模式';
                            item.pics = [];
                        }
                    };
                    $scope.conslog = function(index) {
                        console.log($scope.list);
                    };

                },
            };
        });
});
