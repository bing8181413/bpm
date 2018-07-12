define([
    './filters',
    '../cons/simpleCons'
], function (mod, cons) {
    mod
        .filter('common', [function () {
            return function (val, which_common) {
                var rtn = '';
                if (!val) return '';
                var loop_obj = eval('cons.common.' + which_common);
                angular.forEach(loop_obj, function (v) {
                    if (v.value == val) {
                        rtn = v.text;
                    }
                });
                return rtn;
            }
        }])
        .filter('keyVal', [function () {
            return function (val, key1, val1, key2, val2, key3, val3, key4, val4) {
                var rtn = val;
                val += '';
                switch (val) {
                    case key1:
                        rtn = val1;
                        break;
                    case key2:
                        rtn = val2;
                        break;
                    case key3:
                        rtn = val3;
                        break;
                    case key4:
                        rtn = val4;
                        break;
                    default :
                        rtn = val;
                }
                return rtn;
            }
        }])
        .filter('yes1no2', [function () {
            return function (val) {
                return val == '1' ? '是' : (val == '2' ? '否' : val);
            }
        }])
        .filter('gender', [function () {
            return function (val) {
                return val == '1' ? '男' : (val == '2' ? '女' : '保密');
            }
        }])
        .filter('is_vip', [function () {
            return function (val) {
                return val == '1' ? '会员' : (val == '3' ? '体验会员' : '非会员');
            }
        }])
        .filter('num2abc', [function () {
            return function (val) {
                val = val + '';
                var rtn = '';
                switch (val) {
                    case '1':
                        rtn = 'A';
                        break;
                    case '2':
                        rtn = 'B';
                        break;
                    case '3':
                        rtn = 'C';
                        break;
                    case '12':
                        rtn = 'AB';
                        break;
                    case '23':
                        rtn = 'BC';
                        break;
                    case '13':
                        rtn = 'AC';
                        break;
                    case '123':
                        rtn = 'ABC';
                        break;
                    default :
                        rtn = '';
                }
                return rtn;
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
                        rtn = '无配送';
                }
                return rtn;
            }
        }])
        .filter('date2break', [function () {// 日期时间换行
            return function (val) {
                if (val) {
                    return val.split(' ')[0] + '\r\n' + val.split(' ')[1];
                }
                return '';
            }
        }])
        .filter('second2hour', [function () {// 秒数转小时数
            return function (val) {
                return parseInt((val * 1) / (60 * 60));
            }
        }])
        .filter('num2hour', [function () {// 数字转小时数
            return function (val) {
                return parseInt((val * 1) / (60 * 60 * 1000));
            }
        }])
        .filter('zero2empty', [function () {
            return function (val, rtn_str) {
                return (!val || val == 0) ? (rtn_str || '') : val;
            }
        }])
        .filter('null2empty', [function () {
            return function (val, rtn_str) {
                return (!val || val == null || val == 'null' || val == undefined || val == 'undefined') ? (rtn_str || '') : val;
            }
        }])
        .filter('arraySub2Array', [function () {
            return function (val, param) {
                // "item.menus | arraySub2String:\'name\'"
                var arr = [];
                angular.forEach(val, function (v, k) {
                    arr[k] = eval('v.' + param);
                })
                return arr;
            }
        }])
        .filter('arraySub2String', [function () {
            return function (val, param) {
                // "item.menus | arraySub2String:\'name\'"
                var arr = [];
                angular.forEach(val, function (v, k) {
                    arr[k] = eval('v.' + param);
                })
                return arr.join(',');
            }
        }])
        .filter('arraySum', [function () {
            return function (val, param) {
                var Sum = 0;
                angular.forEach(val, function (v, k) {
                    Sum += eval('v.' + param) * 1;
                })
                return Sum;
            }
        }])
        // 百分比 两个数相除的比值 百分比
        .filter('process', [function () {
            return function (val, param) {
                var Sum = 0;
                var tmp = 1000000000000;//  换算整数
                if (param > 0) {
                    Sum = (parseFloat(parseInt(val * tmp) * 100) / parseInt(param * tmp)).toFixed(2) + '%';
                } else if(param == undefined) {
                    Sum = parseFloat(val * 100).toFixed(2) + '%';
                } else {
                    Sum = '0%';
                }
                return Sum;
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
            return function (end_time, start_time) {
                if (end_time) {
                    var rtn_now = start_time ? new Date(start_time).getTime() : new Date().getTime();
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
        // mp4 文件域名 修改
        .filter('change_domain_mp4', [function () {
            return function (val) {
                var rtn = val.replace(/\/{2}.*.\/{1}/, '//resourcevideo.bucket.ahaschool.com/');
                return rtn;
            }
        }])
    ;
});