define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod
        .directive('showSms', function ($templateCache, $modal) {
            return {
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary btn-rounded" ng-click="show_sms();">查看</a>',
                link: function ($scope, $element, $attrs) {
                    var supscope = $scope;
                    $scope.show_sms = function () {
                        // console.log($scope);
                        var modalInstance = $modal.open({
                            template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                            controller: function ($scope, $modalInstance) {
                                $scope.title = '查看发送手机号码';
                                $scope.mobiles = supscope.data.mobiles;
                                $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate>' +
                                    '<div form-textarea text="手机号码" ng-model="mobiles"></div>' +
                                    '<a class="btn btn-warning" ng-click="cancel();">关闭</a>' +
                                    '</form>';
                                $scope.cancel = function () {
                                    // $modalInstance.close();
                                    $modalInstance.dismiss('cancel');
                                }
                            },
                            size: ''
                        });
                    }
                }
            }
        })
});
