define([], function () {
    var rtn = {
        captchaList: {
            columns: [
                {name: 'ID', field: 'captcha_id', className: 'text-center'},
                {name: '手机号码', field: 'mobile'},
                {name: '验证码', field: 'code'},
                {name: '创建时间', field: 'created_at', filter: 'null2empty'},
                {name: '过期时间', field: 'expire_time', filter: 'null2empty'}
            ],
            config: {
                title: '手机验证码列表',
                api: '/supports/captchas',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.captcha.add', text: '新增手机验证码'}]
            }
        }
    }
    return rtn;
});