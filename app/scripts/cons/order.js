define([], function () {
    var rtn = {
        orderList: {
            columns: [
                {name: '订单ID', field: 'order_id', className: 'text-right'},
                {
                    name: '母订单号', field: 'order_no', truncateText: true,
                    truncateTextLength: 10,
                    truncateTextBreakOnWord: false,
                },
                {name: '送达时间', fieldDirective: '<div ng-bind="item.pattern.arrive_pm |num2week"></div>'},
                {
                    name: '商品信息',
                    fieldDirective: '<span ng-bind="\'ID:\'+item.product.product_id"></span>' +
                    '<br/><span ng-bind="\'标题:\'+item.product.title"></span>' +
                    '<br/><span ng-bind="\'价格:\'+item.product.high_price"></span>'
                },
                // {name: '订单详情', field: 'address'},
                {name: '使用<br/>优惠券', field: 'coupon_price'},
                {name: '订单时间', field: 'order_time'},
                {name: '返现金额', field: 'status'},
                {name: '配送周期', field: 'status'},
                {name: '当前状态', field: 'status'},
                {name: '管理备注', field: 'status'},
                {name: '操作', field: 'status'},
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
            ],
            config: {
                title: '订单管理',
                api: '/orders',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'date_min', text: '开始时间'},
                    {value: 'date_max', text: '结束时间'},
                    {value: 'keyword', text: '关键字', placeholder: '订单编号,订单ID'},
                    {value: 'product_id', text: '商品ID'},
                    {value: 'user_id', text: '用户ID'},
                    {value: 'groupbuy_id', text: '拼团ID'},
                    // {value: 'cityname', text: '城市', placeholder: '城市', type: 'date'}
                ],
                preSelectionSearch: {
                    // key: 'deviceNo',
                    // value: 'testinfo'
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