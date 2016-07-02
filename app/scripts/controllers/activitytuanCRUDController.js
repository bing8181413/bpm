// This is a file copied by your subgenerator
define([
    './controllers'
    , '../cons/simpleCons'
], function (mod, simpleCons) {
    mod.controller('activitytuanaddController', activitytuanaddController)
        .controller('activitytuanupdateController', activitytuanupdateController);

    activitytuanaddController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$rootScope', '$filter', 'widget'];
    activitytuanupdateController.$injector = ['$scope', '$http', '$rootScope', '$modal', 'FileUploader', '$state', '$rootScope', '$filter', 'widget'];
    function activitytuanaddController($scope, $http, $rootScope, $modal, FileUploader, $state, $rootScope, $filter, widget) {
        var sup_scope = $scope;
        $scope.city_names = ['昆明', '上海'];
        $scope.showMsg = function (msg) {
            widget.msgToast(msg);
        }
        // 提交的参数
        $scope.activitytuanadd_param = {
            product_id: '-1',
            account_id: "1",
            category: 1,//活动类型  0 未知， 1 活动， 2 团购， 3 拼团
            ref_activity_id: '',
            post_user_id: '',
            ref_topic_id: '',
            activity_title: '',
            activity_time: '',
            activity_end_time: '',
            activity_apply_end_time: '',
            city_name: $rootScope.current_city_name,
            address: '',
            sale_point: '',
            unit: '',
            reward: '',
            tuan_type: 2,
            people_min_num: 0,
            people_num: 0,
            restrict_inventory: 1,
            activity_options: '',
            activity_pics: '',
            activity_contents: [],
            is_pinned: 0,
            apply_verify: 1,
            group_buy_header_user_id: null,
            black_list: '',// 不包括的小区名单
            white_list: ''// 包括的小区名单
        };
        // 页面展示的数据
        $scope.activitytuanadd = {
            ref_name: '',
            target_type: 0,// 小区类型
            ids: {
                old: [],
                new: []
            },
            activity_options: {
                old: [],
                new: []
            },
            activity_contents: [
                {
                    id: 0,
                    category: '活动摘要',
                    old: [],
                    new: []
                },
                {
                    id: 1,
                    category: '活动流程',
                    old: [],
                    new: []
                },
                {
                    id: 2,
                    category: '费用说明',
                    old: [{contentData: {content: '费用说明默认文案'}}],
                    new: []
                },
                {
                    id: 3,
                    category: '不成团说明',
                    old: [{contentData: {content: '活动**组成团，如报名截止时不足**组，则活动自动取消。我们会第一时间通知您，相关的活动费用，将会自动退还至您的支付账户。'}}],
                    new: []
                },
                {
                    id: 4,
                    category: '注意事项',
                    old: [{contentData: {content: '注意事项默认文案'}}],
                    new: []
                }
            ],
            activity_pics: [],
            activity_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 09:00:00')),
            activity_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 11:00:00')),
            activity_apply_end_time: new Date($filter('date')(new Date(), 'yyyy-MM-dd 18:00:00'))
        };
        // 选择全部小区了就 初始化 ids
        $scope.init_ids = function () {
            $scope.activitytuanadd.ids = {// 小区名单
                old: [],
                new: []
            }
        }
        //  查询 topic_id
        var get_topic_url = simpleCons.domain + '/manage/topic/detail';
        $scope.get_topic = function () {
            $scope.activitytuanadd_param.ref_topic_id = $scope.activitytuanadd_param.ref_topic_id || 0;
            if (!$scope.activitytuanadd_param.ref_topic_id) {
                return false;
            }
            $http.post(get_topic_url, {topic_id: $scope.activitytuanadd_param.ref_topic_id})
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.activitytuanadd.ref_topic_name = json.data.title;
                    } else {
                        widget.msgToast(json.msg);
                    }
                }).error(function () {
                    $scope.activitytuanadd_param.ref_topic_id = '';
                    $scope.activitytuanadd.ref_topic_name = '';
                    widget.msgToast('查询无结果');
                })
        }
        //  活动图文
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            angular.forEach($scope.activitytuanadd.activity_contents, function (val, key) {
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
                $scope.activitytuanadd_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.activitytuanadd_param.activity_contents = JSON.stringify([]);
            }
        }
        // 类目
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.activitytuanadd.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.activitytuanadd.activity_options.empty_obj_num == 0) {
                $scope.activitytuanadd_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        // 选择小区
        $scope.get_community = function () {
            $scope.activitytuanadd_param.white_list = '';
            $scope.activitytuanadd_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.activitytuanadd.ids && $scope.activitytuanadd.ids.new.length > 0) {
                angular.forEach($scope.activitytuanadd.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.activitytuanadd.target_type == 1) {
                $scope.activitytuanadd_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.activitytuanadd.target_type == 2) {
                $scope.activitytuanadd_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        // 封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.activitytuanadd.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({
                        pic_url: val.url,
                        pic_width: val.width || 0,
                        pic_height: val.height || 0
                    });
                }
            });
            $scope.activitytuanadd_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }
        $scope.save = function (status) {
            $scope.get_topic();
            if (status == 0) {//草稿
                $scope.activitytuanadd_param.status = status;
            } else {
                $scope.activitytuanadd_param.status = 1;
            }
            $scope.activitytuanadd_param.is_pinned = $scope.activitytuanadd_param.is_pinned + '';
            if ($scope.activitytuanadd_param.is_pinned == '1') {
                $scope.activitytuanadd_param.is_pinned = 1;
            } else {
                $scope.activitytuanadd_param.is_pinned = 0;
            }
            var err = 0;
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            if ($scope.activitytuanadd.activity_time > $scope.activitytuanadd.activity_end_time) {
                $scope.showMsg('活动开始时间不能大于结束时间！');
                err++;
                return false;
            }
            $scope.activitytuanadd_param.activity_time = $filter('date')($scope.activitytuanadd.activity_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.activitytuanadd_param.activity_end_time = $filter('date')($scope.activitytuanadd.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.activitytuanadd_param.activity_apply_end_time = $filter('date')($scope.activitytuanadd.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            //return false;

            angular.forEach($scope.activitytuanadd_param, function (value, key) {
                if (key == 'post_user_id' && value == '') {
                    widget.msgToast('没有选择发布者账号');
                    err++;
                }
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('活动名称未填写');
                    err++;
                }
                if ($scope.activitytuanadd_param.category == 1 && key == 'address' && value == '') {
                    $scope.showMsg('请填写地址！');
                    err++;
                }
                if ($scope.activitytuanadd_param.category == 2 && key == 'unit' && value == ' ') {
                    $scope.showMsg('请填写单位！');
                    err++;
                }
                if (key == 'city_name' && value == '未登录') {
                    $scope.showMsg('请选择一个活动城市！');
                    err++;
                }
                if ($scope.activitytuanadd_param.category == 1 && key == 'people_min_num' &&
                    (value === '' || typeof value != 'number' || value < 0)) {
                    $scope.showMsg('最小成团人数未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'reward' && value.length > 12) {
                    $scope.showMsg('本期团长奖励不能超过12个字');
                    err++;
                }
                if (key == 'activity_options' && (value == '' || value == '[]')) {
                    $scope.showMsg('产品类目未完成填写');
                    err++;
                }
                if (key == 'activity_pics' && (value == '' || value == '[]')) {
                    $scope.showMsg('封面图片未完成填写');
                    err++;
                }
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    $scope.showMsg('图文详情有未填写完整的项目');
                    err++;
                }
            });
            if (err > 0) {
                return false;
            }

            console.log($scope.activitytuanadd_param);
            //return false;

            $rootScope.loading = true;
            var url = simpleCons.domain + '/manage/tuan/add';
            $http.post(
                url,
                $scope.activitytuanadd_param)
                .success(function (data) {
                    if (data.code == 0) {
                        $rootScope.loading = false;
                        $state.go('activitytuan');
                    } else {
                        $rootScope.loading = false;
                        $scope.showMsg(data.msg);
                    }
                })
                .error(function () {
                    $rootScope.loading = false;
                });
        }


    };

    function activitytuanupdateController($scope, $http, $modal, FileUploader, $stateParams, $state, $rootScope, $filter, widget) {
        //$rootScope.loading = 1;
        $scope.iscompleted = false;// option_info  加载完成没有
        $scope.hasimages = true;
        $scope.load_content_img_iscomplete = false;
        $scope.city_names = ['昆明', '上海'];
        $scope.ref_activity_id_disable = false;
        $http.post(simpleCons.domain + '/manage/tuan/item', {
            activity_id: Number($stateParams.activityId)
        }).success(function (json) {
            if (json.code == 0) {
                $scope.activity = json.data;
                $scope.init(json.data);
                $scope.iscompleted = true;//   加载完成没有
                $scope.hasimages = false;
                $scope.load_content_img_iscomplete = true;
            } else {
                widget.msgToast(json.msg);
            }
        });
        $scope.init = function (data) {
            if ($scope.activity.category == 2) {
                $scope.ref_activity_id_disable = true;
            }
            $scope.activitytuanupdate_param = data;
            $scope.activitytuanupdate_param.is_pinned = $scope.activitytuanupdate_param.is_pinned + '';
            if ($scope.activitytuanupdate_param.is_pinned == 'true') {
                $scope.activitytuanupdate_param.is_pinned = 1;
            } else {
                $scope.activitytuanupdate_param.is_pinned = 0;
            }
            $scope.activitytuanupdate_param.account_id = data.account_id + '';
            $scope.activitytuanupdate = {
                ref_name: '',
                target_type: 0,// 小区类型
                ids: {
                    old: [],
                    new: []
                },
                activity_options: {
                    old: [],
                    new: []
                },
                activity_contents: [
                    {
                        id: 0,
                        category: '活动摘要',
                        old: [],
                        new: []
                    },
                    {
                        id: 1,
                        category: '活动流程',
                        old: [],
                        new: []
                    },
                    {
                        id: 2,
                        category: '费用说明',
                        old: [],
                        new: []
                    },
                    {
                        id: 3,
                        category: '不成团说明',
                        old: [],
                        new: []
                    },
                    {
                        id: 4,
                        category: '注意事项',
                        old: [],
                        new: []
                    }
                ],
                activity_pics: [],
                activity_time: data.activity_time,
                activity_end_time: data.activity_end_time,
                activity_apply_end_time: data.activity_apply_end_time,
                product_id: data.product_id,
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
                        $scope.activitytuanupdate.activity_contents[0].old.push(obj);
                    } else if (val.category == '活动流程' || val.category == '活动说明') {
                        $scope.activitytuanupdate.activity_contents[1].old.push(obj);
                    } else if (val.category == '费用说明') {
                        $scope.activitytuanupdate.activity_contents[2].old.push(obj);
                    } else if (val.category == '不成团说明') {
                        $scope.activitytuanupdate.activity_contents[3].old.push(obj);
                    } else if (val.category == '注意事项') {
                        $scope.activitytuanupdate.activity_contents[4].old.push(obj);
                    }
                }
            );
            //console.log($scope.activitytuanupdate.activity_contents);

            //图片格式化字段
            angular.forEach(data.activity_pics, function (val, key) {
                $scope.activitytuanupdate.activity_pics.push({
                    url: val.pic_url,
                    width: val.pic_width,
                    height: val.pic_height
                });
            });
            //console.log($scope.activitytuanupdate);
            //activity_options 格式化字段
            angular.forEach(data.activity_options, function (val, key) {
                $scope.activitytuanupdate.activity_options.old.push({
                    option_id: val.option_id,
                    name: val.option_name,
                    price: val.option_price,
                    origin_price: val.origin_price,
                    origin_inventory: val.inventory
                });
            });
            // 选择小区
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
                $scope.activitytuanupdate.target_type = '0';
            } else if (data.white_list.length > 0) {
                //查到new list 里 不要查到old 里面 可以编辑
                $scope.activitytuanupdate.target_type = '1';
                $scope.activitytuanupdate.ids.new = data.white_list;
            } else if (data.black_list.length > 0) {
                $scope.activitytuanupdate.target_type = '2';
                $scope.activitytuanupdate.ids.new = data.black_list;
            }
        }
        //  查询 topic_id
        var get_topic_url = simpleCons.domain + '/manage/topic/detail';
        $scope.get_topic = function () {
            $scope.activitytuanupdate_param.ref_topic_id = $scope.activitytuanupdate_param.ref_topic_id || 0;
            if (!$scope.activitytuanupdate_param.ref_topic_id) {
                return false;
            }
            $http.post(get_topic_url, {topic_id: $scope.activitytuanupdate_param.ref_topic_id})
                .success(function (json) {
                    if (json.code == 0) {
                        $scope.activitytuanupdate.ref_topic_name = json.data.title;
                    } else {
                        widget.msgToast(json.msg);
                    }
                }).error(function () {
                    $scope.activitytuanupdate_param.ref_topic_id = '';
                    $scope.activitytuanupdate.ref_topic_name = '';
                    widget.msgToast('查询无结果');
                })
        }
        //  活动图文
        $scope.get_contents = function () {
            var tmp_contents = [];
            var tmp_contents_err = 0;
            //console.log($scope.activitytuanupdate.activity_contents);
            angular.forEach($scope.activitytuanupdate.activity_contents, function (val, key) {
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
            //console.log(tmp_contents);
            if (tmp_contents_err == 0) {
                $scope.activitytuanupdate_param.activity_contents = JSON.stringify(tmp_contents);
            } else {
                $scope.activitytuanupdate_param.activity_contents = JSON.stringify([]);
            }

        }
        // 类目  21
        $scope.get_option_info = function () {
            $scope.tmp_option_info = [];
            angular.forEach($scope.activitytuanupdate.activity_options.new, function (val, key) {
                $scope.tmp_option_info.push({
                    option_id: val.option_id,
                    option_name: val.name,
                    option_price: val.price,
                    origin_price: val.origin_price,
                    inventory: val.origin_inventory
                });
            });
            if ($scope.activitytuanupdate.activity_options.empty_obj_num == 0) {
                $scope.activitytuanupdate_param.activity_options = JSON.stringify($scope.tmp_option_info);
            }
        }
        // 选择小区
        $scope.get_community = function () {
            $scope.activitytuanupdate_param.white_list = '';
            $scope.activitytuanupdate_param.black_list = '';
            $scope.tmp_community_info = [];
            if ($scope.activitytuanupdate.ids && $scope.activitytuanupdate.ids.new.length > 0) {
                angular.forEach($scope.activitytuanupdate.ids.new, function (val, key) {
                    $scope.tmp_community_info.push(val.new_community_id);
                });
            }
            if ($scope.activitytuanupdate.target_type == 1) {
                $scope.activitytuanupdate_param.white_list = $scope.tmp_community_info.join(',');
            } else if ($scope.activitytuanupdate.target_type == 2) {
                $scope.activitytuanupdate_param.black_list = $scope.tmp_community_info.join(',');
            }
        }
        // 封面图片
        $scope.get_pics_info = function () {
            $scope.tmp_pics_info = [];
            angular.forEach($scope.activitytuanupdate.activity_pics, function (val, key) {
                if (val.url) {
                    $scope.tmp_pics_info.push({pic_url: val.url, pic_width: val.width, pic_height: val.height});
                }
            });
            $scope.activitytuanupdate_param.activity_pics = JSON.stringify($scope.tmp_pics_info);
        }

        $scope.showMsg = function (msg) {
            widget.msgToast(msg);
        }
        $scope.update = function (status) {
            $scope.get_topic();
            if (status == 0) {//草稿
                $scope.activitytuanupdate_param.status = status;
            } else {
                $scope.activitytuanupdate_param.status = 1;
            }
            var err = 0;
            $scope.get_pics_info();
            $scope.get_community();
            $scope.get_contents();
            $scope.get_option_info();
            if ($scope.activitytuanupdate.activity_time > $scope.activitytuanupdate.activity_end_time) {
                $scope.showMsg('活动开始时间不能大于结束时间！');
                err++;
                return false;
            }
            $scope.activitytuanupdate_param.activity_time = $filter('date')($scope.activitytuanupdate.activity_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.activitytuanupdate_param.activity_end_time = $filter('date')($scope.activitytuanupdate.activity_end_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.activitytuanupdate_param.activity_apply_end_time = $filter('date')($scope.activitytuanupdate.activity_apply_end_time, 'yyyy-MM-dd HH:mm:ss');
            //return false;

            angular.forEach($scope.activitytuanupdate_param, function (value, key) {
                //if (key == 'post_user_id' && value == '') {
                //    widget.msgToast('没有选择发布者账号');
                //    err++;
                //}
                if (key == 'account_id' && value == '') {
                    widget.msgToast('没有选择联系人账号');
                    err++;
                }
                if (key == 'activity_title' && value == '') {
                    widget.msgToast('活动名称未填写');
                    err++;
                }
                if ($scope.activitytuanupdate_param.category == 1 && key == 'address' && value == '') {
                    $scope.showMsg('请填写地址！');
                    err++;
                }
                if ($scope.activitytuanupdate_param.category == 2 && key == 'unit' && value == ' ') {
                    $scope.showMsg('请填写单位！');
                    err++;
                }
                if (key == 'city_name' && value == '未登录') {
                    $scope.showMsg('请选择一个活动城市！');
                    err++;
                }
                if (key == 'people_min_num' && (value === '' || typeof value != 'number' || value < 0)) {
                    $scope.showMsg('最小成团人数未填写正确，必须为大于0正整数');
                    err++;
                }
                if (key == 'reward' && value.length > 12) {
                    $scope.showMsg('本期团长奖励不能超过12个字');
                    err++;
                }
                if (key == 'activity_options' && (value == '' || value == '[]')) {
                    $scope.showMsg('产品类目未完成填写');
                    err++;
                }
                if (key == 'activity_pics' && (value == '' || value == '[]')) {
                    $scope.showMsg('封面图片未完成填写');
                    err++;
                }
                if (key == 'activity_contents' && (value == '' || value == '[]')) {
                    $scope.showMsg('图文详情有未填写完整的项目');
                    err++;
                }
            });
            if (err > 0) {
                return false;
            }

            console.log($scope.activitytuanupdate_param);
            //return false;


            var url = simpleCons.domain + '/manage/tuan/edit';
            $rootScope.loading = true;
            $http.post(
                url,
                $scope.activitytuanupdate_param)
                .success(function (data) {
                    if (data.code == 0) {
                        $rootScope.loading = false;
                        $state.go('activitytuan');
                    } else {
                        $rootScope.loading = false;
                        $scope.showMsg(data.msg);
                    }
                }).error(function () {
                    $rootScope.loading = false;
                });
        }

    }
})
;
