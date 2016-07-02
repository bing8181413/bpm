/**
 * 话题通知
 */
define([
    './controllers',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod

    .controller('topicNoticeController', function (
        $http,
        $modal,
        $scope,
        $filter,
        $rootScope,
        $stateParams,

        widget
    ) {
        // 页面初始化配置
        $scope.Page = {
            pageSize: 20,
            pageIndex: 1,
            pageTotal: '',
            maxSize: 5,
            numPages: ''
        };

        $scope.Init = {
            id: parseInt($stateParams.id, 0),
            status: false
        };

        $scope.DataList = {};

        // 获取活动通知
        var that = $scope;
        that.getData = function () {
            widget.ajaxRequest({
                scope: $scope,
                url: '/manage/push/topic/list',
                data: {
                    topic_id: $scope.Init.id,
                    page: $scope.Page.pageIndex,
                    count: $scope.Page.pageSize
                },
                success: function (res) {
                    $scope.DataList = {list: []};
                    $scope.Page.pageTotal = res.data.total;
                    angular.extend($scope.DataList.list, res.data.list);
                }
            });
        };
        that.getData();

        // 新增通知
        $scope.addNotice = function () {
            widget.ajaxRequest({
                scope: $scope,
                url: '/manage/push/topic/communitys',
                data: {
                    topic_id: $scope.Init.id
                },
                success: function (res) {
                    $scope.Communitys = res.data.list;
                    // $scope.Init.status = true;
                    addNotice();
                },
                error: function (err) {
                    widget.msgToast('获取小区列表失败');
                }
            });

            function addNotice() {
                var modalInstance = $modal.open({
                    templateUrl: 'add_notice.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.tmp = {
                            left: [],
                            right: [],
                            list: that.Communitys,
                            check: false, // 是否定时发送
                            timer: '', // 发送日期
                            minute: new Date()
                        };
                        $scope.tInput = {
                            timer: new Date(),
                            scope_type: 1,
                            community: [],
                            order_status: 0
                        };

                        // 添加
                        $scope.addData = function () {
                            angular.forEach($scope.tmp.left, function (item, key) {
                                angular.forEach($scope.tmp.list, function (v, k) {
                                    if (item == v.community_id) {
                                        $scope.tInput.community.push(v);
                                        $scope.tmp.list.splice(k, 1);
                                    }
                                });
                            });
                        };

                        // 添加所有
                        $scope.addAll = function () {
                            $scope.tInput.community = $scope.tInput.community.concat($scope.tmp.list);
                            $scope.tmp.list = [];
                        };

                        // 移除
                        $scope.removeData = function () {
                            angular.forEach($scope.tmp.right, function (item, key) {
                                angular.forEach($scope.tInput.community, function (v, k) {
                                    if (item == v.community_id) {
                                        $scope.tmp.list.push(v);
                                        $scope.tInput.community.splice(k, 1);
                                    }
                                });
                            });
                        };

                        // 日历插件
                        $scope.openedstart = false;
                        $scope.openstart = function($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.openedstart = true;
                        };

                        // 取消
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        // 提交
                        $scope.ok = function () {
                            if (!$scope.tInput.title) {
                                widget.msgToast('请输入标题');
                                return;
                            }
                            if (!$scope.tInput.content) {
                                widget.msgToast('消息内容');
                                return;
                            }

                            var community_ids = '';
                            if ($scope.tInput.scope_type == 2) {
                                if ($scope.tInput.community.length == 0) {
                                    widget.msgToast('请选择小区');
                                    return;
                                }
                                angular.forEach($scope.tInput.community, function (v, k) {
                                    if (community_ids) {
                                        community_ids += ','+v.community_id;
                                    } else {
                                        community_ids = v.community_id;
                                    }
                                });
                            }

                            if ($scope.tInput.scope_type == 1) {
                                angular.forEach(that.Communitys, function (v, k) {
                                    if (community_ids) {
                                        community_ids += ','+v.community_id;
                                    } else {
                                        community_ids = v.community_id;
                                    }
                                });
                            }
                            
                            var send_time = '',
                                auto_send = 0;
                            if ($scope.tmp.check) {
                                auto_send = 1;
                                if (!$scope.tmp.timer) {
                                    widget.msgToast('请选择定时发送时间');
                                    return;
                                }

                                var date = $filter('date')($scope.tmp.timer, 'yyyy/MM/dd'),
                                    minute = $filter('date')($scope.tmp.minute, 'hh:mm');

                                send_time = (new Date(date+' '+minute+':00').getTime())/1000;
                            }

                            var data = {
                                topic_id: that.Init.id,
                                title: $scope.tInput.title,
                                content: $scope.tInput.content,
                                scope_type: $scope.tInput.scope_type,
                                community_ids: community_ids,
                                auto_send: auto_send,
                                send_time: send_time
                            };

                            widget.ajaxRequest({
                                scope: $scope,
                                url: '/manage/push/topic/add',
                                data: data,
                                success: function (res) {
                                    widget.msgToast('话题通知添加成功');
                                    $scope.cancel();
                                    that.getData();
                                }
                            });
                        };
                    },
                    size: 'lg'
                });
            }
        };
    });
});
