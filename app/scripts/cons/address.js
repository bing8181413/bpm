define([], function () {
    var rtn = {
        addressList: {
            columns: [
                {name: '编号', field: 'address_id', className: 'text-center'},
                {name: '联系人', field: 'contact_name'},
                {name: '手机号', field: 'contact_mobile'},
                {name: '城市', field: 'city_name'},
                {name: '收货地址', field: 'address'},
                {name: '地址标签', field: 'poi_type', filter: 'address_poi_type'},
                {name: '地址状态', field: 'status', filter: 'address_status'},
            ],
            config: {
                title: '收货地址列表',
                api: '/address',
                itemList: 'data',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {value: 'mobile', text: '手机号码'},
                    {value: 'name', text: '微信昵称'},
                    {value: 'authed_at', text: '登陆日期', type: 'date'},
                    // {value: 'datetime_min', text: '开始时间', type: 'datetime'},
                    // {value: 'datetime_max', text: '结束时间', type: 'datetime'},
                ],
                preSelectionSearch: {
                    // ID: '123',
                },
                paginationSupport: false,
                pageInfo: {
                    count: 50,
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