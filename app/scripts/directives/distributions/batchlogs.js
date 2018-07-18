define([
    '../../directives/directives',
    '../../cons/simpleCons',
], function(mod, simpleCons) {
    mod
        .directive('batchlogsAdd', function($templateCache, $filter, $compile, widget, $state, $rootScope, $uibModal) {
            return {
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<span class="btn btn-rounded btn-success btn-sm pull-right" ng-click="show();">新增奖学金</span>',
                link: function($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function() {
                        var modalInstance = $uibModal.open({
                                template: $templateCache.get('app/' + simpleCons.biz_path + 'distributions/batchCoin.html'),
                                controller: function($scope, $uibModalInstance) {

                                    $scope.failureStr = [];// 错误手机号码 用于表示是否成功操作 奖学金
                                    $scope.submit = function() {

                                        if (!$scope.param.users || $scope.param.users.length === 0) {
                                            widget.msgToast('没有输入任何手机号码');
                                            return false;

                                        }
                                        widget.ajaxRequest({
                                            url: '/distributions/batchcoin',
                                            method: 'POST',
                                            scope: $scope,
                                            data: $scope.param,
                                            success: function(json) {
                                                var failureLength = json.data && json.data.failure && json.data.failure.length;

                                                widget.msgToast('操作成功 ' + json.data.success + '个 !，失败 ' + failureLength + ' 个!');

                                                $scope.failureStr = json.data.failure || [];

                                                if (failureLength === 0) {
                                                    supScope.$parent.searchAction();
                                                    $scope.cancel();
                                                }
                                            },
                                        });
                                    };
                                    $scope.cancel = function() {
                                        $uibModalInstance.dismiss('cancel');
                                    };
                                },
                                size: 'lg',
                            }
                        );
                    };
                },
            };
        });
});
