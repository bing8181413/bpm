// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('bannerController', bannerController)
        .controller('bannerAddController', bannerAddController)
        .controller('bannerUpdateController', bannerUpdateController);

    bannerController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$stateParams', '$state', 'widget'];
    bannerAddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams', 'widget'];
    bannerUpdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$stateParams', 'widget'];
    function bannerUpdateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.isActivityBanner = $stateParams.isActivityBanner || 0;
        var sup_scope = $scope;
        $scope.bannerUpdate_param = {};
        $scope.bannerUpdate_param.category = $stateParams.category || 1;
        $scope.bannerUpdate = {
            target_type: 1,
            pics_info: [],
            param: {},
            param_type: 1
        }
        $scope.categoryname = '未知';
        switch ($scope.bannerUpdate_param.category) {
            case "1":
                $scope.categoryname = "活动首页";
                break;
            case "2":
                $scope.categoryname = "邻里圈";
                break;
            case "3":
                $scope.categoryname = "邻邻帮";
                break;
            case "4":
                $scope.categoryname = "拼团";
                break;
            case "5":
                $scope.categoryname = "发现";
                break;
            case "6":
                $scope.categoryname = "服务号首页";
                break;
        }
        $rootScope.bannerObj = angular.extend($rootScope.bannerObj, {});
        if ($rootScope.bannerObj.include_ids == '' && $rootScope.bannerObj.exclude_ids == '') {
            $scope.bannerUpdate.target_type = 0;
        } else if ($rootScope.bannerObj.include_ids != '') {
            $scope.bannerUpdate.target_type = 1;
        } else {
            $scope.bannerUpdate.target_type = 2;
        }
        $scope.bannerUpdate_param = angular.extend($scope.bannerUpdate_param, {
            banner_id: $rootScope.bannerObj.banner_id,
            title: $rootScope.bannerObj.title || '',
            category: $stateParams.category || 1,
            pic_url: $rootScope.bannerObj.pic_url || '',
            pic_width: $rootScope.bannerObj.pic_width || '',
            pic_height: $rootScope.bannerObj.pic_height || '',
            remark: $rootScope.bannerObj.remark || '',
            include_ids: $rootScope.bannerObj.include_ids || '',
            exclude_ids: $rootScope.bannerObj.exclude_ids || '',
            sort_num: Number($rootScope.bannerObj.sort_num) || 0
        });
        $scope.bannerUpdate.pics_info = [{
            url: $scope.bannerUpdate_param.pic_url,
            width: $scope.bannerUpdate_param.pic_width,
            height: $scope.bannerUpdate_param.pic_height
        }];
        //console.log($rootScope.bannerObj);
        //console.log($scope.bannerUpdate_param);
        //  初始化 默认选中的跳转类型
        $scope.default_param = {url: 0, activity_id: 0, topic_id: 0};
        $scope.remark = JSON.parse($scope.bannerUpdate_param.remark);
        //console.log($scope.remark);
        if ($scope.remark.url && $scope.remark.url != '') {
            $scope.default_param.url = '1';
            $scope.bannerUpdate.param_type = 2;
            $scope.bannerUpdate.param.url = $scope.remark.url;
        } else if ($scope.remark.topic_id && $scope.remark.topic_id != '') {
            $scope.default_param.topic_id = '1';
            $scope.bannerUpdate.param_type = 4;
            $scope.bannerUpdate.param.topic_id = $scope.remark.topic_id;
        } else if ($scope.remark.activity_id && $scope.remark.activity_id != '') {
            $scope.default_param.activity_id = '1';
            $scope.bannerUpdate.param_type = 3;
            $scope.bannerUpdate.param.activity_id = $scope.remark.activity_id;
        } else {
            $scope.default_param.url = '1';
            $scope.bannerUpdate.param_type = 1;
        }
        // 改变消息跳转页面 的事件
        $scope.default_param_change = function (param) {
            if (param == 'url') {
                $scope.default_param.url = 1;
                $scope.default_param.activity_id = $scope.default_param.topic_id = 0;
                delete $scope.bannerUpdate.param.activity_id;
                delete $scope.bannerUpdate.param.topic_id;
            } else if (param == 'activity_id') {
                $scope.default_param.activity_id = 1;
                $scope.default_param.topic_id = $scope.default_param.url = 0;
                delete $scope.bannerUpdate.param.topic_id;
                delete $scope.bannerUpdate.param.url;
            } else if (param == 'topic_id') {
                $scope.default_param.topic_id = 1;
                $scope.default_param.activity_id = $scope.default_param.url = 0;
                delete $scope.bannerUpdate.param.activity_id;
                delete $scope.bannerUpdate.param.url;
            } else {
                $scope.default_param.activity_id = $scope.default_param.url = $scope.default_param.topic_id = 0;
                delete $scope.bannerUpdate.activity_id;
                delete $scope.bannerUpdate.param.url;
                delete $scope.bannerUpdate.param.topic_id;
            }
        }
        // 封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.bannerUpdate.pics_info, function (val, key) {
                if (val.url) {
                    $scope.bannerUpdate_param.pic_url = val.url;
                    $scope.bannerUpdate_param.pic_width = val.width;
                    $scope.bannerUpdate_param.pic_height = val.height;
                }

            });
        }
        // selelct community
        $scope.get_community = function () {
            $scope.bannerUpdate_param.include_ids = '';
            $scope.bannerUpdate_param.exclude_ids = '';
            $scope.tmp_community_info = [];
            if ($scope.bannerUpdate.ids && $scope.bannerUpdate.ids.new.length > 0) {
                angular.forEach($scope.bannerUpdate.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.bannerUpdate.target_type == 1) {
                $scope.bannerUpdate_param.include_ids = $scope.tmp_community_info.join(',');
            } else if ($scope.bannerUpdate.target_type == 2) {
                $scope.bannerUpdate_param.exclude_ids = $scope.tmp_community_info.join(',');
            }
        }
        $scope.get_remark = function () {
            $scope.bannerUpdate_param.remark = '';
            if (($scope.bannerUpdate.param_type == 2 || $scope.bannerUpdate.param_type == 5) && (!$scope.bannerUpdate.param.url || $scope.bannerUpdate.param.url == '')) {
                $scope.bannerUpdate.param_hasval = 1;
                widget.msgToast('请填写url');
                err++;
            } else if ($scope.bannerUpdate.param_type == 3 && (!$scope.bannerUpdate.param.activity_id || $scope.bannerUpdate.param.activity_id == '')) {
                $scope.bannerUpdate.param_hasval = 1;
                widget.msgToast('请填写活动ID');
                err++;
            } else if ($scope.bannerUpdate.param_type == 4 && (!$scope.bannerUpdate.param.topic_id || $scope.bannerUpdate.param.topic_id == '')) {
                $scope.bannerUpdate.param_hasval = 1;
                widget.msgToast('请填写话题ID');
                err++;
            }
            $scope.bannerUpdate_param.remark = JSON.stringify($scope.bannerUpdate.param);
        }
        $scope.save = function () {
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_remark();
            angular.forEach($scope.bannerUpdate_param, function (value, key) {
                // 过滤非必填项
                if (key == 'title' && value == '') {
                    widget.msgToast('标题未完成填写');
                    err++;
                }
                if (key == 'pic_url' && value == '') {
                    widget.msgToast('图片未完成上传');
                    err++;
                }
                if (key == 'remark' && value == '') {
                    widget.msgToast('备注未完成填写');
                    err++;
                }
            });
            console.log($scope.bannerUpdate_param);
            //console.log($scope.bannerAdd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/market/banner/update';
            $http.post(
                url,
                $scope.bannerUpdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('更新成功！');
                        $state.go('banner');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function bannerAddController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.isActivityBanner = $stateParams.isActivityBanner || 0;
        var sup_scope = $scope;
        $scope.bannerAdd = {target_type: 0, pics_info: [], param: {}, param_type: 1,};
        $scope.bannerAdd_param = {
            title: '',
            category: $stateParams.category || 1,
            pic_url: '',
            pic_width: '',
            pic_height: '',
            remark: '',
            include_ids: '',
            exclude_ids: '',
            sort_num: 0
        };
        $scope.categoryname = '未知';
        switch ($scope.bannerAdd_param.category) {
            case "1":
                $scope.categoryname = "活动首页";
                break;
            case "2":
                $scope.categoryname = "邻里圈";
                break;
            case "3":
                $scope.categoryname = "邻邻帮";
                break;
            case "4":
                $scope.categoryname = "拼团";
                break;
            case "5":
                $scope.categoryname = "发现";
                break;
            case "6":
                $scope.categoryname = "服务号首页";
                break;
        }
        $scope.default_param = {url: 0, activity_id: 0, topic_id: 0};
        // 改变消息跳转页面 的事件
        $scope.default_param_change = function (param) {
            if (param == 'url') {
                $scope.default_param.url = 1;
                $scope.default_param.activity_id = $scope.default_param.topic_id = 0;
                delete $scope.bannerAdd.param.activity_id;
                delete $scope.bannerAdd.param.topic_id;
            } else if (param == 'activity_id') {
                $scope.default_param.activity_id = 1;
                $scope.default_param.topic_id = $scope.default_param.url = 0;
                delete $scope.bannerAdd.param.topic_id;
                delete $scope.bannerAdd.param.url;
            } else if (param == 'topic_id') {
                $scope.default_param.topic_id = 1;
                $scope.default_param.activity_id = $scope.default_param.url = 0;
                delete $scope.bannerAdd.param.activity_id;
                delete $scope.bannerAdd.param.url;
            } else {
                $scope.default_param.activity_id = $scope.default_param.url = $scope.default_param.topic_id = 0;
                delete $scope.bannerAdd_param.activity_id;
                delete $scope.bannerAdd.param.url;
                delete $scope.bannerAdd.param.topic_id;
            }
        }
        // 封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.bannerAdd.pics_info, function (val, key) {
                if (val.url) {
                    $scope.bannerAdd_param.pic_url = val.url;
                    $scope.bannerAdd_param.pic_width = val.width;
                    $scope.bannerAdd_param.pic_height = val.height;
                }

            });
        }
        // selelct community
        $scope.get_community = function () {
            $scope.bannerAdd_param.include_ids = '';
            $scope.bannerAdd_param.exclude_ids = '';
            $scope.tmp_community_info = [];
            if ($scope.bannerAdd.ids && $scope.bannerAdd.ids.new.length > 0) {
                angular.forEach($scope.bannerAdd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.bannerAdd.target_type == 1) {
                $scope.bannerAdd_param.include_ids = $scope.tmp_community_info.join(',');
            } else if ($scope.bannerAdd.target_type == 2) {
                $scope.bannerAdd_param.exclude_ids = $scope.tmp_community_info.join(',');
            }
        }
        $scope.get_remark = function () {
            $scope.bannerAdd_param.remark = '';
            if (($scope.bannerAdd.param_type == 2 || $scope.bannerAdd.param_type == 5) && (!$scope.bannerAdd.param.url || $scope.bannerAdd.param.url == '')) {
                $scope.bannerAdd.param_hasval = 1;
                widget.msgToast('请填写url');
                err++;
            } else if ($scope.bannerAdd.param_type == 3 && (!$scope.bannerAdd.param.activity_id || $scope.bannerAdd.param.activity_id == '')) {
                $scope.bannerAdd.param_hasval = 1;
                widget.msgToast('请填写活动ID');
                err++;
            } else if ($scope.bannerAdd.param_type == 4 && (!$scope.bannerAdd.param.topic_id || $scope.bannerAdd.param.topic_id == '')) {
                $scope.bannerAdd.param_hasval = 1;
                widget.msgToast('请填写话题ID');
                err++;
            }
            $scope.bannerAdd_param.remark = JSON.stringify($scope.bannerAdd.param);
        }
        $scope.save = function () {
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_remark();
            angular.forEach($scope.bannerAdd_param, function (value, key) {
                // 过滤非必填项
                if (key == 'title' && value == '') {
                    widget.msgToast('标题未完成填写');
                    err++;
                }
                if (key == 'pic_url' && value == '') {
                    widget.msgToast('图片未完成上传');
                    err++;
                }
                if (key == 'remark' && value == '') {
                    widget.msgToast('备注未完成填写');
                    err++;
                }
            });
            // console.log($scope.bannerAdd_param);
            //console.log($scope.bannerAdd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/market/banner/post';
            $http.post(
                url,
                $scope.bannerAdd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('banner');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function bannerController($scope, $http, $rootScope, $modal, FileUploader, $stateParams, $state, widget) {
        // category 1：活动首页 2：邻里圈 3：邻邻帮 4:拼团
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.list_param = {
            page: 1,
            count: 20,
            category: $stateParams.category || 1
        };
        $scope.isActivityBanner = $stateParams.isActivityBanner || 0;
        $scope.categoryname = '活动首页';
        switch ($scope.list_param.category) {
            case "1":
                $scope.categoryname = "活动首页";
                break;
            case "2":
                $scope.categoryname = "邻里圈";
                break;
            case "3":
                $scope.categoryname = "邻邻帮";
                break;
            case "4":
                $scope.categoryname = "拼团";
                break;
            case "5":
                $scope.categoryname = "发现";
                break;
            case "6":
                $scope.categoryname = "服务号首页";
                break;
        }
        $scope.list_param.keyword = $rootScope.search;
        var list_url = simpleCons.domain + '/manage/market/banner/list';
        $scope.getapi = function (page, category) {
            //$rootScope.loading = true;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.category = $scope.list_param.category;
            $scope.list_param.keyword = $rootScope.search || '';
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.banner_list = json.data.list;
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
        // 修改状态
        $scope.update_status = function (item, status, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'update_status.html',
                controller: function ($scope, $modalInstance) {
                    $scope.ok = function () {
                        var update_url = simpleCons.domain + '/manage/market/banner/update';
                        $http.post(update_url, {
                            banner_id: item.banner_id,
                            status: status
                        })
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    sup_scope.banner_list[sup_index].status = status;
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
                size: 'sm'
            });
        }
        //
        $scope.toupdate = function (item) {
            $rootScope.bannerObj = item;
            $state.go('bannerUpdate', {category: $scope.list_param.category})
        }

    };
});
