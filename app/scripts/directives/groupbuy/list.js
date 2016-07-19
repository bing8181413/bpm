define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('groupbuyOrderCopies', function ($templateCache, $filter, $compile, widget, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                    text: '=',
                },
                template: '<a class="btn btn-info" ng-click="show();" ng-bind="text" ng-show="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.ext = {groupbuy_id: $scope.data.groupbuy_id};
                    var supscope = $scope;
                    $scope.show = function () {
                        var modalInstance = $modal.open({
                            template: '<div hjm-grid modid="orderList" config="config_by_groupbuy" columns="columns_by_groupbuy" ext-search="ext"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.ext = supscope.ext;
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
        .directive('groupbuyOrder', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p ng-bind-html="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    if ($scope.data) {
                        $scope.txt = ($scope.data.user && $scope.data.user.name) ? ('微信昵称:' + $scope.data.user.name) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.contact_name ) ? ('<br/>联系人:' + $scope.data.address.contact_name) : '';
                        $scope.txt += ($scope.data.user && $scope.data.user.mobile ) ? ('<br/>手机:' + $scope.data.user.mobile) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.created_at ) ? ('<br/>开团时间<br/>' + $scope.data.address.created_at) : '';
                    }
                }
            }
        })

});
