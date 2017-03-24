define([], function () {
    var rtn = {
        webList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '描述', field: 'remark'},
                {name: 'URL', field: 'full_url'},
                {name: 'utm_source', field: 'utm_source',filter:'null2empty'},
                {name: 'utm_medium', field: 'utm_medium',filter:'null2empty'},
                {name: 'utm_campaign', field: 'utm_campaign',filter:'null2empty'},
                {name: '创建时间', field: 'created_at'},
            ],
            config: {
                title: '微信二维码管理',
                api: '/markets/urls',
                rowItemName: 'data',
                searchSupport: false,
                searchItems: [
                    // {value: 'haha', text: '城市', placeholder: '城市', type: 'datetime'},
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.web.add', text: '新生成WEB页面'}],
            }
        },
    }
    return rtn;
});