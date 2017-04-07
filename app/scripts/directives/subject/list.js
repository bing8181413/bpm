define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('subjectChangeStatus', function ($templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-status"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线运营专题\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线运营专题\'"';
                        class_text = 'ng-class={\"btn-primary\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/subjects/' + $scope.data.subject_id || 0,
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
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('subjectEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="subject-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.subject.update({subject_id:' + $scope.data.subject_id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.subject.update({subject_id:' + $scope.data.subject_id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.subject-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('subjectAdd', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" style="margin-top: -5.5px;" ' +
                'ui-sref="main.subject.add" show-role="\'admin,op\'" >新增运营专题</a>',
                link: function ($scope, $element, $attrs) {
                }
            }
        })
        .directive('subjectProduct', function ($templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ng-show="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = (($scope.data.products || {}).length || 0);// + '/' + (($scope.data.allorder || {}).count || 0);
                    $scope.ext = {subject_id: $scope.data.subject_id};
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="productList" config="config_by_subject" columns="columns_by_subject" ext-search="ext"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.ext = supscope.ext;
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
        .directive('delSubjectProducts', function ($templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="del-subject-products"></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.del = function (status) {
                        if (confirm('确认移除出此专题组吗?')) {
                            widget.ajaxRequest({
                                url: '/subjects/products/' + ($scope.data.subpro_id || 0),
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
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="del();"' +
                        'show-role="\'admin,op\'">移除</a>';
                    $element.find('.del-subject-products').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
