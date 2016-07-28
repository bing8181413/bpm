define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('changeRole', function ($templateCache, $compile, widget, $state, $modal, $rootScope, $timeout) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                controller: ['$scope', function ($scope) {
                    this.getMenus = function (callback) {
                        $scope.source = '';
                        widget.ajaxRequest({
                            url: '/accounts/menus/tree',
                            method: 'GET',
                            scope: $scope,
                            data: {},
                            success: function (json) {
                                $scope.menus = json.data;
                                $scope.source = '[';
                                angular.forEach($scope.menus, function (val, key) {
                                    $scope.source += '{text:\'' + val.name + '\',value:' + val.id + '},';
                                });
                                $scope.source += ']';
                                if (angular.isFunction(callback)) {
                                    callback($scope.source);
                                }
                            }
                        })
                    }
                }],
                template: '<a class="btn btn-success btn-rounded btn-sm" ng-click="show_change_role();">菜单</a>',
                link: function ($scope, $element, $attrs, $ctrl) {
                    var supscope = $scope;
                    $scope.show_change_role = function () {
                        $ctrl.getMenus(callback);
                        function callback(source) {
                            var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl" callback="callback"></div>',
                                controller: function ($scope, $modalInstance, $timeout) {
                                    $scope.menu = supscope.data.menus;
                                    $scope.title = '修改角色权限';
                                    $timeout(function () {
                                        $scope.callback();
                                    }, 0);
                                    $scope.callback = function () {
                                        angular.forEach($scope.menu, function (val, key) {
                                            $scope.menuIds.push(val.menu_id + '');
                                        });
                                    }
                                    $scope.tmpl = '<style type="text/css">.checkbox-inline{margin-left: 10px;}</style>' +
                                        '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-checkbox text="角色菜单" ng-model="menuIds" ' + ' source="' + source + '"> </div> ' +
                                        '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_role()">确定</a>' +
                                        '</form>';
                                    $scope.change_role = function () {
                                        widget.ajaxRequest({
                                            url: '/accounts/roles/' + supscope.data.id,
                                            method: 'PUT',
                                            scope: $scope,
                                            data: {menu_ids: $scope.menuIds},
                                            success: function (json) {
                                                widget.msgToast('修改成功,请刷新查看');
                                                supscope.$parent.$parent.searchAction();
                                                $scope.cancel();
                                            }
                                        })
                                    }
                                    $scope.cancel = function () {
                                        $modalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg'
                            });
                        }
                    }
                }
            }
        })
        .directive('showMenu', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="show_menu"></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.menu = $filter('arraySub2String')($scope.data, 'name');
                    var content = '<span ng-bind="menu | characters :20" tooltip="' + $scope.menu + '" tooltip-placement="bottom"></span>';
                    $element.find(".show_menu").html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
        .directive('updateAccount', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p ><a class="btn btn-primary btn-rounded btn-sm" ng-click="updateAccount();" >编辑</a></p> ',
                link: function ($scope, $element, $attrs) {
                    $scope.updateAccount = function () {
                        if ($rootScope) {
                            $rootScope.account_obj = $scope.data;
                            $state.go('main.account.update', {account_id: $scope.data.account_id});
                        } else {
                            widget.msgToast('登录过期,请重新登录');
                        }

                    }
                }
            }
        })
        .directive('changeAccountStatus', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-account-status"></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var class_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '禁用';
                        status_text = 'ng-bind="\'禁用\'"';
                        class_text = 'ng-class={\"btn-warning\":true} ';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '启用';
                        status_text = 'ng-bind="\'启用\'"';
                        class_text = 'ng-class={\"btn-success\":true} ';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    }
                    var content = ' <a class="btn btn-rounded btn-sm"' + class_text + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.change-account-status').html(content);
                    $compile($element.contents())($scope);

                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/accounts/' + $scope.data.account_id,
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
        .directive('resetPwd', function ($templateCache, $rootScope, $compile, widget, $state) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="reset-pwd"></p>',
                link: function ($scope, $element, $attrs) {
                    var content = '<a class="btn btn-warning btn-rounded btn-sm" ng-click="resetPwd();" >重置密码</a>';
                    $element.find(".reset-pwd").html(content);
                    $compile($element.contents())($scope);
                    $scope.resetPwd = function () {
                        var pwd = window.prompt("请在此输入新密码", "123456");
                        if (pwd) {
                            widget.ajaxRequest({
                                url: '/accounts/' + $scope.data.account_id,
                                method: 'PUT',
                                scope: $scope,
                                data: {account_id: $scope.data.account_id, password: pwd, userpass: pwd},
                                success: function (json) {
                                    widget.msgToast('更新密码成功！');
                                    $state.go(con.state.main + '.account.list');
                                }
                            })
                        }

                    }
                }
            }
        })
});
