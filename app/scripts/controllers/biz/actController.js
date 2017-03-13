// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('act.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$modal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $modal, $state, $stateParams, widget, comfunc, $filter) {
        // $scope.$watch('content',function(val){
        //     console.log(val);
        // });
        if ($stateParams.product_id) {
            widget.ajaxRequest({
                url: '/products/' + $stateParams.product_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $rootScope.hjm.act = {product_id: $stateParams.product_id};
                    $scope.param = angular.copy(json.data);
                    $scope.hours = comfunc.numDiv($scope.param.group_seconds || 0, 3600);
                    // $scope.course_category = $scope.param.course_category.split(',') || [];
                    $scope.ability_label = $scope.param.ability_label.split(',') || [];
                    if ($scope.param.vip_promotion_type == '1') {
                        $scope.vip_discount = comfunc.numMulti($scope.param.vip_discount, 100);
                    } else {
                        $scope.vip_discount = $scope.param.vip_discount;
                    }
                    // console.log(new Date($scope.param.act_start_time).getHours() == 0, new Date($scope.param.act_start_time).getMinutes() == 0);
                    // console.log(new Date($scope.param.act_end_time).getMinutes() == 0, new Date($scope.param.act_end_time).getMinutes() == 0);
                    if (new Date($scope.param.act_start_time).getHours() == 0 &&
                        new Date($scope.param.act_start_time).getMinutes() == 0 &&
                        new Date($scope.param.act_end_time).getHours() == 0 &&
                        new Date($scope.param.act_end_time).getMinutes() == 0) {
                        $scope.showTime = true;
                    } else {
                        $scope.showTime = false;
                    }
                }
            })
        }
        $scope.$watch('hours', function (val) {
            if (!!val) {
                $scope.hours = parseFloat(val);
                $scope.param.group_seconds = comfunc.numMulti(val, 3600);
            }
        });
        //  获取地理位置信息 传入地址
        $scope.getlocation = function () {
            if (angular.isUndefined($scope.city_name)) {
                widget.msgToast('没有城市');
                return false;
            }
            if (angular.isUndefined($scope.param.act_detailed_address)) {
                widget.msgToast('没有地址');
                return false;
            }
            $scope.timeStamp = new Date().getTime();// 这个字段 有监听事件
        }
        //  日期时间 转 纯日期
        $scope.datetimeTodate = function (date_time) {
            $scope.date_time_tmp = date_time ? new Date(date_time) : new Date();
            return $scope.date_time_tmp.getFullYear() + '-' + ($scope.date_time_tmp.getMonth() + 1)
                + '-' + $scope.date_time_tmp.getDate() + ' 00:00:00'
        }
        // 切换日期时间 和 纯日期
        $scope.toggleShowTime = function () {
            $scope.showTime = !$scope.showTime;
            $scope.param.act_start_time = !$scope.showTime ?
                ($scope.param.act_start_time) : ($scope.datetimeTodate($scope.param.act_start_time));
            $scope.param.act_end_time = !$scope.showTime ?
                ($scope.param.act_end_time) : ($scope.datetimeTodate($scope.param.act_end_time));
            // console.log($scope.showTime, $scope.param.act_start_time, $scope.param.act_end_time);
        }

        $scope.$watch('param.delivery_type', function (val) {
            if (!!val && val == '3') {
                $scope.param.frequency_num = 0;
            }
        });
        $scope.reset_vip_discount = function () {
            val = $scope.vip_discount;
            if ($scope.param && $scope.param.vip_promotion_type == '1') {
                val = parseInt(val);
                $scope.vip_discount = (val >= 100) ? 99 : (val < 0 ? 0 : val);
            } else if ($scope.param && $scope.param.vip_promotion_type == '2') {
                val = parseFloat(val);
                if (val.toString().split('.').length == 2) {
                    $scope.vip_discount = val.toFixed(1);
                } else {
                    $scope.vip_discount = parseInt(val);
                }
            }
        }
        $scope.$watch('param.vip_promotion_type', function (val) {
            $scope.reset_vip_discount();
        });

        $scope.$watch('ability_label', function (val, oldVal) {
            if (val) {
                $scope.param.ability_label = $scope.ability_label.join(',');
            } else {
                $scope.param && ($scope.param.ability_label = '');
            }
        }, true);

        // 该商品 是否需要绑定手机号码
        // $scope.$watch('param.enable_bind_mobile', function (val, oldVal) {
        //     // console.log(val,oldVal);
        //     if (val && val == 2 && oldVal == 1) {
        //         widget.msgToast('取消强制绑定手机号');
        //     }
        // });

        $scope.submit = function (status) {
            // console.log($scope.param.contents);
            if ($scope.param.enable_bind_mobile && $scope.param.enable_bind_mobile == 2) {
                if (!confirm('确定该活动取消绑定手机号')) {
                    return false;
                }
            }
            $scope.param.act_start_time = $filter('date')($scope.param.act_start_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.param.act_end_time = $filter('date')($scope.param.act_end_time, 'yyyy-MM-dd HH:mm:ss');
            if ($scope.param.vip_promotion_type == '1') {
                $scope.param.vip_discount = comfunc.numDiv($scope.vip_discount, 100);
            } else if ($scope.param.vip_promotion_type == '2') {
                $scope.param.vip_discount = $scope.vip_discount;
            }

            if ($scope.param.video_url) {
                var reg_https = /^(([hH][tT]{2}[pP][sS]:\/\/)+[^\s]*)$/;
                var reg_http = /^(([hH][tT]{2}[pP]:\/\/)+[^\s]*)$/;
                if (!reg_https.test($scope.param.video_url) && !reg_http.test($scope.param.video_url)) {
                    widget.msgToast('视频或者音频网址不是以https://或者http://开头，或者不是网址！');
                    return false;
                }
            }
            if (comfunc.isEmptyArray($scope.param.pics)) {
                widget.msgToast('运营大图没有上传');
                return false;
            } else {
                var tmp_pics_err = 0;
                angular.forEach($scope.param.pics, function (val, key) {
                    if (!val.pic_url) {
                        tmp_pics_err++;
                    }
                })
                if (tmp_pics_err > 0) {
                    widget.msgToast('运营大图还没有完成上传');
                    return false;
                }

                var tmp_thumbnail_pics_err = 0;
                angular.forEach($scope.param.thumbnail_pics, function (val, key) {
                    if (!val.pic_url) {
                        tmp_thumbnail_pics_err++;
                    }
                })
                if (tmp_thumbnail_pics_err > 0) {
                    widget.msgToast('运营缩略图还没有完成上传');
                    return false;
                }
                var tmp_content_err = 0;
                angular.forEach($scope.param.contents, function (val, key) {
                    if (!val) {
                        tmp_content_err++;
                    } else {
                        angular.forEach(val.pics, function (v, k) {
                            if (!v.pic_url) {
                                tmp_content_err++;
                            }
                        })
                    }

                })
                if (tmp_content_err > 0) {
                    widget.msgToast('图文详情中有图片还没有完成上传');
                    return false;
                }
            }

            if ($scope.param.content_type == 1 && comfunc.isEmptyArray($scope.param.contents)) {
                widget.msgToast('图文详情没有上传');
                return false;
            }
            if ($scope.param.content_type == 2 && (!$scope.param.rich_text || $scope.param.rich_text == '')) {
                widget.msgToast('富文本内容未填写');
                return false;
            }
            if (comfunc.isEmptyArray($scope.param.visible_cities)) {
                widget.msgToast('配送城市没有选择');
                return false;
            }
            if ($scope.param.category == 2) {
                // 人数团 要填写 拼团人数 和 拼团时间
                if (!$scope.param.group_min_num && $scope.param.group_min_num <= 0) {
                    widget.msgToast('人数团de拼团人数要大于零');
                    return false;
                }
                if (!$scope.hours && $scope.hours <= 0) {
                    widget.msgToast('人数团de拼团有效时间要大于零');
                    return false;
                }
            }
            if (status || status == 0) {
                $scope.param.status = status;
            } else {
                $scope.param.status = 1;
            }
            if (!$scope.param.order_by) {
                $scope.param.order_by = 0;
            }
            if (!$scope.param.act_min_age) {
                $scope.param.act_min_age = 0;
            }
            if (!$scope.param.act_max_age) {
                $scope.param.act_max_age = 0;
            }
            if ($scope.param.category == '4') {
                if (!$scope.param.options
                    || $scope.param.options && $scope.param.options.length == 0
                    || !$scope.param.groupbuy_options
                    || $scope.param.groupbuy_options && $scope.param.groupbuy_options.length == 0) {
                    widget.msgToast('sorry!直接买or人数团de活动类目为空');
                    return false;
                } else {
                    // console.log($scope.param.options, $scope.param.groupbuy_options);
                    if (comfunc.hasEmptyFieldArray($scope.param.options) || comfunc.hasEmptyFieldArray($scope.param.groupbuy_options)) {
                        widget.msgToast('sorry!直接买or人数团de活动类目有空值');
                        return false;
                    }
                }
            } else if ($scope.param.category != '4') {
                delete $scope.param.groupbuy_options; //   防止提交空数组
                if (!$scope.param.options || $scope.param.options && $scope.param.options.length == 0) {
                    widget.msgToast('sorry!活动类目为空');
                    return false;
                } else {
                    if (comfunc.hasEmptyFieldArray($scope.param.options)) {
                        widget.msgToast('sorry!活动类目有空值');
                        return false;
                    }
                }
            }
            widget.ajaxRequest({
                url: '/products' + ($stateParams.product_id ? ('/' + $stateParams.product_id) : ''),
                method: $stateParams.product_id ? 'PUT' : 'POST',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！');
                    $state.go(con.state.main + '.act.list');
                },
                failure: function (err) {
                    localStorage.setItem('hjm-act-failure-' + new Date().getTime(), JSON.stringify({param: $scope.param}));
                    widget.msgToast(err.message)
                }
            })
        }
    };
});
