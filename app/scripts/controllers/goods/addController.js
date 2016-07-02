// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('goods.addController', addController);

    addController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function addController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, $filter) {
        var sup_scope = $scope;
        $scope.tuanadd = {
            // 注释的都是可以直接提交的数据 或者直接用 tuanadd_param
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
            activity_small_pics: [],
            activity_contents: [
                {
                    id: 0,
                    category: '活动摘要',
                    old: [],
                    new: []
                }
            ]
            //activity_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 09:00:00')),
            //activity_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 11:00:00')),
            //activity_apply_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 18:00:00'))
        };
        $scope.tuanadd_param = {
            account_id: '',
            admin_remark: '',
            activity_title: '',
            reward: '',// 团长奖励
            group_buy_min_num: null,
            order_count_max: 1,
            group_buy_days: null,
            black_list: '',// 不包括的小区名单
            white_list: '',// 包括的小区名单
            group_buy_header_user_id: null,
            is_pinned: 0,// true ：置顶
            activity_options: '',
            activity_pics: '',
            activity_small_pics: '',
            activity_contents: '',
            restrict_inventory: 1,
            category: 3,
            product_id: 0,
            post_user_id: 0,
            extra_data:{//  新增的额外的值 给php
                utm_channel:'',
                commodity_remark:'',
                sku:1,
                commodity_type:1,
                unit: ' ',// 单位、
            }
        };
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.tuanadd.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        // 8张封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.tuanadd.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.tuanadd_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        // 8张封面图片
        $scope.get_small_pics_info = function () {
            $scope.tmp_small_pics_info = [];
            angular.forEach($scope.tuanadd.activity_small_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_small_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.tuanadd_param.activity_small_pics = JSON.stringify($scope.tmp_small_pics_info);
        }
        // selelct community
        $scope.get_community = function () {
            $scope.tuanadd_param.white_list = '';
            $scope.tuanadd_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.tuanadd.ids && $scope.tuanadd.ids.new.length > 0) {
                angular.forEach($scope.tuanadd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.tuanadd.target_type == 1) {
                $scope.tuanadd_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.tuanadd.target_type == 2) {
                $scope.tuanadd_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        //  活动图文 21
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            angular.forEach($scope.tuanadd.activity_contents, function (val, key) {
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
                $scope.tuanadd_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.tuanadd_param.activity_contents = JSON.stringify([]);

            }

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.tuanadd.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.tuanadd.activity_options.empty_obj_num == 0) {
                $scope.tuanadd_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        $scope.save = function (status) {
            if (status == 0) {//草稿
                $scope.tuanadd_param.status = status;
            } else {
                $scope.tuanadd_param.status = 1;
            }
            var err = 0
            $scope.get_pics_info();
            $scope.get_small_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            //console.log($scope.tuanadd_param);
            //console.log($scope.tuanadd);
            //return false;
            //$scope.tuanadd_param.activity_time = $filter('date')($scope.tuanadd.activity_time, 'yyyy-MM-dd HH:mm:ss');
            //$scope.tuanadd_param.activity_end_time = $filter('date')($scope.tuanadd.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            //$scope.tuanadd_param.activity_apply_end_time = $filter('date')($scope.tuanadd.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            angular.forEach($scope.tuanadd_param, function (value, key) {
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
                    widget.msgToast('每人限购份数未填写正确，必须为大于0正整数');
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
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    widget.msgToast('图文详情未填写一条');
                    err++;
                }
                //if (key == 'group_buy_header_user_id' && value == '') {
                //    widget.msgToast('备用团长未填写');
                //    err++;
                //}
            });
            $scope.tuanadd_param.is_pinned = $scope.tuanadd_param.is_pinned + '';
            if ($scope.tuanadd_param.is_pinned == '1') {
                $scope.tuanadd_param.is_pinned = 1;
            } else {
                $scope.tuanadd_param.is_pinned = 0;
            }
            //console.log($scope.tuanadd);
            console.log($scope.tuanadd_param);
            //return false;
            if (err > 0) {
                return false;
            }
            var url = simpleCons.domain + '/manage/tuan/add';
            $http.post(
                url,
                $scope.tuanadd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        alert('发布成功！');
                        $state.go('goods.list');
                    } else {
                        widget.msgToast(data.msg);
                    }
                });

        }
    };
});
