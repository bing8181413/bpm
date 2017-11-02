define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    mod
        .directive('liveNoticeAdd', function ($templateCache, $filter, $compile, widget, $uibModal, $templateCache) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm pull-right" ng-click="show()">添加</a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function (status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + con.live_path + 'notice/update.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.param = {};
                                $scope.submit = function () {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/notice',
                                        method: 'POST',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function (json) {
                                            widget.msgToast('添加成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        }
                                    })
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
        .directive('liveNoticeSending', function ($templateCache, $filter, $compile, widget, $uibModal, $templateCache) {
            return {
                multiElement: true,
                restrict: 'AE',
                replace: false,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-primary btn-rounded btn-sm" ng-click="show()">发送</a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function (status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + con.live_path + 'notice/send.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.param = {};
                                $scope.$watch('param.expire_time', function (val) {
                                    $scope.param.expire_time = Number($scope.param.expire_time);
                                })
                                $scope.$watch('readonly', function (val, oldVal) {
                                    // console.log(val, oldVal);
                                    if (oldVal == 2 && val == 1) {
                                        $scope.param.expire_time = 0;
                                    }

                                });
                                $scope.submit = function () {
                                    $scope.param.room_ids = $scope.room_id.split(',');
                                    // console.log(Number($scope.param.expire_time));
                                    if (!Number($scope.param.expire_time) >= 0 && !Number($scope.param.expire_time) == -1) {
                                        widget.msgToast('分钟数必须大于0或者等于-1');
                                        return false;
                                    }
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/notice/' + supScope.data.id + '/sending',
                                        method: 'POST',
                                        scope: $scope,
                                        data: $scope.param,
                                        success: function (json) {
                                            widget.msgToast('发送成功,请刷新查看');
                                            supScope.$parent.searchAction();
                                            $scope.cancel();
                                        }
                                    })
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
