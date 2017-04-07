define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    // <div product-pattern="patterns"></div>
    mod
        .directive('addResourceImage', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-primary pull-left" ng-click="show_add_resource()" >新增图片</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_add_resource = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增资源库';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<div form-image text="资源库图片" ng-model="pics" token="resource" max="100"></div>' +
                                        // '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
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
        .directive('addResourceAudio', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal, $timeout) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-primary pull-left" ng-click="show_add_resource()" >新增音频</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_add_resource = function () {
                        var modalInstance = $uibModal.open({
                                template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                                controller: function ($scope, $uibModalInstance) {
                                    $scope.title = '新增资源库';
                                    $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                        ' disabled-role="\'admin,op\'" >' +
                                        '<div form-audio text="资源库音频" ng-model="pics" token="resource" max="1" min="1"></div>' +
                                        // '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                        '</form>';
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
