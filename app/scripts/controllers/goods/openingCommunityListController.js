// This is a file copied by your subgenerator
define([
    '../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('goods.openingCommunityListController', openingCommunityListController)

    openingCommunityListController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];

    function openingCommunityListController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        //console.log(base64);
        var sup_scope = $scope;
        $scope.activityTitle = $stateParams.title;
        //console.log($scope.activityTitle);
        $scope.list_param = {
            page: 1,
            count: 20,
            activity_id: $stateParams.id,
            accomplish_status:[]
        };
        if ($stateParams.success == 1) {
            $scope.list_param.accomplish_status = [5];
        } else {
            $scope.list_param.accomplish_status = [1,5];
        }
        var list_url = simpleCons.domain + '/manage/tuan/plans/list';
        $scope.getapi = function (page) {
            $rootScope.loading = true;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.items = json.data.list;
                        $scope.totalItems = json.data.count;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                        $rootScope.loading = false;
                    } else {
                        $rootScope.loading = false;
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };
        //修改成团的最后截止日期
        $scope.update_group_end_time = function (activity_id, community_id, group_end_time, group_buy_status, deliver_time) {
            var modalInstance = $modal.open({
                templateUrl: 'update_group_end_time.html',
                controller: function ($scope, $modalInstance) {
                    $scope.group_end_time = $filter('date')(group_end_time, 'yyyy-MM-dd HH:mm:ss');
                    console.log(deliver_time);
                    if (deliver_time && deliver_time.length > 10) {
                        $scope.deliver_time_show = true;
                        $scope.deliver_time = $filter('date')(deliver_time, 'yyyy-MM-dd HH:mm:ss');
                    } else {
                        $scope.deliver_time_show = false;
                        $scope.deliver_time = new Date();
                    }
                    $scope.deliver_time_init = function () {
                        if ($scope.deliver_time_show) {
                            $scope.deliver_time_show = false;
                            $scope.deliver_time = new Date();
                        } else {
                            $scope.deliver_time_show = true;
                            $scope.deliver_time = $filter('date')($scope.deliver_time, 'yyyy-MM-dd HH:mm:ss');
                        }
                    }
                    $scope.group_buy_status = group_buy_status + '';
                    $scope.ok = function (content) {
                        $scope.update_group_end_time_url = simpleCons.domain + '/manage/tuan/update_group_end_time';
                        $scope.update_group_end_time_param = {
                            activity_id: activity_id,
                            community_id: community_id,
                            group_end_time: $scope.group_end_time,
                            group_buy_status: $scope.group_buy_status
                        };
                        if ($scope.deliver_time_show) {
                            $scope.update_group_end_time_param.deliver_time = $scope.deliver_time;
                        }
                        $http.post($scope.update_group_end_time_url, $scope.update_group_end_time_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    sup_scope.getapi(1);
                                    widget.msgToast('已更新成功');
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        };

        $scope.activity_del_user = function (user_id, order_id, index) {
            var modalInstance = $modal.open({
                templateUrl: 'activity_del_user.html',
                controller: function ($scope, $modalInstance) {
                    $scope.reason = '';
                    $scope.ok = function () {
                        if (!$scope.reason || $scope.reason == '') {
                            alert('请填写原因');
                            return false;
                        }
                        var close_url = simpleCons.domain + '/manage/order/apply/remove';
                        $http.post(close_url, {
                            //activity_id: activityId,
                            //user_id: user_id,
                            //order_id: order_id,
                            //reason: $scope.reason
                            order_id: order_id,
                            user_id: user_id,
                            cancel_reason: $scope.reason,
                            cancel_from: 1
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('结束活动已经操作成功!请刷新列表查看');
                                    sup_scope.activity_list[sup_index].apply_list[index].order_status = '5';
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'lg'
            });
        }
        $scope.edit = function (fun, item, index) {
            var modalInstance = $modal.open({
                templateUrl: 'edit.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        var edit_url = simpleCons.domain + '/manage/tuan/' + fun;
                        $http.post(edit_url, {
                            activity_id: item.activity_id,
                            community_id: item.community_id
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('状态更新成功!请刷新列表查看');
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
        // 添加团长
        $scope.add_header = function (item) {
            var modalInstance = $modal.open({
                templateUrl: 'add_header.html',
                controller: function ($scope, $modalInstance) {
                    $scope.user_type = item.header_user_type || 0;
                    $scope.user_id = item.header_user_id || '';
                    $scope.tuanoption = {
                        user_id: item.header_user_id,
                        name: item.header_user_name,
                        mobile: item.header_mobile,
                    }
                    $scope.get_tuan_applicants = function () {
                        var edit_url = simpleCons.domain + '/manage/tuan/get_tuan_applicants';
                        $http.post(edit_url, {
                            activity_id: item.activity_id,
                            community_id: item.community_id
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.tuan_applicants = json.data;
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.get_tuan_applicants();
                    $scope.changeTuanoption = function (item, index) {
                        $scope.tuanoption.mobile = item.mobile;
                    }
                    $scope.ok = function () {
                        var edit_url = simpleCons.domain + '/manage/tuan/add_header';
                        $http.post(edit_url, {
                            activity_id: item.activity_id,
                            community_id: item.community_id,
                            user_id: $scope.user_id,
                            user_type: $scope.user_type,
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('状态更新成功!请刷新列表查看');
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }

        $scope.remove_header = function (item, index) {
            var modalInstance = $modal.open({
                templateUrl: 'remove_header.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        var remove_header_url = simpleCons.domain + '/manage/tuan/remove_header';
                        $http.post(remove_header_url, {
                            activity_id: item.activity_id,
                            community_id: item.community_id,
                            user_id: item.header_user_id,
                            user_type: item.header_user_type
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    alert('移除团长成功!请刷新列表查看');
                                    sup_scope.items[index].header_user_id = null;
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast('失败: ' + json.msg + '，请联系管理员');
                                }
                            })
                            .error(function () {
                                widget.msgToast('操作失败，状态不正确 ');
                                $modalInstance.dismiss('cancel');
                            })
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
        $scope.user_list = function (activityId, activityTitle, communityId, index) {
            var modalInstance = $modal.open({
                templateUrl: 'user_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.data = '';
                    var sup_index = index;
                    $scope.orderoption = {
                        activity_id: activityId,
                        activity_title: activityTitle,
                        community_id: communityId
                    }
                    $scope.orderoption.csvHeader = ['排序', '订单号', '所在小区', '详细地址', '报名品类', '价格', '份数', '支付金额', '当前状态', '订单时间'];
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                },
                size: 'lg'
            });
        }
    }


});
