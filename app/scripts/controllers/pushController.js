// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('pushController', pushController)
    mod.controller('pushAddController', pushAddController)

    pushController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$stateParams', '$state', '$filter'];
    pushAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', 'widget'];
    function pushController($scope, $http, $rootScope, $modal, $stateParams, $filter) {
        $scope.list_param = {page: 1, count: 20, push_status: 3};
        //var list_url = simpleCons.domain + '/manage/market/push/list';
        var list_url = simpleCons.domain + '/manage/push/sys/list';
        $scope.getapi = function (page, push_status) {
            $scope.list_param.keyword = $rootScope.search;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.push_status = push_status ? push_status : $scope.list_param.push_status;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        // 发送日期转化
                        angular.forEach(json.data.list, function (val, key) {
                            if (val.send_time !== 0) {
                                val.send_time = $filter('date')(val.send_time + '000', 'yyyy-MM-dd HH:mm:ss');
                            }else{
                                val.send_time = '立即发送';
                            }
                        });
                        $scope.push_list = json.data.list;
                        $scope.totalItems = json.data.total;
                        $scope.itemsPerPage = $scope.list_param.count;
                        $scope.currentPage = page ? page : $scope.list_param.page;
                        $scope.maxSize = '5';
                        $scope.numPages = '';
                    } else {
                        alert(json.msg);
                    }
                }).error(function (err, status, sss) {
                    console.log(err, status, sss);
                    //$scope.getapi();
                });
        }
        $scope.getapi(1);
        $rootScope.searchkeyword = function (event) {
            if (event.keyCode !== 13) return;
            $scope.getapi(1);
        }
    };

    function pushAddController($scope, $http, $rootScope, $modal, $state, widget) {
        $scope.pushadd_param = {scope_type: 0, param: {}, scope_type: 0};
        $scope.pushadd = {
            images: [],
            param_type: 1,
            param: {},
            ids: {// 小区名单
                old: [],
                new: []
            }
        };
        $scope.default_param = {url: 0, activity_id: 0, topic_id: 0, feed_id: 0};
        // 改变消息跳转页面 的事件
        $scope.default_param_change = function (param) {
            if (param == 'url') {
                $scope.default_param.url = 1;
                $scope.default_param.activity_id = $scope.default_param.topic_id = $scope.default_param.feed_id = 0;
                delete $scope.pushadd.param.activity_id;
                delete $scope.pushadd.param.topic_id;
                delete $scope.pushadd.param.feed_id;
            } else if (param == 'activity_id') {
                $scope.default_param.activity_id = 1;
                $scope.default_param.topic_id = $scope.default_param.url = $scope.default_param.feed_id = 0;
                delete $scope.pushadd.param.topic_id;
                delete $scope.pushadd.param.url;
                delete $scope.pushadd.param.feed_id;
            } else if (param == 'topic_id') {
                $scope.default_param.topic_id = 1;
                $scope.default_param.activity_id = $scope.default_param.url = $scope.default_param.feed_id = 0;
                delete $scope.pushadd.param.activity_id;
                delete $scope.pushadd.param.url;
                delete $scope.pushadd.param.feed_id;
            } else if (param == 'feed_id') {
                $scope.default_param.feed_id = 1;
                $scope.default_param.activity_id = $scope.default_param.url = $scope.default_param.topic_id = 0;
                delete $scope.pushadd.param.activity_id;
                delete $scope.pushadd.param.url;
                delete $scope.pushadd.param.topic_id;
            } else {
                $scope.default_param.activity_id = $scope.default_param.url = $scope.default_param.topic_id = $scope.default_param.feed_id = 0;
                delete $scope.pushadd.param.activity_id;
                delete $scope.pushadd.param.url;
                delete $scope.pushadd.param.topic_id;
                delete $scope.pushadd.param.feed_id;
            }
        }
        // 获取小区的ids
        $scope.get_community = function () {
            $scope.tmp_community_info = [];
            if ($scope.pushadd_param.scope_type !== 0) {
                $scope.pushadd_param.community_ids = '';
            } else {
                if ($scope.pushadd.ids && $scope.pushadd.ids.new.length > 0) {
                    angular.forEach($scope.pushadd.ids.new, function (val, key) {
                        $scope.tmp_community_info.push(val.new_community_id);
                    });
                }
                $scope.pushadd_param.community_ids = $scope.tmp_community_info.join(',');
            }

        }
        var showMsg = function (val) {
            widget.msgToast(val, 1500);
            return false;
        }
        $scope.save = function () {
            if (!$scope.pushadd_param.title) {
                $scope.pushadd.title = 1;
                return showMsg('请填写消息标题');
            }
            if (!$scope.pushadd_param.content) {
                $scope.pushadd.content = 1;
                return showMsg('请填写内容');
            }
            if ($scope.pushadd.images[0]) {
                $scope.pushadd_param.image = $scope.pushadd.images[0].url || '';
            }
            if ($scope.pushadd.ids && $scope.pushadd.ids.empty_community_num > 0) {
                return showMsg('没有选择完成小区');
            } else {
                $scope.get_community();
            }
            if ($scope.pushadd.param_type == 2 && (!$scope.pushadd.param.url || $scope.pushadd.param.url == '')) {
                console.log($scope.pushadd.param.url);
                $scope.pushadd.param_hasval = 1;
                return showMsg('请填写url');
            } else if ($scope.pushadd.param_type == 3 && (!$scope.pushadd.param.activity_id || $scope.pushadd.param.activity_id == '')) {
                $scope.pushadd.param_hasval = 1;
                return showMsg('请填写活动ID');
            } else if ($scope.pushadd.param_type == 4 && (!$scope.pushadd.param.topic_id || $scope.pushadd.param.topic_id == '')) {
                $scope.pushadd.param_hasval = 1;
                return showMsg('请填写话题ID');
            } else if ($scope.pushadd.param_type == 5 && (!$scope.pushadd.param.feed_id || $scope.pushadd.param.feed_id == '')) {
                $scope.pushadd.param_hasval = 1;
                return showMsg('请填写邻里圈ID');
            }
            $scope.pushadd_param.param = JSON.stringify($scope.pushadd.param);
            console.log($scope.pushadd_param);
            //var add_url = simpleCons.domain + '/manage/market/push/add';
            var add_url = simpleCons.domain + '/manage/push/sys/post';
            $http.post(add_url, $scope.pushadd_param)
                .success(function (json) {
                    if (json.code == 0) {
                        alert('添加成功');
                        $state.go('push');
                    } else {
                        alert(json.msg);
                    }
                }).error(function (err) {
                    console.log('error');
                });
        }
    };
});
