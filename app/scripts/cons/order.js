define([], function () {
    var rtn = {
        productList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: '商品ID', field: 'product_id', className: 'text-right'},
                {name: '管理备注', field: 'admin_remark'},
                {name: '商品标题', field: 'title'},
                // {name: '拼团规则', field: 'product_id'},
                {name: '开团数量', field: 'order.groupbuy_count'},
                {name: '订单数', field: 'order.order_count'},
                {name: '已售份数', field: 'order.order_copies'},
                // {name: '配送规则', field: 'product_id'},
                {name: '商品状态', field: 'status'},
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
                title: '商品管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {
                        value: 'product_id',
                        text: '账户ID',
                        placeholder: '账户ID',
                    },
                    // {value: 'mobile', text: '手机号码', placeholder: '手机号码'},
                    // {value: 'email', text: '邮箱', placeholder: '邮箱'},
                    // {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    key: 'deviceNo',
                    value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});