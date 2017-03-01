define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // 添加热词
        .directive('hotkeyAdd', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" ng-click="show_hotkey_add();" style="margin-top: -5.5px;margin-left: 5px;">添加热词</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_hotkey_add = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-input text="热词" ng-model="keyword"  placeholder = "热词" required = "true"> </div > ' +
                                    '<a class="btn btn-primary btn-rounded pull-right " ng-click="hotkey_add()">确定</a>' +
                                    '</form>';
                                $scope.title = '添加热词';
                                $scope.hotkey_add = function () {
                                    widget.ajaxRequest({
                                        url: '/product/hotkey',
                                        method: 'post',
                                        scope: $scope,
                                        data: {
                                            keyword: $scope.keyword
                                        },
                                        success: function (json) {
                                            widget.msgToast('添加成功,请刷新查看');
                                            supscope.$parent.searchAction();
                                            $scope.cancel();
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            }
        })
        // 删除热词
        .directive('hotkeyDel', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-warning btn-rounded btn-sm" ng-click="show_hotkey_del();">删除热词</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_hotkey_del = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.keyword = supscope.data.keyword;
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-input text="热词" ng-model="keyword" ng-disabled="true" required="true"></div>' +
                                    '<a class="btn btn-warning btn-rounded pull-right " ng-click="hotkey_del()">删除</a>' +
                                    '</form>';
                                $scope.title = '删除热词';
                                $scope.hotkey_del = function () {
                                    if (!confirm('确定删除热词')) {
                                        return false;
                                    }
                                    widget.ajaxRequest({
                                        url: '/product/hotkey/' + (supscope.data.id || 0),
                                        method: 'delete',
                                        scope: $scope,
                                        data: {},
                                        success: function (json) {
                                            widget.msgToast('删除成功,请刷新查看');
                                            supscope.$parent.searchAction();
                                            $scope.cancel();
                                        }
                                    })
                                }
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: ''
                        });
                    }
                }
            }
        })
})
;
