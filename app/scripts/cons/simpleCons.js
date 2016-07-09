define([
    './pintuan',
    './account',
    './product',
    './order',
    './banner',
    './export',
], function () {
    // console.log(arguments);
    var domain = '';
    var web_domain = '';
    var qiniu_domain = '';
    var default_param = {
        page: 1,
        count: 20
    };
    var api = {};
    var state = {};
    if (location.href.indexOf('//admin.huijiame.com') > 0) {
        domain = 'https://adminapi.huijiame.com';
        web_domain = 'https://www.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
    } else if (location.href.indexOf('//testadmin.huijiame.com') > 0) {
        domain = 'https://testadminapi.huijiame.com';
        web_domain = 'https://testwww.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
    } else {
        // domain = 'https://devapi.huijiame.com';
        domain = 'https://devmgrapi.huijiame.com';
        web_domain = 'https://devwww.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
        // qiniu_domain = 'http://qiniu.hjm.com';
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
        'domain': domain,
        'web_domain': web_domain,
        'qiniu_domain': qiniu_domain,
        'domain_noauth': 'action_noauth.php?',
        'default_param': default_param,
        'api': api,
        'state': state,
        'modsconfs': arguments,
        'last': 'ooo:)'
    };
});