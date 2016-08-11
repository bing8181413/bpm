define([], function () {
    var rtn = {
        refundList: {
            columns: [
                {name: '退款编号', field: 'refund_id', className: 'text-right'},
                {name: '退款类型', field: 'refund_type', filter: 'refund_type'},
                {name: '母订单号', field: 'order_no'},
                {name: '商品名称', field: 'order.order_title'},
                {
                    name: '收货地址',
                    fieldDirective: '联系人:<span ng-bind="item.order.address.contact_name"></span>' +
                    '<br/>手机号:<br/><span ng-bind="item.order.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.order.address.address|characters: 10 : false"' +
                    'tooltip="详细地址:{{item.order.address.address}}" tooltip-placement="bottom"></span>'
                },
                {name: '退款金额', field: 'refund_price'},
                {name: '支付方式', field: 'refund_channel', filter: 'refund_channel'},
                {name: '申请时间', field: 'created_at', filter: 'date2break'},
                {name: '退款时间', field: 'verified_at'},
                {name: '退款原因', field: 'refund_reason'},
                {name: '退款来源', field: 'cancel_from', filter: 'refund_cancel_from'},
                {name: '操作', fieldDirective: '<div order-single-refund data="item"></div>'},
            ],
            config: {
                title: '退款管理',
                api: '/orders/refunds',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'refund_type', text: '退款类型', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '1', text: '订单退款'},
                            {value: '2', text: '返现'},
                        ]
                    },
                    {//退款状态:0未退款,1退款中,2退款失败,3退款成功
                        value: 'refund_status', text: '退款状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '0', text: '未退款'},
                            {value: '1', text: '退款中'},
                            {value: '2', text: '退款失败'},
                            {value: '3', text: '退款成功'},
                        ]
                    },
                    {value: 'date_min', text: '(申请退款时间)----开始', type: 'datetime'},
                    {value: 'date_max', text: '----结束', type: 'datetime'},
                    {value: 'order_no', text: '母订单号'},
                    {value: 'contact_name', text: '联系人'},
                    {value: 'contact_mobile', text: '手机号'},
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                ext: {
                    checked: {
                        text: '',
                        value: '_checked'
                    },
                    showNum: [
                        {text: '退单数量', type: 'total'},
                        {text: '退款总金额', field: 'amounts'},
                        // {text: '已选', type: 'selected'},
                    ],
                    eventBtn: [
                        {text: '全选', event: 'all_select'},
                        {text: '取消全选', event: 'cancel_all_select'},
                        {
                            text: '批量退款',
                            fieldFirective: '<div order-refunds data="data"></div>',
                        },
                    ]
                }
            }
        }
    }
    return rtn;
});