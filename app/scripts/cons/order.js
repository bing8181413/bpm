define([], function () {
    var rtn = {
        orderList: {
            columns: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                {name: '母订单号', field: 'order_no'},
                // {name: '送达时间', fieldDirective: '<div ng-bind="item.pattern.arrive_pm |num2week"></div>'},
                {
                    name: '拼团信息',
                    fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                    '<br/>标题:<br/><span ng-bind="item.product.title|characters: 7 : false" ' +
                    'tooltip="{{item.product.title}}" tooltip-placement="bottom"></span>' +
                    '<br/>价格:<span ng-bind="item.product.high_price"></span>'
                },
                {
                    name: '收货人信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address" ' +
                    ' tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {
                    name: '购买份数',
                    field: 'order_count'
                },
                {
                    name: '支付金额',
                    field: 'order_price'
                },
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {
                    name: '会员<br/>折扣',
                    fieldDirective: '<span ng-bind="item.vip_discount" ng-show="item.is_vip==1"></span>' +
                    '<br/><span ng-show="item.is_vip==2">无折扣</span>'
                },
                {name: '订单时间', field: 'order_time'},
                // {
                //     name: '返现金额',
                //     fieldDirective: '<span ng-bind="item.rebate.return_amount"></span>' +
                //     '(<span ng-bind="item.rebate.return_status | return_status"></span>)'
                // },
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
                title: '拼团订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // order_type 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag1', text: '订单类型', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_type',//
                        enum: [
                            // {value: [1, 2], text: '全部'},
                            {value: [2], text: '全部'},
                            // {value: [1], text: '砍价团'},
                            {value: [2], text: '人数团'}
                        ]
                    },
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag2', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
                        ]
                    },
                    {value: 'date_min', text: '(下单时间)--开始', type: 'datetime'},
                    {value: 'date_max', text: '(下单时间)--结束', type: 'datetime'},
                    {value: 'order_no', text: '母订单号'},
                    {value: 'contact_name', text: '联系人'},
                    {value: 'contact_mobile', text: '订单手机号'},
                    {value: 'user_id', text: '用户ID'},
                    // {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    // order_type: [1, 2]
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
            columns_by_act_all: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                // {name: '订单号', field: 'order_no'},
                {
                    name: '订单号/推荐人',
                    fieldDirective: '<span ng-bind="item.order_no"></span>' +
                    '<br/><span  ng-if="item.referee">推荐人:</span>' +
                    '<span ng-bind="item.referee" ng-if="item.referee"></span>'
                },
                {name: '订单类型', field: 'order_type', filter: 'product_category'},
                {
                    name: '活动信息',
                    fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                    '<br/>标题:<br/><span ng-bind="item.product.title|characters: 7 : false" ' +
                    'tooltip="{{item.product.title}}" tooltip-placement="bottom"></span>' +
                    '<br/>活动开始时间:<br/><span ng-bind="item.product.start_time"></span>' +
                    '<br/>报名截止时间:<br/><span ng-bind="item.product.end_time"></span>'
                },
                {
                    name: '活动类目',
                    fieldDirective: '<span ng-bind="item.option_name +\':\'" ng-if="item.option_name"></span>' +
                    '<span ng-bind="item.option_price"></span>'
                },
                {
                    name: '收货人信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name|characters: 10 : false"' +
                    ' tooltip="{{item.address.contact_name}}" tooltip-placement="bottom"></span>' +
                    '<br/>手机号<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/><span ng-if="item.address.address">详细地址:</span><br/>' +
                    '<span ng-bind="item.address.address" ng-if="item.address.address"' +
                    ' tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>'
                },
                {
                    name: '订单详情',
                    fieldDirective: '<span ng-bind="\'份数:\'+item.order_count"></span>' +
                    '<br/>金额<br/><span ng-bind="item.order_price"></span>'
                },
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {
                    name: '会员<br/>折扣',
                    fieldDirective: '<span ng-bind="item.vip_discount" ng-show="item.is_vip==1"></span>' +
                    '<br/><span ng-show="item.is_vip==2">无折扣</span>'
                },
                {name: '下单时间', field: 'order_time'},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
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
                    '<div order-change-address-of-act data="item"></div>' +
                    '<div order-change-remark data="item"></div>'
                },
            ],
            columns_by_act: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                // {name: '订单号', field: 'order_no'},
                {
                    name: '订单号/推荐人',
                    fieldDirective: '<span ng-bind="item.order_no"></span>' +
                    '<br/><span  ng-if="item.referee">推荐人:</span>' +
                    '<span ng-bind="item.referee" ng-if="item.referee"></span>'
                },
                {name: '订单类型', field: 'order_type', filter: 'product_category'},
                {
                    name: '活动类目',
                    fieldDirective: '<span ng-bind="item.option_name +\':\'" ng-if="item.option_name"></span>' +
                    '<span ng-bind="item.option_price"></span>'
                },
                {
                    name: '收货人信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name|characters: 10 : false"' +
                    ' tooltip="{{item.address.contact_name}}" tooltip-placement="bottom"></span>' +
                    '<br/>手机号<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/><span ng-if="item.address.address">详细地址:</span><br/>' +
                    '<span ng-bind="item.address.address" ng-if="item.address.address"' +
                    ' tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>'
                },
                {
                    name: '订单详情',
                    fieldDirective: '<span ng-bind="\'份数:\'+item.order_count"></span>' +
                    '<br/>金额<br/><span ng-bind="item.order_price"></span>'
                },
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {name: '下单时间', field: 'order_time'},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
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
                    '<div order-change-address-of-act data="item"></div>' +
                    '<div order-change-remark data="item"></div>'
                },
            ],
            config_by_act_2: {
                title: '当前活动订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag2', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '12',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
                        ]
                    },
                    {
                        value: 'is_majia', text: '马甲状态', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '2', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    // order_type: [3, 4]
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ]
                }
            },
            config_by_act: {
                title: '活动订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // order_type 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag1', text: '订单类型', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_type',//
                        enum: [
                            // {value: [3, 4], text: '全部'},
                            // {value: [3], text: '众筹团'},
                            // {value: [4], text: '活动'}
                            {value: [2, 3], text: '全部'},
                            {value: [3], text: '直接买'},
                            {value: [2], text: '人数团'},
                        ]
                    },
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag2', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
                        ]
                    },
                    {value: 'date_min', text: '(下单时间)--开始', type: 'datetime'},
                    {value: 'date_max', text: '(下单时间)--结束', type: 'datetime'},
                    {value: 'order_no', text: '订单号'},
                    {value: 'product_id', text: '活动ID'},
                    {value: 'contact_name', text: '联系人'},
                    {value: 'contact_mobile', text: '订单手机号'},
                    {value: 'user_id', text: '用户ID'},
                ],
                preSelectionSearch: {
                    order_type: [2, 3]
                    // order_type: [3, 4]
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
            config_by_groupbuy: {
                title: '拼团订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '12',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
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
                    '<br/>详细地址:<br/><span ng-bind="item.address.address" ' +
                    'tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
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
            columns_by_user: [
                {name: 'ID', field: 'order_id', className: 'text-right'},
                {name: '母订单号', field: 'order_no',},
                {
                    name: '收货<br/>信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address" ' +
                    'tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>'
                },
                {name: '购买<br/>份数', field: 'order_count',},
                {name: '支付<br/>金额', field: 'order_price',},
                {name: '配送<br/>时间', field: 'pattern.arrive_pm', filter: 'num2week'},
                {name: '下单时间', field: 'order_time',},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {
                    name: '备注', field: 'remark', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                    tooltip: 'remark',
                    tooltipPlacement: 'bottom',
                },
            ],
            config_by_user: {
                title: '用户的订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '12',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
                        ]
                    },
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        },
    }
    return rtn;
});