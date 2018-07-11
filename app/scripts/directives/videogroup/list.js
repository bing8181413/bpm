define([
    '../../directives/directives',
    '../../cons/simpleCons',
], function(mod, con) {
    mod
        .directive('delVideogroupUser', function($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '移除';
                        status_text = 'ng-bind="\'移除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                    }
                    $scope.change = function(status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/mobile/live/videogroups/' + $scope.data.object_id + '/users/' + $scope.data.user.user_id,
                                method: 'delete',
                                scope: $scope,
                                data: {},
                                success: function(json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                },
                            });
                        }
                    };
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                },
            };
        })
        .directive('videogroupImportUser', function($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                    title: '@',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="show()" ng-bind="title"></a>',
                link: function($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function() {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function($scope, $uibModalInstance) {
                                    $scope.title = supScope.title;
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div class="row">' +
                                        '<a class="btn btn-link col-sm-2 btn-lg control-label" href="http://resource.bucket.ahaschool.com/5b39bbc338cd9Y1slhQDad0.xlsx">下载国家代号EXCEL</a>' +
                                        '<h5 class="text-danger col-sm-10">怎么导入国外号码？例如:北美国家代号码是 1 ,手机号码为 22222222 的用户,请录入 "+122222222"（注意包括"+"）。</h5>' +
                                        '</div>' +
                                        '<div form-textarea text="用户手机号码" ng-model="mobiles" ' +
                                        ' placeholder="用户手机号,用逗号隔开,或者没有逗号直接换行" required="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.param = {mobiles: []};
                                    $scope.mobiles = '';
                                    $scope.submit = function() {
                                        $scope.param.mobiles = $scope.mobiles.replace(/\n/g, ',').split(',');
                                        widget.ajaxRequest({
                                            url: '/mobile/live/videogroups/' + (supScope.data.id || 0) + '/users',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function(json) {
                                                widget.msgToast('导入成功!');
                                            },
                                            failure: function(error) {
                                                if (JSON.stringify(error.validates).indexOf('has already been taken') > -1) {
                                                    widget.msgToast('数据验证失败,请检查手机号是否已经存在!');
                                                } else {
                                                    widget.msgToast(error.message);
                                                }
                                            },
                                        });
                                    };
                                    $scope.cancel = function() {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg',
                            }
                        );
                    };
                },
            };
        })
        .directive('videogroupRoom', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                // transclude: true,
                template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '=',
                    max: '@',
                    callBack: '&',
                    ngDisabled: '=',
                },
                link: function($scope, $element, $attrs, $ctrl) {
                    $scope.tmp_url = 'app/' + con.live_path + 'videogroups/room.html';
                    $timeout(function() {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                        var required = $scope.required ? (' required') : '';
                        var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                        var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                        var content = '';
                        if (!$scope.text) {
                            content = '<div class="col-sm-12 ">';
                        } else {
                            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                                '<div class="col-sm-8">';
                        }
                        $scope.config = {add: false};
                        content += '<dnd-array ng-model="ngModel" ' + name + 'config= "config"' +
                            required + max + disabledRole + '><div tmp-url="tmp_url" >ahaschool</div></dnd-array>';
                        // console.log(content);
                        // content += '<input class="hide" ng-model="ngModel"' + name + required + '>' ;
                        content += '</div>';
                        // content += '===={{$parent.form["' + ($scope.name || $scope.ngModelText) + '"]}}===='
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        // console.log($scope.$parent.FormBody[$scope.ngModelText]);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                    $scope.$watch('ngModel', function(val) {
                        if (!val || val && val.length == 0) {
                            $scope.ngModel = [];
                        } else {
                            angular.forEach(val, function(v, k) {
                                v.order_by = (k + 1);
                            });
                        }
                    }, true);

                },
            };
        })
        .directive('videogroupQas', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                // transclude: true,
                template: $templateCache.get('app/' + con.DIRECTIVE_PATH + 'hjm/hjm-form-element.html'),
                scope: {
                    ngModel: '=ngModel',
                    ngModelText: '@ngModel',
                    text: '@',
                    name: '@',
                    required: '=',
                    max: '@',
                    callBack: '&',
                    ngDisabled: '=',
                },
                link: function($scope, $element, $attrs, $ctrl) {
                    $scope.tmp_url = 'app/' + con.live_path + 'videogroups/qa.html';
                    $timeout(function() {
                        var disabledRole = ($scope.$parent && $scope.$parent.disabledRole) ?
                            (' disabled-role="' + $scope.$parent.disabledRole + '"') : '';
                        var name = $scope.name ? (' name="' + $scope.name + '"') : (' name="' + $scope.ngModelText + '"');
                        var required = $scope.required ? (' required') : '';
                        var required_span = $scope.required ? ('<span class="form_label_dangus">*</span>') : '&nbsp;&nbsp;';
                        var max = $scope.max ? (' max="' + $scope.max + '"') : '';
                        var content = '';
                        if (!$scope.text) {
                            content = '<div class="col-sm-12 ">';
                        } else {
                            content = '<label class="col-sm-2 control-label">' + $scope.text + required_span + '</label>' +
                                '<div class="col-sm-8">';
                        }
                        content += '<dnd-array ng-model="ngModel" ' + name + 'config= "config"' +
                            required + max + disabledRole + '><div tmp-url="tmp_url" >ahaschool</div></dnd-array>';
                        content += '</div>';
                        $element.find('.form_element').html(content);
                        $compile($element.contents())($scope);
                        if ($scope.$parent.FormBody && $scope.$parent.FormBody[$scope.ngModelText]) {
                            $scope.$parent.FormBody[$scope.ngModelText].text = $scope.text || $scope.ngModelText;
                        }
                    }, 0);
                    $scope.$watch('ngModel', function(val) {
                        if (!val || val && val.length == 0) {
                            $scope.ngModel = [];
                        } else {
                            angular.forEach(val, function(v, k) {
                                v.order_by = (k + 1);
                            });
                        }
                    }, true);

                },
            };
        })
        .directive('videoTaskList', function($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    videoTaskList: '=',
                    taskId: '=',
                    handle: '=',
                    title: '@',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="show()" ng-bind="title">></a>',
                link: function($scope, $element, $attrs) {
                    $scope.data = $scope.videoTaskList;
                    var supScope1 = $scope;
                    $scope.show = function() {
                        var modalInstance = $uibModal.open({
                                template: $templateCache.get('app/' + con.live_path + 'videogroups/taskList.html'),
                                windowClass: 'xx-dialog',
                                controller: function($scope, $uibModalInstance) {
                                    $scope.param = {
                                        tasks: {
                                            video_group_id: supScope1.videoTaskList.video_group_id,
                                            room_id: supScope1.videoTaskList.room_id,
                                        },
                                    };
                                    $scope.title = supScope1.title || false;
                                    $scope.handle = supScope1.handle ? true : false;

                                    $scope.init = function(work_task_id) {
                                        // work_task_id  获取 $on  getTaskList 事件时 重写 taskId 的值
                                        supScope1.taskId = work_task_id || supScope1.taskId;

                                        widget.ajaxRequest({
                                            url: '/mobile/live/work/tasks/' + supScope1.taskId,
                                            method: 'GET',
                                            scope: $scope,
                                            data: {},
                                            success: function(json) {
                                                $scope.param = json.data;
                                                $scope.param.video_group_id = supScope1.videoTaskList.video_group_id;
                                                $scope.param.room_id = supScope1.videoTaskList.room_id;
                                            },
                                        });
                                    };
                                    if (supScope1.taskId) {
                                        $scope.init();
                                    }

                                    $scope.$on('getTaskList', function(event, data) {
                                        $scope.init(data.work_task_id || undefined);
                                        console.log(data.message);
                                        if (data.work_task_id) {
                                            supScope1.$parent.updateList();
                                        }
                                    });

                                    $scope.submit = function(status) {

                                        status ? ($scope.param.status = status) : ($scope.param.status = 0);

                                        if (!supScope1.taskId || !$scope.param.works || $scope.param.works && $scope.param.works.length == 0) {
                                            widget.msgToast('没有题目，无法提交');
                                            return false;
                                        }

                                        widget.ajaxRequest({
                                            url: '/mobile/live/work/tasks/' + supScope1.taskId,
                                            method: 'PUT',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function(json) {
                                                widget.msgToast('保存成功!');
                                                supScope1.taskId = json.data.id;
                                            },
                                        });
                                    };
                                    $scope.cancel = function() {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg',
                            }
                        );
                    };
                },
            };
        })
        .directive('videoTaskView', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: false,
                template: $templateCache.get('app/' + con.live_path + 'videogroups/task.html'),
                scope: {
                    param: '=',
                    handle: '=',//是否可以操作，删除
                },
                link: function($scope, $element) {

                    $scope.tasks = angular.copy($scope.param.tasks);

                    $scope.delCallback = function() {
                        // $scope.param.works && $scope.param.works.length >= 0 ? ($scope.param.works.splice(key, 1)) : ('');
                        $scope.$emit('getTaskList', {work_task_id: null, message: '删除了一个题目，初始化 getTaskList !'});
                    };

                },
            };
        })
        .directive('videoWork', function($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    videoWork: '=',
                    room: '@',
                    video: '@',
                    ext: '=',
                    handle: '@',
                    title: '@',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="show()" ng-bind="title"></a>',
                link: function($scope, $element) {

                    $scope.workID = $scope.videoWork;
                    $scope.tasks = {
                        room_id: $scope.room || $scope.ext.room_id,
                        video_group_id: $scope.video || $scope.ext.video_group_id,
                    };
                    var supScope2 = $scope;
                    $scope.show = function() {
                        var modalInstance = $uibModal.open({
                                template: $templateCache.get('app/' + con.live_path + 'videogroups/work.html'),
                                controller: function($scope, $uibModalInstance, videoGroupVerify) {
                                    $scope.param = {
                                        tasks: supScope2.tasks,
                                        answer: '',
                                    };

                                    $scope.title = supScope2.title || false;
                                    $scope.handle = supScope2.handle || false;

                                    $scope.init = function() {
                                        widget.ajaxRequest({
                                            url: '/mobile/live/works/' + supScope2.workID,
                                            method: 'GET',
                                            scope: $scope,
                                            data: {},
                                            success: function(json) {
                                                $scope.param = json.data;
                                                $scope.param.tasks = supScope2.tasks;
                                            },
                                        });
                                    };

                                    if ($scope.handle !== 'add') {
                                        // add
                                        $scope.init();
                                    }

                                    $scope.$watch('param', function(val) {
                                        if (val && val.options) {
                                            val.answer = val.options.reduce(function(previousValue, currentVal, currentIndex) {
                                                if (currentVal.answer == 1) {
                                                    return previousValue !== '' ? (previousValue + ',' + currentVal.option_no) : currentVal.option_no;
                                                }
                                                return previousValue;
                                            }, '');
                                        }
                                    }, true);

                                    $scope.submit = function() {
                                        var error = videoGroupVerify.workSubmit($scope.param);

                                        if (error.length > 0) {
                                            widget.msgToast(error[0]);
                                            return false;
                                        }

                                        widget.ajaxRequest({
                                            url: '/mobile/live/works' + ($scope.handle === 'add' ? ('') : ('/' + supScope2.workID)),
                                            method: ($scope.handle === 'add') ? 'POST' : 'PUT',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function(json) {
                                                widget.msgToast('作业提交成功!');
                                                if ($scope.handle === 'add') {
                                                    supScope2.$emit('getTaskList', {
                                                        work_task_id: json.data.work_tasks && json.data.work_tasks[0] && json.data.work_tasks[0].work_task_id || 0,
                                                    });
                                                } else {
                                                    supScope2.$emit('getTaskList', {message: '作业提交后$emit事件'});
                                                }
                                                $scope.cancel();
                                            },
                                        });
                                    };
                                    $scope.cancel = function() {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg',
                            }
                        );
                    };
                },
            };
        })
        // 题目的 题干
        .directive('videoWorkStems', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                replace: 'true',
                template: $templateCache.get('app/' + con.live_path + 'videogroups/workStems.html'),
                scope: {
                    ngModel: '=ngModel',
                    handle: '=',//是否可以操作，删除
                },
                link: function($scope, $element) {

                    $scope.dndAllowType = 'dnd' + Math.ceil(Math.random(10000) * 10000);
                    $scope.allowedType = [$scope.dndAllowType];

                    $scope.del = function(key) {
                        $scope.ngModel && $scope.ngModel.length >= 0 ? ($scope.ngModel.splice(key, 1)) : ('');
                    };

                    $scope.add = function() {
                        if (!$scope.ngModel) {
                            $scope.ngModel = [{category: 1}];
                        } else if ($scope.ngModel && $scope.ngModel.length < 3) {
                            $scope.ngModel.push({
                                category: 1,
                            });
                        } else if ($scope.ngModel && $scope.ngModel.length >= 3) {
                            widget.msgToast('题干只能添加3组内容！');
                        }
                    };
                    $scope.$watch('ngModel', function(val) {
                        if (val && val.length >= 0) {
                            angular.forEach(val, function(v, k) {
                                v.option_no = (k + 1) + '';
                                v.answer = v.answer || 2;
                            });

                        }
                    }, true);
                },
            };
        })
        // 题目的 选项
        .directive('videoWorkOptions', function($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
            return {
                restrict: 'EA',
                template: $templateCache.get('app/' + con.live_path + 'videogroups/workOptions.html'),
                scope: {
                    ngModel: '=ngModel',
                    handle: '=',//是否可以操作，删除
                    optionType: '=',
                },
                link: function($scope, $element) {

                    $scope.del = function(key) {
                        $scope.ngModel && $scope.ngModel.length >= 0 ? ($scope.ngModel.splice(key, 1)) : ('');
                    };

                    $scope.add = function() {
                        if (!$scope.ngModel) {
                            $scope.ngModel = [{category: 2}];
                        } else if ($scope.ngModel) {
                            $scope.ngModel.push({category: 2, body_type: $scope.optionType, answer: 2});
                        }
                    };
                    $scope.$watch('ngModel', function(val) {
                        if (val && val.length >= 0) {
                            angular.forEach(val, function(v, k) {
                                v.option_no = (k + 1) + '';
                                v.body_type = $scope.optionType;
                                v.answer = v.answer || 2;
                            });

                        }
                    }, true);
                },
            };
        });
});
