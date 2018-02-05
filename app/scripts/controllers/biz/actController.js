// This is a file copied by your subgenerator
define([
    './../controllers'
    , '../../cons/simpleCons'
], function (mod, con) {
    mod
        .controller('act.updateController', updateController)

    updateController.$injector = ['$scope', '$http', '$rootScope', '$uibModal', '$state', '$stateParams', 'widget', '$filter'];
    function updateController($scope, $http, $rootScope, $uibModal, $state, $stateParams, widget, comfunc, $filter) {
        // $scope.$watch('content',function(val){
        //     console.log(val);
        // });
        $scope.copy = false;
        if ($state.current.name.indexOf('act.copy') > -1) { // 复制用的
            $scope.copy = true;
        }
        if ($stateParams.product_id) {
            widget.ajaxRequest({
                url: '/products/' + $stateParams.product_id,
                method: 'get',
                scope: $scope,
                data: {},
                success: function (json) {
                    $rootScope.hjm.act = {product_id: $stateParams.product_id};
                    if ($state.current.name.indexOf('act.copy') > -1) { // 复制用的
                        json.data.parent_id = $stateParams.product_id;
                        delete json.data.product_id;
                        delete json.data.account_id;
                        delete json.data.status;
                        delete json.data.created_at;
                        delete json.data.updated_at;
                        delete json.data.sale_count;// 删除已售库存字段
                        angular.forEach(json.data.addresses, function (val, key) {
                            delete val.address_id;
                            delete val.product_id;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.contents, function (val, key) {
                            delete val.product_id;
                            delete val.content_id;
                            delete val.created_at;
                            delete val.updated_at;
                            angular.forEach(val.pics, function (val, key) {
                                delete val.pic_id;
                                delete val.imageable_id;
                                delete val.imageable_type;
                                delete val.status;
                                delete val.created_at;
                                delete val.updated_at;
                            });
                        });
                        angular.forEach(json.data.gift_contents, function (val, key) {
                            delete val.product_id;
                            delete val.content_id;
                            delete val.created_at;
                            delete val.updated_at;
                            angular.forEach(val.pics, function (val, key) {
                                delete val.pic_id;
                                delete val.imageable_id;
                                delete val.imageable_type;
                                delete val.status;
                                delete val.created_at;
                                delete val.updated_at;
                            });
                        });
                        angular.forEach(json.data.course_contents, function (val, key) {
                            delete val.product_id;
                            delete val.content_id;
                            delete val.created_at;
                            delete val.updated_at;
                            angular.forEach(val.pics, function (val, key) {
                                delete val.pic_id;
                                delete val.imageable_id;
                                delete val.imageable_type;
                                delete val.status;
                                delete val.created_at;
                                delete val.updated_at;
                            });
                        });
                        angular.forEach(json.data.pics, function (val, key) {
                            delete val.pic_id;
                            delete val.imageable_id;
                            delete val.imageable_type;
                            delete val.status;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.thumbnail_pics, function (val, key) {
                            delete val.pic_id;
                            delete val.imageable_id;
                            delete val.imageable_type;
                            delete val.status;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.options, function (val, key) {
                            delete val.option_id;
                            delete val.option_status;
                            delete val.option_type;
                            delete val.product_id;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.groupbuy_options, function (val, key) {
                            delete val.option_id;
                            delete val.option_status;
                            delete val.option_type;
                            delete val.product_id;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.gift_options, function (val, key) {
                            delete val.option_id;
                            delete val.option_status;
                            delete val.option_type;
                            delete val.product_id;
                            delete val.created_at;
                            delete val.updated_at;
                        });
                        angular.forEach(json.data.gift_pics, function (val, key) {
                            delete val.pic_id;
                            delete val.imageable_id;
                            delete val.imageable_type;
                            delete val.status;
                            delete val.created_at;
                            delete val.updated_at;
                        });

                    }
                    $scope.param = angular.copy(json.data);
                    $scope.is_default_category = $scope.param.category;
                    $scope.hours = comfunc.numDiv($scope.param.group_seconds || 0, 3600);
                    $scope.groupbuy_auto_hours = comfunc.numDiv($scope.param.groupbuy_auto_seconds || 0, 3600);
                    // $scope.course_category = $scope.param.course_category.split(',') || [];
                    $scope.ability_label = $scope.param.ability_label.split(',') || [];
                    $scope.course_ability_label = $scope.param.course_ability_label.split(',') || [];
                    if ($scope.param.vip_promotion_type == '1') {
                        $scope.vip_discount = comfunc.numMulti($scope.param.vip_discount, 100);
                    } else {
                        $scope.vip_discount = $scope.param.vip_discount;
                    }

                    //礼包初始化 start

                    $scope.gift_discount = comfunc.numMulti($scope.param.gift_discount, 100);

                    //礼包初始化 end

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

                    if ($scope.param.act_week) {
                        $scope.act_week = $scope.param.act_week.split(',');
                    }

                }
            })
        }

        $scope.$watch('hours', function (val) {
            if (!!val) {
                $scope.hours = parseFloat(val);
                $scope.param.group_seconds = comfunc.numMulti(val, 3600);
            }
        }, true);
        $scope.$watch('groupbuy_auto_hours', function (val) {
            if (!!val || val == 0) {
                if (val == 0) {
                    $scope.groupbuy_auto_hours = 0;
                    $scope.param.groupbuy_auto_seconds = 0;
                } else if (val > 1) {
                    $scope.groupbuy_auto_hours = parseFloat(val);
                    $scope.param.groupbuy_auto_seconds = comfunc.numMulti(val, 3600);
                }
            } else {
                $scope.param && ($scope.param.groupbuy_auto_seconds = 0);
            }
        }, true);

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
            } else if (!!val && val == '1') {
                $scope.param.frequency_num = 1;
            }
        }, true);

        $scope.reset_vip_discount = function () {
            var val = $scope.vip_discount;
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

        $scope.reset_gift_discount = function () {
            var tmp_gift = parseInt($scope.gift_discount);
            $scope.gift_discount = (tmp_gift >= 100) ? 99 : (tmp_gift < 0 ? 0 : tmp_gift);
        }

        $scope.$watch('param.vip_promotion_type', function (val) {
            $scope.reset_vip_discount();
        }, true);

        $scope.$watch('ability_label', function (val, oldVal) {
            if (val) {
                $scope.param.ability_label = $scope.ability_label.join(',');
            } else {
                $scope.param && ($scope.param.ability_label = '');
            }
        }, true);

        $scope.$watch('course_ability_label', function (val, oldVal) {
            if (val) {
                $scope.param.course_ability_label = $scope.course_ability_label.join(',');
            } else {
                $scope.param && ($scope.param.course_ability_label = '');
            }
        }, true);

        // $scope.$watch('act_week', function (val) {
        //     if (val) {
        //         $scope.param.act_week = val.join(',');
        //     }
        // }, true);

        $scope.$watch('param.gift_share_title', function (val) {
            $scope.title = '土豪';
            $scope.nickname = '张三';
        }, true);

        $scope.compare_hours = function () {
            if ($scope.hours <= $scope.groupbuy_auto_hours) {
                widget.msgToast('拼团有效时间 > 自动成团剩余时间  点击取消', 5000);
                return false;
            }
            if ($scope.groupbuy_auto_hours <= 1 && $scope.groupbuy_auto_hours > 0) {
                widget.msgToast('自动成团剩余时间 > 1小时,或 = 0 小时  点击取消', 5000000);
                return false;
            }
            return true;
        }
        $scope.miniapp = function () {
            $scope.param.group_strange = 1;// 陌生人拼团 不支持
            $scope.param.visible_cities = [];//覆盖城市置空  无覆盖城市表示 任何城市都可以购买
            $scope.param.order_count_max = 1;// 单次限购份数 1
            $scope.param.per_buy_count = 0;// 单人限购份数 0 表示不限制
            // 优惠规则
            $scope.param.coupon_share = 2; // 会员、优惠券是否可同享 2 不可共享
            $scope.param.act_coupon = 2;// 是否可选优惠券  2 不可选
            $scope.param.coupon_category = 1;// 年卡优惠券类型 1 不可用年卡
            $scope.param.vip_promotion_type = 1;//会员购买优惠 3 无优惠
            // 不支持礼包
            $scope.param.gift_buy = 2;// 是否可买礼包 2 否
            // 不支持富文本
            $scope.param.course_content_type = 1;// QA 图文类型 1 图文
            $scope.param.content_type = 1;//课程详情 图文类型 1 图文
            $scope.param.gift_content_type = 1;//礼包详情 图文类型 1 图文
        }
        //选择 小程序 要改动的地方
        $scope.$watch('param.course_type', function (val) {
            if (val == 2) {
                $scope.miniapp();
            }
        }, true);

        $scope.submit = function (status) {
            var supscope = $scope;
            $scope.goon = true;
            if ($scope.param.course_type == 2) {
                // 小程序 do something
                $scope.miniapp();
                if ($scope.param.options.length > 1) {
                    widget.msgToast('直接买活动类目不能大于1条');
                    return false;
                } else if ($scope.param.options.length > 1) {
                    widget.msgToast('groupbuy_options不能大于1条');
                    return false;
                }
            }
            // console.log($scope.is_default_category, $scope.param.category);

            // $scope.param.enable_bind_mobile = 1; // 强制绑定手机号码

            if ($scope.param.act_time_type && $scope.param.act_time_type == '1') {
                $scope.act_week = [];
                $scope.param.act_week = '';
            } else if ($scope.param.act_time_type && $scope.param.act_time_type == '2') {
                $scope.param.act_week = $scope.act_week.join(',');
            }

            $scope.param.act_start_time = $filter('date')($scope.param.act_start_time, 'yyyy-MM-dd HH:mm:ss');
            $scope.param.act_end_time = $filter('date')($scope.param.act_end_time, 'yyyy-MM-dd HH:mm:ss') || '';
            if ($scope.param.vip_promotion_type == '1') {
                $scope.param.vip_discount = comfunc.numDiv($scope.vip_discount, 100);
            } else if ($scope.param.vip_promotion_type == '2') {
                $scope.param.vip_discount = $scope.vip_discount;
            }

            // 礼包验证  start

            if ($scope.param.gift_buy == 2) {
                // 没有选择礼包 不做处理
            } else {
                if ($scope.param.gift_promotion_type == 1) {
                    if ($scope.gift_discount == 0) {
                        $scope.param.gift_discount = 0;
                    } else if (!$scope.gift_discount) {
                        widget.msgToast('sorry!礼包折扣不能为空');
                        return false;
                    } else {
                        $scope.param.gift_discount = comfunc.numDiv($scope.gift_discount || 99, 100);
                    }
                }
                if (!$scope.param.gift_options || $scope.param.gift_options && $scope.param.gift_options.length == 0) {
                    widget.msgToast('sorry!礼包类目不能为空');
                    return false;
                } else {
                    if (comfunc.hasEmptyFieldArray($scope.param.gift_options)) {
                        widget.msgToast('sorry!礼包类目有空值');
                        return false;
                    }
                }
            }

            // 礼包验证  end

            if ($scope.param.video_url) {
                var reg_https = /^(([hH][tT]{2}[pP][sS]:\/\/)+[^\s]*)$/;
                var reg_http = /^(([hH][tT]{2}[pP]:\/\/)+[^\s]*)$/;
                if (!reg_https.test($scope.param.video_url) && !reg_http.test($scope.param.video_url)) {
                    widget.msgToast('视频或者音频网址不是以https://或者http://开头，或者不是网址！');
                    return false;
                }
            }
            if ($scope.param.addresses && !comfunc.isEmptyArray($scope.param.addresses)) {
                angular.forEach($scope.param.addresses, function (val, key) {
                    delete val.timeStamp;
                    if (!val.detail_address) {
                        widget.msgToast('详细地址没有填写');
                        return false;
                    }
                });
            } else {
                $scope.param.addresses = [];
            }
            if ($scope.param.pics && !comfunc.isEmptyArray($scope.param.pics)) {
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
            }
            if ($scope.param.thumbnail_pics && !comfunc.isEmptyArray($scope.param.thumbnail_pics)) {
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
            }
            if ($scope.param.gift_pics && !comfunc.isEmptyArray($scope.param.gift_pics)) {
                var tmp_gift_pics_err = 0;
                angular.forEach($scope.param.gift_pics, function (val, key) {
                    if (!val.pic_url) {
                        tmp_gift_pics_err++;
                    }
                })
                if (tmp_gift_pics_err > 0) {
                    widget.msgToast('礼包图片还没有完成上传');
                    return false;
                }
            }
            if ($scope.param.contents && !comfunc.isEmptyArray($scope.param.contents)) {
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
            // if (comfunc.isEmptyArray($scope.param.visible_cities)) {
            //     widget.msgToast('配送城市没有选择');
            //     return false;
            // }
            if ($scope.param.category == 2 || $scope.param.category == 4) {
                // 人数团 要填写 拼团人数 和 拼团时间
                if (!$scope.param.group_min_num && $scope.param.group_min_num <= 0) {
                    widget.msgToast('人数团de拼团人数要大于零');
                    return false;
                }
                if (!$scope.hours && $scope.hours <= 0) {
                    widget.msgToast('人数团de拼团有效时间要大于零');
                    return false;
                }
                if (!$scope.compare_hours()) {//  比较拼团时间和剩余凑团时间
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
            } else if ($scope.param.category == '2') {
                delete $scope.param.options; //   防止提交空数组
                if (!$scope.param.groupbuy_options || $scope.param.groupbuy_options && $scope.param.groupbuy_options.length == 0) {
                    widget.msgToast('sorry!人数团类目为空');
                    return false;
                } else {
                    if (comfunc.hasEmptyFieldArray($scope.param.groupbuy_options)) {
                        widget.msgToast('sorry!人数团类目有空值');
                        return false;
                    }
                }
            } else if ($scope.param.category == '3') {
                delete $scope.param.groupbuy_options; //   防止提交空数组
                if (!$scope.param.options || $scope.param.options && $scope.param.options.length == 0) {
                    widget.msgToast('sorry!直接买类目为空');
                    return false;
                } else {
                    if (comfunc.hasEmptyFieldArray($scope.param.options)) {
                        widget.msgToast('sorry!直接买类目有空值');
                        return false;
                    }
                }
            }
            if ($stateParams.product_id && $scope.is_default_category != $scope.param.category) {
                var modalInstance = $uibModal.open({
                        template: '<div modal-panel title="title" tmpl="tmpl"></div>',
                        controller: function ($scope, $uibModalInstance) {
                            $scope.title = '切换活动类型警告';
                            $scope.tmpl = '<form class="form-horizontal" name="FormBody" novalidate' +
                                ' disabled-role="\'admin,op\'" >' +
                                '<h4 class="text-muted">确认前，请注意一下几点：</h4>' +
                                '<h5 class="text-danger">1.原未支付订单（直接买订单，开团用户订单，参团用户订单）仍可以支付成功;</h5>' +
                                '<h5 class="text-danger">2.人数团切直接买，原开团用户或者参团用户支付成功后，再次进到拼团详情会报错;</h5>' +
                                '<h5 class="text-danger">3.人数团切直接买，用户不可以再开团或者参团，即下订单</h5>' +
                                '<h4 class="text-muted">建议:</h4>' +
                                '<h5 class="text-danger">切换活动类型前，最好不要有未支付订单，或者正在进行中的拼团</h5>' +
                                '<a class="btn btn-success btn-rounded pull-right" ng-click="submit()">确定</a>' +
                                '<a class="btn btn-warning btn-rounded pull-right" ng-click="cancel()">取消</a> &nbsp;&nbsp;&nbsp;' +
                                '</form>';
                            $scope.submit = function () {
                                supscope.onsubmit();
                                $scope.cancel();
                            }
                            $scope.cancel = function () {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        size: 'lg'
                    }
                );
            } else {
                $scope.onsubmit();
            }
        }
        $scope.onsubmit = function () {
            widget.ajaxRequest({
                url: '/products' + ((!$stateParams.product_id || $scope.param.parent_id) ? '' : ('/' + $stateParams.product_id)),
                method: (!$stateParams.product_id || $scope.param.parent_id) ? 'POST' : 'PUT',
                scope: $scope,
                data: $scope.param,
                success: function (json) {
                    widget.msgToast('发布成功！', 500);
                    $state.go(con.state.main + '.act.list');
                },
                failure: function (err) {
                    localStorage.setItem('hjm-act-failure-' + new Date().getTime(), JSON.stringify({param: $scope.param}));
                    console.log($scope.param.addresses, JSON.stringify($scope.param.addresses),
                        $scope.param.pics, JSON.stringify($scope.param.pics),
                        $scope.param.thumbnail_pics, JSON.stringify($scope.param.thumbnail_pics),
                        $scope.param.contents, JSON.stringify($scope.param.contents));
                    widget.msgToast(err.message + '\n点击取消', 2000);
                }
            })
        }
    };
});
