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
                                windowClass: 'xx-dialog',
                                controller: function ($scope, $uibModalInstance, $sce) {
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
                                                $scope.param.redo = 1;// 默认不重做   每次都不让重做  重做的话自己选择
                                                console.log($scope.param);
                                                if ($scope.param.questions[0]) {
                                                    angular.forEach($scope.param.questions[0].options, function (val, key) {
                                                        if (val.id == $scope.param.questions[0].result.option_id) {
                                                            if ($scope.param.questions[0].result.score > 0) {
                                                                val.selected = "√";
                                                            } else {
                                                                val.selected = "X";
                                                            }
                                                        } else {
                                                            val.selected = "";
                                                        }
                                                    });
                                                }
                                                //  左右显示样式
                                                if($scope.param.sources.length>0){
                                                    $scope.left_style = {
                                                        width: '60%'
                                                    };
                                                    $scope.right_style = {
                                                        width: '35%'
                                                    };
                                                }else{
                                                    $scope.left_style = {};
                                                    $scope.right_style = {
                                                        width: '80%'
                                                    };
                                                }
                                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                                    '<div class="pull-left" ng-style="left_style" ng-if="param.sources.length>0">' +
                                                    '<div class="form-group">' +
                                                    '<div class="col-sm-12" style="height: 50px;margin: 5px;">' +
                                                    '<div ng-repeat="audio in param.sources" ng-if="audio.type==3" style="width:50%;margin-bottom: 20px;" class="pull-left">' +
                                                    '<audio ng-src="{{sce(audio.url)}}" controls="controls">您的浏览器不支持 audio 标签。</audio>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '<div class="form-group">' +
                                                    '<div class="col-sm-12" style="height: 700px;overflow: auto;margin: 5px;padding: 5px;border: 1px #ccc solid;">' +
                                                    '<div ng-repeat="pic in param.sources" ng-if="pic.type==1" style="width:100%;margin-bottom: 20px;" class="pull-left">' +
                                                    '<show_image url="pic.url" width="100%" rotate="true"></show_image>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '</div>' +
                                                    '<div ng-style="right_style" ng-class="{\'pull-right\':param.sources.length>0}" >' +
                                                    '<div form-input text="任务名称" ng-model="param.mission.title" content-width="10" ng-disabled="true"></div>' +
                                                    '<div form-table text="选项" ng-model="param.questions[0].options" max="6" config="{readonly:true}" ' +
                                                    'ng-if="param.questions.length>0"' +
                                                    'columns="[{\'name\': \'ID\', \'field\': \'id\',hide:\'true\'},' +
                                                    '{\'name\': \'名称\', \'field\': \'name\',\'disabled\': \'true\'},' +
                                                    '{\'name\': \'该选项得分\', \'field\': \'score\',\'disabled\': \'true\'},' +
                                                    '{\'name\': \'选择结果\', \'field\': \'selected\',\'disabled\': \'true\'}]">' +
                                                    '</div>' +
                                                    '<div form-textarea text="学生提问" ng-model="param.ask" content-width="10" placeholder="学生提问" ng-disabled="true"></div>' +
                                                    '<hr class="form-group">' +
                                                    '<form-audio ng-model="param.teacher_sources" text="语音录制"></form-audio>' +
                                                    '<div form-textarea text="作业评价" ng-model="param.appraise" content-width="10" placeholder="作业评价"></div>' +
                                                    '<div form-radio text="是否重做" ng-model="param.redo" ' +
                                                    ' default="1" source="[{text:\'否\',value:1},{text:\'是\',value:2}]" source-api="" ng-disabled="hasappraise||param.questions.length>0"></div>' +
                                                    '<a class="btn btn-rounded pull-right" ' + class_text + ' ng-click="submit()">' + (!$scope.hasappraise ? '评价作业' : '再次评价作业') + '</a>' +
                                                    '</div>' +
                                                    '</form>';
                                            }
                                        })
                                    } else {
                                        widget.msgToast('还没有提交过作业!');
                                    }
                                    $scope.submit = function () {
                                        if ($scope.hasappraise) {
                                            $scope.param.redo = 1;
                                        }
                                        widget.ajaxRequest({
                                            url: '/planworks/' + supscope.work_id,
                                            method: 'put',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('评价成功,请刷新查看');
                                                supscope.$parent.$parent.updateList();
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
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' show-role="\'admin,op,teacher\'"></a>';
                    $element.find('.student-plan-works').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
