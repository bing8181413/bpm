define([
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
    // './subject_group',
], function () {
    // console.log(arguments);
    var env = '';
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
    if (location.href.indexOf('//bpm.huijiame.com') > 0
        // || location.href.indexOf('//bpm.hjm.com') > 0 // prod
    ) {
        env = 'prod';
        domain = 'https://mgrapi.huijiame.com';
        web_domain = 'https://www.huijiame.com';
        qiniu_domain = 'https://bpm.huijiame.com';
        wx_domain = 'https://m.huijiame.com';
    } else if (location.href.indexOf('//testbpm.huijiame.com') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0
    ) {
        env = 'test';
        domain = 'https://testmgrapi.huijiame.com';
        web_domain = 'https://testbpm.huijiame.com';
        qiniu_domain = 'https://testbpm.huijiame.com';
        wx_domain = 'https://testm.huijiame.com';
    } else {
        // domain = 'https://devapi.huijiame.com';
        env = 'dev';
        domain = 'https://devmgrapi.huijiame.com';
        web_domain = 'https://devwww.huijiame.com';
        qiniu_domain = 'https://devbpm.huijiame.com';
        wx_domain = 'https://devm.huijiame.com';
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
        'domain': domain,
        'web_domain': web_domain,
        'qiniu_domain': qiniu_domain,
        'wx_domain': wx_domain,
        // 'domain_noauth': 'action_noauth.php?',
        'default_param': default_param,
        'api': api,
        'state': state,
        'modsconfs': arguments,
        'last': 'ooo:)'
    };
});