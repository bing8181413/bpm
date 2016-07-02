// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('hotTopicController', hotTopicController)
        .controller('hotTopicAddController', hotTopicAddController)
        .controller('hotTopicUpdateController', hotTopicUpdateController);

    hotTopicController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader'];
    hotTopicAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    hotTopicUpdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams'];
    function hotTopicController($scope, $http, $rootScope, $modal, FileUploader) {
        $scope.list_param = {page: 1, count: 20, category: 3};
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
            $scope.hotTopicUpdate_param = {
                topic_id: topic.topic_id,
                status: status
            };
            $http.post(
                update_url,
                $scope.hotTopicUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('状态更新成功！！');
                        $scope.topic_list[index].status = status;
                    } else {
                        alert(data.msg);
                    }
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
    function hotTopicAddController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        $scope.tiaozhuan = function () {
            $state.go('hotTopic');
        }
        $scope.hotTopicAdd_param = {
            ref_topic_id: '',
            start_time: '',
            end_time: ''
        };

        // 页面展示的数据
        $scope.hotTopicAdd = {start: {}, end: {}};
        $scope.openedstart = false;
        $scope.openedend = false;
        $scope.hotTopicAdd.start.dt = new Date();
        $scope.hotTopicAdd.start.tp = new Date();
        $scope.hotTopicAdd.end.dt = new Date();
        $scope.hotTopicAdd.end.tp = new Date();
        $scope.format = 'yyyy-MM-dd';
        $scope.hstep = 1;
        $scope.mstep = 5;
        $scope.changed = function () {
            var start = {
                dt: $scope.hotTopicAdd.start.dt,
                tp: $scope.hotTopicAdd.start.tp
            };
            var end = {
                dt: $scope.hotTopicAdd.end.dt,
                tp: $scope.hotTopicAdd.end.tp
            };
            $scope.hotTopicAdd_param.start_time = (start.dt.getFullYear() + '-' + (start.dt.getMonth() + 1)
            + '-' + start.dt.getDate() + ' ' + start.tp.getHours() + ':' + start.tp.getMinutes() + ':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            $scope.hotTopicAdd_param.end_time = (end.dt.getFullYear() + '-' + (end.dt.getMonth() + 1)
            + '-' + end.dt.getDate() + ' ' + end.tp.getHours() + ':' + end.tp.getMinutes() + ':00')
                .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
            //console.log($scope.activitynewadd_param.time + '==========' +$scope.activitynewadd_param.end_time );
        };
        $scope.changed();
        $scope.openstart = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedstart = true;
        };
        $scope.openend = function ($event) {
            $event.preventDefault();
            $event.stopPropagation();
            $scope.openedend = true;
        };

        $scope.save = function () {
            var param_tmp = 0;
            angular.forEach($scope.hotTopicAdd_param, function (value, key) {
                eval('$scope.hotTopicAdd.' + key + '=0')
                // 过滤非必填项
                if (!value || value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    console.log(key);
                    eval('$scope.hotTopicAdd.' + key + '=1');
                }
            });
            //console.log($scope.hotTopicAdd_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/topic/add_hot_topic';
            $http.post(
                url,
                $scope.hotTopicAdd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('热门话题发布成功！');
                        $state.go('hotTopic');
                    } else {
                        $scope.addAlert(data.msg);
                    }
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
    function hotTopicUpdateController($scope, $http, $rootScope, $modal, FileUploader, $state, $stateParams) {
        $scope.hotTopicUpdate_param = {};
        $scope.hotTopicUpdate = {};
        $scope.topic_id = $stateParams.topicId;
        $scope.topic_param = {topic_id: (Number($scope.topic_id) + 1), category: 3, count: 1, page: 1};
        var detail_url = simpleCons.domain + '/manage/topic/list';
        $http.post(detail_url, $scope.topic_param)
            .success(function (json) {
                if (json.code == 0) {
                    $scope.init(json.data.list[0]);
                } else {
                    $scope.addAlert(json.msg);
                }
            });
        $scope.strToDateTime = function (str) {
            str = str.toString();
            str = str.replace(/-/g, "/");
            var oDate = new Date(str);
            return oDate;
        }
        $scope.init = function (data) {
            // 3个时间 相关的数据 页面展示的数据
            //console.log(data);
            $scope.hotTopicUpdate_param = {
                ref_topic_id: data.ref_topic_id,
                start_time: data.start_time || new Date(),
                end_time: data.end_time || new Date(),
                topic_id: data.topic_id
            };
            $scope.hotTopicUpdate = {start: {}, end: {}};
            $scope.openstart = false;
            $scope.openend = false;
            $scope.hotTopicUpdate.start.dt = $scope.strToDateTime($scope.hotTopicUpdate_param.start_time);
            $scope.hotTopicUpdate.start.tp = $scope.strToDateTime($scope.hotTopicUpdate_param.start_time);
            $scope.hotTopicUpdate.end.dt = $scope.strToDateTime($scope.hotTopicUpdate_param.end_time);
            $scope.hotTopicUpdate.end.tp = $scope.strToDateTime($scope.hotTopicUpdate_param.end_time);
            $scope.changed = function () {
                var start = {
                    dt: $scope.hotTopicUpdate.start.dt,
                    tp: $scope.hotTopicUpdate.start.tp
                };
                var end = {
                    dt: $scope.hotTopicUpdate.end.dt,
                    tp: $scope.hotTopicUpdate.end.tp
                };
                $scope.hotTopicUpdate_param.start_time = (start.dt.getFullYear() + '-' + (start.dt.getMonth() + 1)
                + '-' + start.dt.getDate() + ' ' + start.tp.getHours() + ':' + start.tp.getMinutes() + ':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                $scope.hotTopicUpdate_param.end_time = (end.dt.getFullYear() + '-' + (end.dt.getMonth() + 1)
                + '-' + end.dt.getDate() + ' ' + end.tp.getHours() + ':' + end.tp.getMinutes() + ':00')
                    .replace(/([\-\: ])(\d{1})(?!\d)/g, '$10$2');
                //console.log($scope.activitynewupdate_param.time + '==========' +$scope.activitynewupdate_param.end_time + "==========" +$scope.activitynewupdate_param.apply_end_time  );
            };
            $scope.changed();
            $scope.open_start = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openstart = true;
            };
            $scope.open_end = function ($event) {
                $event.preventDefault();
                $event.stopPropagation();
                $scope.openend = true;
            };
        }
        $scope.save = function () {
            //console.log($scope.hotTopicUpdate_param);
            var param_tmp = 0;
            angular.forEach($scope.hotTopicUpdate_param, function (value, key) {
                eval('$scope.hotTopicUpdate.' + key + '=0')
                // 过滤非必填项
                if (!value || value == '') {
                    param_tmp++;
                    $scope.addAlert('有必填项未填写！');
                    console.log(key);
                    eval('$scope.hotTopicUpdate.' + key + '=1');
                }
            });

            //console.log($scope.hotTopicUpdate_param);
            if (param_tmp > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/topic/update_hot_topic';
            $http.post(
                url,
                $scope.hotTopicUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('热门话题更新成功！');
                        $state.go('hotTopic');
                    } else {
                        $scope.addAlert(data.msg);
                    }
                });
        }

        $scope.tiaozhuan = function () {
            $state.go('hotTopic');
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
});
