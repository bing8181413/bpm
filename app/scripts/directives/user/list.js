define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('userAddress', function (widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary " ng-click="show_user_address()" ng-bind="data.address.count || 0"></a>',
                link: function ($scope, $element, $attrs) {
                    console.log($scope.data);
                    var supScope = $scope;
                    $scope.show_user_address = function (status) {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="addressList" config="config" columns="columns" ext-api="extApi"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.extApi = '';
                                if (supScope.data.user_id) {
                                    $scope.extApi = '/users/' + supScope.data.user_id + '/addresses';
                                }
                            },
                            size: 'lg'
                        });
                    }
                }
            }
        })
});
