define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('studentLessons', function ($templateCache, $filter, $compile, widget, $uibModal, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = ($scope.data.stat_lesson && $scope.data.stat_lesson.lesson_count || 0);
                    // $scope.ext = {};
                    $scope.extApi = '/students/' + $scope.data.user_id + '/lessons';
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="studentList" config="config_by_lesson" columns="columns_by_lesson" ext-search="ext" ext-api="extApi"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                // $scope.ext = supscope.ext;
                                $scope.extApi = supscope.extApi;
                                // console.log(1, $scope.extApi, $scope.ext);
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('studentPlans', function ($templateCache, $filter, $compile, widget, $uibModal, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = ($scope.data.stat_plan && $scope.data.stat_plan.plan_count || 0);
                    $scope.ext = {user_id: $scope.data.user_id};
                    $scope.extApi = '/students/' + $scope.data.user_id + '/plans';
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="studentList" config="config_by_plan" columns="columns_by_plan" ext-search="ext" ext-api="extApi"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ext = supscope.ext;
                                $scope.extApi = supscope.extApi;
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
        .directive('studentLessonsChangeStatus', function ($templateCache, $filter, $compile, widget, $uibModal, $timeout, $rootScope) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="student-lessons-change-status"></p>',
                link: function ($scope, $element, $attrs) {
                    // 1 未开始 2 进行中 3 结束
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '取消课程';
                        status_text = 'ng-bind="\'取消课程\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '恢复课程';
                        status_text = 'ng-bind="\'恢复课程\'"';
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
                                    $scope.status = supscope.data.status;
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        // '<h3 ng-bind="\'当前已上线课程数: \'+mission_count"></h3>' +
                                        // '<h3 class="text-danger" ng-show="status == 3">上线前该课程需要有已上线的任务</h3>' +
                                        // '<h3 class="text-danger" ng-show="status == 1">下线课程后,不可恢复,谨慎操作</h3>' +
                                        '<a class="btn btn-rounded pull-right" ' + class_text + ' ng-click="submit()">' + status_title + '</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        widget.ajaxRequest({
                                            url: '/students/' + supscope.data.user_id + '/lessons/' + supscope.data.id,
                                            method: 'patch',
                                            scope: $scope,
                                            data: {status: status},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction()
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
                                size: 'sm'
                            }
                        );
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' ng-show="show_text" show-role="\'admin,op\'"></a>';
                    $element.find('.student-lessons-change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('studentPlanWorks', function ($templateCache, $filter, $compile, widget, $uibModal, $timeout, $rootScope) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="student-plan-works"></p>',
                link: function ($scope, $element, $attrs) {
                    // 1 未开始 2 进行中 3 结束
                    var supscope = $scope;
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    // 有2个地方要用 这个 directive 要特殊处理
                    $scope.work_id = $scope.data.work_id ? $scope.data.work_id : (supscope.data.works[0] && supscope.data.works[0].work_id || 0);
                    if (!$scope.work_id) {
                        return false;
                    }
                    $scope.hasappraise = null;
                    if (($scope.data.appraise_at)
                        || ($scope.data.works && $scope.data.works[0] && $scope.data.works[0].appraise_at)) {
                        status_title = '作业详情';
                        status_text = 'ng-bind="\'作业详情\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="openworks(1);"';
                        $scope.hasappraise = true;
                    } else {
                        status_title = '评价作业';
                        status_text = 'ng-bind="\'评价作业\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="openworks(2);"';
                        $scope.hasappraise = false;
                    }
                    $scope.openworks = function (status) {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance,$sce) {
                                    $scope.title = status_title;
                                    $scope.hasappraise = supscope.hasappraise;
                                    // if (supscope.data.works[0] && supscope.data.works[0].work_id) {
                                    $scope.sce = $sce.trustAsResourceUrl;
                                    if (supscope.work_id) {
                                        widget.ajaxRequest({
                                            url: '/planworks/' + supscope.work_id,
                                            method: 'get',
                                            scope: $scope,
                                            data: {},
                                            success: function (json) {
                                                $scope.param = json.data;
                                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                                    '<div class="form-group">' +
                                                    '<div ng-repeat="pic in param.sources" class="col-sm-3 " ng-if="pic.type==1">' +
                                                    '<img ng-src="{{pic.url}}" class="img-responsive"/></div>' +
                                                    '</div>' +
                                                    '<div class="form-group">' +
                                                    '<div ng-repeat="audio in param.sources" class="col-sm-3" ng-if="audio.type==3">' +
                                                    '<audio ng-src="{{sce(audio.url)}}" controls="controls">您的浏览器不支持 audio 标签。</audio>' +
                                                    '</div>' +
                                                    '<hr class="form-group">' +
                                                    '<div form-textarea text="学生提问" ng-model="param.ask" placeholder="学生提问" ng-disabled="true"></div>' +
                                                    '<div form-textarea text="作业评价" ng-model="param.appraise" placeholder="作业评价" ng-disabled="hasappraise"></div>' +
                                                    '<div form-radio text="是否需要重做" ng-model="param.redo" required="true" ' +
                                                    ' default="1" source="[{text:\'否\',value:1},{text:\'是\',value:2}]" source-api="" ng-disabled="hasappraise"></div>' +
                                                    '<a class="btn btn-rounded pull-right" ' + class_text + ' ng-click="submit()" ng-show="!hasappraise">' + status_title + '</a>' +
                                                    '</form>';
                                            }
                                        })
                                    } else {
                                        widget.msgToast('还没有提交过作业!');
                                    }
                                    $scope.submit = function () {
                                        widget.ajaxRequest({
                                            url: '/planworks/' + supscope.work_id,
                                            method: 'put',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('评价成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
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
                                size: 'lg'
                            }
                        );
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.find('.student-plan-works').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
