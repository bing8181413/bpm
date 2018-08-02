define([], function() {
    var rtn = {
        groupbuyList: {
            columns: [
                {
                    name: 'ID',
                    fieldDirective: '<p>拼团ID:<span ng-bind="item.groupbuy_id" ></span></p>' +
                    '<p>订单ID:<span ng-bind="item.order_id" ></span></p>',
                },
                {
                    name: '课程信息', className: 'width200',
                    fieldDirective: '<p>ID:  <span ng-bind="item.product_id"></span>' +
                    '<br/>标题: <span ng-bind="item.product.title"></span></p>',
                },
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern data="item"></div>'},i
                {name: '开团用户', fieldDirective: '<div groupbuy-order data="item"></div>'},
                {name: '团订单数', fieldDirective: '<div groupbuy-order-copies data="item"></div>'},
                // {name: '成功购买份数', field: 'order.copies'},
                // {name: '团支付金额', field: 'order.amounts'},
                // {name: '返现金额', field: 'return_amount'},
                {
                    name: '剩余时间',
                    fieldDirective: '<p><span ng-show="item.groupbuy_end_type==1&&item.accomplish_status==3">已结束</span></p>' +
                    '<p><span ng-bind="item.group_end_time|null2empty|remaining_time" ng-show="item.groupbuy_end_type==2&&item.accomplish_status==3"></span></p>' +
                    '<p><span ng-bind="item.group_end_time|null2empty|remaining_time" ng-show="item.accomplish_status!=3"></span></p>',
                    // field: 'group_end_time', filter: 'null2empty|remaining_time'},
                    // {name: '拼团状态', field: 'accomplish_status', filter: 'accomplish_status'
                },
                {
                    name: '拼团状态',
                    fieldDirective: '<div groupbuy-accomplish-status data="item"></div>',
                },
                {
                    name: 'utm_source', field: 'order_stat.utm_source|null2empty',
                },
                {
                    name: '管理备注', className: 'text-center width100',
                    fieldDirective: '<div modal-textarea title="查看" content="item.product.admin_remark" ng-if="item.product.admin_remark.length>10"></div>' +
                    '<p ng-if="item.product.admin_remark.length<=10" ng-bind="item.product.admin_remark"></p>',
                },
                // {
                //     name: '管理备注', field: 'product.admin_remark',
                //     truncateText: true,
                //     truncateTextLength: 10,
                //     truncateTextBreakOnWord: false,
                //     tooltip: 'product.admin_remark',
                //     tooltipPlacement: 'bottom',
                // },
                {
                    name: '操作',
                    fieldDirective: '<div groupbuy-change data="item" ></div>',
                },
            ],
            config: {
                title: '拼团列表',
                api: '/groupbuys',
                paginationSupport: true,
                searchSupport: true,
                rowItemName: 'item',
                searchItems: [
                    {text: '(开团时间)--开始', value: 'date_min', type: 'datetime'},
                    {text: '(开团时间)--结束', value: 'date_max', type: 'datetime'},
                    {text: '课程ID', value: 'product_id', placeholder: '商品ID'},
                    {text: '拼团ID', value: 'groupbuy_id', placeholder: '拼团ID'},
                    {text: '开团用户', value: 'contact_name', placeholder: '开团联系人'},
                    {text: '开团手机', value: 'contact_mobile', placeholder: '开团手机号'},
                    {text: 'utm_source', value: 'utm_source', placeholder: 'utm_source'},
                    // { // 成团状态:1:开团,2:进行中,3:完成,4:已取消
                    //     value: 'accomplish_status', text: '拼团状态', type: 'btnGroup', default: '', width: '6',
                    //     enum: [
                    //         {value: '', text: '全部'},
                    //         {value: '1', text: '开团'},
                    //         {value: '2', text: '进行中'},
                    //         {value: '3', text: '拼团完成'},
                    //         {value: '4', text: '拼团取消'},
                    //     ]
                    // },
                    // {  // accomplish_status 成团状态:1:开团,2:进行中,3:完成,4:已取消
                    //     value: 'flag', text: '状态', type: 'btnGroupArray2',
                    //     default: 1, //有enum_text时 enumde index 的值
                    //     width: '6',
                    //     enum_text: 'accomplish_status',
                    //     enum: [
                    //         {value: [], text: '全部'},
                    //         {value: [1, 2], text: '正在进行'},
                    //         {value: [3], text: '拼团完成'},
                    //         {value: [4], text: '拼团取消'},
                    //     ],
                    // },
                    {    // accomplish_status 成团状态:1:开团,2:进行中,3:完成,4:已取消
                        // payment_status
                        type: 'btnGroupArray',
                        value: 'flag111',
                        text: '状态',
                        default: 1, //有 enum_text 时 enum 的 index 的值
                        width: '6',
                        enum_text: ['accomplish_status', 'payment_status'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: [1, undefined], text: '正在进行'},
                            {value: [3, undefined], text: '拼团完成'},
                            {value: [4, 1], text: '未支付取消'},
                            {value: [4, 3], text: '拼团失败取消'},
                        ],
                    },
                ],
                preSelectionSearch: {
                    // status: '1',
                },
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // 额外的bar  在搜索框下面 可以自定义事件
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
        },
    };
    return rtn;
});