define([], function () {
    var rtn = {
        productList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: '编号', field: 'products_id', className: 'text-right'},
                {name: '用户名', field: 'username'},
                {
                    name: '手机',
                    field: 'mobile',
                    truncateText: true,
                    truncateTextLength: 11,
                    truncateTextBreakOnWord: false,
                },
            ],
            config: {
                title: '商品管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {
                        value: 'products_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                        paramDirective: '<div hjm-search hjm-select=""></div>'
                    },
                    {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    {value: 'email', text: '邮箱', placeholder: '邮箱'},
                    {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    key: 'deviceNo',
                    value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 5,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});