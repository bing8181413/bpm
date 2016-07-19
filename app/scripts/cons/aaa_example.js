define([], function () {
    var rtn = {
        exportList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: 'ID', field: 'export_id', className: 'text-right'},
                {name: '管理备注', field: 'admin_remark'},
                {name: '标题', field: 'title'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern="item"></div>'},
                {name: '开团数量', field: 'order.groupbuy_count'},
                {name: '订单数', field: 'order.order_count'},
                {name: '已售份数', field: 'order.order_copies'},
                {name: '配送规则', fieldDirective: '<div product-pattern="item.patterns"></div>'},
                {name: '商品状态', field: 'status'},
                // {name: '操作', field: 'product_id'},
                // {
                //     name: '手机',
                //     field: 'mobile',
                //     truncateText: true,
                //     truncateTextLength: 11,
                //     truncateTextBreakOnWord: false,
                //      tooltip: 'product.title',
                //      tooltipPlacement: 'bottom',
                // },
            ],
            config: {
                title: '导出管理',
                api: '/exports',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '0', text: '已下线'},
                        ]
                    },
                    // , width: '12'  代表 col-sm-12  一列宽度 默认是6
                    {value: 'haha', text: '城市', placeholder: '城市', width: '12'},
                    {value: 'date_min', text: '开始日期', type: 'date'},
                    {value: 'date_max', text: '结束日期', type: 'date'},
                    {value: 'datetime_min', text: '开始时间', type: 'datetime'},
                    {value: 'datetime_max', text: '结束时间', type: 'datetime'},
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
                route: [{value: 'product.add', text: '新增商品'}]
            }
        }
    }
    return rtn;
});