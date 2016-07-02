// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('topicController', topicController)
        .controller('topicAddController', topicAddController)
        .controller('topicUpdateController', topicUpdateController);

    topicController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader'];
    topicAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams', '$filter', 'widget'];
    topicUpdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams', '$filter', 'widget'];
    function topicController($scope, $http, $rootScope, $modal, FileUploader) {
        $scope.list_param = {page: 1, count: 20, category: 1};
        $scope.list_param.keyword = $scope.search;
        var list_url = simpleCons.domain + '/manage/topic/list';
        $scope.getapi = function (page) {
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.topic_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        $scope.addAlert(json.msg);
                    }
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
        var update_url = simpleCons.domain + '/manage/topic/update_topic';
        $scope.update = function (topic, status, index) {
            if (!confirm('确定要修改这个状态吗？')) {
                return false;
            }
            $scope.topicUpdate_param = {
                topic_id: topic.topic_id,
                status: status
            };
            $http.post(
                update_url,
                $scope.topicUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('状态更新成功！！');
                        $scope.topic_list[index].status = status;
                    } else {
                        alert(data.msg);
                    }
                });

        }
    };
    function topicAddController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams, $filter, widget) {
        var sup_scope = $scope;
        $scope.topic_types = [
            {id: 1, name: 'Native 话题'},
            {id: 2, name: 'H5话题'}
        ];
        $scope.topicAdd_param = {
            title: '',
            tag: '',
            activity_id: '',
            start_time: new Date(),
            end_time: new Date(),
            pics_list: '',
            topic_type: 1,
            url: '',
            content: ''
            //target_type: 2,
            //community_info: ''
        };
        $scope.topicAdd = {
            start_time:new Date(),
            end_time: new Date(),
            pics_list: [],
            target_type: 0,
            ids: {
                old: [],
                new: []
            }
        };

        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.topicAdd.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        //8 张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.topicAdd.pics_list, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.topicAdd_param.pics_list = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.topicAdd_param.includes = '';
            $scope.topicAdd_param.excludes = '';
            $scope.tmp_community_info = [];
            if ($scope.topicAdd.ids && $scope.topicAdd.ids.new.length > 0) {
                angular.forEach($scope.topicAdd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.topicAdd.target_type == 1) {
                $scope.topicAdd_param.includes = $scope.tmp_community_info.join(',');
            } else if ($scope.topicAdd.target_type == 2) {
                $scope.topicAdd_param.excludes = $scope.tmp_community_info.join(',');
            }
        }
        $scope.save = function () {
            $scope.get_pics_info();
            $scope.get_community();
            $scope.topicAdd_param.start_time = $filter('date')($scope.topicAdd.start_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.topicAdd_param.end_time = $filter('date')($scope.topicAdd.end_time, 'yyyy-MM-dd HH:mm:ss');

            var err = 0;
            //console.log($scope.topicAdd_param);
            angular.forEach($scope.topicAdd_param, function (value, key) {
                // 过滤非必填项
                if (key != 'activity_id' && key != 'url' && key != 'community_info' && key != 'pics_info'
                    && key != 'includes' && key != 'excludes' && value == '') {
                    err++;
                    widget.msgToast('有必填项未填写！' + key);
                    console.log(key);
                }
                if ($scope.topicAdd_param.url == '' && $scope.topicAdd_param.topic_type == 2) {
                    err++;
                    widget.msgToast('URL未填写！');
                }
                if ($scope.topicAdd_param.community_info == '' && $scope.topicAdd_param.target_type != 2) {
                    err++;
                    widget.msgToast('没有选择小区！');
                }
            });
            console.log($scope.topicAdd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/topic/add_topic';
            $http.post(
                url,
                $scope.topicAdd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        widget.msgToast('话题发布成功！');
                        $state.go('topic');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function topicUpdateController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams, widget) {
        $scope.topic_id = $stateParams.topicId;
        $scope.topic_types = [
            {id: '1', name: 'Native 话题'},
            {id: '2', name: 'H5话题'}
        ];
        $scope.iscompleted = false;
        //更新
        $scope.topic_param = {topic_id: $scope.topic_id};
        var detail_url = simpleCons.domain + '/manage/topic/detail';
        $http.post(detail_url, $scope.topic_param)
            .success(function (json) {
                if (json.code == 0) {
                    $scope.init(json.data);
                    $scope.iscompleted = true;
                } else {
                    widget.msgToast(json.msg);
                }
            });
        $scope.init = function (data) {
            // 3个时间 相关的数据 页面展示的数据
            $scope.topicUpdate = {};
            $scope.image_oldshow = {img: data.image};
            $scope.topicUpdate_param = {
                topic_id: data.topic_id,
                title: data.title,
                tag: data.tags[0],
                activity_id: data.activity_id,
                start_time: data.start_time || new Date(),
                end_time: data.end_time || new Date(),
                //pics_info: data.pics,
                topic_type: data.topic_type,
                url: data.url,
                content: data.content
                //target_type: data.target_type,
                //community_info: data.communities
            };
            $scope.topicUpdate_oldshow = {
                //community_info: data.communities,
                pics_info: [],
                ids: {// 小区名单
                    old: [],
                    new: []
                },
            }
            //图片格式化字段
            angular.forEach(data.pics, function (val, key) {
                $scope.topicUpdate_oldshow.pics_info.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            angular.forEach(data.includes, function (val, key) {
                data.includes[key].new_community = val.community_name;
                data.includes[key].new_community_id = val.community_id;
            });
            angular.forEach(data.excludes, function (val, key) {
                data.excludes[key].new_community = val.community_name;
                data.excludes[key].new_community_id = val.community_id;
            });
            if (data.includes.length == 0 && data.excludes.length == 0) {
                $scope.topicUpdate_oldshow.target_type = 0;
            } else if (data.includes.length > 0) {
                //查到new list 里 不要查到old 里面 可以编辑
                $scope.topicUpdate_oldshow.target_type = 1;
                $scope.topicUpdate_oldshow.ids.new = data.includes;
            } else if (data.excludes.length > 0) {
                $scope.topicUpdate_oldshow.target_type = 2;
                $scope.topicUpdate_oldshow.ids.new = data.excludes;
            }


        };
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.topicUpdate_oldshow.pics_info, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.topicUpdate_param.pics_list = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.topicUpdate_param.includes = '';
            $scope.topicUpdate_param.excludes = '';
            $scope.tmp_community_info = [];
            if ($scope.topicUpdate_oldshow.ids && $scope.topicUpdate_oldshow.ids.new.length > 0) {
                angular.forEach($scope.topicUpdate_oldshow.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.topicUpdate_oldshow.target_type == 1) {
                $scope.topicUpdate_param.includes = $scope.tmp_community_info.join(',');
            } else if ($scope.topicUpdate_oldshow.target_type == 2) {
                $scope.topicUpdate_param.excludes = $scope.tmp_community_info.join(',');
            }
        }
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.topicUpdate_oldshow.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        $scope.save = function () {
            var err = 0;
            $scope.get_pics_info();
            $scope.get_community();

            angular.forEach($scope.topicUpdate_param, function (value, key) {
                // 过滤非必填项
                if (key != 'image' && key != 'city' && key != 'stock' && key != 'sort_num' &&
                    key != 'community_info' && key != 'url' && key != 'excludes' && key != 'includes' &&
                    value == '') {
                    err++;
                    widget.msgToast('有必填项未填写！' + key);
                }
                if ($scope.topicUpdate_param.url == '' && $scope.topicUpdate_param.topic_type == 2) {
                    err++;
                    widget.msgToast('URL未填写！');
                }
                if ($scope.topicUpdate_param.topicUpdate_param == '' && $scope.topicUpdate_param.target_type != 2) {
                    err++;
                    widget.msgToast('没有选择小区！');
                }
            });

            console.log($scope.topicUpdate_param);
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/topic/update_topic';
            $http.post(
                url,
                $scope.topicUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('话题发布成功！');
                        $state.go('topic');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });
        }
    }
});
