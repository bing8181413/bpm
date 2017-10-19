define([
    './common',
    './groupbuy',
    './account',
    './product',
    './order',
    './banner',
    './export',
    './user',
    './refund',
    './deliver',
    './coupon',
    './exchangecode',
    './address',
    './community',
    './sms',
    './supports',// 直播的版本升级
    './subject',
    './resource',
    './wechat',
    './web',
    './hotkey',
    './captcha',
    './survey_category',
    './survey_question',
    './survey_plan',
    './lessons',
    './mission',
    './teacher',
    './student',
    './work',
    './live_rooms',//直播房间',
    './record_rooms',//点播房间',
    './record_comment',//点播评论列表',
    './zhibo_qr_code',//点播评论列表',

    // './record_user_block',//点播用户禁言',
    // './subject_group',
    './market/_conf',//  组
    './batchproduct/_conf',//  组
    './live/_conf',//  组


    './merchant/_conf',//  供应商
    './support/_conf'//  SKU

], function (common) {
    // console.log(common);
    var confs = {};
    var conf_index = 0;
    angular.forEach(arguments, function (val, key) {
        conf_index++;
        if (val.length > 0) {
            angular.forEach(val, function (v, k) {
                conf_index++;
                confs[conf_index] = v;
            })
        } else {
            confs[conf_index] = val;
        }
    });
    // console.log(confs);
    var common = common;
    var default_param = {
        page: 1,
        count: 20
    };
    var state = {
        main: 'main',
        biz: 'biz',
        demo: 'demo',
        live: 'live',
    }
    return {
        'VIEW_PATH': 'scripts/views/',
        'view_path': 'scripts/views/',
        'main_path': 'scripts/views/' + state.main + '/',
        'biz_path': 'scripts/views/' + state.biz + '/',
        'live_path': 'scripts/views/' + state.live + '/',
        'demo_path': 'scripts/views/' + state.demo + '/',
        'DIRECTIVE_PATH': 'scripts/views/directive/',
        'DIRECTIVE_LIST_PATH': 'scripts/views/directive/list/',
        'PARTIALS_PATH': 'scripts/partials/',
        'env': common.env,
        'env_name': common.env_name,
        'domain': common.domain,
        'live_domain': common.domain + '/mobile',
        'web_domain': common.web_domain,
        'qiniu_domain': common.qiniu_domain,
        'wx_domain': common.wx_domain,
        // 'domain_noauth': 'action_noauth.php?',
        'default_param': default_param,
        'api': common.api,
        'state': state,
        'modsconfs': confs,
        'common': common,
        'last': 'ooo:)'
    };
});