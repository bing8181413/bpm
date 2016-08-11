define([], function () {
    var rtn = {
        deliveryList: {
            columns: [
                {name: '子订单号', field: 'order_sub_no'},
                {
                    name: '商品标题',
                    field: 'order.order_title'
                },
                {name: '购买份数', field: 'order.order_count'},
                {
                    name: '收货信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address|characters: 10 : false" ' +
                    'tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {name: '预计配送时间', field: 'expect_date'},
                {name: '子订单状态', field: 'delivery_status', filter: 'order_deliver_status'},
                {
                    name: '管理备注',
                    fieldDirective: '<span ng-bind="item.order.remark|characters: 5 : false" ' +
                    'tooltip="{{item.order.remark}}" tooltip-placement="bottom"></span>'
                },
                // {
                //     name: '操作',
                //     fieldDirective: '<div deliver-delay data="item"></div>' +
                //     '<div deliver-change-remark data="item"></div>'
                // },
            ],
            config: {
                title: '配送管理',
                api: '/orders/deliveries',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        //  delivery_status 子单状态:1 待发货,2 已发货,3 已签收,4 已经取消
                        value: 'delivery_status', text: '子单状态', type: 'btnGroup', default: '1', width: '6',
                        enum: [
                            {value: '1', text: '待发货'},
                            {value: '2', text: '已发货'},
                            {value: '3', text: '已签收'},
                            {value: '4', text: '已取消'},
                        ]
                    },
                    {text: '预计配送时间', type: 'date', value: 'date', width: '6'},
                    {text: '商品ID', value: 'product_id'},
                    {text: '子订单号', value: 'order_sub_no'},
                    {text: '联系人', value: 'contact_name'},
                    {text: '手机号', value: 'contact_mobile'},
                ],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 50,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                },
                // 额外的bar  在搜索框下面 可以自定义事件
                ext: {
                    checked: {
                        text: '',
                        value: '_checked'
                    },
                    showNum: [
                        {text: '总数', type: 'total'},
                        {text: '已选', type: 'selected'},
                    ],
                    eventBtn: [
                        {text: '全选', event: 'all_select'},
                        {text: '取消全选', event: 'cancel_all_select'},
                        {
                            text: '修改子订单状态',
                            fieldFirective: '<div change-deliveries-status data="list"></div>',
                        },
                    ]
                }
            },
            columnsByOrder: [
                {name: '子订单号', field: 'order_sub_no'},
                {name: '预计配送时间', field: 'expect_date'},
                {name: '子订单状态', field: 'delivery_status', filter: 'order_deliver_status'},
                {
                    name: '操作',
                    fieldDirective: '<div deliver-delay data="item"></div>'
                },
            ],
            configByOrder: {
                title: '子订单列表',
                api: '/orders/{order_id}/delivers',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: false,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        }
    }
    return rtn;
});