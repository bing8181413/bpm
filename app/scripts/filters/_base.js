define([
    './filters',
    './common',
    './form_err',
    '../cons/simpleCons'
], function (mod, simpleCons) {
    mod
    // subject_groups   >0 上线，=0 下线
        .filter('subject_groups', [function () {
            return function (val) {
                var result = '其他';
                if (angular.isArray(val) && val.length > 0) {
                    result = "正在进行";
                } else if (angular.isArray(val) && val.length == 0) {
                    result = "已下线";
                }
                return result;
            }
        }])
        // status0or1or2   0 待上线，1 上线，2 下线
        .filter('status0or1or2', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "待上线";
                        break;
                    case "1":
                        result = "正在进行";
                        break;
                    case "2":
                        result = "已下线";
                        break;
                }

                return result;
            }
        }])
        .filter('verify_type', [function () {
            return function (val) {
                return val == 5 ? '验证中' : val == 6 ? '已经通过' : '未验证';
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
        .filter('sms_status', [function () { // 短信发送状态
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
        }])
        .filter('product_status', [function () { // 状态：0草稿箱，1为正常，2为已结束，3已删除,已下线
            return function (val) {
                var result = '未知状态';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "草稿箱";
                        break;
                    case "1":
                        result = "进行中";
                        break;
                    case "2":
                        result = "已结束";
                        break;
                    case "3":
                        result = "已下线";
                        break;
                }

                return result;
            }
        }])
        // 订单状态,1待支付,2支付中,3已支付,4支付失败,5已完成,6已取消
        .filter('order_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "":
                        result = "全部";
                        break;
                    case "1":
                        result = "待支付";
                        break;
                    case "2":
                        result = "支付中";
                        break;
                    case "3":
                        result = "已支付";
                        break;
                    case "4":
                        result = "支付失败";
                        break;
                    case "5":
                        result = "已完成";
                        break;
                    case "6":
                        result = "已取消";
                        break;
                }
                return result;
            }
        }])
        // poi_type 位置类型，1小区，2写字楼
        .filter('poi_type', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "小区";
                        break;
                    case "2":
                        result = "写字楼";
                        break;
                }
                return result;
            }
        }])
        // return_status 返现状态:1未返现,2返现中,3已经返现,4返现失败,5作废
        .filter('return_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "未返现";
                        break;
                    case "2":
                        result = "返现中";
                        break;
                    case "3":
                        result = "已经返现";
                        break;
                    case "4":
                        result = "返现失败";
                        break;
                    case "5":
                        result = "作废";
                        break;
                }
                return result;
            }
        }])
        // delivery_status 子单状态:1 待发货,2 已发货,3 已签收,4 已经取消
        .filter('order_deliver_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "待发货";
                        break;
                    case "2":
                        result = "已发货";
                        break;
                    case "3":
                        result = "已签收";
                        break;
                    case "4":
                        result = "已经取消";
                        break;
                }
                return result;
            }
        }])
        // address_poi_type 地址类型 1：小区 2：公司
        .filter('address_poi_type', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "小区";
                        break;
                    case "2":
                        result = "公司";
                        break;
                }
                return result;
            }
        }])
        // address_status 状态 1：正常 2：删除
        .filter('address_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "正常";
                        break;
                    case "2":
                        result = "删除";
                        break;
                }
                return result;
            }
        }])
        // refund_type 类型:1 订单退款,2 返现
        .filter('refund_type', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "订单退款";
                        break;
                    case "2":
                        result = "返现";
                        break;
                }
                return result;
            }
        }])
        // refund_channel 退款渠道:1: app微信支付,2: 支付宝支付,3: h5微信支付
        .filter('refund_channel', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "APP";
                        break;
                    case "2":
                        result = "支付宝";
                        break;
                    case "3":
                        result = "微信";
                        break;
                }
                return result;
            }
        }])
        // coupon_category 适用范围，0 不限，1 活动、2 直接买、3 拼团
        //  1:砍价团 2: 人数团 3：众筹团 4: 邻里团
        .filter('coupon_category', [function () {
            return function (val) {
                var result = '不限';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "砍价团";
                        break;
                    case "2":
                        result = "人数团";
                        break;
                    case "3":
                        result = "直接买";
                        break;
                    case "4":
                        result = "邻里团";
                        break;
                }
                return result;
            }
        }])
        // coupon_sku 商品品类，0 不限，1 鲜花
        .filter('coupon_sku', [function () {
            return function (val) {
                var result = '其他';
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
        // coupon_frequency_type  商品类型，0 单次，1 包月
        .filter('coupon_frequency_type', [function () {
            return function (val) {
                var result = '其他';
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
        // refund_cancel_from  取消来源:1 块长取消,2 用户取消,3 系统取消
        .filter('refund_cancel_from', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "块长取消";
                        break;
                    case "2":
                        result = "用户取消";
                        break;
                    case "3":
                        result = "系统取消";
                        break;
                }
                return result;
            }
        }])
        // 已完成的成团状态  成团状态:1:开团,2:进行中,3:完成,4:已取消
        .filter('accomplish_status', [function () {
            return function (val) {
                var result = '未知';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "开团";
                        break;
                    case "2":
                        result = "进行中";
                        break;
                    case "3":
                        result = "已完成";
                        break;
                    case "4":
                        result = "已取消";
                        break;
                }

                return result;
            }
        }])
        // banner status  0 待上线，1 上线，2 下线
        .filter('banner_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    // case "0":
                    //     result = "待上线";
                    //     break;
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
        //  category 类型 1:砍价团 2: 人数团 3：众筹团 4: 邻里团
        .filter('product_category', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "砍价团";
                        break;
                    case "2":
                        result = "人数团";
                        break;
                    case "3":
                        result = "直接买";
                        break;
                    case "4":
                        result = "人数团+直接买";
                        break;
                }
                return result;
            }
        }])
        //  option_status  状态 1：正常 2：删除
        .filter('product_option_status', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "1":
                        result = "正常";
                        break;
                    case "2":
                        result = "删除";
                        break;
                }
                return result;
            }
        }])
        //  act_result  状态 1：成功 2：失败
        .filter('act_result', [function () {
            return function (val) {
                var result = '其他';
                val = val + '';
                switch (val) {
                    case "0":
                        result = "";
                        break;
                    case "1":
                        result = "成功";
                        break;
                    case "2":
                        result = "失败";
                        break;
                }
                return result;
            }
        }])
        //  qrcode_type  微信二维码状态 1：成功 2：失败
        .filter('qrcode_type', [function () {
            return function (val) {
                var result = val;
                val += '';
                switch (val) {
                    case "1":
                        result = "临时";
                        break;
                    case "2":
                        result = "永久";
                        break;
                }
                return result;
            }
        }])
        //  course_category  活动的课程分类 course_category eg. "1,2,3"
        .filter('course_category', [function () {
            return function (val) {
                var result = val.replace(/,/g, '').replace('1', '德').replace('2', '智').replace('3', '体').replace('4', '美').replace('5', '劳');
                return result;
            }
        }])
    ;
});