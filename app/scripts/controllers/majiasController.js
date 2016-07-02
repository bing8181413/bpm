// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('majiasController', majiasController)
        .controller('majiasaddController', majiasaddController)
        .controller('majiasupdateController', majiasupdateController)

    majiasController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    majiasaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];
    majiasupdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget'];

    function majiasupdateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        var sup_scope = $scope;
        $scope.iscompleted = false;// option_info  加载完成没有
        var url = simpleCons.domain + '/manage/majias/item';
        $http.post(
            url, {activity_id: $stateParams.activity_id})
            .success(function (json) {
                if (json.code == 0) {
                    $scope.init(json.data);
                    $scope.iscompleted = true;
                } else {
                    widget.msgToast(json.msg);
                }
            });
        $scope.init = function (data) {
            $scope.majiasupdate = {
                // 这里的参数都是不能字节转化的值  都用了angular的directive来加载 最终提交时 再到提交的对象字段 majiasupdate_param
                ids: {// 小区名单
                    old: [],
                    new: []
                },
                activity_options: {
                    old: [],
                    new: []
                },
                activity_pics: [],
                activity_contents: [
                    {
                        id: 0,
                        category: '活动摘要',
                        old: [],
                        new: []
                    }
                ]
            };
            $scope.majiasupdate_param = {
                category: data.category,
                status: data.status,
                majias_type: data.majias_type,
                //以上的没用显示 但是必须传得字段
                account_id: data.account_id + '',
                activity_id: data.activity_id,
                activity_title: data.activity_title,
                reward: data.reward,// 团长奖励
                group_buy_min_num: data.group_buy_min_num,
                group_buy_days: data.group_buy_days,
                black_list: '',// 不包括的小区名单
                white_list: '',// 包括的小区名单
                group_buy_header_user_id: data.group_buy_header_user_id,
                unit: data.unit,// 单位
                is_pinned: data.is_pinned,// true ：置顶
                activity_options: '',
                activity_pics: '',
                activity_contents: ''
            };
            // 活动图文
            angular.forEach(data.activity_contents, function (val, key) {
                    var obj = {};
                    obj.contentData = {
                        category: val.category,
                        content: val.content,
                        font_align: val.font_align,
                        font_bold: val.font_bold,
                        font_color: val.font_color,
                        font_ita: val.font_ita,
                        font_size: val.font_size,
                        font_style: val.font_style
                    };
                    obj.images = [];
                    if (val.pics && val.pics.length > 0) {
                        angular.forEach(val.pics, function (v, k) {
                            obj.images.push({
                                url: v.pic_url,
                                width: v.pic_width,
                                height: v.pic_height
                            });

                        });
                    }
                    if (val.category == '活动摘要') {
                        $scope.majiasupdate.activity_contents[0].old.push(obj);
                    }
                }
            );
            //图片格式化字段
            angular.forEach(data.activity_pics, function (val, key) {
                $scope.majiasupdate.activity_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            //option_info 格式化字段
            angular.forEach(data.activity_options, function (val, key) {
                $scope.majiasupdate.activity_options.old.push({
                    option_id: val.option_id,
                    name: val.option_name,
                    price: val.option_price,
                    origin_price: val.origin_price,
                    origin_inventory: val.inventory
                });
            });
            angular.forEach(data.white_list, function (val, key) {
                data.white_list[key].new_community_id = val.key;
                data.white_list[key].new_community = val.value;
                data.white_list[key].community_name = val.key;
            });
            angular.forEach(data.black_list, function (val, key) {
                data.black_list[key].new_community_id = val.key;
                data.black_list[key].new_community = val.value;
                data.black_list[key].community_name = val.value;
            });
            if (data.white_list.length == 0 && data.black_list.length == 0) {
                $scope.majiasupdate.target_type = 0;
            } else if (data.white_list.length > 0) {
                //查到new list 里 不要查到old 里面 可以编辑
                $scope.majiasupdate.target_type = 1;
                $scope.majiasupdate.ids.new = data.white_list;
            } else if (data.black_list.length > 0) {
                $scope.majiasupdate.target_type = 2;
                $scope.majiasupdate.ids.new = data.black_list;
            }
            //
            $scope.majiasoption = {
                user_id: data.group_buy_header_user_id,
                name: data.group_buy_header_name,
                mobile: data.group_buy_header_mobile
            }

        }
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.majiasupdate.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.majiasupdate.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.majiasupdate_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.majiasupdate_param.white_list = '';
            $scope.majiasupdate_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.majiasupdate.ids && $scope.majiasupdate.ids.new.length > 0) {
                angular.forEach($scope.majiasupdate.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.majiasupdate.target_type == 1) {
                $scope.majiasupdate_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.majiasupdate.target_type == 2) {
                $scope.majiasupdate_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            angular.forEach($scope.majiasupdate.activity_contents, function (val, key) {
                angular.forEach(val.new, function (v, k) {
                    v.result = v.contentData || {};
                    v.result.order_num = 0;//  后来添加的顺序号
                    v.result.category = val.category;
                    v.result.pics = [];
                    angular.forEach(v.images, function (obj) {
                        v.result.pics.push({pic_url: obj.url || '', pic_width: obj.width, pic_height: obj.height});
                    });
                    if (val.empty_obj_num == 0) {
                        tmp_contents.push(v.result);
                    }
                });
            });
            $scope.majiasupdate_param.activity_contents = JSON.stringify(tmp_contents);

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.majiasupdate.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.majiasupdate.activity_options.empty_obj_num == 0) {
                $scope.majiasupdate_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function () {
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            //console.log($scope.majiasupdate_param);
            //console.log($scope.majiasupdate);
            //return false;
            angular.forEach($scope.majiasupdate_param, function (value, key) {
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('团购标题未填写');
                    err++;
                }
                if (key == 'group_buy_days' && (value == '' || typeof value != 'number' || value <= 0)) {
                    widget.msgToast('组团抢购期限未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'group_buy_min_num' && (value == '' || typeof value != 'number' || value <= 0)) {
                    widget.msgToast('成团份数未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'reward' && value == '') {
                    widget.msgToast('本期团长奖励未填写');
                    err++;
                } else if (key == 'reward' && value.length > 12) {
                    widget.msgToast('本期团长奖励不能超过12个字');
                    err++;
                }
                if (key == 'activity_options' && (value == '' || value == '[]')) {
                    widget.msgToast('商品规格未完成填写');
                    err++;
                }
                if (key == 'activity_pics' && (value == '' || value == '[]')) {
                    widget.msgToast('封面图片未完成填写');
                    err++;
                }
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    widget.msgToast('图文详情未填写一条');
                    err++;
                }
            });
            console.log($scope.majiasupdate);
            console.log($scope.majiasupdate_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/majias/edit';
            $http.post(
                url,
                $scope.majiasupdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('majias');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function majiasaddController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        var sup_scope = $scope;
        $scope.majiasadd = {
            // 注释的都是可以直接提交的数据 或者直接用 majiasadd_param
            //account_id: '',
            //activity_title: '',
            //reward: '',// 团长奖励
            //group_buy_min_num: '',
            //group_buy_days: '',
            //black_list: '',
            //white_list: '',
            group_buy_header_user_id: null,
            //is_pinned: '',
            //activity_options: '',
            //activity_pics: '',
            //activity_contents: '',
            target_type: 0,// 0 全部小区 1：部分小区 2：排除部分小区
            ids: {// 小区名单
                old: [],
                new: []
            },
            activity_options: {
                old: [],
                new: []
            },
            activity_pics: [],
            activity_contents: [
                {
                    id: 0,
                    category: '活动摘要',
                    old: [],
                    new: []
                }
            ]
        };
        $scope.majiasadd_param = {
            account_id: '',
            activity_title: '',
            reward: '',// 团长奖励
            group_buy_min_num: null,
            group_buy_days: null,
            black_list: '',// 不包括的小区名单
            white_list: '',// 包括的小区名单
            group_buy_header_user_id: null,
            unit: ' ',// 单位、
            is_pinned: false,// true ：置顶
            activity_options: '',
            activity_pics: '',
            activity_contents: ''
        };
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.majiasadd.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.majiasadd.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.majiasadd_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.majiasadd_param.white_list = '';
            $scope.majiasadd_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.majiasadd.ids && $scope.majiasadd.ids.new.length > 0) {
                angular.forEach($scope.majiasadd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.majiasadd.target_type == 1) {
                $scope.majiasadd_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.majiasadd.target_type == 2) {
                $scope.majiasadd_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            angular.forEach($scope.majiasadd.activity_contents, function (val, key) {
                angular.forEach(val.new, function (v, k) {
                    v.result = v.contentData || {};
                    v.result.order_num = 0;//  后来添加的顺序号
                    v.result.category = val.category;
                    v.result.pics = [];
                    angular.forEach(v.images, function (obj) {
                        v.result.pics.push({pic_url: obj.url || '', pic_width: obj.width, pic_height: obj.height});
                    });
                    if (val.empty_obj_num == 0) {
                        tmp_contents.push(v.result);
                    }
                });
            });
            $scope.majiasadd_param.activity_contents = JSON.stringify(tmp_contents);

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.majiasadd.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.majiasadd.activity_options.empty_obj_num == 0) {
                $scope.majiasadd_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function (status) {
            if (status == 0) {//草稿
                $scope.majiasadd_param.status = status;
            } else {
                $scope.majiasadd_param.status = 1;
            }
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            //console.log($scope.majiasadd_param);
            //console.log($scope.majiasadd);
            //return false;
            angular.forEach($scope.majiasadd_param, function (value, key) {
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('团购标题未填写');
                    err++;
                }
                if (key == 'group_buy_days' && (value == '' || typeof value != 'number' || value <= 0)) {
                    widget.msgToast('组团抢购期限未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'group_buy_min_num' && (value == '' || typeof value != 'number' || value <= 0)) {
                    widget.msgToast('成团份数未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'reward' && value == '') {
                    widget.msgToast('本期团长奖励未填写');
                    err++;
                } else if (key == 'reward' && value.length > 12) {
                    widget.msgToast('本期团长奖励不能超过12个字');
                    err++;
                }
                if (key == 'activity_options' && (value == '' || value == '[]')) {
                    widget.msgToast('商品规格未完成填写');
                    err++;
                }
                if (key == 'activity_pics' && (value == '' || value == '[]')) {
                    widget.msgToast('封面图片未完成填写');
                    err++;
                }
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    widget.msgToast('图文详情未填写一条');
                    err++;
                }
                if (key == 'group_buy_header_user_id' && value == '') {
                    widget.msgToast('备用团长未填写');
                    err++;
                }
            });
            console.log($scope.majiasadd);
            console.log($scope.majiasadd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/majias/add';
            $http.post(
                url,
                $scope.majiasadd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('majias');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function majiasController($scope, $http, $rootScope, $modal, $state, $stateParams, widget) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.list_param = {
            page: 1,
            count: 20
        };
        $scope.list_param.keyword = $rootScope.search;
        var list_url = simpleCons.domain + '/manage/majias/list';
        $scope.getapi = function (page) {
            //$rootScope.loading = true;
            $scope.list_param.page = page ? page : $scope.list_param.page;
            $scope.list_param.keyword = $rootScope.search || '';
            $http.post(list_url, $scope.list_param)
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.majias_list = json.data.list;
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
        $scope.majiasadd = function (activity_id, sup_index) {
            var modalInstance = $modal.open({
                templateUrl: 'majiasadd.html',
                controller: function ($scope, $modalInstance) {
                    $scope.majiasadd = {
                        mobile: '',
                        account_id: '',
                        remark: ''
                    };
                    $scope.ok = function () {
                        if (!$scope.majiasadd.remark) {
                            alert('用户特征没填写');
                            return false;
                        }
                        var update_url = simpleCons.domain + '/manage/majias/post';
                        $http.post(update_url, $scope.majiasadd)
                            .success(function (json) {
                                if (json.code == 0) {
                                    widget.msgToast('操作成功!请刷新列表查看');
                                    sup_scope.getapi(1);
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
                size: ''
            });
        }


    };
});
