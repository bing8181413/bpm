define([], function () {
    var rtn = {
        groupbuyList: {
            columns: [
                {name: 'ID', field: 'groupbuy_id', className: 'text-center'},
                {
                    name: '商品信息', field: 'product.title',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltip: 'product.title',
                    tooltipPlacement: 'bottom',
                },
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern data="item.product"></div>'},
                {name: '开团订单', fieldDirective: '<div groupbuy-order data="item"></div>'},
                {name: '团订单数', fieldDirective: '<div groupbuy-order-copies data="item"></div>'},
                {name: '团支付金额', field: 'order.amounts'},
                {name: '返现金额', field: 'return_amount'},
                {name: '剩余时间', field: 'group_end_time', filter: 'null2empty|remaining_time'},
                // {name: '拼团状态', field: 'accomplish_status', filter: 'accomplish_status'},
                {
                    name: '拼团状态',
                    fieldDirective: '<div groupbuy-accomplish-status data="item"></div>'
                },
            ],
            config: {
                title: '拼团管理',
                api: '/groupbuys',
                paginationSupport: true,
                searchSupport: true,
                rowItemName: 'item',
                searchItems: [
                    {text: '(开团时间)--开始', value: 'date_min', type: 'datetime'},
                    {text: '(开团时间)--结束', value: 'date_max', type: 'datetime'},
                    {text: '商品ID', value: 'product_id', placeholder: '商品ID'},
                    {text: '拼团ID', value: 'groupbuy_id', placeholder: '拼团ID'},
                    {text: '开团用户', value: 'contact_name', placeholder: '开团联系人'},
                    {text: '开团手机', value: 'contact_mobile', placeholder: '开团手机号'},
                    {  // accomplish_status 成团状态:1:开团,2:进行中,3:完成,4:已取消
                        value: 'flag', text: '状态', type: 'btnGroupArray2',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'accomplish_status',//  有  enum_text 说明是数组
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '正在进行'},
                            {value: [3], text: '已下线'},
                            {value: [4], text: '待上线'},
                        ]
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
            },
        }
    }
    return rtn;
});