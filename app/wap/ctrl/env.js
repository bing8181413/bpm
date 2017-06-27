angular.module('envServices', []).factory('env', function ($rootScope) {
    var env_id = '';
    var env_name = '';
    var api_domain = '';
    var wx_domain = '';

    if (location.href.indexOf('//m.ahaschool.com') > 0 // prod
        || location.href.indexOf('//bpm.ahaschool.com') > 0 // prod
    ) {
        env_id = 'prod';
        env_name = '线上系统';
        api_domain = 'https://openapi.ahaschool.com';
        wx_domain = 'https://m.ahaschool.com';
    } else if (location.href.indexOf('//testm.ahaschool.com') > 0
        || location.href.indexOf('//testbpm.ahaschool.com') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0
    ) {
        env_id = 'test';
        env_name = 'test系统';
        api_domain = 'https://testopenapi.ahaschool.com';
        wx_domain = 'https://testm.ahaschool.com';
    } else {
        env_id = 'dev';
        env_name = 'DEV系统';
        api_domain = 'https://devopenapi.ahaschool.com';
        wx_domain = 'https://devm.ahaschool.com';
    }
    $rootScope.env = {
        env_id: env_id,
        env_name: env_name,
        api_domain: api_domain,
        wx_domain: wx_domain,
    }
    return $rootScope.env;
});