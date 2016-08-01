define([], function () {
    var rtn = {
        exportList: {
            columns: [
                {name: '描述', field: 'desc'},
                {name: '操作', fieldDirective: '<div export-run data="item"></div>'},
            ],
            config: {
                title: '导出管理',
                api: '/exports',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    // {
                    //     value: 'status',
                    //     text: '状态',
                    //     placeholder: '状态',
                    // },
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: false,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        },
    }
    return rtn;
});