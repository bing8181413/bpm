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
                },
                template: '<a class="btn btn-info btn-rounded btn-sm" ng-click="show();" ng-bind="text" ng-show="text"></a>',
                link: function ($scope, $element, $attrs) {
                    $scope.text = (($scope.data.order || {}).count || 0) + '/' + (($scope.data.allorder || {}).count || 0);
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
                template: '<p class="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    if ($scope.data) {
                        $scope.txt = ($scope.data.user && $scope.data.user.name) ? ('微信昵称:' + $scope.data.user.name) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.contact_name ) ? ('<br/>\n联系人:' + $scope.data.address.contact_name) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.contact_mobile ) ? ('<br/>手机:' + $scope.data.address.contact_mobile) : '';
                        $scope.txt += ($scope.data.address && $scope.data.address.created_at ) ? ('<br/>开团时间<br/>' + $scope.data.address.created_at) : '';
                        $element.find(".txt").html($scope.txt);
                        $compile($element.contents())($scope);
                    }
                }
            }
        })
        .directive('groupbuyAccomplishStatus', function ($templateCache, $filter, $compile) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<p class="txt"></p>',
                link: function ($scope, $element, $attrs) {
                    $scope.txt = '';
                    if ($scope.data) {
                        switch ($scope.data.accomplish_status) {
                            case 1 :
                                $scope.txt = '<progressbar class="active" value="warning" type="warning">开团</progressbar>';
                                break;
                            case 2 :
                                $scope.txt = '<progressbar class="progress-striped active" value="90" type="primary">进行中</progressbar>';
                                break;
                            case 3 :
                                $scope.txt = '<progressbar class="active" value="success" type="success">已完成</progressbar>';
                                break;
                            case 4 :
                                $scope.txt = '<progressbar class="active" value="warning" type="danger">已取消</progressbar>';
                                break;
                        }
                        $element.find(".txt").html($scope.txt);
                        $compile($element.contents())($scope);
                    }
                }
            }
        })

});
