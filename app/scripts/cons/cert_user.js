define([], function () {
    var rtn = {
        certUserList: {
            columns: [
                {name: '用户ID', field: 'user_id', className: 'text-center'},
                {name: '用户名', field: 'user.name'},
            ],
            config: {
                title: '证书获取用户列表',
                api: '',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
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
                // route: [{value: 'main.cert.add', text: '新增问答证书'}]
            }
        }
    }
    return rtn;
});