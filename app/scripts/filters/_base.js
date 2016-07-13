define(['./filters', '../cons/simpleCons'], function (mod, simpleCons) {
    mod
        .filter('gender', [function () {
            return function (val) {
                return val == '1' ? '男' : '女';
            }
        }])
        .filter('num2week', [function () {
            return function (val) {
                val = val + '';
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '星期一';
                        break;
                    case '2':
                        rtn = '星期二';
                        break;
                    case '3':
                        rtn = '星期三';
                        break;
                    case '4':
                        rtn = '星期四';
                        break;
                    case '5':
                        rtn = '星期五';
                        break;
                    case '6':
                        rtn = '星期六';
                        break;
                    case '7':
                        rtn = '星期天';
                        break;
                    default :
                        rtn = '星期八';
                }
                return rtn;
            }
        }])
        .filter('num2hour', [function () {// 数字转小时数
            return function (val) {
                return parseInt((val * 1) / (60 * 60 * 1000));
            }
        }])
        .filter('null2empty', [function () {
            return function (val) {
                return (!val || val == null || val == 'null') ? '' : val;
            }
        }])
        .filter('arraySub2String', [function () {
            return function (val, param) {
                // "item.menus | arraySub2String:\'name\'"
                var rtn = '';
                angular.forEach(val, function (v, k) {
                    rtn += eval('v.' + param);
                })
                return rtn;
            }
        }])
        .filter('to_trusted', ['$sce', function ($sce) {
            return function (text) {
                return $sce.trustAsHtml(text);
            }
        }])
        .filter('stringify', [function () {
            return function (val) {
                if (val && angular.isObject(val)) {
                    return JSON.stringify(val);
                } else {
                    return val || '';
                }
            }
        }])
        .filter('parseArray', [function () {
            return function (val) {
                if (val) {
                    return JSON.parse(val);
                }
            }
        }])
        .filter('brithday2age', [function () {
            return function (brithday) {
                if (!brithday || brithday == 'null') {
                    return '';
                } else if (brithday.length >= 10) {
                    return new Date().getFullYear() - brithday.substr(0, 4);
                } else {
                    return '';
                }
            }
        }])
        // 剩余时间  跟当前时间比较 当前时间-结束时间
        .filter('remaining_time', [function () {
            return function (end_time) {
                if (end_time) {
                    var rtn_now = new Date().getTime();
                    var rtn_end_time = new Date(end_time.replace(/-/g, "/")).getTime();
                    var remaining_time = (rtn_end_time - rtn_now);
                    if (remaining_time <= 0) {
                        remaining_time = '已结束';
                    } else {
                        remaining_time = parseInt(remaining_time / (24 * 60 * 60 * 1000)) + '天' + parseInt((remaining_time % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)) + '小时'
                            + parseInt(((remaining_time % (24 * 60 * 60 * 1000)) % (60 * 60 * 1000)) / (60 * 1000)) + '分钟';
                    }
                    return remaining_time;
                }
                return '';


            }
        }])
        .filter('verify_type', [function () {
            return function (val) {
                return val == 5 ? '验证中' : val == 6 ? '已经通过' : '未验证';
            }
        }])
        .filter('library_status', [function () {//  图书状态
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '未领取';
                        break;
                    case '5':
                        rtn = '预订中';
                        break;
                    case '7':
                        rtn = '共享中';
                        break;
                    case '4':
                        rtn = '等待主人回复';
                        break;
                    case '6':
                        rtn = '等待确认收到';
                        break;
                    default :
                        rtn = '其他';
                }
                return rtn;
            }
        }])
        .filter('library_source', [function () { //  图书来源
            return function (val) {
                return val == 1 ? '领取' : '用户上传';
            }
        }])
        .filter('publish_status', [function () { //  图书来源
            return function (val) {
                return val == 1 ? '发布到全部小区' : '已经发布';
            }
        }])
        .filter('target_type', [function () { // 小区覆盖类型
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '部分小区';
                        break;
                    case '2':
                        rtn = '所有小区';
                        break;
                    case '3':
                        rtn = '排除小区';
                        break;
                    default :
                        rtn = '其他';
                }
                return rtn;
            }
        }])
        .filter('tuan_type', [function () { // 团类型
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '单独成团';
                        break;
                    case '2':
                        rtn = '一起团';
                        break;
                    default :
                        rtn = '其他团';
                }
                return rtn;
            }
        }])
        .filter('refund_status', [function () { // 退款状态
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '申请中';
                        break;
                    case '2':
                        rtn = '已申请';
                        break;
                    case '3':
                        rtn = '退款中';
                        break;
                    case '4':
                        rtn = '退款成功';
                        break;
                    default :
                        rtn = '其他状态';
                }
                return rtn;
            }
        }])
        .filter('payment_from', [function () { // 支付类型
            return function (val) {
                val = val + '';
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '微信';
                        break;
                    case '2':
                        rtn = '支付宝';
                        break;
                    case '3':
                        rtn = '微信H5';
                        break;
                    default :
                        rtn = '未选择';
                }
                return rtn;
            }
        }])
        .filter('pay_status', [function () { // 支付状态
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '0':
                        rtn = '没有支付';
                        break;
                    case '1':
                        rtn = '等待支付';
                        break;
                    case '2':
                        rtn = '支付成功';
                        break;
                    case '3':
                        rtn = '支付失败 ';
                        break;
                    case '4':
                        rtn = '支付过期';
                        break;
                    case '5':
                        rtn = '取消报名';
                        break;
                    default :
                        rtn = '其他';
                }
                return rtn;
            }
        }])
        .filter('acticity_comunity_status', [function () { // 参与活动的小区状态
            return function (val) {
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = '正常';
                        break;
                    case '2':
                        rtn = '已结束';
                        break;
                    case '3':
                        rtn = '已删除';
                        break;
                    default :
                        rtn = '其他';
                }
                return rtn;
            }
        }]).filter('good_type', [function () { // 积分商品的类型
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '抽奖';
                    break;
                case '2':
                    rtn = '优惠券';
                    break;
                case '3':
                    rtn = '实物';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('good_status', [function () { // 积分商品的状态
        return function (val) {
            var rtn = '';
            switch (val * 1) {
                case 1:
                    rtn = '待上线';
                    break;
                case 2:
                    rtn = '已上线';
                    break;
                case 3:
                    rtn = '已下线';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('board_status', [function () { // 积分商品运营位的状态
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '待上线';
                    break;
                case '2':
                    rtn = '已上线';
                    break;
                case '3':
                    rtn = '已下线';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('topic_status', [function () { // 话题状态
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '进行中';
                    break;
                case '2':
                    rtn = '已结束';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('verify_source_type', [function () { // 用户验证列表的 来源
        return function (val) {
            var rtn = '';
            val = val + '';
            switch (val) {
                case '1':
                    rtn = '上传凭证';
                    break;
                case '2':
                    rtn = '选小区、官方邀请码';
                    break;
                case '3':
                    rtn = '活动、订单凭证';
                    break;
                case '4':
                    rtn = '拼团';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('activity_status', [function () { // 活动的状态
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '正常';
                    break;
                case '2':
                    rtn = '已结束';
                    break;
                case '3':
                    rtn = '回顾中';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('credit_user_status', [function () { // 积分兑换详情的物流状态  暂时没有用
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '1';
                    break;
                case '2':
                    rtn = '2';
                    break;
                case '3':
                    rtn = '3';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('activity_category', [function () { // 活动类型
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '一起玩';
                    break;
                case '2':
                    rtn = '一起便宜';
                    break;
                case '3':
                    rtn = '拼团';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('id_invite_url', [function () { // 活动类型
        return function (val) {
            var rtn = simpleCons.web_domain + '/download.html?channel=' + val;
            return rtn;
        }
    }]).filter('invite_status', [function () { // 邀请码状态
        return function (val) {
            var rtn = '';
            switch (val * 1) {
                case 1:
                    rtn = '使用中';
                    break;
                case 2:
                    rtn = '已停用';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('feedback_status', [function () { // 消息状态
        return function (val) {
            var rtn = '';
            switch (val * 1) {
                case 1:
                    rtn = '未回复';
                    break;
                case 2:
                    rtn = '已回复';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('order_state', [function () { // 订单状态
        return function (val) {
            var rtn = '';
            switch (val * 1) {
                case 0:
                    rtn = '待支付';
                    break;
                case 1:
                    rtn = '支付中';
                    break;
                case 2:
                    rtn = '已取消';
                    break;
                case 3:
                    rtn = '已支付';
                    break;
                case 4:
                    rtn = '过期';
                    break;
                case 5:
                    rtn = '已完成';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('order_use_coupon', [function () { // 订单是否使用优惠券
        return function (id) {
            var rtn = '';
            switch (id) {
                case 0:
                case '0':
                    rtn = '未使用';
                    break;
                default :
                    rtn = id;
            }
            return rtn;
        }
    }]).filter('order_refund_status', [function () { // 订单是否使用优惠券
        return function (val) {
            var rtn = '';
            switch (val) {
                case '0':
                    rtn = '待审核';
                    break;
                case '1':
                    rtn = '审核失败';
                    break;
                case '2':
                    rtn = '审核成功';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('coupon_status', [function () { // 优惠券状态
        return function (val) {
            var rtn = '';
            val = val + '';
            switch (val) {
                //case '0':
                //    rtn = '待审核';
                //    break;
                case '1':
                    rtn = '待处理';
                    break;
                case '2':
                    rtn = '处理中';
                    break;
                case '3':
                    rtn = '已完成';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('sms_status', [function () { // 短信发送状态
        return function (val) {
            var rtn = '';
            switch (val) {
                case '1':
                    rtn = '待处理';
                    break;
                case '2':
                    rtn = '处理中';
                    break;
                case '3':
                    rtn = '已完成';
                    break;
                default :
                    rtn = '其他';
            }
            return rtn;
        }
    }]).filter('push_status', [function () { // 消息推送状态
        return function (val) {
            var rtn = '';
            val = val + '';
            // 发送状态[0:待发送,1:发送中,2:发送失败,3:已发送]
            switch (val) {
                case '0':
                    rtn = '待发送';
                    break;
                case '1':
                    rtn = '发送中';
                    break;
                case '2':
                    rtn = '发送失败';
                    break;
                case '3':
                    rtn = '已发送';
                    break;
                default :
                    rtn = '未知状态';
            }
            return rtn;
        }
    }]).filter('push_scope_type', [function () { // 消息推送 广播范围
        return function (val) {
            var rtn = '';
            // 广播范围(0:指定用户,1:所有,2:注册用户,3:认证用户,4:需升级用户)
            switch (val) {
                case '0':
                    rtn = '指定用户';
                    break;
                case '1':
                    rtn = '所有用户';
                    break;
                case '2':
                    rtn = '注册用户';
                    break;
                case '3':
                    rtn = '认证用户';
                    break;
                case '4':
                    rtn = '需升级用户';
                    break;
                default :
                    rtn = '未知用户';
            }
            return rtn;
        }
    }])

        .filter('talent_status', [function () {
            return function (val) {
                var result = '';
                switch (val) {
                    case '0':
                        result = '待审核';
                        break;
                    case '1':
                        result = '未通过';
                        break;
                    case '2':
                        result = '已审核';
                        break;

                }
                return result;
            }
        }])

        .filter('talent_btn', [function () {
            return function (val) {
                var result = '';
                switch (val) {
                    case '1':
                        result = '通过';
                        break;
                    case '2':
                        result = '不通过';
                        break;
                }
                return result;
            }
        }])

        // 活动通知-发送用户
        .filter('activity_notice_scope', [function () {
            return function (val) {
                var result = '';
                switch (val) {
                    case "1":
                        result = "所有小区";
                        break;
                    case "2":
                        result = "部分小区";
                        break;
                }
                return result;
            }
        }])

        // 活动通知-消息状体
        .filter('activity_notice_msg', [function () {
            return function (val) {
                var result = '';
                switch (val) {
                    case "1":
                        result = "等待发送";
                        break;
                    case "2":
                        result = "已发送";
                        break;
                }
                return result;
            }
        }])

        // 活动通知-支付状态
        .filter('activity_notice_pay', [function () {
            return function (obj) {
                var result = '不限';

                if (!obj.order_status) return result;

                switch (obj.order_status) {
                    case "1":
                        result = "未支付用户";
                        break;
                    case "3":
                        result = "已支付用户";
                        break;
                }

                return result;
            }
        }])
        // 已完成的成团状态
        .filter('accomplish_status', [function () {
            return function (val) {
                var result = '未知状态';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "开团";
                        break;
                    case "2":
                        result = "拼团进行中";
                        break;
                    case "3":
                        result = "拼团成功";
                        break;
                    case "4":
                        result = "拼团取消";
                        break;
                }

                return result;
            }
        }])
        // 活动支付状态
        .filter('order_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "等待支付";
                        break;
                    case "1":
                        result = "支付中";
                        break;
                    case "2":
                        result = "已取消";
                        break;
                    case "3":
                        result = "支付成功";
                        break;
                    case "4":
                        result = "支付失败";
                        break;
                    case "5":
                        result = "已完成";
                        break;
                }

                return result;
            }
        }])
        // banner 类型
        .filter('banner_category', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "活动";
                        break;
                    case "2":
                        result = "邻里圈";
                        break;
                    case "3":
                        result = "邻邻帮";
                        break;
                }

                return result;
            }
        }])
        // banner status
        .filter('banner_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "待上线";
                        break;
                    case "1":
                        result = "上线";
                        break;
                    case "2":
                        result = "下线";
                        break;
                }

                return result;
            }
        }])
        // order refund status
        .filter('order_refund_status2', [function () { // 订单退款状态
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "待退款";
                        break;
                    case "1":
                        result = "退款中";
                        break;
                    case "2":
                        result = "退款失败";
                        break;
                    case "3":
                        result = "已完成";
                        break;
                }

                return result;
            }
        }])
        // order refund status
        .filter('order_payment_status', [function () { // 订单 付款 状态
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "待支付";
                        break;
                    case "1":
                        result = "支付中";
                        break;
                    case "2":
                        result = "支付失败";
                        break;
                    case "3":
                        result = "已完成";
                        break;
                }

                return result;
            }
        }])
        // 欢迎页面 welcome_status
        .filter('welcome_status', [function () { // 欢迎页面  上下线
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "待上线";
                        break;
                    case "1":
                        result = "使用中";
                        break;
                    case "2":
                        result = "未使用";
                        break;
                }

                return result;
            }
        }])
        // 欢迎页面 feed_comment_status
        .filter('feed_comment_status', [function () { // 帖子 评论 的状态  status: 1：上线 2：屏蔽
            return function (val) {
                var result = '未知';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "上线";
                        break;
                    case "2":
                        result = "屏蔽";
                        break;
                }

                return result;
            }
        }])
        // 欢迎页面 smsinvite_status
        .filter('smsinvite_status', [function () { // 激活状态，0为未激活，1为已激活。
            return function (val) {
                var result = '未激活';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "未激活";
                        break;
                    case "1":
                        result = "已激活";
                        break;
                }

                return result;
            }
        }])

        // 商品状态 goods_status
        .filter('goods_status', [function () { // 激活状态，0为未激活，1为已激活。
            return function (val) {
                var result = '未激活';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "草稿";
                        break;
                    case "1":
                        result = "在线";
                        break;
                    case "2":
                        result = "下线";
                        break;
                }

                return result;
            }
        }])

        // 商品状态 is_offline
        .filter('is_offline', [function () { // 激活状态，0为已上线，1为已下线。
            return function (val) {
                var result = '未知状态';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "已上线";
                        break;
                    case "1":
                        result = "已下线";
                        break;
                }

                return result;
            }
        }])
        // 优惠券适用范围 coupon_category
        .filter('coupon_category', [function () { // 激活状态，0为已上线，1为已下线。
            return function (val) {
                var result = '未知';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "不限";
                        break;
                    case "1":
                        result = "活动";
                        break;
                    case "2":
                        result = "直接买";
                        break;
                    case "3":
                        result = "拼团";
                        break;
                }

                return result;
            }
        }])
        // 优惠券商品品类 coupon_sku
        .filter('coupon_sku', [function () { // 激活状态，0为已上线，1为已下线。
            return function (val) {
                var result = '未知';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "不限";
                        break;
                    case "1":
                        result = "鲜花";
                        break;
                }

                return result;
            }
        }])
        // 优惠券商品类型(频率) coupon_commodity_type
        .filter('coupon_commodity_type', [function () { // 激活状态，0为已上线，1为已下线。
            return function (val) {
                var result = '未知';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "不限";
                        break;
                    case "1":
                        result = "单次";
                        break;
                    case "2":
                        result = "包月";
                        break;
                }

                return result;
            }
        }])
        .filter('cancel_from', [function () { // 取消来源0用户,1块长取消,2系统(不成团取消),9标志为历史数据不是来源
            return function (val) {
                var result = '未知来源';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "用户取消";
                        break;
                    case "1":
                        result = "块长取消";
                        break;
                    case "2":
                        result = "系统取消";
                        break;
                    case "9":
                        result = "历史数据";
                        break;
                }

                return result;
            }
        }])
        .filter('product_status', [function () { // 状态：0草稿箱，1为正常，2为已结束，3已删除
            return function (val) {
                var result = '未知状态';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "草稿箱";
                        break;
                    case "1":
                        result = "正在进行";
                        break;
                    case "2":
                        result = "已结束";
                        break;
                    case "3":
                        result = "已删除";
                        break;
                }

                return result;
            }
        }])

    ;
});