define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // 修改配送模式时间类型
        .directive('exchangecodeExport', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: true,
                // scope: {
                //     list: '=',
                // },
                template: ' <a class="btn btn-primary btn-rounded" ng-click="show_exchangecode_export();">导出</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_exchangecode_export = function () {
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '兑换码';
                                $scope.list = supscope.list;
                                $scope.tmpl = '<div class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-input text="修改状态为" ng-model="export_data" required="true"></div>' +
                                    '<a class="btn btn-warning btn-rounded " ng-click="cancel()">关闭</a>' +
                                    '</form>';
                                widget.ajaxRequest({
                                    url: '/exchangecode/export',
                                    method: 'PUT',
                                    scope: $scope,
                                    data: {
                                        id: $scope.list.id
                                    },
                                    success: function (json) {
                                        $scope.export_list = [];
                                        angular.forEach(json.data.list, function (val, key) {
                                            $scope.export_list.push(val.code);
                                        });
                                        $scope.export_data = $scope.export_list.join(',');
                                    }
                                })
                                $scope.cancel = function () {
                                    $modalInstance.dismiss('cancel');
                                };
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
