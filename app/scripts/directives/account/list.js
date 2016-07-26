define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
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
                template: '<a class="btn btn-success btn-rounded" ng-click="show_change_role();">菜单</a>',
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
});
