define([], function () {
    var rtn = {
        productList: {
            columns: [
                {name: 'ID', field: 'product_id', className: 'text-center'},
                {
                    name: '标题', field: 'title',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltip: 'title',
                    tooltipPlacement: 'bottom',
                },
                {name: '上线时间', fieldDirective: '<div product-start-end data="item"></div>'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern="item"></div>'},
                {name: '配送规则', fieldDirective: '<div product-pattern data="item"></div>'},
                {name: '拼团成<br/>功数量', field: 'order.groupbuy_count'},
                {name: '支付成<br/>功订单', field: 'order.order_count'},
                {name: '已售<br/>份数', field: 'order.order_copies'},
                {name: '剩余<br/>库存', field: 'inventory.used_count'},
                {name: '商品<br/>状态', field: 'status', filter: 'product_status'},
                {
                    name: '商品<br/>备注', field: 'admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'admin_remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-success" data="item" ' +
                    'ui-sref="main.product.update({product_id:item.product_id})">编辑</a>' +
                    '<div product-change-status data="item"></div>'
                },
            ],
            config: {
                title: '商品管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '商品状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '3', text: '已下线'},
                            // {value: '0', text: '草稿'},
                        ]
                    },
                    // {value: 'date_min', text: '开始日期', type: 'date'},
                    // {value: 'date_max', text: '结束日期', type: 'date'},
                ],
                preSelectionSearch: {
                    key: 'deviceNo',
                    value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.product.add', text: '新增商品'}]
            }
        }
    }
    return rtn;
});