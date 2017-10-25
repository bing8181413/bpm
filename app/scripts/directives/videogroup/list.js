define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
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
});
