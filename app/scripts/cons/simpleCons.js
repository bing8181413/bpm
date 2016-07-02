define([], function () {
    var domain = '';
    var web_domain = '';
    var qiniu_domain = '';
    var default_param = {
        page: 1,
        count: 20
    };
    var api = {};
    if (location.href.indexOf('//admin.huijiame.com') > 0) {
        domain = 'https://adminapi.huijiame.com';
        web_domain = 'https://www.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
    } else if (location.href.indexOf('//testadmin.huijiame.com') > 0) {
        domain = 'https://testadminapi.huijiame.com';
        web_domain = 'https://testwww.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
    } else {
        domain = 'https://devadminapi.huijiame.com';
        web_domain = 'https://devwww.huijiame.com';
        qiniu_domain = 'http://admin.huijiame.com';
        // qiniu_domain = 'http://qiniu.hjm.com';
    }
    api = {
        'user_admin_check': domain + '/manage/admin/check',//登陆获取手机验证码
        'user_admin_login': domain + '/manage/admin/login',//登陆
    };
    return {
        'VIEW_PATH': 'scripts/views/',
        'DIRECTIVE_PATH': 'scripts/views/directive/',
        'DIRECTIVE_LIST_PATH': 'scripts/views/directive/list/',
        'PARTIALS_PATH': 'scripts/partials/',
        'domain': domain,
        'web_domain': web_domain,
        'qiniu_domain': qiniu_domain,
        //'domain':'http://web_apihost'
        //'domain':'action.php?',
        'domain_noauth': 'action_noauth.php?',
        //'domain_login':'login.php',
        'default_param': default_param,
        'api': api,
        'last': 'ooo:)'
    };
});