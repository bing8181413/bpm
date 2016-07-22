define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('changeRole', function ($templateCache, $compile, widget, $state, $modal, $rootScope) {
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
                template: '<a class="btn btn-success" ng-click="show_change_role();">菜单</a>',
                link: function ($scope, $element, $attrs, $ctrl) {
                    var supscope = $scope;
                    $scope.show_change_role = function () {
                        $ctrl.getMenus(callback);
                        function callback(source) {
                            var modalInstance = $modal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $modalInstance) {
                                    console.log(source);
                                    $scope.title = '修改角色权限';
                                    $scope.tmpl = '<style type="text/css">.checkbox-inline{margin-left: 10px;}</style>' +
                                        '<form class="form-horizontal" name="FormBody" novalidate>' +
                                        '<div form-checkbox text="角色菜单" ng-model="menu_ids" source="' + source + '"> </div> ' +
                                        '<a class="btn btn-primary btn-rounded pull-right" ng-click="change_role()">确定</a>' +
                                        '</form>';
                                    $scope.menu_ids = [];
                                    angular.forEach(supscope.data.menus, function (val, key) {
                                        $scope.menu_ids.push(val.menu_id);
                                    });
                                    console.log($scope.menu_ids);
                                    $scope.change_role = function () {
                                        console.log($scope.menu_ids);
                                        return false;
                                        widget.ajaxRequest({
                                            url: '/accounts/roles/' + supscope.data.id,
                                            method: 'PUT',
                                            scope: $scope,
                                            data: {menu_ids: $scope.menu_ids},
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
        .directive('bannerChangeStatus1111', function ($templateCache, $filter, $compile, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="change-status" ></p>',
                link: function ($scope, $element, $attrs) {
                    var status_text = '';
                    var click_text = '';
                    var status_title = '';
                    if ($scope.data.status == 1) {
                        status_title = '下线';
                        status_text = 'ng-bind="\'下线\'"';
                        click_text = 'ng-click="change(2);"';
                        $scope.show_text = true;
                    } else if ($scope.data.status == 2) {
                        status_title = '上线';
                        status_text = 'ng-bind="\'上线\'"';
                        click_text = 'ng-click="change(1);"';
                        $scope.show_text = true;
                    } else {
                        $scope.show_text = false;
                    }
                    $scope.change = function (status) {
                        if (confirm('确认修改为' + status_title + '状态?')) {
                            widget.ajaxRequest({
                                url: '/banners/' + $scope.data.banner_id || 0,
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
                    var content = '<a class="btn btn-primary "' + status_text + click_text + ' ng-show="show_text"></a>';
                    $element.find('.change-status').html(content);
                    $compile($element.contents())($scope);
                }
            }
        })
});
