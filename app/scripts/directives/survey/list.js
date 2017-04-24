define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('surveyCategoryAdd', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" ng-click="show_survey_category_add()" >新增测评维度</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_survey_category_add = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增测评维度';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div form-input text="维度" ng-model="param.name"></div>' +
                                        '<div form-radio text="类型" ng-model="param.type" ng-disabled="true" default="2"' +
                                        ' source="[{text:\'系统保留\',value:\'1\'},{text:\'可编辑\',value:\'2\'}]" ></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.submit = function () {
                                        if (!$scope.param.name) {
                                            widget.msgToast('没有填写维度');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/surveys/categories',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('维度维护成功,请刷新查看');
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
                }
            }
        })
        .directive('surveyCategoryEdit', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm" ng-click="show_survey_category_edit()" >更新</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_survey_category_edit = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '更新测评维度';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div form-input text="ID" ng-model="param.id" ng-disabled="true"></div>' +
                                        '<div form-input text="维度" ng-model="param.name"></div>' +
                                        '<div form-radio text="类型" ng-model="param.type" ng-disabled="true" default="2"' +
                                        ' source="[{text:\'系统保留\',value:\'1\'},{text:\'可编辑\',value:\'2\'}]" ></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        // $scope.param = {id: supscope.data.id};
                                        $scope.param = supscope.data;
                                    }, 0);
                                    $scope.submit = function () {
                                        if (!$scope.param.name) {
                                            widget.msgToast('没有填写维度');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/surveys/categories/' + supscope.data.id,
                                            method: 'PUT',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('维度维护成功,请刷新查看');
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
                }
            }
        })
        .directive('surveyCategoryDel', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-danger btn-rounded btn-sm" ng-click="show_survey_category_del()" >删除</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_survey_category_del = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '删除测评维度';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div form-input text="ID" ng-model="param.id" ng-disabled="true"></div>' +
                                        '<div form-input text="维度" ng-model="param.name" ng-disabled="true"></div>' +
                                        '<div form-radio text="类型" ng-model="param.type" ng-disabled="true" default="2"' +
                                        ' source="[{text:\'系统保留\',value:\'1\'},{text:\'可编辑\',value:\'2\'}]" ></div>' +
                                        '<a class="btn btn-danger btn-rounded pull-right" ng-click="submit()">删除</a>' +
                                        '</form>';
                                    $timeout(function () {
                                        // $scope.param = {id: supscope.data.id};
                                        $scope.param = supscope.data;
                                    }, 0);
                                    $scope.submit = function () {
                                        if (!$scope.param.name) {
                                            widget.msgToast('没有填写维度');
                                            return false;
                                        }
                                        widget.ajaxRequest({
                                            url: '/surveys/categories/' + supscope.data.id,
                                            method: 'DELETE',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('删除维度成功,请刷新查看');
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
                }
            }
        })
        .directive('surveyQuestionCategory', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span ng-bind="name"></span>',
                link: function ($scope, $element, $attrs) {
                    angular.forEach($rootScope.survey_question_category_list, function (val) {
                        if (val.id == $scope.data.category_id) {
                            $scope.name = val.name
                        }
                    })
                    if (!$scope.name) {
                        $scope.name = '';
                    }
                }
            }
        })
        .directive('surveyQuestionEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="survey-question-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.survey_question.update({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.survey_question.update({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.survey-question-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('surveyQuestionDel', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="survey-question-del"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_title = '删除';
                    var status_text = 'ng-bind="\'删除\'"';
                    var class_text = 'ng-class={\"btn-danger\":true} ';
                    var click_text = 'ng-click="change(3);"';
                    if ($scope.data.status != 3) {
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认删除吗?')) {
                            widget.ajaxRequest({
                                url: '/surveys/questions/' + $scope.data.id || 0,
                                method: 'patch',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('删除成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' ng-show="show_text" show-role="\'admin,op\'"></a>';
                    $element.find('.survey-question-del').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('surveyQuestionChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="survey-question-change-status"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '暂停';
                        status_text = 'ng-bind="\'暂停\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2 || $scope.data.status == 3) {
                        status_title = '重启';
                        status_text = 'ng-bind="\'重启\'"';
                        class_text = 'ng-class={\"btn-primary\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/surveys/questions/' + $scope.data.id || 0,
                                method: 'patch',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text +
                        ' ng-show="show_text" show-role="\'admin,op\'"></a>';
                    $element.find('.survey-question-change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('surveyPlanEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="survey-plan-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.survey_plan.update({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.survey_plan.update({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.survey-plan-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
