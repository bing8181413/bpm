define([], function () {
    var rtn = {
        pintuanList: {
            columns: [
                {name: 'ID', field: 'groupbuy_id'},
                {name: '状态', field: 'groupbuy_id'},
                {name: '操作', className: 'text-right', fieldDirective: '<div dsadsa></div>'}
            ],
            config: {
                title: '拼团管理',
                api: '/groupbuys',
                paginationSupport: true,
                searchSupport: true,
                rowItemName: 'item',
                searchItems: [
                    {text: '编号', value: 'account_id', placeholder: '编号'},
                    {text: 'ID', value: 'activity_id'},
                ],
                preSelectionSearch: {
                    status: '1',
                },
                pageInfo: {
                    count: 20,
                    page: 1,
                    // maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});