define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, cons) {
    mod
        .directive('exportRun', function ($templateCache, $uibModal, $timeout, widget) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show_export();">导出数据</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_export = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.title = supscope.data.desc || '导出数据';
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<style type="text/css"> .modal .checkbox-inline{margin-left: 0;}' +
                                    '.modal .checkbox-inline{padding-left: 0;}</style>';
                                $scope.condition = supscope.data.condition;
                                $scope.command = supscope.data.command;
                                angular.forEach($scope.condition, function (val, key) {
                                    if (val.type == 'checkbox') {
                                        $scope.tmpl += '<div form-checkbox text="' + val.name + '" ng-model="param.' + key + '"' +
                                            ' source="condition[\'' + key + '\'].options"  ' + (val.required ? ('required=\"true\"') : '') + '></div>';
                                    } else if (val.type == 'radiobox') {
                                        $scope.tmpl += '<div form-radio text="' + val.name + '" ng-model="param.' + key + '"' +
                                            ' source="condition[\'' + key + '\'].options"  ' + (val.required ? ('required=\"true\"') : '') + '></div>';
                                    } else if (val.type == 'date') {
                                        $scope.tmpl += '<div form-date="" text="' + val.name + '" ng-model="param.' + key + '"  ' + (val.required ? ('required=\"true\"') : '') + '></div>';
                                    } else if (val.type == 'datetime') {
                                        $scope.tmpl += '<div form-date-time="" text="' + val.name + '" ng-model="param.' + key + '"  ' + (val.required ? ('required=\"true\"') : '') + '></div>';
                                    } else if (val.type == 'text') {
                                        $scope.tmpl += '<div form-input text="' + val.name + '" ng-model="param.' + key + '"  ' + (val.required ? ('required=\"true\"') : '') + '></div>';
                                    }
                                });
                                $scope.tmpl += '<a class="btn btn-primary btn-rounded pull-right" ng-disabled="FormBody.$invalid"  ng-click="exec();">执行</a>'
                                $scope.tmpl += '</form>';
                                $scope.exec = function () {
                                    $scope.param = $scope.param || {};
                                    angular.extend($scope.param, {command: $scope.command});
                                    if (confirm('确认将查询结果导出EXCEL吗?')) {
                                        widget.ajaxRequest({
                                            url: '/exports/exec',
                                            method: 'post',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function (json) {
                                                window.open(cons.domain + json.data.url);
                                            }
                                        })
                                    }
                                }
                                $scope.cancel = function () {
                                    $uibModalInstance.dismiss('cancel');
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
