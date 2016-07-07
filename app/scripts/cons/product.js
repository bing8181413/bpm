define([], function () {
    var rtn = {
        productList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: 'ID', field: 'product_id', className: 'text-right'},
                {name: '管理备注', field: 'admin_remark'},
                {name: '标题', field: 'title'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern="item"></div>'},
                {name: '开团数量', field: 'order.groupbuy_count'},
                {name: '订单数', field: 'order.order_count'},
                {name: '已售份数', field: 'order.order_copies'},
                {name: '配送规则', fieldDirective: '<div product-pattern="item.patterns"></div>'},
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
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status',
                        text: '状态',
                        placeholder: '状态',
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