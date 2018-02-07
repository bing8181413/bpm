define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    mod
        .directive('delVideogroupUser', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '',
                link: function ($scope, $element, $attrs) {
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
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/mobile/live/videogroups/' + $scope.data.object_id + '/users/' + $scope.data.user.user_id,
                                method: 'delete',
                                scope: $scope,
                                data: {},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }
                    }
                    var content = '<a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('videogroupImportUser', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-primary" ng-click="show()" >导入用户</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '导入用户';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate >' +
                                        '<div form-textarea text="用户手机号码" ng-model="mobiles" ' +
                                        ' placeholder="用户手机号,用逗号隔开,或者没有逗号直接换行" required="true"></div>' +
                                        '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
                                    $scope.param = {mobiles: []};
                                    $scope.mobiles = '';
                                    $scope.submit = function () {
                                        $scope.param.mobiles = $scope.mobiles.replace(/\n/g, ',').split(',');
                                        widget.ajaxRequest({
                                            url: '/mobile/live/videogroups/' + (supscope.data.id || 0) + '/users',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                widget.msgToast('导入成功!');
                                            },
                                            failure: function (error) {
                                                if (JSON.stringify(error.validates).indexOf('has already been taken') > -1) {
                                                    widget.msgToast('数据验证失败,请检查手机号是否已经存在!');
                                                } else {
                                                    widget.msgToast(error.message);
                                                }
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
                }
            }
        })
        .directive('videogroupRoom', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.tmp_url = 'app/' + con.live_path + 'videogroups/room.html';
                    $timeout(function () {
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
                    $scope.$watch('ngModel', function (val) {
                        if (!val || val && val.length == 0) {
                            $scope.ngModel = [];
                        } else {
                            angular.forEach(val, function (v, k) {
                                v.order_by = (k + 1);
                            });
                        }
                    }, true);

                }
            }
        })
        .directive('videogroupQas', function ($rootScope, $state, $http, $filter, $templateCache, $compile, widget, $log, $timeout) {
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
                    ngDisabled: '='
                },
                link: function ($scope, $element, $attrs, $ctrl) {
                    $scope.tmp_url = 'app/' + con.live_path + 'videogroups/qa.html';
                    $timeout(function () {
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
                        // $scope.config = {add: false};
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
                    $scope.$watch('ngModel', function (val) {
                        if (!val || val && val.length == 0) {
                            $scope.ngModel = [];
                        } else {
                            angular.forEach(val, function (v, k) {
                                v.order_by = (k + 1);
                            });
                            // angular.forEach(val, function (v, k) {
                            //     v.order_by = (k + 1);
                            //     var start = new Date(v.start_time);
                            //     if (!v.start_time) {
                            //         v.start_time = new Date();
                            //         // console.log(0, v.start_time);
                            //     } else if ((v.pre_time_tmp && v.pre_time_tmp > 0 || v.pre_time_tmp == 0) && v.start_time) {
                            //         // console.log(1, v.pre_time_tmp);
                            //         start.setDate(start.getDate() - v.pre_time_tmp);
                            //         v.pre_time = $filter('date')(start, 'yyyy-MM-dd HH:mm:ss');
                            //     } else if (!v.pre_time_tmp && v.start_time && v.pre_time) {
                            //         v.pre_time_tmp =  Math.floor(Math.abs(Date.parse(start)-Date.parse(v.pre_time)) / (24 * 3600 * 1000));
                            //         // console.log(2, v.pre_time_tmp, start.getDate(), new Date(v.pre_time).getDate());
                            //     } else {
                            //         v.pre_time_tmp = 0;
                            //         v.start_time = $filter('date')(start, 'yyyy-MM-dd HH:mm:ss');
                            //         // console.log(3, v.pre_time);
                            //     }
                            // });
                        }
                    }, true);

                }
            }
        })
});
