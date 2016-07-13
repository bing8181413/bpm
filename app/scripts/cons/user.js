define([], function () {
    var rtn = {
        userList: {
            columns: [
                {name: '用户ID', field: 'user_id', className: 'text-right'},
                {name: '用户名', field: 'name'},
                {name: '性别', field: 'gender', filter: 'gender'},
                {name: '手机号', field: 'mobile'},
                {name: '优惠券', field: 'coupon.count'},
                {name: '收货地址', field: 'address.count'},
                {name: '订单信息', field: 'order.count'},
                {name: '注册时间', field: 'created_at'},
                {name: '最近一次使用时间', field: 'authed_at'},
            ],
            config: {
                title: '用户列表',
                api: '/users',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'mobile', text: '手机号码'},
                    {value: 'date_min', text: '开始日期', type: 'date'},
                    // {value: 'date_max', text: '结束日期', type: 'date'},
                    // {value: 'datetime_min', text: '开始时间', type: 'datetime'},
                    // {value: 'datetime_max', text: '结束时间', type: 'datetime'},
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
                // route: [{value: 'product.add', text: '新增商品'}]
            }
        }
    }
    return rtn;
});