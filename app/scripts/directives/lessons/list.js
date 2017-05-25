define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('missionOnline', function ($templateCache, $filter, $compile, widget, $uibModal, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p><a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ></a></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = '已上线 : ' + ($scope.data.stat_mission && $scope.data.stat_mission.mission_count || 0);
                    $scope.ext = {status: 1};
                    $scope.extApi = '/lessons/' + $scope.data.lesson_id + '/missions';
                    var supscope = $scope;
                    $scope.show = function () {
                        $state.go('main.lessons.order', {lesson_id: $scope.data.lesson_id, status: 1});
                    }
                }
            }
        })
        .directive('lessonsEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="lessons-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-primary btn-rounded btn-sm"' +
                            'ui-sref="main.lessons.update({lesson_id:' + $scope.data.lesson_id + '})" show-role="\'admin,op\'" >课程编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.lessons.update({lesson_id:' + $scope.data.lesson_id + '})" show-role="\'!admin,op\'" >课程详情</a>';
                    }
                    $element.find('.lessons-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('lessonsChangeStatus', function ($templateCache, $filter, $compile, widget, $uibModal, $timeout, $rootScope, $state) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="lessons-change-status"></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.mission_count = ($scope.data.stat_mission && $scope.data.stat_mission.mission_count || 0);
                    $scope.pubtime_at = $scope.data.pubtime_at;
                    $scope.lesson_id = $scope.data.lesson_id || '';
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 3) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        var supscope = $scope;
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = status_title;
                                    $scope.lesson_id = supscope.lesson_id;
                                    $scope.mission_count = supscope.mission_count;
                                    $scope.pubtime_at = supscope.pubtime_at;
                                    $scope.status = supscope.data.status;
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<h3 ng-bind="\'当前已上线课程数: \'+mission_count"></h3>' +
                                        '<h3 ng-bind="\'课程任务发布时间: \'+ (pubtime_at|null2empty:\'待定\')"></h3>' +
                                        '<h3 class="text-danger" ng-show="status == 3">上线前该课程需要有已上线的任务</h3>' +
                                        '<h3 class="text-danger" ng-show="status == 1">下线课程后,不可恢复,谨慎操作</h3>' +
                                        '<a class="btn btn-rounded pull-right" ' + class_text + ' ng-click="submit()">' + status_title + '</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if (!$scope.mission_count && status == 1) {
                                            widget.msgToast('没有任务,不能上线');
                                            return false;
                                        }
                                        if (!$scope.pubtime_at) {
                                            if (confirm('没有课程任务发布时间,是否跳转到课程编辑界面?')) {
                                                $scope.cancel();
                                                $state.go('main.lessons.update', {lesson_id: $scope.lesson_id});
                                                return false;
                                            } else {
                                                return false;
                                            }
                                        }
                                        widget.ajaxRequest({
                                            url: '/lessons/' + supscope.data.lesson_id,
                                            method: (status == 3) ? 'delete' : 'patch',
                                            scope: $scope,
                                            data: {status: status},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                $scope.$$prevSibling.$$childHead.$$nextSibling.$$nextSibling.$$nextSibling.$$childHead.$$childHead.searchAction()
                                                $scope.cancel();
                                            },
                                            failure: function (json) {
                                                widget.msgToast(json.message);
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: ''
                            }
                        );
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' ng-show="show_text" show-role="\'admin,op\'"></a>';
                    $element.find('.lessons-change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        // 添加某个课程的任务
        .directive('lessonsMissionAdd', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="lessons-mission-add"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '<a class="btn btn-primary btn-rounded btn-sm"' +
                        'ui-sref="main.mission.add({lesson_id:' + $scope.data.lesson_id + '})" show-role="\'admin,op\'" >新增任务</a>';
                    $element.find('.lessons-mission-add').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        //草稿任务排序
        .directive('lessonsMissionOrder', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="lessons-mission-order"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '<a class="btn btn-primary btn-rounded btn-sm"' +
                        'ui-sref="main.lessons.order({lesson_id:' + $scope.data.lesson_id + ',status:3})" show-role="\'admin,op\'" >草稿任务管理</a>';
                    $element.find('.lessons-mission-order').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        //知识点编辑
        .directive('knowledgeEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="knowledge-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '<a class="btn btn-success btn-rounded btn-sm"' +
                        'ui-sref="main.mission.knowledge({mission_id:' + $scope.data.mission_id + '})" show-role="\'admin,op\'"' +
                        ' ng-bind="data.stat_knowledge.knowledge_count||0" ></a>';
                    $element.find('.knowledge-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
