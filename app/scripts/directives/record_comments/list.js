define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    mod
        .directive('changeRecordCommentOntop', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span></span>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';

                    if ($scope.data.on_top == 1) {
                        status_title = '取消';
                        status_text = 'ng-bind="\'取消\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                    } else if ($scope.data.on_top == 2) {
                        status_title = '置顶';
                        status_text = 'ng-bind="\'置顶\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + '"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (on_top) {
                        // if (confirm('确认修改为' + status_title + '状态?')) {
                        widget.ajaxRequest({
                            url: con.live_domain + '/live/comments/' + $scope.data.id,
                            method: 'put',
                            scope: $scope,
                            data: {on_top: on_top},
                            success: function (json) {
                                widget.msgToast('修改成功,请刷新查看');
                                $scope.$parent.$parent.searchAction();
                            }
                        })
                        // }

                    }
                }
            }
        })
        .directive('delRecordComment', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span></span>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';

                    if ($scope.data.status == 1) {
                        status_title = '删除';
                        status_text = 'ng-bind="\'删除\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '还原';
                        status_text = 'ng-bind="\'还原\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = false;
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: con.live_domain + '/live/comments/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status},
                                success: function (json) {
                                    widget.msgToast('修改成功,请刷新查看');
                                    $scope.$parent.$parent.searchAction();
                                }
                            })
                        }

                    }
                }
            }
        })
})
;
