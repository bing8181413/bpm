define([], function () {
    var rtn = {
        smsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-center'},
                {name: '内容', field: 'content'},
                {name: '发送时间', field: 'send_time', filter: 'null2empty'},
                {name: '状态', field: 'status', filter: 'null2empty'},
                {
                    name: '操作',
                    fieldDirective: '<div show-sms data="item"></div>'
                },
            ],
            config: {
                title: '短信列表',
                api: '/markets/sms',
                // itemList: 'list',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {value: 'mobile', text: '小区名称'},
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.sms.add', text: '发送短信'}]
            }
        }
    }
    return rtn;
});