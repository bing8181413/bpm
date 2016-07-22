define([], function () {
    var rtn = {
        orderList: {
            columns: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                {
                    name: '母订单号', field: 'order_no', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'order_no',
                    tooltipPlacement: 'bottom',
                },
                // {name: '送达时间', fieldDirective: '<div ng-bind="item.pattern.arrive_pm |num2week"></div>'},
                {
                    name: '商品信息',
                    fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                    '<br/>标题:<br/><span ng-bind="item.product.title|characters: 5 : false" ' +
                    'tooltip="{{item.product.title}}" tooltip-placement="bottom"></span>' +
                    '<br/>价格:<span ng-bind="item.product.high_price"></span>'
                },
                {
                    name: '收货信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {
                    name: '订单详情',
                    fieldDirective: '<span ng-bind="\'份数:\'+item.order_count"></span>' +
                    '<br/>金额<br/><span ng-bind="item.order_price"></span>'
                },
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {name: '下单时间', field: 'order_time'},
                {
                    name: '返现金额',
                    fieldDirective: '<span ng-bind="item.rebate.return_amount"></span>' +
                    '(<span ng-bind="item.rebate.return_status | return_status"></span>)'
                },
                {name: '配送时间', field: 'pattern.arrive_pm', filter: 'num2week'},
                {name: '子订单', fieldDirective: '<div order-deliveries data="item"></div>'},
                {name: '母订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {
                    name: '管理备注', field: 'remark', truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltip: 'remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '操作',
                    fieldDirective: '<div order-cancel data="item"></div>' +
                    '<div order-change-address data="item"></div>' +
                    '<div order-change-pattern data="item"></div>' +
                    '<div order-change-remark data="item"></div>'
                },
            ],
            config: {
                title: '订单管理',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        //1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'order_status', text: '母订单状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '待支付'},
                            {value: '2', text: '支付中'},
                            {value: '3', text: '已支付'},
                            {value: '4', text: '支付失败'},
                            {value: '5', text: '已完成'},
                            {value: '6', text: '已取消'},
                        ]
                    },
                    {value: 'date_min', text: '下单时间开始', type: 'datetime'},
                    {value: 'date_max', text: '下单时间结束', type: 'date'},
                    {value: 'order_id', text: '母订单号'},
                    {value: 'user_id', text: '联系人'},
                    {value: 'mobile', text: '手机号'},
                    // {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 2,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
            config_by_groupbuy: {
                title: '拼团订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'order_status', text: '母订单状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '待支付'},
                            {value: '2', text: '支付中'},
                            {value: '3', text: '已支付'},
                            {value: '4', text: '支付失败'},
                            {value: '5', text: '已完成'},
                            {value: '6', text: '已取消'},
                        ]
                    },
                    // {value: 'date_min', text: '开始时间',type:'datetime'},
                ],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: false,
                pageInfo: {
                    count: 1000000,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
            columns_by_groupbuy: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                {name: '母订单号', field: 'order_no',},
                {
                    name: '收货<br/>信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {name: '购买<br/>份数', field: 'order_count',},
                {name: '支付<br/>金额', field: 'order_price',},
                {name: '配送<br/>时间', field: 'pattern.arrive_pm', filter: 'num2week'},
                {name: '下单时间', field: 'order_time',},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {
                    name: '用户订单备注', field: 'remark', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '操作',
                    fieldDirective: '<div order-cancel data="item"></div>' +
                    '<div order-change-address data="item"></div>' +
                    '<div order-change-pattern data="item"></div>' +
                    '<div order-change-remark data="item"></div>'
                },
                // {
                //     name: '商品信息',
                //     fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                //     '<br/><span ng-bind="\'标题:\'+item.product.title"></span>' +
                //     '<br/><span ng-bind="\'价格:\'+item.product.high_price"></span>'
                // },
            ],
        }
    }
    return rtn;
});