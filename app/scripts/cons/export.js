define([], function () {
    var rtn = {
        exportList: {
            columns: [
                // {name: 'ID', field: 'id', className: 'text-right'},
                {name: '描述', field: 'desc'},
                // {name: '导出次数', field: 'run_count'},
                // {
                //     name: 'SQL参数', field: 'sql_param',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
                // {
                //     name: '脚本', field: 'command'
                // },
                {name: '操作', fieldDirective: '<div><a class="btn btn-success">运行</a></div>'},
                // {name: '操作', field: 'product_id'},
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
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
                paginationSupport: true,
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