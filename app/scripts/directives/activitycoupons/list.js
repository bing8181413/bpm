define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('activityCouponsUpdate', function ($templateCache, $filter, $compile, widget, $state, $rootScope) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm" ng-click="update();">编辑</a>',
                link: function ($scope, $element, $attrs) {
                    $scope.update = function () {
                        $state.go('main.activitycoupons.update', {id: $scope.data.id});
                    }
                }
            }
        })
        .directive('activityCoupons', function ($rootScope, $templateCache, $filter, $compile, widget, $uibModal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-rounded btn-sm btn-info" ng-bind="data.coupons[0].used+\' / \'+data.coupons[0].count" ng-click="show()" ' +
                ' ng-show="data.coupons[0].used && data.coupons[0].count"></a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.extApi = '/markets/activitycoupons/' + ($scope.data.id || 0) + '/logs';
                    $scope.show = function () {
                        var modalInstance = $uibModal.open({
                            template: '<div hjm-grid modid="activitycouponslogsList" config="config" columns="columns" ext-search="ext" ext-api="extApi"></div>',
                            controller: function ($scope, $uibModalInstance) {
                                $scope.extApi = supscope.extApi;
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
});
