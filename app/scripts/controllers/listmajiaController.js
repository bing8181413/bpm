// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('listmajiaController', listmajiaController)
        .controller('listmajiaaddController', listmajiaaddController)

    listmajiaController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    listmajiaaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    function listmajiaaddController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.ref_id_disable = true;
        $scope.listmajiaadd = {
            pic_info: [],
            tags: [],
            ref_name: ''
        };
        $scope.listmajiaadd_param = {
            user_id: '',
            content: '',
            pic_info: '',
            ref_id: '',
            feed_type: 1, // 1 or 9
            range: 2, //1：秘密 2：公开
            tags: [],
        };

        $scope.tags_init = function () {
            $scope.listmajiaadd.tags = [];
            $scope.listmajiaadd_param.range = 2;
        }
        // 获取 马甲list人信息
        var majias_url = simpleCons.domain + '/manage/majias/list';
        $scope.get_majia_list_param = {page: 1, count: 50, account_id: '', community_name: ''};
        $scope.get_majia_list = function () {
            $http.post(majias_url, $scope.get_majia_list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        var majias = json.data.list;
                        angular.forEach(majias, function (val, key) {
                            majias[key].name_community_name = val.name + '__________' + val.community_name;
                        });
                        $scope.majias_list = majias;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }

        //  查询 topic_id
        var get_topic_url = simpleCons.domain + '/manage/topic/detail';
        $scope.get_topic = function () {
            console.log($scope.listmajiaadd_param.ref_id);
            $http.post(get_topic_url, {topic_id: $scope.listmajiaadd_param.ref_id})
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.listmajiaadd.ref_name = json.data.title;
                    } else {
                        widget.msgToast(json.msg);
                    }
                }).error(function () {
                    $scope.listmajiaadd_param.ref_id = '';
                    $scope.listmajiaadd.ref_name = '';
                    widget.msgToast('查询无结果');
                })
        }
        $scope.add_tags = function () {
            var tmp_tags = [];
            $scope.listmajiaadd_param.tags = [];
            angular.forEach($scope.listmajiaadd.tags, function (val, key) {
                if (val) {
                    tmp_tags.push(val);
                }
            })
            $scope.listmajiaadd_param.tags = JSON.stringify(tmp_tags);
        }
        $scope.add_pic_info = function () {
            var tmp_pic_info = [];
            $scope.listmajiaadd_param.pic_info = [];
            angular.forEach($scope.listmajiaadd.pic_info, function (val, key) {
                if (val) {
                    tmp_pic_info.push({
                        pic_url: val.url,
                        pic_width: val.width,
                        pic_height: val.height
                    });
                }
            })
            $scope.listmajiaadd_param.pic_info = JSON.stringify(tmp_pic_info);
        }
        $scope.save = function () {
            $scope.add_tags();
            $scope.add_pic_info();
            if ($scope.listmajiaadd_param.feed_type == 9) {
                $scope.get_topic();
            }
            //console.log($scope.listmajiaadd_param.tags);
            //console.log($scope.listmajiaadd_param.pic_info);
            //console.log($scope.listmajiaadd_param);
            if (!$scope.listmajiaadd_param.user_id) {
                widget.msgToast('请选择发布者账号');
                return false;
            }
            if ($scope.listmajiaadd_param.feed_type == 9 && $scope.listmajiaadd_param.ref_id == '') {
                widget.msgToast('话题讨论需要填写话题ID');
                return false;
            }
            if (!$scope.listmajiaadd_param.content) {
                widget.msgToast('请填写发布内容');
                return false;
            }
            var postmajia_url = simpleCons.domain + '/manage/community/feed/postmajia';
            $http.post(postmajia_url, $scope.listmajiaadd_param)
                .success(function (json) {
                    if (json.code == 0) {
                        widget.msgToast('发布成功');
                        $state.go('listmajia');
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }

    }

    function listmajiaController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        var super_scope = $scope;
        $scope.tab = 1;
        $scope.list_param = {};
        $scope.list_param.count = 10;
        $scope.list_param.page = 1;
        $scope.list_param.status = 1;
        $scope.list_param.is_popular = 0;
        var list_url = simpleCons.domain + '/manage/community/feed/listmajia';
        $scope.getapi = function (page, status) {
            $scope.list_param.status = status || $scope.list_param.status || 1;
            $scope.list_param.page = page || $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        //console.log(json.data[3]);
                        $scope.Feeds = json.data;
                        $scope.totalItems = json.total;
                        $scope.currentPage = $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    }
                });
        }

        $scope.getapi(1);
        // 获取马甲人员list
        //var majias_url = simpleCons.domain + '/manage/majias/list';
        //$http.post(majias_url, {page: 1, count: 50})
        //    .success(function (json) {
        //        if (json.code == 0) {
        //            json.data.list.unshift({user_id: '', name: '不选择发布人'});
        //            $rootScope.majias_list = json.data.list;
        //        } else {
        //            widget.msgToast(json.msg);
        //        }
        //    });


        // 获取马甲人员list
        $scope.majias_list = '';
        var majias_url = simpleCons.domain + '/manage/majias/list';
        $scope.get_majia_list_param = {page: 1, count: 50, account_id: '', community_name: ''};
        $scope.get_majia_list = function () {
            $http.post(majias_url, $scope.get_majia_list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        json.data.list.unshift({user_id: '', name: '不选择发布人'});
                        $scope.majias_list = json.data.list;
                        $rootScope.majias_list = json.data.list;
                    } else {
                        widget.msgToast(json.msg);
                    }
                });
        }

        $scope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }

        // 点赞
        $scope.add_thumbup = function (feed_id) {
            var modalInstance = $modal.open({
                templateUrl: 'add_thumbup.html',
                controller: function ($scope, $modalInstance) {
                    $scope.add_thumbup = {};
                    $scope.add_thumbup.feed_id = feed_id || $scope.add_thumbup.feed_id;
                    $scope.add_thumbup.user_id = '';

                    // 获取马甲人员list
                    $scope.majias_list = '';
                    var majias_url = simpleCons.domain + '/manage/majias/list';
                    $scope.get_majia_list_param = {page: 1, count: 50, account_id: '', community_name: ''};
                    $scope.get_majia_list = function () {
                        $http.post(majias_url, $scope.get_majia_list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    json.data.list.unshift({user_id: '', name: '不选择发布人'});
                                    $scope.majias_list = json.data.list;
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }

                    $scope.ok = function () {
                        if (!$scope.add_thumbup.user_id) {
                            widget.msgToast('没有选择一个马甲用户');
                            return false;
                        }
                        var add_thumbup_url = simpleCons.domain + '/manage/community/feed/add_thumbup';
                        $http.post(add_thumbup_url, $scope.add_thumbup)
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('点赞成功');
                                    super_scope.getapi();
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }
        // 评论  和 回复
        $scope.add_comment = function (feed_id, reply_user_id, reply_user_name) {
            var modalInstance = $modal.open({
                templateUrl: 'add_comment.html',
                controller: function ($scope, $modalInstance) {
                    $scope.add_comment = {};
                    $scope.add_comment.feed_id = feed_id;
                    $scope.add_comment.user_id = '';
                    $scope.add_comment.reply_user_name = reply_user_name || '';
                    $scope.add_comment.reply_user_id = reply_user_id || '';
                    $scope.add_comment.content = '';

                    // 获取马甲人员list
                    $scope.majias_list = '';
                    var majias_url = simpleCons.domain + '/manage/majias/list';
                    $scope.get_majia_list_param = {page: 1, count: 50, account_id: '', community_name: ''};
                    $scope.get_majia_list = function () {
                        $http.post(majias_url, $scope.get_majia_list_param)
                            .success(function (json) {
                                if (json.code == 0) {
                                    json.data.list.unshift({user_id: '', name: '不选择发布人'});
                                    $scope.majias_list = json.data.list;
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    }
                    $scope.ok = function () {
                        if (!$scope.add_comment.user_id) {
                            widget.msgToast('没有选择一个马甲用户');
                            return false;
                        }
                        if (!$scope.add_comment.content) {
                            widget.msgToast('没有填写回复内容');
                            return false;
                        }
                        var add_comment_url = simpleCons.domain + '/manage/community/feed/add_comment';
                        $http.post(add_comment_url, $scope.add_comment)
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('回复成功');
                                    super_scope.getapi();
                                    $modalInstance.dismiss('cancel');
                                } else {
                                    widget.msgToast(json.msg);
                                }
                            });
                    };
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }

        //  查看点赞列表
        $scope.thumbup_list = function (thumbup_list) {
            var modalInstance = $modal.open({
                templateUrl: 'thumbup_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.thumbup_list = thumbup_list;
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };
                },
                size: ''
            });
        }

        //  查看回复列表
        $scope.comment_list = function (comment_list, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'comment_list.html',
                controller: function ($scope, $modalInstance) {
                    $scope.comment_list = comment_list;
                    $scope.add_comment = function (feed_id, reply_user_id, reply_user_name) {
                        super_scope.add_comment(feed_id, reply_user_id, reply_user_name);
                        $modalInstance.dismiss('cancel');
                    }
                    $scope.cancel = function () {
                        $modalInstance.dismiss('cancel');
                    };

                    $scope.commentstaus = function (fc_id, status, sub_index) {
                        var commentstaus_url = simpleCons.domain + '/manage/community/feed/comment/status';
                        $http.post(commentstaus_url, {fc_id: fc_id, status: status})
                            .success(function (data) {
                                if (data.code == 0) {
                                    if (super_scope.Feeds[sup_index].comment_list[sub_index]) {
                                        super_scope.Feeds[sup_index].comment_list[sub_index].status = status;
                                    }
                                    widget.msgToast('操作成功！');
                                } else {
                                    widget.msgToast(data.msg);
                                }
                            });
                    }

                },
                size: 'lg'
            });
        }
        $scope.feedstatus = function (feed_id, status, index) {
            if (window.confirm('确定要执行此操作吗?')) {
                var feedstatus_url = simpleCons.domain + '/manage/plat/feed_status';
                $http.post(feedstatus_url, {feed_id: feed_id, status: status})
                    .success(function (data) {
                        if (data.code == 0) {
                            $scope.getapi(1);
                            widget.msgToast('操作成功！');
                        } else {
                            widget.msgToast(data.msg);
                        }
                    });
            }
        }
        $scope.feedpopular = function (feed_id, is_popular, index) {
            if (window.confirm('确定要执行此操作吗?')) {
                var feedpopular_url = simpleCons.domain + '/manage/community/feed/popular';
                $http.post(feedpopular_url, {feed_id: feed_id, is_popular: is_popular})
                    .success(function (data) {
                        if (data.code == 0) {
                            if (is_popular == 1) {
                                $scope.getapi(1, 1);
                            } else if (is_popular == 0) {
                                $scope.getapi(1, 1, 1);
                            }


                            widget.msgToast('操作成功！');
                        } else {
                            widget.msgToast(data.msg);
                        }
                    });
            }
        }

    };
})
;
