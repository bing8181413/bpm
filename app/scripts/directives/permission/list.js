define([
    '../../directives/directives',
    '../../cons/simpleCons'
], function (mod, con) {
    mod
        .directive('livePermissionEdit', function ($templateCache, $filter, $compile, widget, $uibModal, $templateCache) {
            return {
                // multiElement: true,
                restrict: 'AE',
                replace: true,
                scope: {
                    data: '=',
                },
                template: '<a class="btn btn-success btn-rounded btn-sm" ng-class="{\'pull-right\':!data,\'text-center\':data}" ng-click="show()" ng-bind="data?\'编辑\':\'添加\'"></a>',
                link: function ($scope, $element, $attrs) {
                    var supScope = $scope;
                    $scope.show = function (status) {
                        var modalInstance = $uibModal.open({
                            template: function () {
                                return $templateCache.get('app/' + con.live_path + 'permission/update.html');
                            },
                            controller: function ($scope, $uibModalInstance) {
                                $scope.param = {};

                                if (supScope.data.id) {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/permission/' + supScope.data.id,
                                        method: 'get',
                                        scope: $scope,
                                        success: function (json) {
                                            $scope.param = angular.copy(json.data);
                                        }
                                    })

                                }
                                $scope.verify_obj_id = function (obj_id) {
                                    if (!obj_id || obj_id == 0) {
                                        widget.msgToast('未选择视频组ID,不能查询添加!');
                                        return false;
                                    }
                                    var has_video_group_verify = false;
                                    angular.forEach($scope.param.video_group, function (val, key) {
                                        if (val.video_group_id == obj_id) {
                                            has_video_group_verify = true;
                                        }
                                    });
                                    if (has_video_group_verify) {
                                        widget.msgToast('添加失败,视频组已存在!');
                                        return false;
                                    }
                                    return true;
                                }
                                $scope.add_obj_id = function (json) {
                                    var has_video_group = false;
                                    if (json.code == 0) {
                                        angular.forEach($scope.param.video_group, function (val, key) {
                                            if (val.video_group_id == json.data.id) {
                                                has_video_group = true;
                                            }
                                        });
                                        if (!has_video_group) {
                                            $scope.param.video_group = $scope.param.video_group || [];
                                            $scope.param.video_group.push({
                                                video_group_id: json.data.id,
                                                group_title: json.data.group_title,
                                            });
                                        } else {
                                            widget.msgToast('添加失败,视频组已存在!');
                                        }
                                    } else {
                                        widget.msgToast('没有相关的视频组');
                                        return false;
                                    }
                                }

                                $scope.submit = function () {
                                    widget.ajaxRequest({
                                        url: con.live_domain + '/live/permission',
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

});
