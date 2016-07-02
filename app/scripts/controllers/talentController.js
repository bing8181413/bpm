/** 达人相关controller
 */
define([
    './controllers',
    '../cons/simpleCons'
], function (mod, simpleCons) {

    mod

    /** 达人列表
     * url: talent.htm
     * @params:
     *     tab: 1|2[社区达人|达人申请]
     */
        .controller('talentController', function ($scope,
                                                  $http,
                                                  $rootScope,
                                                  $modal,
                                                  $stateParams,
                                                  widget) {
            // 页面初始化配置
            //$scope.Page = {
            //    tab: $stateParams.tab || 1,
            //
            //    pageSize: 20,
            //    pageIndex: 1,
            //    pageTotal: '',
            //    maxSize: 5,
            //    numPages: ''
            //};
            //
            //$scope.DataList = {
            //    list: []
            //};


            /** 获取数据
             * type: 1|2
             * 1: 社区达人
             * 2: 达人申请
             */
                // var apiScoket = simpleCons.domain + '/manage/experts';
                //  审核状态 初始化
            $scope.list_param = {status: 2, page: 1, limit: 10};
            $scope.getData = function (page) {
                $scope.list_param.page = page ? page : $scope.list_param.page;
                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts',
                    data: $scope.list_param,
                    //{
                    //    status: $scope.list_param.status,
                    //    page: $scope.Page.pageIndex,
                    //    limit: $scope.Page.pageSize
                    //},
                    success: function (json) {
                        //$scope.DataList = {list: []};
                        //$scope.Page.pageTotal = res.count;
                        //// $scope.DataList.list = $scope.DataList.list.concat(res.data.list);
                        //angular.extend($scope.DataList.list, res.data.list);
                        $scope.list = json.data.list;
                        $scope.totalItems = json.count;
                        $scope.itemsPerPage = $scope.list_param.limit;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    }
                });
                //if (type) {
                //    // if ($scope.Page.tab != type) {
                //    // $scope.DataList = {
                //    //     list: []
                //    // };
                //    $scope.Page.tab = type;
                //    // };
                //}
                //
                //if ($scope.Page.tab == 1) {
                //    // 社区达人列表
                //    widget.ajaxRequest({
                //        scope: $scope,
                //        url: '/manage/experts',
                //        data: {
                //            status: $scope.list_param.status,
                //            page: $scope.Page.pageIndex,
                //            limit: $scope.Page.pageSize
                //        },
                //        success: function (res) {
                //            $scope.DataList = {list: []};
                //            $scope.Page.pageTotal = res.count;
                //            // $scope.DataList.list = $scope.DataList.list.concat(res.data.list);
                //            angular.extend($scope.DataList.list, res.data.list);
                //        }
                //    });
                //} else {
                //    // 达人申请列表
                //    widget.ajaxRequest({
                //        scope: $scope,
                //        url: '/manage/experts/applys',
                //        data: {
                //            page: $scope.Page.pageIndex,
                //            limit: $scope.Page.pageSize
                //        },
                //        success: function (res) {
                //            $scope.DataList = {list: []};
                //            $scope.Page.pageTotal = res.count;
                //            // $scope.DataList.list = $scope.DataList.list.concat(res.data.list);
                //            angular.extend($scope.DataList.list, res.data.list);
                //            console.log($scope.DataList);
                //        }
                //    });
                //}
            };
            $scope.getData();


            // 移除达人
            $scope.removeTalent = function (id) {
                if (!id) return;

                if (!confirm('你确定要移除达人吗？')) {
                    return false;
                }

                widget.ajaxRequest({
                    scope: $scope,
                    url: '',
                    data: {},
                    success: function (res) {
                        widget.msgToast('达人移除成功');
                        $scope.getData(1);
                    }
                });
            };


            // 达人状态修改
            $scope.change_status = function (id, status) {
                if (!id) return;

                //switch (status) {
                //    case '1':
                //        status = 2;
                //        break;
                //    case '2':
                //        status = 1;
                //        break;
                //}

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/handle',
                    data: {
                        uid: id,
                        status: status
                    },
                    success: function (res) {
                        if (res.data == 1) {
                            widget.msgToast('成功');
                            $scope.getData();
                        } else {
                            widget.msgToast('失败');
                        }
                    }
                });
            };

            // 约吧
            $scope.meet_list = function (user_id, index) {
                var modalInstance = $modal.open({
                    templateUrl: 'meet_list.html',
                    controller: function ($scope, $modalInstance) {
                        var sup_index = index;
                        $scope.list_param = {count: 20, page: 1};
                        $scope.list_param.user_id = user_id;
                        var list_url = simpleCons.domain + '/manage/experts/meet/list';
                        $scope.getapi = function (page) {
                            $rootScope.loading = true;
                            $scope.list_param.page = page ? page : $scope.list_param.page;
                            $http.post(list_url, $scope.list_param)
                                .success(function (json) {
                                    if (json.code == 0) {
                                        $scope.meet_list = json.data;
                                        $scope.totalItems = json.count;
                                        $scope.itemsPerPage = $scope.list_param.count;
                                        $scope.currentPage = page ? page : $scope.list_param.page;
                                        $scope.maxSize = '5';
                                        $scope.numPages = '';
                                        $rootScope.loading = false;
                                    } else {
                                        widget.msgToast(json.msg);
                                    }
                                });
                        }
                        $scope.getapi(1);
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    size: 'lg'
                });
            }
            // 感谢
            $scope.thxs_list = function (user_id, index) {
                var modalInstance = $modal.open({
                    templateUrl: 'meet_list.html',
                    controller: function ($scope, $modalInstance) {
                        var sup_index = index;
                        $scope.list_param = {count: 20, page: 1};
                        $scope.list_param.user_id = user_id;
                        var list_url = simpleCons.domain + '/manage/experts/thxs/list';
                        $scope.getapi = function (page) {
                            $rootScope.loading = true;
                            $scope.list_param.page = page ? page : $scope.list_param.page;
                            $http.post(list_url, $scope.list_param)
                                .success(function (json) {
                                    if (json.code == 0) {
                                        $scope.meet_list = json.data;
                                        $scope.totalItems = json.count;
                                        $scope.itemsPerPage = $scope.list_param.count;
                                        $scope.currentPage = page ? page : $scope.list_param.page;
                                        $scope.maxSize = '5';
                                        $scope.numPages = '';
                                        $rootScope.loading = false;
                                    } else {
                                        widget.msgToast(json.msg);
                                    }
                                });
                        }
                        $scope.getapi(1);
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };
                    },
                    size: 'lg'
                });
            }
            // 问吧
            $scope.ask_list = function (eid, index) {
                var modalInstance = $modal.open({
                    templateUrl: 'ask_list.html',
                    controller: function ($scope, $modalInstance) {
                        var sup_index = index;
                        var sup_scope = $scope;
                        $scope.list_param = {count: 20, page: 1};
                        $scope.list_param.eid = eid;
                        $scope.list_param.has_replied = 0;
                        var list_url = simpleCons.domain + '/manage/experts/feed/list';
                        $scope.getapi = function (page) {
                            $rootScope.loading = true;
                            $scope.list_param.page = page ? page : $scope.list_param.page;
                            $http.post(list_url, $scope.list_param)
                                .success(function (json) {
                                    if (json.code == 0) {
                                        $scope.ask_list = json.data;
                                        $scope.totalItems = json.count;
                                        $scope.itemsPerPage = $scope.list_param.count;
                                        $scope.currentPage = page ? page : $scope.list_param.page;
                                        $scope.maxSize = '5';
                                        $scope.numPages = '';
                                        $rootScope.loading = false;
                                    } else {
                                        widget.msgToast(json.msg);
                                    }
                                });
                        }
                        $scope.getapi(1);
                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

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
                                        $scope.comments_add_url = simpleCons.domain + '/manage/experts/feed/post';
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
                        // 反馈详情
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
                    },
                    size: 'lg'
                });
            }


            // 搜索代码
            $rootScope.searchkeyword = function (event) {
                if (event.keyCode !== 13) return;
                //$scope.getapi(1);
                $scope.getData();
            };
        })


    /** 达人添加
     * url: talent/add.htm
     * @params:
     */
        .controller('talentAddController', function ($http,
                                                     $modal,
                                                     $state,
                                                     $scope,
                                                     $filter,
                                                     $rootScope,
                                                     $stateParams,
                                                     FileUploader,
                                                     widget) {
            $scope.hasimages = true;
            $scope.showinfo = false;
            $scope.tel = parseInt($stateParams.tel, 0) || '';
            $scope.eid = parseInt($stateParams.eid, 0) || '';
            $scope.tInput = {
                banner: [],
                images: [],
                gender: '2'
            };
            $scope.talentTemp = {
                activityId: '',
                topicId: '',
                tagId: '',
                tagName: '',
                birthday: ''
            };

            // 查找用户更新
            $scope.searchUser = function (tel) {
                if (!tel) return;

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/info',
                    data: {
                        tel: tel,
                        eid: $scope.eid
                    },
                    success: function (res) {
                        var data = res.data;

                        $scope.showinfo = true;

                        $scope.tInput = {
                            banner: [],
                            images: []
                        };
                        //  hbb add  community includes excludes
                        $scope.init_ids = function () {
                            $scope.tInput.ids = {// 小区名单
                                old: [],
                                new: []
                            }
                        }
                        $scope.init_ids();
                        angular.forEach(data.includes, function (val, key) {
                            data.includes[key].new_community_id = val.community_id;
                            data.includes[key].new_community = val.community_name;
                            data.includes[key].community_name = val.community_name;
                        });
                        angular.forEach(data.excludes, function (val, key) {
                            data.excludes[key].new_community_id = val.community_id;
                            data.excludes[key].new_community = val.community_name;
                            data.excludes[key].community_name = val.community_name;
                        });
                        if (data.includes.length == 0 && data.excludes.length == 0) {
                            $scope.tInput.target_type = 0;
                        } else if (data.includes.length > 0) {
                            //查到new list 里 不要查到old 里面 可以编辑
                            $scope.tInput.target_type = 1;
                            $scope.tInput.ids.new = data.includes;
                        } else if (data.excludes.length > 0) {
                            $scope.tInput.target_type = 2;
                            $scope.tInput.ids.new = data.excludes;
                        }
                        //

                        angular.extend($scope.tInput, {
                            uid: data.baseInfo.uid,
                            mobile: data.baseInfo.mobile || '',
                            birthday: data.baseInfo.birthday || '',
                            community_name: data.baseInfo.community_name || '',
                            name: data.baseInfo.name || '',
                            gender: data.baseInfo.gender || '2',
                            tags: data.expert.tags || [],
                            eid: data.expert.eid || '',
                            short_des: data.expert.short_des || '',
                            des: data.expert.des || '',
                            sers: data.expert.sers || [],
                            wan: data.expert.wan || [],
                            on_top: data.expert.on_top || 0,
                            topics: data.expert.topics || []
                        });

                        if (data.expert && data.expert.pic && data.expert.pic.pic_url) {
                            $scope.tInput.banner = [{
                                url: data.expert.pic && data.expert.pic.pic_url || '',
                                width: data.expert.pic && data.expert.pic.pic_width || '',
                                height: data.expert.pic && data.expert.pic.pic_height || ''
                            }];
                        }

                        angular.forEach(data.expert.des_pic, function (v, k) {
                            $scope.tInput.images.push({
                                url: v.pic_url,
                                width: v.pic_width,
                                height: v.pic_height
                            });
                        });


                        angular.forEach($scope.tInput.sers, function (v, k) {
                            if (!v.ser_time) return;

                            var arr = v.ser_time.split(',');

                            v.timer = [false, false, false, false, false];

                            angular.forEach(arr, function (item, key) {
                                v.timer[item - 1] = true;
                            });
                        });


                        if ($scope.tInput.birthday) {
                            $scope.tInput.birthday = $scope.tInput.birthday.split(' ')[0];
                        }

                        // 生日
                        $scope.strToDateTime = function (str) {
                            var arr = str.split('-'),
                                oDate = new Date(arr.join('/'));
                            return oDate;
                        }
                        $scope.talentTemp.birthday = $scope.strToDateTime($scope.tInput.birthday);

                        $scope.openedstart = false;
                        $scope.openstart = function ($event) {
                            $event.preventDefault();
                            $event.stopPropagation();
                            $scope.openedstart = true;
                        };
                        $scope.changeDate = function () {
                            $scope.tInput.birthday = $filter('date')($scope.talentTemp.birthday, 'yyyy-MM-dd');
                        };

                        $scope.hasimages = false;
                    }
                });
            };
            $scope.searchUser($scope.tel);


            // 获取标签列表
            $scope.getLabel = function () {
                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/labels',
                    data: {
                        page: 1,
                        limit: 99999999
                    },
                    success: function (res) {
                        $scope.ListLabel = res.data.list;
                    }
                });
            };
            $scope.getLabel();


            // 选择添加标签
            $scope.addLabel = function () {
                var state = false;

                if ($scope.tInput.tags.length >= 2) {
                    widget.msgToast('标签最多添加2个');
                    return;
                }

                angular.forEach($scope.tInput.tags, function (v, k) {
                    if (state) return;

                    if (v.lid == $scope.talentTemp.tagId) {
                        state = true;
                    }
                });

                if (!state) {
                    angular.forEach($scope.ListLabel, function (v, k) {
                        if (v.lid == $scope.talentTemp.tagId) {
                            $scope.talentTemp.tagName = v.name;
                            return;
                        }
                    });

                    $scope.tInput.tags.push({
                        lid: $scope.talentTemp.tagId,
                        name: $scope.talentTemp.tagName
                    });
                }


            };

            // 添加达人服务
            $scope.addService = function () {
                $scope.tInput.sers.push({
                    sid: '',
                    name: '',
                    des: '',
                    charge: '',
                    meet: '',
                    ser_time: 1
                });
            };


            // 删除达人服务
            $scope.removeService = function (params) {
                if (!params.sid) {
                    $scope.tInput.sers.splice(params.key, 1);
                    return;
                }

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/sers/del',
                    data: {
                        sid: params.sid
                    },
                    success: function (res) {
                        if (res.data != 1) {
                            widget.msgToast('删除失败');
                            return;
                        }
                        $scope.tInput.sers.splice(params.key, 1);
                    }
                });
            };


            // 添加活动
            $scope.addActivity = function (id) {
                if (!id) return;

                var error = false;

                angular.forEach($scope.tInput.wan, function (v, k) {
                    if (error) return;

                    if (v.activity_id == id) {
                        error = true;
                    }
                });

                if (error) {
                    widget.msgToast('该活动你已经添加了，不要重复添加');
                    return;
                }

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/activity',
                    data: {
                        aid: id
                    },
                    success: function (res) {
                        if (res.data.length == 0) return;

                        $scope.tInput.wan.push({
                            activity_id: res.data.activity_id,
                            activity_title: res.data.activity_title
                        });
                        $scope.talentTemp.activityId = '';
                    }
                });
            };


            // 添加话题
            $scope.addTopic = function (id) {
                if (!id) return;

                var error = false;

                angular.forEach($scope.tInput.topics, function (v, k) {
                    if (error) return;

                    if (v.topic_id == id) {
                        error = true;
                    }
                });

                if (error) {
                    widget.msgToast('该话题你已经添加了，不要重复添加');
                    return;
                }

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/topic',
                    data: {
                        tid: id
                    },
                    success: function (res) {
                        if (res.data.length == 0) return;

                        $scope.tInput.topics.push({
                            topic_id: res.data.topic_id,
                            title: res.data.title
                        });
                        $scope.talentTemp.topicId = '';
                    }
                });
            };


            $scope.toBack = function () {
                window.history.back();
            };


            // 添加达人
            $scope.saveTalent = function () {
                var error = false;

                if ($scope.tInput.gender != 0 && $scope.tInput.gender != 1 && $scope.tInput.gender != 2) {
                    widget.msgToast('性别都没有，真是鸟人啊');
                    return;
                }

                if (!$scope.tInput.birthday) {
                    widget.msgToast('做人要有生日，你不是天使啊');
                    return;
                }

                if ($scope.tInput.tags.length == 0) {
                    widget.msgToast('请添加一个标签吧，不填你就别想添加了。。。');
                    return;
                }

                if (!$scope.tInput.short_des) {
                    widget.msgToast('达人简介不能为空');
                    return;
                }

                if (!$scope.tInput.des) {
                    widget.msgToast('达人介绍不能为空');
                    return;
                }

                if ($scope.tInput.banner.length == 0 || !$scope.tInput.banner[0].url) {
                    widget.msgToast('请上传顶部图片');
                    return;
                }

                if ($scope.tInput.images.length == 0) {
                    widget.msgToast('请上传介绍图片');
                    return;
                }

                if ($scope.tInput.sers.length == 0) {
                    widget.msgToast('速度去添加一个服务再来戳');
                    return;
                }

                if ($scope.tInput.sers.length > 0) {
                    angular.forEach($scope.tInput.sers, function (v, k) {
                        if (error) return;

                        if (!v.name) {
                            widget.msgToast('服务标题不能为空');
                            error = true;
                        }

                        if (!v.des) {
                            widget.msgToast('服务内容介绍不能为空');
                            error = true;
                        }


                        //if (!v.charge) {
                        //    widget.msgToast('收费方式不能为空');
                        //    error = true;
                        //}
                    });
                }

                angular.forEach($scope.tInput.images, function (v, k) {
                    if (!v.url) {
                        $scope.tInput.images.splice(k, 1);
                    }
                });

                if (error) return;

                angular.forEach($scope.tInput.sers, function (v, k) {
                    v.ser_time = '';
                    angular.forEach(v.timer, function (item, key) {
                        var key = parseInt(key, 0);

                        if (item) {
                            if (!v.ser_time) {
                                v.ser_time = key + 1;
                            } else {
                                v.ser_time += ',' + (key + 1);
                            }
                        }
                    });
                });

                // 提交小区范围
                $scope.tInput.includes = '';
                $scope.tInput.excludes = '';
                $scope.tmp_community_info = [];
                if ($scope.tInput.ids && $scope.tInput.ids.new.length > 0) {
                    angular.forEach($scope.tInput.ids.new, function (val, key) {
                        $scope.tmp_community_info.push(val.new_community_id);
                    });
                }
                if ($scope.tInput.target_type == 1) {
                    $scope.tInput.includes = $scope.tmp_community_info.join(',');
                } else if ($scope.tInput.target_type == 2) {
                    $scope.tInput.excludes = $scope.tmp_community_info.join(',');
                }
                //

                var jsonData = {
                    eid: $scope.tInput.eid,
                    uid: $scope.tInput.uid,
                    gender: $scope.tInput.gender,
                    bir: $scope.tInput.birthday,
                    tags: '',
                    short_des: $scope.tInput.short_des,
                    des: $scope.tInput.des,
                    pic: $scope.tInput.banner,
                    des_pic: $scope.tInput.images,
                    sers: $scope.tInput.sers,
                    wan: '',
                    topic: '',
                    on_top: $scope.tInput.on_top,
                    includes: $scope.tInput.includes,
                    excludes: $scope.tInput.excludes
                };

                angular.forEach($scope.tInput.tags, function (v, k) {
                    if (jsonData.tags) {
                        jsonData.tags += ',' + v.lid;
                    } else {
                        jsonData.tags = v.lid;
                    }
                });

                angular.forEach($scope.tInput.wan, function (v, k) {
                    if (jsonData.wan) {
                        jsonData.wan += ',' + v.activity_id;
                    } else {
                        jsonData.wan = v.activity_id;
                    }
                });

                angular.forEach($scope.tInput.topics, function (v, k) {
                    if (jsonData.topic) {
                        jsonData.topic += ',' + v.topic_id;
                    } else {
                        jsonData.topic = v.topic_id;
                    }
                });

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/add',
                    data: jsonData,
                    success: function (res) {
                        if ($scope.tInput.eid) {
                            widget.msgToast('达人修改成功');
                            $state.go('talent', {tab: 1});
                        } else {
                            widget.msgToast('达人添加成功');
                            $state.go('talent', {tab: 2});
                        }
                    }
                });
            };
        })


    /** 达人标签
     * url: talent/tag.htm
     * @params:
     */
        .controller('talentTagController', function ($scope,
                                                     $http,
                                                     $rootScope,
                                                     $modal,
                                                     $stateParams,
                                                     widget) {
            $scope.hasimages = true;
            // 页面初始化配置
            $scope.Page = {
                tab: $stateParams.tab || 1,

                pageSize: 20,
                pageIndex: 1,
                pageTotal: '',
                maxSize: 5,
                numPages: ''
            };

            $scope.DataList = {
                label: []
            };

            // 获取达人标签
            var that = $scope;
            that.getData = function () {
                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/labels',
                    data: {
                        page: $scope.Page.pageIndex,
                        limit: $scope.Page.pageSize
                    },
                    success: function (res) {
                        $scope.DataList = {list: []};
                        $scope.Page.pageTotal = res.count;
                        angular.extend($scope.DataList.list, res.data.list);
                    }
                });
            };
            that.getData();

            // 删除标签
            $scope.delLabel = function (id) {
                if (!id) return;

                if (!confirm('你确定删除标签吗？')) return false;

                widget.ajaxRequest({
                    scope: $scope,
                    url: '/manage/experts/labels/del',
                    data: {
                        lid: id
                    },
                    success: function (res) {
                        widget.msgToast('删除达人标签成功');
                        $scope.getData();
                    }
                });
            };

            // 添加修改标签
            $scope.addLabel = function (lid) {
                var res = {};
                if (lid) {
                    angular.forEach($scope.DataList.list, function (v, k) {
                        if (v.lid == lid) {
                            var img = (v.url && v.url != '0') ? [{url: v.url, width: v.width, height: v.height}] : [];
                            res = {
                                lid: v.lid,
                                name: v.name,
                                images: img
                            }
                        }
                    });
                }

                var modalInstance = $modal.open({
                    templateUrl: 'add_tag.html',
                    controller: function ($scope, $modalInstance) {
                        $scope.tInput = angular.extend({images: []}, res);
                        $scope.hasimages = false;

                        $scope.cancel = function () {
                            $modalInstance.dismiss('cancel');
                        };

                        $scope.ok = function () {
                            if (!$scope.tInput.name) {
                                widget.msgToast('请输入标签名称');
                                return;
                            }
                            $scope.images = ($scope.tInput.images.length !== 0) ? $scope.tInput.images[0] : {
                                url: '',
                                width: '0',
                                height: '0'
                            };
                            widget.ajaxRequest({
                                scope: $scope,
                                url: '/manage/experts/labels/add',
                                data: {
                                    id: $scope.tInput.lid || '',
                                    name: $scope.tInput.name,
                                    url: $scope.images.url || '',
                                    width: $scope.images.width || '0',
                                    height: $scope.images.height || '0'
                                },
                                success: function (res) {
                                    if (res.data == 1) {
                                        if ($scope.tInput.lid) {
                                            widget.msgToast('修改标签成功');
                                        } else {
                                            widget.msgToast('添加标签成功');
                                        }
                                        $scope.cancel();
                                        that.getData();
                                    } else {
                                        widget.msgToast('失败');
                                    }
                                }
                            });
                        };
                    },
                    size: 'lg'
                });
            };


        });

});
