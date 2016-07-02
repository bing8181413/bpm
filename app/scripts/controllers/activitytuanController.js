// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('activitytuanController', activitytuanController)
        //mod.controller('activitytuanByAccountController', activitytuanByAccountController);
        .controller('activitytuanFeedsController', activitytuanFeedsController)
        .controller('activitytuanCommentsController', activitytuanCommentsController)
        .controller('activitytuanApplyListController', activitytuanApplyListController);

    activitytuanController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
    //activitytuanByAccountController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams'];
    activitytuanFeedsController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', 'widget'];
    activitytuanCommentsController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', 'widget'];
    activitytuanApplyListController.$injector = ['$scope', '$http', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
    function activitytuanApplyListController($scope, $http, $modal, FileUploader, $stateParams, $state, widget) {
        var sup_scope = $scope;
        $scope.activityId = $stateParams.activityId;
        $scope.activityTitle = $stateParams.activityTitle;
        $scope.getapi = function () {
            $http.post(simpleCons.domain + '/manage/order/apply/list', {activity_id: $stateParams.activityId})
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.community_list = json.data.list;
                        $scope.tuan_type = json.data.info.tuan_type;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getapi();
        $scope.user_list = function (community_id, index) {
            var modalInstance = $modal.open({
                        templateUrl: 'user_list.html',
                        controller: function ($scope, $modalInstance) {
                            $scope.activityId = $stateParams.activityId;
                            $scope.activityTitle = $stateParams.activityTitle;
                            $scope.community_id = community_id;
                            var sup_index = index;
                            var get_order_user_list_url = simpleCons.domain + '/manage/order/user/list';
                            $scope.get_order_user_list = function () {
                                $http.post(get_order_user_list_url, {
                                    activity_id: $scope.activityId,
                                    community_id: $scope.community_id
                                })
                                    .success(function (json) {
                                        if (json.code == 0) {
                                            $scope.user_list = json.data.list;
                                        } else {
                                            widget.msgToast('失败: ' + json.msg);
                                        }
                                    });
                            }
                            $scope.get_order_user_list();
                            $scope.cancel = function () {
                                $modalInstance.dismiss('cancel');
                            };
                            $scope.activity_del_user = function (user_id, order_id, index) {
                                var modalInstance = $modal.open({
                                    templateUrl: 'activity_del_user.html',
                                    controller: function ($scope, $modalInstance) {
                                        $scope.reason = '';
                                        $scope.ok = function () {
                                            if (!$scope.reason || $scope.reason == '') {
                                                widget.msgToast('请填写原因');
                                                return false;
                                            }
                                            var close_url = simpleCons.domain + '/manage/order/apply/remove';
                                            $http.post(close_url, {
                                                order_id: order_id,
                                                user_id: user_id,
                                                cancel_reason: $scope.reason,
                                                cancel_from: 1
                                            })
                                                .success(function (json) {
                                                    if (json.code == 0) {
                                                        alert('结束活动已经操作成功!请刷新列表查看');
                                                        sup_scope.community_list[sup_index].users[index].pay_status = '5';
                                                        $modalInstance.dismiss('cancel');
                                                    } else {
                                                        widget.msgToast('失败: ' + json.msg);
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

                        },
                        size: 'lg'
                    }
                )
                ;
        }
        $scope.update_accomplish_status = function (community_id, accomplish_status, index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_accomplish_status.html',
                controller: function ($scope, $modalInstance) {
                    $scope.reason = '';
                    $scope.ok = function (sup_index) {
                        if (!$scope.reason || $scope.reason == '') {
                            widget.msgToast('请填写原因');
                            return false;
                        }
                        var close_url = simpleCons.domain + '/manage/order/apply/update';
                        $http.post(close_url, {
                            activity_id: sup_scope.activityId,
                            community_id: community_id,
                            reason: $scope.reason,
                            accomplish_status: accomplish_status
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    $modalInstance.dismiss('cancel');
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    if (sup_scope.tuan_type !== '2') {
                                        sup_scope.community_list[index].accomplish_status = accomplish_status;
                                    } else {
                                        sup_scope.getapi();
                                    }
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'normal'
            });
        }
    }

//function activitytuanByAccountController($scope, $http, $rootScope, $modal, FileUploader, $stateParams) {
//  var uploader = $scope.uploader = new FileUploader({
//    url: '/qiniu/controller.php?action=uploadimage'
//  });
//  var sup_scope = $scope;
//  $scope.activityId = $stateParams.accountId || $rootScope.account_id || '1';
//  $scope.list_param = {page: 1, count: 20, account_id: $scope.activityId};
//  $scope.list_param.keyword = $scope.search;
//  var list_url = simpleCons.domain + '/manage/activity/list_by_account';
//  $scope.getapi = function (page) {
//    $scope.list_param.page = page ? page : $scope.list_param.page;
//    $http.post(list_url, $scope.list_param)
//        .success(function (json) {
//          if (json.code == 0) {
//            $scope.activity_list = json.data.list;
//            $scope.totalItems = json.data.total;
//            $scope.itemsPerPage = $scope.list_param.count;
//            $scope.currentPage = page ? page : $scope.list_param.page;
//            $scope.maxSize = '5';
//            $scope.numPages = '';
//          } else {
//            $scope.addAlert(json.msg);
//          }
//        });
//  }
//  $scope.getapi(1);
//  $rootScope.searchkeyword = function (event) {
//    if (event.keyCode !== 13) return;
//    $scope.getapi(1);
//  }
//  $scope.update = function (activity, status, index) {
//    if(confirm('确认要关闭')){
//      var update_url = simpleCons.domain + '/manage/activity/update';
//      $http.post(update_url, {
//        activity_id: activity.activity_id,
//        status:status
//      })
//          .success(function (json) {
//            if (json.code == 0) {
//              alert('活动状态已经更新成功!请刷新列表查看');
//              $scope.activity_list[index].status = status;
//            } else {
//              alert('失败: ' + json.msg);
//            }
//          });
//    }
//  }
//
//
//  $scope.alerts = [
//    //{ msg: '用户名或者密码不正确'  }
//  ];
//  $scope.closeAlert = function (index) {
//    $scope.alerts.splice(index, 1);
//  };
//  $scope.addAlert = function (msg, type) {
//    $scope.alerts = [];
//    $scope.alerts.push({msg: msg, type: type});
//  };
//};
    function activitytuanController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.list_param = {
            page: 1,
            count: 20,
            tuan_type: 0,
            category: 1,
            activity_status: 0,
            account_id: $rootScope.hjm.username == 'jinniu' ? '' : $rootScope.selected.account_id,
            status: 1
        };
        $scope.list_param.keyword = $rootScope.search;
        var list_url = simpleCons.domain + '/manage/activity/list';
        $scope.getapi = function (page) {
            $scope.list_param.account_id = $rootScope.selected.account_id;
            //$rootScope.loading = true;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.tuan_type = $scope.list_param.tuan_type;
            $scope.list_param.keyword = $rootScope.search || '';
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.activity_list = json.data.list;
                        $scope.totalItems = json.data.total;
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
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        $scope.user_list = function (activityId, activityTitle, index) {
            var modalInstance = $modal.open({
                templateUrl: 'user_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.activityTitle = activityTitle;
                    var sup_index = index;

                    $scope.list_param = {};
                    $scope.list_param.activity_id = activityId;
                    var list_url = simpleCons.domain + '/manage/order/user/list';
                    $scope.getapi = function (page) {
                        $rootScope.loading = true;
                        $scope.list_param.page = page ? page : $scope.list_param.page;
                        $http.post(list_url, $scope.list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    $scope.user_list = json.data.list;
                                    $scope.totalItems = json.data.total;
                                    $scope.itemsPerPage = $scope.list_param.count;
                                    $scope.currentPage = page ? page : $scope.list_param.page;
                                    $scope.maxSize = '5';
                                    $scope.numPages = '';
                                } else {
                                    widget.msgToast(json.msg);
                                }
                                $rootScope.loading = false;
                            });
                    }
                    $scope.getapi(1);
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.activity_del_user = function (user_id, order_id, index) {
                        var modalInstance = $modal.open({
                            templateUrl: 'activity_del_user.html',
                            controller: function ($scope, $modalInstance) {
                                $scope.reason = '';
                                $scope.ok = function () {
                                    if (!$scope.reason || $scope.reason == '') {
                                        widget.msgToast('请填写原因');
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
                                                widget.msgToast('结束活动已经操作成功!请刷新列表查看');
                                                sup_scope.activity_list[sup_index].apply_list[index].order_status = '5';
                                                $modalInstance.dismiss('cancel');
                                            } else {
                                                widget.msgToast('失败: ' + json.msg);
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

                },
                size: 'lg'
            });
        }
        // 下架活动
        $scope.update_status = function (activity, status, index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_status.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        var update_status_url = simpleCons.domain + '/manage/activity/update';
                        $http.post(update_status_url, {
                            activity_id: activity.activity_id,
                            status: status
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('活动状态更新成功!请刷新列表查看');
                                    $modalInstance.dismiss('cancel');
                                    sup_scope.api(1);
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
                                }
                            });
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: 'sm'
            });
        }
        // 取消活动
        $scope.cancel_status = function (activity, index) {
            var modalInstance = $modal.open({
                templateUrl: 'cancel_status.html',
                controller: function ($scope, $modalInstance) {
                    $scope.reason = '';
                    $scope.ok = function () {
                        if ($scope.reason == '') {
                            widget.msgToast('请填写内容');
                            return false;
                        }
                        var update_status_url = simpleCons.domain + '/manage/activity/cancel';
                        $http.post(update_status_url, {
                            activity_id: activity.activity_id,
                            reason: $scope.reason
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('活动已经取消成功!请刷新列表查看');
                                    $modalInstance.dismiss('cancel');
                                    sup_scope.api(1);
                                } else {
                                    widget.msgToast('失败: ' + json.msg);
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
    };
    function activitytuanFeedsController($scope, $http, $rootScope, $modal, $stateParams, widget) {

        $scope.activityId = $stateParams.activityId;
        $scope.activityTitle = $stateParams.activityTitle;
        $scope.community_id = '';
        $scope.community_list_param = {activity_id: $scope.activityId};
        var community_url = simpleCons.domain + '/manage/push/activity/communitys';
        $scope.getcommunity = function () {
            $http.post(community_url, $scope.community_list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.community_list = json.data.list;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getcommunity();

        $scope.list_param = {page: 1, count: 20, activity_id: $scope.activityId, community_id: ''};
        var feeds_url = simpleCons.domain + '/manage/activity/feeds/list';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.community_id = $scope.community_id || '';
            $http.post(feeds_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.feeds_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $scope.feeds_update_url = simpleCons.domain + '/manage/activity/feeds/update';
        $scope.feeds_update = function (feed_id, order_by) {
            $scope.update_param = {feed_id: feed_id, order_by: order_by};
            $http.post($scope.feeds_update_url, $scope.update_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.getapi(1);
                        widget.msgToast('已经更新成功');
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
    };
    function activitytuanCommentsController($scope, $http, $rootScope, $modal, $stateParams, widget) {
        var sup_scope = $scope;
        $scope.activityId = $stateParams.activityId;
        $scope.activityTitle = $stateParams.activityTitle;
        $scope.hasReplied = $stateParams.hasReplied || 0;
        $scope.accountId = $stateParams.accountId || '0';

        $scope.list_param = {
            page: 1,
            count: 20,
            account_id: $scope.accountId,
            has_replied: $scope.hasReplied,
            activity_id: $scope.activityId
        };
        var comments_url = simpleCons.domain + '/manage/activity/comments/list';
        $scope.getapi = function (page, activity_id) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(comments_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.comments_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        //回复
        $scope.add_comment = function (feed_id) {
            var modalInstance = $modal.open({
                templateUrl: 'add_comment.html',
                controller: function ($scope, $modalInstance) {
                    $scope.content = '';
                    $scope.ok = function (content) {
                        if (!$scope.content || $scope.content == '') {
                            widget.msgToast('请填写原因');
                            return false;
                        }
                        $scope.comments_add_url = simpleCons.domain + '/manage/activity/comments/add_comment';
                        $scope.comments_add_param = {feed_id: feed_id, content: $scope.content};
                        $http.post($scope.comments_add_url, $scope.comments_add_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    sup_scope.getapi(1);
                                    widget.msgToast('已经回复成功');
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }
                    //专为textarea 设计的字数限制
                    $scope.checkLength = function (length) {
                        if ($scope.content.length > length) {
                            $scope.content = $scope.content.substr(0, length);
                        }
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        };
        $scope.comment_list = function (feed) {
            var modalInstance = $modal.open({
                templateUrl: 'comment_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.comment_list = feed.comment_list;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }

        $scope.alerts = [
            //{ msg: '用户名或者密码不正确'  }
        ];
        $scope.closeAlert = function (index) {
            $scope.alerts.splice(index, 1);
        };
        $scope.addAlert = function (msg, type) {
            $scope.alerts = [];
            $scope.alerts.push({msg: msg, type: type});
        };
    };
})
;
