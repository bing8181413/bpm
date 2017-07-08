define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('liveRoomAdd', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" style="margin-top: -5.5px;margin-left: 5px;" ' +
                'ui-sref="main.live_rooms.add" show-role="\'admin,op\'" >新建直播间</a>',
                link: function ($scope, $element, $attrs) {
                }
            }
        })
        .directive('liveRoomEdit', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="live-room-edit"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.live_rooms.update({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >编辑</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.live_rooms.update({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.find('.live-room-edit').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('liveRoomPlan', function ($rootScope, $templateCache, $filter, $compile, widget) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span class="live-room-edit"></span>',
                link: function ($scope, $element, $attrs) {
                    var content = '';
                    if ('admin,op'.indexOf($rootScope.hjm.role) > -1) {
                        content = '<a class="btn btn-success btn-rounded btn-sm"' +
                            'ui-sref="main.live_rooms.plan({id:' + $scope.data.id + '})" show-role="\'admin,op\'" >设置</a>';
                    } else {
                        content = '<a class="btn btn-info btn-rounded btn-sm"' +
                            'ui-sref="main.live_rooms.plan({id:' + $scope.data.id + '})" show-role="\'!admin,op\'" >详情</a>';
                    }
                    $element.html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('changeLiveRoomStatus', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<span class="change-live-room-status"></span>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '关闭';
                        status_text = 'ng-bind="\'关闭\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2,2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '开启';
                        status_text = 'ng-bind="\'开启\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1,' + $scope.data.status + ');"';
                        $scope.show_text = true;
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status, live_status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: con.live_domain + '/live/rooms/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {status: status, live_status: live_status},
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
        .directive('changeLiveRoomLiveStatus', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-live-room-live-status"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    var status_disabled = '';
                    if ($scope.data.live_status == 1) {
                        status_title = '关闭';
                        status_text = 'ng-bind="\'关闭\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.live_status == 2) {
                        status_title = '开启';
                        status_text = 'ng-bind="\'开启\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                        if ($scope.data.status == 2) {//  房间关闭 也不能开启直播流
                            status_disabled = 'ng-disabled="true"';
                        }
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + status_disabled + ' ng-show="show_text"></a>';
                    $element.html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: con.live_domain + '/live/rooms/' + $scope.data.id,
                                method: 'put',
                                scope: $scope,
                                data: {live_status: status},
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
