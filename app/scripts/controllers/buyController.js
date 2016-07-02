// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('buyController', buyController)
        .controller('buyaddController', buyaddController)
        .controller('buyupdateController', buyupdateController)

    buyController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    buyaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    buyupdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];

    function buyupdateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.iscompleted = false;// option_info  加载完成没有
        var url = simpleCons.domain + '/manage/tuan/item';
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
            $scope.buyupdate = {
                // 这里的参数都是不能字节转化的值  都用了angular的directive来加载 最终提交时 再到提交的对象字段 buyupdate_param
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
                ],
                //activity_time: new Date($filter('date')(data.activity_time, 'yyyy-MM-dd 09:00:00')),
                activity_end_time: new Date($filter('date')(data.activity_end_time, 'yyyy-MM-dd 11:00:00')),
                activity_apply_end_time: new Date($filter('date')(data.activity_apply_end_time, 'yyyy-MM-dd 18:00:00'))
            };
            $scope.buyupdate_param = {
                product_id: data.product_id,
                category: data.category,
                status: data.status,
                tuan_type: data.tuan_type,
                //以上的不用显示 但是必须传得字段
                account_id: data.account_id + '',
                activity_id: data.activity_id,
                admin_remark: data.admin_remark,
                sale_point: data.sale_point,
                activity_title: data.activity_title,
                reward: data.reward,// 团长奖励
                group_tuan_min_num: data.group_tuan_min_num,
                group_tuan_days: data.group_tuan_days,
                black_list: '',// 不包括的小区名单
                white_list: '',// 包括的小区名单
                group_tuan_header_user_id: data.group_tuan_header_user_id,
                unit: data.unit,// 单位
                is_pinned: data.is_pinned,// true ：置顶
                activity_options: '',
                activity_pics: '',
                activity_contents: '',
                restrict_inventory: data.restrict_inventory ? 1 : 0
            };
            $scope.buyupdate_param.is_pinned = $scope.buyupdate_param.is_pinned + '';
            if ($scope.buyupdate_param.is_pinned == 'true') {
                $scope.buyupdate_param.is_pinned = 1;
            } else {
                $scope.buyupdate_param.is_pinned = 0;
            }
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
                        $scope.buyupdate.activity_contents[0].old.push(obj);
                    }
                }
            );
            //图片格式化字段
            angular.forEach(data.activity_pics, function (val, key) {
                $scope.buyupdate.activity_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            //option_info 格式化字段
            angular.forEach(data.activity_options, function (val, key) {
                $scope.buyupdate.activity_options.old.push({
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
                data.white_list[key].community_name = val.value;
            });
            angular.forEach(data.black_list, function (val, key) {
                data.black_list[key].new_community_id = val.key;
                data.black_list[key].new_community = val.value;
                data.black_list[key].community_name = val.value;
            });
            if (data.white_list.length == 0 && data.black_list.length == 0) {
                $scope.buyupdate.target_type = 0;
            } else if (data.white_list.length > 0) {
                //查到new list 里 不要查到old 里面 可以编辑
                $scope.buyupdate.target_type = 1;
                $scope.buyupdate.ids.new = data.white_list;
            } else if (data.black_list.length > 0) {
                $scope.buyupdate.target_type = 2;
                $scope.buyupdate.ids.new = data.black_list;
            }
            //
            $scope.buyoption = {
                user_id: data.group_tuan_header_user_id,
                name: data.group_tuan_header_name,
                mobile: data.group_tuan_header_mobile
            }

        }
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.buyupdate.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.buyupdate.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.buyupdate_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.buyupdate_param.white_list = '';
            $scope.buyupdate_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.buyupdate.ids && $scope.buyupdate.ids.new.length > 0) {
                angular.forEach($scope.buyupdate.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.buyupdate.target_type == 1) {
                $scope.buyupdate_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.buyupdate.target_type == 2) {
                $scope.buyupdate_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            var tmp_contents_err_content = [];
            angular.forEach($scope.buyupdate.activity_contents, function (val, key) {
                angular.forEach(val.new, function (v, k) {
                    v.result = v.contentData || {};
                    v.result.order_num = 0;//  后来添加的顺序号
                    v.result.category = val.category;
                    v.result.pics = [];
                    angular.forEach(v.images, function (obj, obj_key) {
                        if (!v.url || v.url == 'undefined' || typeof v.url == 'undefined') {
                            // tmp_contents_err_content.push(v.result);
                            console.log('第' + (k + 1) + '个图文的第' + (obj_key + 1) + '张图片URL不存在', v.result);
                        }
                        v.result.pics.push({pic_url: obj.url || '', pic_width: obj.width, pic_height: obj.height});
                    });
                    if (val.empty_obj_num == 0) {
                        tmp_contents.push(v.result);
                    } else {
                        tmp_contents_err++;
                    }
                });
            });
            if (tmp_contents_err == 0) {
                $scope.buyupdate_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.buyupdate_param.activity_contents = JSON.stringify([]);
                console.log(tmp_contents_err_content);
            }

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.buyupdate.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.buyupdate.activity_options.empty_obj_num == 0) {
                $scope.buyupdate_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function (status) {
            if (status == 0) {//草稿
                $scope.buyupdate_param.status = status;
            } else {
                $scope.buyupdate_param.status = 1;
            }
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            //console.log($scope.buyupdate_param);
            //console.log($scope.buyupdate);
            //return false;
            //$scope.buyupdate_param.activity_time = $filter('date')($scope.buyupdate.activity_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.buyupdate_param.activity_end_time = $filter('date')($scope.buyupdate.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.buyupdate_param.activity_apply_end_time = $filter('date')($scope.buyupdate.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.buyupdate_param, function (value, key) {
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('直接买标题未填写');
                    err++;
                }
                //if (key == 'group_buy_days' && (value == '' || typeof value != 'number' || value <= 0)) {
                //    widget.msgToast('组团抢购期限未填写正确，必须为大于0正整数');
                //    err++;
                //}
                //if (key == 'group_buy_min_num' && (value == '' || typeof value != 'number' || value <= 0)) {
                //    widget.msgToast('成团份数未填写正确，必须为大于0正整数');
                //    err++;
                //}
                //if (key == 'reward' && value == '') {
                //    widget.msgToast('本期团长奖励未填写');
                //    err++;
                //} else if (key == 'reward' && value.length > 12) {
                //    widget.msgToast('本期团长奖励不能超过12个字');
                //    err++;
                //}
                if (key == 'sale_point' && value == '') {
                    widget.msgToast('卖点未完成填写');
                    err++;
                }
                if (key == 'unit' && value == '') {
                    widget.msgToast('单位未完成填写');
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
            //console.log($scope.buyupdate);
            console.log($scope.buyupdate_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/tuan/edit';
            $http.post(
                url,
                $scope.buyupdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('buy');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function buyaddController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.buyadd = {
            // 注释的都是可以直接提交的数据 或者直接用 buyadd_param
            //account_id: '',
            //activity_title: '',
            //reward: '',// 团长奖励
            //group_buy_min_num: '',
            //group_buy_days: '',
            //black_list: '',
            //white_list: '',
            group_tuan_header_user_id: null,
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
            ],
            //activity_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 09:00:00')),
            activity_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 11:00:00')),
            activity_apply_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 18:00:00'))
        };
        $scope.buyadd_param = {
            product_id: '-1',
            account_id: '',
            admin_remark: '',
            activity_title: '',
            reward: '',// 团长奖励
            group_tuan_min_num: null,
            group_tuan_days: null,
            black_list: '',// 不包括的小区名单
            white_list: '',// 包括的小区名单
            group_tuan_header_user_id: null,
            unit: '',// 单位、
            is_pinned: 0,// true ：置顶
            activity_options: '',
            activity_pics: '',
            activity_contents: '',
            restrict_inventory: 1,
            category: 2,
            tuan_type: 2,
        };
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.buyadd.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.buyadd.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.buyadd_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.buyadd_param.white_list = '';
            $scope.buyadd_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.buyadd.ids && $scope.buyadd.ids.new.length > 0) {
                angular.forEach($scope.buyadd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.buyadd.target_type == 1) {
                $scope.buyadd_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.buyadd.target_type == 2) {
                $scope.buyadd_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            angular.forEach($scope.buyadd.activity_contents, function (val, key) {
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
                    } else {
                        tmp_contents_err++;
                    }
                });
            });
            if (tmp_contents_err == 0) {
                $scope.buyadd_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.buyadd_param.activity_contents = JSON.stringify([]);

            }

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.buyadd.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.buyadd.activity_options.empty_obj_num == 0) {
                $scope.buyadd_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function (status) {
            if (status == 0) {//草稿
                $scope.buyadd_param.status = status;
            } else {
                $scope.buyadd_param.status = 1;
            }
            var err = 0
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            //console.log($scope.buyadd_param);
            //console.log($scope.buyadd);
            //return false;
            //$scope.buyadd_param.activity_time = $filter('date')($scope.buyadd.activity_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.buyadd_param.activity_end_time = $filter('date')($scope.buyadd.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.buyadd_param.activity_apply_end_time = $filter('date')($scope.buyadd.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.buyadd_param, function (value, key) {
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('团购标题未填写');
                    err++;
                }
                //if (key == 'group_buy_days' && (value == '' || typeof value != 'number' || value <= 0)) {
                //    widget.msgToast('组团抢购期限未填写正确，必须为大于0正整数');
                //    err++;
                //}
                //if (key == 'group_buy_min_num' && (value == '' || typeof value != 'number' || value <= 0)) {
                //    widget.msgToast('成团份数未填写正确，必须为大于0正整数');
                //    err++;
                //}
                //if (key == 'reward' && value == '') {
                //    widget.msgToast('本期团长奖励未填写');
                //    err++;
                //} else if (key == 'reward' && value.length > 12) {
                //    widget.msgToast('本期团长奖励不能超过12个字');
                //    err++;
                //}
                if (key == 'sale_point' && value == '') {
                    widget.msgToast('卖点未完成填写');
                    err++;
                }
                if (key == 'unit' && value == '') {
                    widget.msgToast('单位未完成填写');
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
                //if (key == 'group_buy_header_user_id' && value == '') {
                //    widget.msgToast('备用团长未填写');
                //    err++;
                //}
            });
            $scope.buyadd_param.is_pinned = $scope.buyadd_param.is_pinned + '';
            if ($scope.buyadd_param.is_pinned == '1') {
                $scope.buyadd_param.is_pinned = 1;
            } else {
                $scope.buyadd_param.is_pinned = 0;
            }
            //console.log($scope.buyadd);
            // console.log($scope.buyadd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/tuan/add';
            $http.post(
                url,
                $scope.buyadd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('buy');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
    function buyController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.pubdata = '';
        $scope.list_param = {
            page: 1,
            count: 20,
            //tuan_type: 0,
            category: 2,
            //activity_status: 0,
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
    }
});
