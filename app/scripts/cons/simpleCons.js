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
    './supports',
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
    // './subject_group',
], function (common) {
    // console.log(arguments);
    // console.log(common);
    var common = common;
    var env = '';
    var env_name = '';
    var domain = '';
    var web_domain = '';
    var qiniu_domain = '';
    var wx_domain = '';
    var default_param = {
        page: 1,
        count: 20
    };
    var api = {};
    var state = {};
    if (location.href.indexOf('//bpm.ahaschool.com') > 0 // prod
        || location.href.indexOf('//bpm.huijiame.com') > 0 // prod
    // || location.href.indexOf('//bpm.hjm.com') > 0 // prod
    ) {
        env = 'prod';
        env_name = '线上系统';
        domain = 'https://mgrapi.ahaschool.com';
        web_domain = 'https://www.ahaschool.com';
        qiniu_domain = 'https://bpm.ahaschool.com';
        wx_domain = 'https://m.ahaschool.com';
    } else if (location.href.indexOf('//testbpm.ahaschool.com') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0
    ) {
        env = 'test';
        env_name = '测试系统';
        domain = 'https://testmgrapi.ahaschool.com';
        web_domain = 'https://testbpm.ahaschool.com';
        qiniu_domain = 'https://testbpm.ahaschool.com';
        wx_domain = 'https://testm.ahaschool.com';
    } else {
        // domain = 'https://devapi.huijiame.com';
        env = 'dev';
        env_name = '开发系统';
        domain = 'https://devmgrapi.ahaschool.com';
        web_domain = 'https://devwww.ahaschool.com';
        qiniu_domain = 'https://devbpm.ahaschool.com';
        wx_domain = 'https://devm.ahaschool.com';
        // qiniu_domain = 'http://qiniu.hjm.com/';
    }
    api = {
        'account_check': domain + '/account/check',//登陆获取手机验证码
        'account_login': domain + '/account/login',//登陆
        // 'add_account': domain + '/account/add',//添加账户
        // 'update_account': domain + '/account/update',//更新账户
        'account_mans': domain + '/account/mans',
    }
    ;
    state = {
        main: 'main',
        biz: 'biz'
    }
    return {
        'VIEW_PATH': 'scripts/views/',
        'view_path': 'scripts/views/',
        'main_path': 'scripts/views/' + state.main + '/',
        'biz_path': 'scripts/views/' + state.biz + '/',
        'DIRECTIVE_PATH': 'scripts/views/directive/',
        'DIRECTIVE_LIST_PATH': 'scripts/views/directive/list/',
        'PARTIALS_PATH': 'scripts/partials/',
        'env': env,
        'env_name': env_name,
        'domain': domain,
        'web_domain': web_domain,
        'qiniu_domain': qiniu_domain,
        'wx_domain': wx_domain,
        // 'domain_noauth': 'action_noauth.php?',
        'default_param': default_param,
        'api': api,
        'state': state,
        'modsconfs': arguments,
        'common': common,
        'last': 'ooo:)'
    };
});