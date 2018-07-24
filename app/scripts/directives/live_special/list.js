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
                                    if (json.code === 0 && json.data && json.data.length === 1) {
                                        var data = json.data[0];
                                        var detail = {id: data.id, title: data.title};
                                        $scope.param.details.push(detail);
                                        $scope.id = '';
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

                                $scope.$watch('param.status', function(val, oldVal) {
                                    if (val != oldVal) {
                                        $scope.param.online_time = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                                    }
                                });
                                $scope.submit = function() {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/special/activity/details' + (resolve_data.id && ('/' + resolve_data.id) || ''),
                                        method: resolve_data.id ? 'PUT' : 'POST',
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
                    var required_span = $scope.required ? ('<span class="form_label_danger">*</span>') : '&nbsp;&nbsp;';

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
                template: $templateCache.get('app/' + con.live_path + 'special/specialDetailContentList.html'),
                link: function($scope, $element, $attrs) {

                    $scope.add = function() {
                        $scope.ngModel.push({
                            type: 1,
                            padding: 0,
                        });
                    };

                    //删除一条 list.new 的记录
                    $scope.del = function(index) {
                        $scope.ngModel.splice(index, 1);
                    };

                    // 切换新增和删除图文
                    $scope.toggleShow = function(item, typeTitle) {

                    };

                },
            };
        });
});
