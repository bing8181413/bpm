define([], function () {
    var rtn = {
        groupbuyList: {
            columns: [
                {name: '拼团ID', field: 'groupbuy_id'},
                {name: '商品信息', field: 'product.title'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern="item.product"></div>'},
                {name: '开团用户', field: 'order.count'},
                {name: '订单数', field: 'order.copies'},
                {name: '现价', field: 'current_price'},
                {name: '剩余时间', field: 'group_end_time', filter: 'null2empty|remaining_time'},
                {name: '拼团状态', field: 'accomplish_status', filter: 'accomplish_status'},
            ],
            config: {
                title: '拼团管理',
                api: '/groupbuys',
                paginationSupport: true,
                searchSupport: true,
                rowItemName: 'item',
                searchItems: [
                    {
                        value: 'accomplish_status', text: '拼团状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '开团'},
                            {value: '2', text: '拼团进行中'},
                            {value: '3', text: '拼团成功'},
                            {value: '4', text: '拼团取消'},
                        ]
                    },
                    {text: '开始时间', value: 'date_min', type: 'datetime'},
                    {text: '结束时间', value: 'date_max', type: 'datetime'},
                    {text: '编号', value: 'account_id', placeholder: '编号'},
                ],
                preSelectionSearch: {
                    // status: '1',
                },
                pageInfo: {
                    count: 20,
                    page: 1,
                    // maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
            }
        }
    }
    return rtn;
});