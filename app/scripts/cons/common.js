define([], function () {

    var api = {};
    var env = '';
    var env_name = '';
    var domain = '';
    var web_domain = '';
    var qiniu_domain = '';
    var wx_domain = '';
    if (location.href.indexOf('//bpm.ahaschool.com') > 0 // prod
        || location.href.indexOf('//bpm.huijiame.com') > 0 // prod
    // || location.href.indexOf('//bpm.hjm.com') > 0 // prod
    ) {
        env = 'prod';
        env_name = '线上系统';
        domain = 'https://mgrapi.ahaschool.com';
        web_domain = 'https://www.ahaschool.com';
        qiniu_domain = 'https://bpm.ahaschool.com';
        wx_domain = 'https://n.ahaschool.com';
    } else if (location.href.indexOf('//uat.ahaschool.com/bpm') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0
    ) {
        env = 'prod';
        env_name = '线上系统uat';
        domain = 'https://uat.ahaschool.com/mgrapi';
        web_domain = 'https://uat.ahaschool.com/bpm';
        qiniu_domain = 'https://uat.ahaschool.com';
        wx_domain = 'https://n.ahaschool.com';
    } else if (location.href.indexOf('//test.ahaschool.com/bpm') > 0
    || location.href.indexOf('//bpm-test.d.ahaschool.com') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0
    ) {
        env = 'test';
        env_name = '测试系统';
        domain = 'https://mgrapi-test.d.ahaschool.com';
        web_domain = 'https://bpm-test.d.ahaschool.com';
        qiniu_domain = 'https://testbpm.ahaschool.com';
        wx_domain = 'https://testm.ahaschool.com';
    } else if (location.href.indexOf('//testbpm.ahaschool.com') > 0
    // || location.href.indexOf('//bpm.hjm.com') > 0 || location.href.indexOf('//http://localhost')
    ) {
        env = 'test';
        env_name = '测试系统2';
        domain = 'https://testmgrapi.ahaschool.com';
        web_domain = 'https://testbpm.ahaschool.com';
        qiniu_domain = 'https://testbpm.ahaschool.com';
        wx_domain = 'https://testm.ahaschool.com';
    } else {
        // domain = 'https://devapi.huijiame.com';
        env = 'dev';
        env_name = '开发系统';
        domain = 'https://mgrapi-dev.d.ahaschool.com';
        web_domain = 'https://devbpm.ahaschool.com';
        web_domain = 'https://dev.ahaschool.com/bpm';
        qiniu_domain = 'https://devbpm.ahaschool.com';
        wx_domain = 'https://devm.ahaschool.com';
        // qiniu_domain = 'http://qiniu.hjm.com/';
    }
    api = {
        'account_check': domain + '/account/check',//登陆获取手机验证码
        'account_login': domain + '/account/login',//登陆
        'account_mans': domain + '/account/mans',
    }


    var rtn = {
        api: api,
        env: env,
        env_name: env_name,
        domain: domain,
        live_domain: domain + '/mobile',
        support_domain: domain + '/support',
        third_domain: domain + '/third',
        web_domain: web_domain,
        qiniu_domain: qiniu_domain,
        wx_domain: wx_domain,
        sku: [
            // {text: '活动', value: 1},
            // {text: '测评', value: 2},
            // {text: '众筹', value: 3},
            // {text: '年卡', value: 4},
            // {text: '会员', value: 5},
            // {text: '测试', value: 6},
            // {text: '其他', value: 7},
            // {text: '霸王团', value: 8},
            // {text: '课程', value: 9},
            // {text: '博物馆直播第一期', value: 10},
            // {text: '名校直播第一期', value: 11},
            // {text: '成人演讲', value: 12},
            // {text: '少年好声音', value: 13},
            // {text: '博物馆直播第二期', value: 14},
        ],
        act_checkbox_week: [
            {text: '周一', value: '0'},
            {text: '周二', value: '1'},
            {text: '周三', value: '2'},
            {text: '周四', value: '3'},
            {text: '周五', value: '4'},
            {text: '周六', value: '5'},
            {text: '周日', value: '6'},
        ],
        week: [
            {text: '选择', value: undefined},
            {text: '周日', value: '1'},
            {text: '周一', value: '2'},
            {text: '周二', value: '3'},
            {text: '周三', value: '4'},
            {text: '周四', value: '5'},
            {text: '周五', value: '6'},
            {text: '周六', value: '7'},
        ],
        hour: [
            {text: '选择小时', value: undefined},
            {text: '0', value: '0'},
            {text: '1', value: '1'},
            {text: '2', value: '2'},
            {text: '3', value: '3'},
            {text: '4', value: '4'},
            {text: '5', value: '5'},
            {text: '6', value: '6'},
            {text: '7', value: '7'},
            {text: '8', value: '8'},
            {text: '9', value: '9'},
            {text: '10', value: '10'},
            {text: '11', value: '11'},
            {text: '12', value: '12'},
            {text: '13', value: '13'},
            {text: '14', value: '14'},
            {text: '15', value: '15'},
            {text: '16', value: '16'},
            {text: '17', value: '17'},
            {text: '18', value: '18'},
            {text: '19', value: '19'},
            {text: '20', value: '20'},
            {text: '21', value: '21'},
            {text: '22', value: '22'},
            {text: '23', value: '23'},
        ],
        minute: [
            {text: '选择分钟', value: undefined},
            {text: '00', value: '0'},
            {text: '05', value: '5'},
            {text: '10', value: '10'},
            {text: '15', value: '15'},
            {text: '20', value: '20'},
            {text: '25', value: '25'},
            {text: '30', value: '30'},
            {text: '35', value: '35'},
            {text: '40', value: '40'},
            {text: '45', value: '45'},
            {text: '50', value: '50'},
            {text: '55', value: '55'},
            // {text: '60', value: '60'},
        ],
        district: [
            // {text: '--选择--', value: undefined},
            // {text: '00', value: '0'},
        ]
        ,
    }
    return rtn;
});