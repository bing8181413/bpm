define([], function () {
    var rtn = {
        hotkeyList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {
                    name: '热搜词',
                    field: 'keyword'
                },
                {name: '创建时间', field: 'created_at'},
                {name: '更新时间', field: 'updated_at'},
                {
                    name: '操作',
                    fieldDirective: '<div hotkey-del data="item"></div>'
                },
            ],
            config: {
                title: '热搜词列表',
                api: '/product/hotkey',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // order_type: [1, 2]
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: false,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [
                    {routeDirective: '<div hotkey-add data="">新增热搜词</div>'},
                ]
            },
        }
    }
    return rtn;
});