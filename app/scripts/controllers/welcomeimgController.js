// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('welcomeimgController', welcomeimgController)
        .controller('welcomeimgaddController', welcomeimgaddController)
        .controller('welcomeimgupdateController', welcomeimgupdateController)

    welcomeimgController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    welcomeimgaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    welcomeimgupdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];

    function welcomeimgupdateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.welcome_id = $stateParams.welcome_id;
        $scope.item = $rootScope.hjm.welcomeimgupdate;
        $scope.showMsg = function (msg) {
            widget.msgToast(msg);
        }
        $scope.init = function (data) {
            //console.log(data);
            if ($scope.welcome_id == data.welcome_id) {
                $scope.showMsg('id不正确，请从列表编辑打开');
                return false;
            }
            $scope.update = {
                pics: [{
                    url: data.image,
                    width: 100,
                    height: 100
                }],
                target_type: 0,
                param: '',
                param_err: false
            };

            $scope.param = {
                welcome_id: data.welcome_id,
                title: data.title,
                url: data.url,
                image: data.image,
                date_min: data.date_min,
                date_max: data.date_max
            };
            if (data.url == '') {
                $scope.update.target_type = 0;
            } else if (data.url == 'huijiame0405://huijiame.com/forum') {
                $scope.update.target_type = 1;
            } else if (data.url == 'huijiame0405://huijiame.com/talent') {
                $scope.update.target_type = 2;
            } else if (data.url == 'huijiame0405://huijiame.com/activity') {
                $scope.update.target_type = 3;
            } else if (data.url == 'huijiame0405://huijiame.com/groupbuying') {
                $scope.update.target_type = 4;
            } else if (data.url.indexOf('huijiame0405://huijiame.com/forum/topic?id=')>=0) {
                $scope.update.label = 'ID:';
                $scope.update.target_type = 6;
                $scope.update.param = data.url.substring(data.url.indexOf('?id=') + 4, data.url.indexOf('&'));
            } else if (data.url.indexOf('huijiame0405://huijiame.com/talent?id=')>=0) {
                $scope.update.label = 'ID:';
                $scope.update.target_type = 7;
                $scope.update.param = data.url.split('huijiame0405://huijiame.com/talent?id=')[1];
            } else if (data.url.indexOf('huijiame0405://huijiame.com/activity?id=')>=0) {
                $scope.update.label = 'ID:';
                $scope.update.param = data.url.substring(data.url.indexOf('?id=') + 4, data.url.indexOf('&'));
                if (data.url.indexOf('category=1')>0) {
                    $scope.update.target_type = 8;
                } else {
                    $scope.update.target_type = 9;
                }
            } else {
                $scope.update.label = 'URL:';
                $scope.update.target_type = 5;
                $scope.update.param = data.url;
            }
            // 8张封面图片
            $scope.get_pics_url = function () {
                angular.forEach($scope.update.pics, function (val, key) {
                    if (val.url) {
                        var tmp = val.url.split('-1280.').join('.');
                        $scope.param.image = tmp;
                    }
                });
            }
            // 预览图片
            $scope.preview_img = function (w, h) {
                $scope.get_pics_url();
                if ($scope.param.image) {
                    window.open($scope.param.image + '?imageView2/1/w/' + w + '/h/' + h + '/q/75');
                } else {
                    $scope.showMsg('hi，没上传图片不能预览！');
                }
            }

            //////////////////////////////////////////
            //图片格式化字段
            angular.forEach(data.pics, function (val, key) {
                $scope.update.activity_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
        }
        if ($scope.item) {
            $scope.init($scope.item);
        }
        //  监听 跳转类型 target_type
        $scope.$watch('update', function (value) {
            $scope.update.param_err = false;
            var val = value.target_type;
            switch (val) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    //$scope.update.param = '';
                    $scope.update.label = '';
                    $scope.update.target_type_input_disabled = true;
                    if (val == 0) {
                        $scope.param.url = '';// 不跳转
                    } else if (val == 1) {
                        $scope.param.url = 'huijiame0405://huijiame.com/forum'; //我的小区首页
                    } else if (val == 2) {
                        $scope.param.url = 'huijiame0405://huijiame.com/talent';// 邻里圈首页
                    } else if (val == 3) {
                        $scope.param.url = 'huijiame0405://huijiame.com/activity';// 一起玩首页
                    } else if (val == 4) {
                        $scope.param.url = 'huijiame0405://huijiame.com/groupbuying'; // 拼团列表页
                    }
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    $scope.update.target_type_input_disabled = false;
                    if (val == 5) {
                        $scope.param.url = $scope.update.param;// 链接
                        $scope.update.label = 'URL:';
                    } else {
                        $scope.update.label = 'ID:';
                        $scope.update.param = parseInt($scope.update.param) || null;
                        if (!angular.isNumber($scope.update.param)) {
                            console.log('不是一个数字');
                            $scope.update.param_err = true;
                        } else {
                            if (val == 6) {
                                // category   ##### 1：普通话题 2：活动话题 3：热门话题
                                $scope.param.url = 'huijiame0405://huijiame.com/forum/topic?id=' + $scope.update.param + '&category=1';// 话题详情页
                            } else if (val == 7) {
                                $scope.param.url = 'huijiame0405://huijiame.com/talent?id=' + $scope.update.param;// 达人详情页
                            } else if (val == 8) {
                                //category 1:活动 2:团购
                                $scope.param.url = 'huijiame0405://huijiame.com/activity?id=' + $scope.update.param + '&category=1';//活动详情页
                            } else if (val == 9) {
                                $scope.param.url = 'huijiame0405://huijiame.com/activity?id=' + $scope.update.param + '&category=2';//团购详情页
                            }
                        }
                    }
                    break;
                default :
                    console.log('未获取到 target_type ');
            }
        }, true);
        $scope.save = function (status) {
            var err = 0
            $scope.get_pics_url();
            if ($scope.param.date_min > $scope.param.date_max) {
                $scope.showMsg('启动图开始时间不能大于结束时间！');
                err++;
                return false;
            }
            $scope.param.date_min = $filter('date')($scope.param.date_min, 'yyyy-MM-dd HH:mm:ss');
            $scope.param.date_max = $filter('date')($scope.param.date_max, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.param, function (value, key) {
                if (key == 'title' && value == '') {
                    widget.msgToast('启动图标题未填写');
                    err++;
                }
                if (key == 'image' && value == '') {
                    widget.msgToast('启动图片未完成上传');
                    err++;
                }
            });
            if ($scope.update.param_err) {
                widget.msgToast('跳转的ID不正确，请填写纯数字');
                err++;
            }
            console.log($scope.param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/market/welcome_img/update';
            $http.post(
                url,
                $scope.param)
                .success(function (data) {
                    if (data.code == 0) {
                        widget.msgToast('更新成功！');
                        $state.go('welcomeimg');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function welcomeimgaddController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        $scope.add = {
            pics: [],
            target_type: 0,
            param: '',
            param_err: false
        };
        $scope.showMsg = function (msg) {
            widget.msgToast(msg);
        }
        $scope.param = {
            //welcomeimg_id: '',
            title: '',
            url: '',
            image: '',
            date_min: new Date($filter('date')(new Date(), 'yyyy-MM-dd 00:00:00')),
            date_max: new Date($filter('date')(new Date(), 'yyyy-MM-dd 23:59:59'))
        };
        // 8张封面图片
        $scope.get_pics_url = function () {
            angular.forEach($scope.add.pics, function (val, key) {
                if (val.url) {
                    var tmp = val.url.split('-1280.').join('.');
                    $scope.param.image = tmp;
                }
            });
        }
        // 预览图片
        $scope.preview_img = function (w, h) {
            $scope.get_pics_url();
            if ($scope.param.image) {
                window.open($scope.param.image + '?imageView2/1/w/' + w + '/h/' + h + '/q/75');
            } else {
                $scope.showMsg('hi，没上传图片不能预览！');
            }
        }
        //  监听 跳转类型 target_type
        $scope.$watch('add', function (value) {
            $scope.add.param_err = false;
            var val = value.target_type;
            switch (val) {
                case 0:
                case 1:
                case 2:
                case 3:
                case 4:
                    //$scope.add.param = '';
                    $scope.add.label = '';
                    $scope.add.target_type_input_disabled = true;
                    if (val == 0) {
                        $scope.param.url = '';// 不跳转
                    } else if (val == 1) {
                        $scope.param.url = 'huijiame0405://huijiame.com/forum'; //我的小区首页
                    } else if (val == 2) {
                        $scope.param.url = 'huijiame0405://huijiame.com/talent';// 邻里圈首页
                    } else if (val == 3) {
                        $scope.param.url = 'huijiame0405://huijiame.com/activity';// 一起玩首页
                    } else if (val == 4) {
                        $scope.param.url = 'huijiame0405://huijiame.com/groupbuying'; // 拼团列表页
                    }
                    break;
                case 5:
                case 6:
                case 7:
                case 8:
                case 9:
                    $scope.add.target_type_input_disabled = false;
                    if (val == 5) {
                        $scope.add.label = 'URL:';
                        $scope.param.url = $scope.add.param;// 链接
                    } else {
                        $scope.add.label = 'ID:';
                        $scope.add.param = parseInt($scope.add.param) || null;
                        if (!angular.isNumber($scope.add.param)) {
                            console.log('不是一个数字');
                            $scope.add.param_err = true;
                        } else {
                            if (val == 6) {
                                // category   ##### 1：普通话题 2：活动话题 3：热门话题
                                $scope.param.url = 'huijiame0405://huijiame.com/forum/topic?id=' + $scope.add.param + '&category=1';// 话题详情页
                            } else if (val == 7) {
                                $scope.param.url = 'huijiame0405://huijiame.com/talent?id=' + $scope.add.param;// 达人详情页
                            } else if (val == 8) {
                                //category 1:活动 2:团购
                                $scope.param.url = 'huijiame0405://huijiame.com/activity?id=' + $scope.add.param + '&category=1';//活动详情页
                            } else if (val == 9) {
                                $scope.param.url = 'huijiame0405://huijiame.com/activity?id=' + $scope.add.param + '&category=2';//团购详情页
                            }
                        }
                    }
                    break;
                default :
                    console.log('未获取到 target_type ');
            }
        }, true);
        $scope.save = function () {
            var err = 0
            $scope.get_pics_url();
            if ($scope.param.date_min > $scope.param.date_max) {
                $scope.showMsg('启动图开始时间不能大于结束时间！');
                err++;
                return false;
            }
            $scope.param.date_min = $filter('date')($scope.param.date_min, 'yyyy-MM-dd HH:mm:ss');
            $scope.param.date_max = $filter('date')($scope.param.date_max, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.param, function (value, key) {
                if (key == 'title' && value == '') {
                    widget.msgToast('启动图标题未填写');
                    err++;
                }
                if (key == 'image' && value == '') {
                    widget.msgToast('启动图片未完成上传');
                    err++;
                }
            });
            if ($scope.add.param_err) {
                widget.msgToast('跳转的ID不正确，请填写纯数字');
                err++;
            }
            console.log($scope.param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/market/welcome_img/post';
            $http.post(
                url,
                $scope.param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('welcomeimg');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function welcomeimgController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        $scope.list_param = {
            page: 1,
            count: 20
        };
        var list_url = simpleCons.domain + '/manage/market/welcome_img/list';
        $scope.getapi = function (page) {
            //$rootScope.loading = true;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.list = json.data.list;
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
        var update_url = simpleCons.domain + '/manage/market/welcome_img/update';
        $scope.update = function (welcome_id, status, index) {
            if (!confirm('确定要修改这个状态吗？')) {
                return false;
            }
            $scope.update_param = {
                welcome_id: welcome_id,
                status: status
            };
            $http.post(
                update_url,
                $scope.update_param)
                .success(function (data) {
                    if (data.code == 0) {
                        $scope.list[index].status = status;
                    } else {
                        alert(data.msg);
                    }
                });

        }
        $scope.update_all = function (item) {
            $rootScope.hjm.welcomeimgupdate = item;
            $state.go('welcomeimgupdate', {id: item.welcome_id});
        }
    };
})
;
