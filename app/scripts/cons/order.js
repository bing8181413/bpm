define([], function() {
    var rtn = {
        orderList: {
            columns_by_act_all: [
                {
                    name: '基本信息', className: 'width200 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>订单ID:<span ng-bind="item.order_id"></span></p>' +
                    '<p>订单号:<span ng-bind="item.order_no"></span></p>' +
                    '<p>拼团ID:<span ng-bind="item.groupbuy_id"></span></p>' +
                    '<p>推荐人:<span ng-bind="item.referee" ng-if="item.referee"></span></p>' +
                    '<p>订单类型:<span ng-bind="item.order_type|order_type" ng-if="item.order_type"></span></p>' +
                    '<p>是否是团长:<span ng-bind="item.open_group|keyVal:\'1\':\'是\':\'2\':\'--\'"></span></p>' +
                    '<p>马甲状态:<span ng-bind="item.is_mj|keyVal:\'1\':\'马甲\':\'0\':\'--\'"></span></p>' +
                    '</div>',
                },

                {
                    name: '课程/类目', className: 'width250 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>ID:<span ng-bind="item.product.product_id"></span></p>' +
                    '<p>SKU:<span ng-bind="item.sku|common:\'sku\'"></span></p>' +
                    '<p>课程类目:<span ng-bind="item.option_name"></span></p>' +
                    '<p>类目价格:<span ng-bind="item.option_price"></span></p>' +
                    '<p>标题:<span ng-bind="item.product.title"></span></p>' +
                    '<p>活动开始时间:<span ng-bind="item.product.start_time"></span></p>' +
                    '<p>报名截止时间:<span ng-bind="item.product.end_time"></span></p>' +
                    '</div>',
                },
                {
                    name: '用户、收货人信息', className: 'width200 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>用户ID:<span ng-bind="item.user_id"></span></p>' +
                    '<p>用户手机:<span ng-bind="item.mobile"></span></p>' +
                    '<p>用户名:<span ng-bind="item.name"></span></p>' +
                    '<p>用户ID:<span ng-bind="item.user_id"></span></p>' +
                    '<p>收货人:<span ng-bind="item.address.contact_name"></span></p>' +
                    '<p>收货手机:<span ng-bind="item.address.contact_mobile"></span></p>' +
                    // '<p>收货地址:<span ng-bind="item.address.province+item.address.city_name+item.address.address"></span></p>' +
                    // '<p>收货人邮件:<span ng-bind="item.address.email"></span></p>' +
                    // '<p>孩子姓名:<span ng-bind="item.address.baby_name"></span></p>' +
                    // '<p>孩子身份证:<span ng-bind="item.address.baby_id_card"></span></p>' +
                    '</div>',
                },

                {
                    name: '支付信息', className: 'width150 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>支付类型:<span ng-bind="item.payment_from|payment_from"></span></p>' +
                    '<p>支付状态:<span ng-bind="item.groupbuy_id|payment_status"></span></p>' +
                    '</div>',
                },

                {
                    name: '优惠', className: 'width150 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>优惠券:<span ng-bind="item.coupon_price"></span></p>' +
                    '<p>会员折扣:<span ng-bind="item.is_vip==1?item.vip_discount:\'无折扣\'"></span></p>' +
                    '</div>',
                },
                {
                    name: '订单详情', className: 'width200 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>份数:<span ng-bind="item.order_count"></span></p>' +
                    '<p>金额:<span ng-bind="item.order_price"></span></p>' +
                    '<p>下单时间:<span ng-bind="item.order_time"></span></p>' +
                    '<p>订单状态:<span ng-bind="item.order_status|order_status"></span></p>' +
                    '<p>取消时间:<span ng-bind="item.refund.created_at"></span></p>' +
                    '<p>utm_source:<span ng-bind="item.stat.utm_source"></span></p>' +
                    '</div>',
                },
                // {name: '取消时间', field: 'refund.created_at'},
                {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
                {
                    name: '操作',
                    fieldDirective: '<div order-cancel data="item"></div>' +
                    '<div order-change-address-of-act data="item"></div>' +
                    '<div order-change-remark data="item"></div>' +
                    '<div order-self-introduction data="item"></div>' +
                    '<div order-value-explain data="item"></div>',
                },
            ],
            columns_by_act: [
                {name: '订单ID', field: 'order_id', className: 'text-right'},
                {name: '拼团ID', field: 'groupbuy_id', className: 'text-right'},
                // {name: '订单号', field: 'order_no'},
                {name: '支付类型', field: 'payment_from', filter: 'payment_from'},
                {name: '支付状态', field: 'payment_status', filter: 'payment_status'},
                {
                    name: '订单号/推荐人',
                    fieldDirective: '<span ng-bind="item.order_no"></span>' +
                    '<br/><span  ng-if="item.referee">推荐人:</span>' +
                    '<span ng-bind="item.referee" ng-if="item.referee"></span>',
                },
                {name: '订单类型', field: 'order_type', filter: 'order_type'},
                {
                    name: '活动类目',
                    fieldDirective: '<span ng-bind="item.option_name +\':\'" ng-if="item.option_name"></span>' +
                    '<span ng-bind="item.option_price"></span>',
                },
                {
                    name: '收货人信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name|characters: 10 : false"' +
                    ' uib-tooltip="{{item.address.contact_name}}" tooltip-placement="bottom"></span>' +
                    '<br/>手机号<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<span ng-if="item.address.address"><br/>详细地址:</span>' +
                    '<span ng-bind="item.address.address" ' +
                    ' uib-tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.email"><br/>邮件:</span>' +
                    '<span ng-bind="item.address.email" ' +
                    ' uib-tooltip="{{item.address.email}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_name"><br/>孩子姓名:</span>' +
                    '<span ng-bind="item.address.baby_name" ' +
                    ' uib-tooltip="{{item.address.baby_name}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_id_card"><br/>孩子身份证:</span>' +
                    '<span ng-bind="item.address.baby_id_card" ' +
                    ' uib-tooltip="{{item.address.baby_id_card}}" tooltip-placement="bottom"></span>',
                },
                {
                    name: '订单详情',
                    fieldDirective: '<span ng-bind="\'份数:\'+item.order_count"></span>' +
                    '<br/>金额<br/><span ng-bind="item.order_price"></span>',
                },
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {name: '下单时间', field: 'order_time'},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {name: '马甲<br/>状态', field: 'is_mj', filter: 'keyVal:\'1\':\'马甲\':\'0\':\'\''},
                {name: 'utm<br/>source', fieldDirective: '<p ng-bind="item.stat.utm_source"></p>'},
                {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
                {
                    name: '操作',
                    fieldDirective: '<div order-cancel data="item"></div>' +
                    '<div order-change-address-of-act data="item"></div>' +
                    '<div order-change-remark data="item"></div>',
                },
            ],
            config_by_act_2: {
                title: '当前活动订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'app_type', text: '课程类型', type: 'btnGroup', default: '', width: '12',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '公众号课程'},
                            {value: '2', text: '小程序课程'},
                        ],
                    },
                    {   // payment_from //  支付类型 0 待支付，1 微信，2 支付宝，3 微信H5  6 支付宝H5
                        value: 'payment_from', text: '支付类型', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: 1, text: '微信'},
                            {value: 2, text: '支付宝'},
                            {value: 3, text: '微信H5'},
                            {value: 6, text: '支付宝H5'},
                            {value: 9, text: '小程序'},
                            {value: 10, text: 'aha币'},
                        ],
                    },
                    {   // order_status  0 待支付，1 支付中，2 支付失败，3 支付成功
                        value: 'payment_status', text: '支付状态', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            // {value: 0, text: '待支付'},
                            {value: 1, text: '支付中'},
                            {value: 2, text: '支付失败'},
                            {value: 3, text: '支付成功'},
                        ],
                    },
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
                            {value: [3, 5], text: '已支付和已完成'},
                        ],
                    },
                    {
                        value: 'is_mj', text: '马甲状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '0', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ],
                    },
                ],
                preSelectionSearch: {
                    // order_type: [3, 4]
                },
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
            config_by_act: {
                title: '活动订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'app_type', text: '课程类型', type: 'btnGroup', default: '', width: '12',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '公众号课程'},
                            {value: '2', text: '小程序课程'},
                        ],
                    },
                    {   // payment_from //  支付类型 0 待支付，1 微信，2 支付宝，3 微信H5  6 支付宝H5
                        value: 'payment_from', text: '支付类型', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: 1, text: '微信'},
                            {value: 2, text: '支付宝'},
                            {value: 3, text: '微信H5'},
                            {value: 6, text: '支付宝H5'},
                            {value: 9, text: '小程序'},
                            {value: 10, text: 'aha币'},
                        ],
                    },
                    {   // order_status  0 待支付，1 支付中，2 支付失败，3 支付成功
                        value: 'payment_status', text: '支付状态', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            // {value: 0, text: '待支付'},
                            {value: 1, text: '支付中'},
                            {value: 2, text: '支付失败'},
                            {value: 3, text: '支付成功'},
                        ],
                    },
                    {   // order_type 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag1', text: '订单类型', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_type',//
                        enum: [
                            // {value: [3, 4], text: '全部'},
                            // {value: [3], text: '众筹团'},
                            // {value: [4], text: '活动'}
                            {value: [], text: '全部'},
                            {value: [3], text: '直接买'},
                            {value: [2], text: '人数团'},
                            {value: [4], text: '购买礼包'},
                            {value: [5], text: '领取礼包'},
                        ],
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
                            {value: [3, 5], text: '已支付和已完成'},
                        ],
                    },
                    {value: 'date_min', text: '(下单时间)--开始', type: 'datetime'},
                    {value: 'date_max', text: '(下单时间)--结束', type: 'datetime'},
                    {value: 'product_id', text: '活动ID'},
                    {value: 'groupbuy_id', text: '拼团ID'},
                    {value: 'order_id', text: '订单ID'},
                    {value: 'order_no', text: '订单号'},
                    {value: 'user_id', text: '用户ID'},
                    {value: 'contact_name', text: '联系人'},
                    {value: 'contact_mobile', text: '订单手机号'},
                    {value: 'utm_source', text: 'utm_source'},
                    {
                        value: 'is_mj', text: '马甲状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '0', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ],
                    },
                ],
                preSelectionSearch: {
                    order_type: [],
                },
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
            config_by_groupbuy: {
                title: '当前拼团订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'app_type', text: '课程类型', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '公众号课程'},
                            {value: '2', text: '小程序课程'},
                        ],
                    },
                    {   // payment_from //  支付类型 0 待支付，1 微信，2 支付宝，3 微信H5  6 支付宝H5
                        value: 'payment_from', text: '支付类型', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: 1, text: '微信'},
                            {value: 2, text: '支付宝'},
                            {value: 3, text: '微信H5'},
                            {value: 6, text: '支付宝H5'},
                            {value: 9, text: '小程序'},
                        ],
                    },
                    {   // order_status  0 待支付，1 支付中，2 支付失败，3 支付成功
                        value: 'payment_status', text: '支付状态', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: 0, text: '待支付'},
                            {value: 1, text: '支付中'},
                            {value: 2, text: '支付失败'},
                            {value: 3, text: '支付成功'},
                        ],
                    },
                    {   // order_status 1 待支付,2 支付中,3 已支付,4 支付失败,5 已完成,6 已取消
                        value: 'flag', text: '订单状态', type: 'btnGroupArray2',
                        default: 0, width: '6',
                        enum_text: 'order_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '待支付'},
                            {value: [3], text: '已支付'},
                            {value: [5], text: '已完成'},
                            {value: [4, 6], text: '已取消'},
                        ],
                    },
                    {
                        value: 'is_mj', text: '马甲状态', type: 'btnGroup', default: '', width: '6',
                        enum: [
                            {value: '', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '0', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ],
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
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
            columns_by_groupbuy: [
                {name: '订单ID', field: 'order_id', className: 'text-right'},
                {name: '拼团ID', field: 'groupbuy_id', className: 'text-right'},
                {name: '支付类型', field: 'payment_from', filter: 'payment_from'},
                {name: '支付状态', field: 'payment_status', filter: 'payment_status'},
                {name: '母订单号', field: 'order_no'},
                {
                    name: '收货<br/>信息',
                    fieldDirective: '<span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<span ng-if="item.address.address"><br/>详细地址:</span>' +
                    '<span ng-bind="item.address.address" ' +
                    ' uib-tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.email"><br/>邮件:</span>' +
                    '<span ng-bind="item.address.email" ' +
                    ' uib-tooltip="{{item.address.email}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_name"><br/>孩子姓名:</span>' +
                    '<span ng-bind="item.address.baby_name" ' +
                    ' uib-tooltip="{{item.address.baby_name}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_id_card"><br/>孩子身份证:</span>' +
                    '<span ng-bind="item.address.baby_id_card" ' +
                    ' uib-tooltip="{{item.address.baby_id_card}}" tooltip-placement="bottom"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span>',
                },
                {name: '购买<br/>份数', field: 'order_count'},
                {name: '支付<br/>金额', field: 'order_price'},
                {name: '配送<br/>时间', field: 'pattern.arrive_pm', filter: 'num2week'},
                {name: '下单时间', field: 'order_time'},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {name: '马甲<br/>状态', field: 'is_mj', filter: 'keyVal:\'1\':\'马甲\':\'0\':\'\''},
                {name: 'utm<br/>source', fieldDirective: '<p ng-bind="item.stat.utm_source"></p>'},
                {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
                {
                    name: '操作',
                    fieldDirective: '<div order-cancel data="item"></div>' +
                    '<div order-change-address data="item"></div>' +
                    '<div order-change-pattern data="item"></div>' +
                    '<div order-change-remark data="item"></div>',
                },
                // {
                //     name: '商品信息',
                //     fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                //     '<br/><span ng-bind="\'标题:\'+item.product.title"></span>' +
                //     '<br/><span ng-bind="\'价格:\'+item.product.high_price"></span>'
                // },
            ],
            columns_by_user: [
                {name: '订单ID', field: 'order_id', className: 'text-right'},
                {name: '拼团ID', field: 'groupbuy_id', className: 'text-right'},
                {name: '母订单号', field: 'order_no'},
                {
                    name: '课程信息',
                    fieldDirective: '<span ng-bind="\'活动ID:\'+item.product.product_id"></span>' +
                    '<br/>标题:<br/><span ng-bind="item.product.title"></span> ',
                },
                {
                    name: '收货<br/>信息',
                    fieldDirective: '<p><span ng-bind="\'联系人:\'+item.address.contact_name"></span>' +
                    '<br/>手机<br/><span ng-bind="item.address.contact_mobile"></span>' +
                    '<br/>详细地址:<br/><span ng-bind="item.address.address" ' +
                    'uib-tooltip="{{item.address.address}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.email"><br/>邮件:</span>' +
                    '<span ng-bind="item.address.email" ' +
                    ' uib-tooltip="{{item.address.email}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_name"><br/>孩子姓名:</span>' +
                    '<span ng-bind="item.address.baby_name" ' +
                    ' uib-tooltip="{{item.address.baby_name}}" tooltip-placement="bottom"></span>' +
                    '<span ng-if="item.address.baby_id_card"><br/>孩子身份证:</span>' +
                    '<span ng-bind="item.address.baby_id_card" ' +
                    ' uib-tooltip="{{item.address.baby_id_card}}" tooltip-placement="bottom"></span>' +
                    '<br/>标签:<span ng-bind="item.address.poi_type |poi_type"></span></p>',
                },
                {name: '购买<br/>份数', field: 'order_count'},
                {name: '支付<br/>金额', field: 'order_price'},
                {name: '配送<br/>时间', field: 'pattern.arrive_pm', filter: 'num2week'},
                {name: '下单时间', field: 'order_time'},
                {name: '订单<br/>状态', field: 'order_status', filter: 'order_status'},
                {name: '马甲<br/>状态', field: 'is_mj', filter: 'keyVal:\'1\':\'马甲\':\'0\':\'\''},
                {name: 'utm<br/>source', fieldDirective: '<p ng-bind="item.stat.utm_source"></p>'},
                {name: '备注', fieldDirective: '<p ng-bind="item.remark"></p>'},
            ],
            config_by_user: {
                title: '用户的订单列表',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // payment_from //  支付类型 0 待支付，1 微信，2 支付宝，3 微信H5  6 支付宝H5
                        value: 'payment_from', text: '支付类型', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            {value: 1, text: '微信'},
                            {value: 2, text: '支付宝'},
                            {value: 3, text: '微信H5'},
                            {value: 6, text: '支付宝H5'},
                            {value: 9, text: '小程序'},
                        ],
                    },
                    {   // order_status  0 待支付，1 支付中，2 支付失败，3 支付成功
                        value: 'payment_status', text: '支付状态', type: 'btnGroup',
                        default: '', width: '6',
                        enum: [
                            {value: '', text: '全部'},
                            // {value: 0, text: '待支付'},
                            {value: 1, text: '支付中'},
                            {value: 2, text: '支付失败'},
                            {value: 3, text: '支付成功'},
                        ],
                    },
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
                            {value: [3, 5], text: '已支付和已完成'},
                        ],
                    },
                ],
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            },
        },
    };
    return rtn;
});