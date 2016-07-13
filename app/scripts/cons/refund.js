define([], function () {
    var rtn = {
        refundList: {
            columns: [
                {name: '订单ID', field: 'order_id', className: 'text-right'},
                {name: '母订单号', field: 'order_no'},
                {name: '送达时间', field: ''},
                {
                    name: '商品信息',
                    fieldDirective: '<span ng-bind="\'ID:\'+item.order.product_id"></span>' +
                    '<br/><span ng-bind="\'标题:\'+item.order.order_title"></span>' +
                    '<br/><span ng-bind="\'价格:\'+item.order.order_price"></span>'
                },
                {name: '订单详情', field: 'order.groupbuy_count'},
                {name: '使用优惠券', field: 'order.order_count'},
                {name: '订单时间', field: 'order.order_copies'},
                {name: '返现金额', fieldDirective: '<div product-pattern="item.patterns"></div>'},
                {name: '配送周期', field: 'status'},
                {name: '当前状态', field: 'accomplish_status'},
                {name: '管理备注', field: 'status'},
                {name: '操作', field: 'status'},
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
                title: '退款管理',
                api: '/orders/refunds',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'accomplish_status', text: '订单状态', type: 'btnGroup', default: '1',
                        enum: [
                            {value: '1', text: '待付款'},
                            {value: '2', text: '待发货'},
                            {value: '3', text: '已发货'},
                            {value: '4', text: '已完成'},
                            {value: '5', text: '已取消'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'product.add', text: '新增商品'}]
            }
        }
    }
    return rtn;
});