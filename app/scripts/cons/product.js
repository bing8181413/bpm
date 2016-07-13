define([], function () {
    var rtn = {
        productList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: '商品ID', field: 'product_id', className: 'text-right'},
                {name: '管理备注', field: 'admin_remark'},
                {name: '标题', field: 'title'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern="item"></div>'},
                {name: '开团数量', field: 'order.groupbuy_count'},
                {name: '订单数', field: 'order.order_count'},
                {name: '已售份数', field: 'order.order_copies'},
                {name: '配送规则', fieldDirective: '<div product-pattern="item.patterns"></div>'},
                {name: '商品状态', field: 'status', filter: 'product_status'},
                {
                    name: '操作',
                    fieldDirective: '<a class="btn btn-success" data="item" ' +
                    'ui-sref="main.product.update({product_id:item.product_id})">编辑</a>' +
                    '<a class="btn btn-success" data="item" ng-click="change_status()">下线</a>'
                },
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                // },
            ],
            config: {
                title: '商品管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '商品状态', type: 'btnGroup', default: '1',
                        enum: [
                            {value: '1', text: '正在进行'},
                            {value: '0', text: '已下线'},
                        ]
                    },
                    // {value: 'date_min', text: '开始日期', type: 'date'},
                    // {value: 'date_max', text: '结束日期', type: 'date'},
                ],
                preSelectionSearch: {
                    key: 'deviceNo',
                    value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.product.add', text: '新增商品'}]
            }
        }
    }
    return rtn;
});