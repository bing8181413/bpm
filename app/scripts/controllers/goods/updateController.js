// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('goods.updateController', updateController);

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
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
            $scope.tuanupdate = {
                // 这里的参数都是不能字节转化的值  都用了angular的directive来加载 最终提交时 再到提交的对象字段 tuanupdate_param
                ids: {// 小区名单
                    old: [],
                    new: []
                },
                activity_options: {
                    old: [],
                    new: []
                },
                activity_pics: [],
                activity_small_pics: [],
                activity_contents: [
                    {
                        id: 0,
                        category: '活动摘要',
                        old: [],
                        new: []
                    }
                ]
                //activity_time: new Date($filter('date')(data.activity_time, 'yyyy-MM-dd 09:00:00')),
                //activity_end_time: new Date($filter('date')(data.activity_end_time, 'yyyy-MM-dd 11:00:00')),
                //activity_apply_end_time: new Date($filter('date')(data.activity_apply_end_time, 'yyyy-MM-dd 18:00:00'))
            };
            $scope.tuanupdate_param = {
                post_user_id: data.post_user_id,
                product_id: data.product_id,
                category: data.category,
                status: data.status,
                tuan_type: data.tuan_type,
                //以上的不用显示 但是必须传得字段
                account_id: data.account_id + '',
                activity_id: data.activity_id,
                admin_remark: data.admin_remark,
                activity_title: data.activity_title,
                reward: data.reward,// 团长奖励
                group_buy_min_num: data.group_buy_min_num,
                order_count_max: data.order_count_max,
                group_buy_days: data.group_buy_days,
                black_list: '',// 不包括的小区名单
                white_list: '',// 包括的小区名单
                group_buy_header_user_id: data.group_buy_header_user_id,
                is_pinned: data.is_pinned,// true ：置顶
                activity_options: '',
                activity_pics: '',
                activity_small_pics: '',
                activity_contents: '',
                restrict_inventory: data.restrict_inventory ? 1 : 0,
                extra_data: {
                    utm_channel: data.utm_channel,//拼团渠道来源
                    commodity_remark: data.commodity_remark,
                    sku: data.sku,// 商品品类 default:0其他,1鲜花
                    commodity_type: data.commodity_type,//商品类型(频率) default:0单次,1包月
                    unit: data.unit,// 单位
                },
            };
            $scope.tuanupdate_param.is_pinned = $scope.tuanupdate_param.is_pinned + '';
            if ($scope.tuanupdate_param.is_pinned == 'true') {
                $scope.tuanupdate_param.is_pinned = 1;
            } else {
                $scope.tuanupdate_param.is_pinned = 0;
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
                        $scope.tuanupdate.activity_contents[0].old.push(obj);
                    }
                }
            );
            //图片格式化字段
            angular.forEach(data.activity_pics, function (val, key) {
                $scope.tuanupdate.activity_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            //缩略图 图片格式化字段
            angular.forEach(data.activity_small_pics, function (val, key) {
                $scope.tuanupdate.activity_small_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            //option_info 格式化字段
            angular.forEach(data.activity_options, function (val, key) {
                $scope.tuanupdate.activity_options.old.push({
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
                $scope.tuanupdate.target_type = 0;
            } else if (data.white_list.length > 0) {
                //查到new list 里 不要查到old 里面 可以编辑
                $scope.tuanupdate.target_type = 1;
                $scope.tuanupdate.ids.new = data.white_list;
            } else if (data.black_list.length > 0) {
                $scope.tuanupdate.target_type = 2;
                $scope.tuanupdate.ids.new = data.black_list;
            }
            //
            $scope.tuanoption = {
                user_id: data.group_buy_header_user_id,
                name: data.group_buy_header_name,
                mobile: data.group_buy_header_mobile
            }

        }
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.tuanupdate.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        // $scope.get_pics_info = function () {
        //     $scope.tmp_pics_info = [];
        //     angular.forEach($scope.tuanupdate.activity_pics, function (val, key) {
        //         if (val.url) {
        //             $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
        //         } else {
        //
        //         }
        //     });
        //     $scope.tuanupdate_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        // }
        // 8张封面图片
        $scope.get_pics = function (pic_obj) {
            $scope.tmp_pics_list = [];
            $scope.tmp_list = $scope.$eval('tuanupdate.' + pic_obj);
            angular.forEach($scope.tmp_list, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_list.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                } else {
                    widget.msgToast('图片没有上传成功,请重新上传或者换一张图片');
                    return false;
                }
            });
            if (pic_obj == 'activity_pics') {
                $scope.tuanupdate_param.activity_pics = JSON.stringify($scope.tmp_pics_list);
            } else if (pic_obj == 'activity_small_pics') {
                $scope.tuanupdate_param.activity_small_pics = JSON.stringify($scope.tmp_pics_list);
            }
        }
        // selelct community
        $scope.get_community = function () {
            $scope.tuanupdate_param.white_list = '';
            $scope.tuanupdate_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.tuanupdate.ids && $scope.tuanupdate.ids.new.length > 0) {
                angular.forEach($scope.tuanupdate.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.tuanupdate.target_type == 1) {
                $scope.tuanupdate_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.tuanupdate.target_type == 2) {
                $scope.tuanupdate_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            angular.forEach($scope.tuanupdate.activity_contents, function (val, key) {
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
                $scope.tuanupdate_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.tuanupdate_param.activity_contents = JSON.stringify([]);

            }

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.tuanupdate.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.tuanupdate.activity_options.empty_obj_num == 0) {
                $scope.tuanupdate_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function (status) {
            if (status == 0) {//草稿
                $scope.tuanupdate_param.status = status;
            } else {
                $scope.tuanupdate_param.status = 1;
            }
            var err = 0
            // $scope.get_pics_info();
            $scope.get_pics('activity_pics');
            $scope.get_pics('activity_small_pics');
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            // console.log($scope.tuanupdate_param);
            // console.log($scope.tuanupdate);
            // return false;
            //$scope.tuanupdate_param.activity_time = $filter('date')($scope.tuanupdate.activity_time, 'yyyy-MM-dd HH:mm:ss');
            //$scope.tuanupdate_param.activity_end_time = $filter('date')($scope.tuanupdate.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            //$scope.tuanupdate_param.activity_apply_end_time = $filter('date')($scope.tuanupdate.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.tuanupdate_param, function (value, key) {
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
                if (key == 'order_count_max' && (value == '' || typeof value != 'number' || value <= 0)) {
                    widget.msgToast('没人限购份数未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'reward' && value == '') {
                    widget.msgToast('本期团长奖励未填写');
                    err++;
                } else if (key == 'reward' && value.length > 30) {
                    widget.msgToast('本期团长奖励不能超过30个字');
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
                // if (key == 'activity_small_pics' && (value == '' || value == '[]')) {
                //     widget.msgToast('封面图片缩略图未完成填写');
                //     err++;
                // }
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    widget.msgToast('图文详情未填写一条');
                    err++;
                }
            });
            //console.log($scope.tuanupdate);
            //console.log($scope.tuanupdate_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/tuan/edit';
            $http.post(
                url,
                $scope.tuanupdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        if ($stateParams.type == 'pintuan') {
                            $state.go('pintuan.list');
                        } else {
                            $state.go('goods.list');
                        }
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
});
