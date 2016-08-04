define([], function () {
    var rtn = {
        exportList: {
            columns: [
                // {name: '编号', field: 'idx', className: 'text-right'},
                {name: 'ID', field: 'export_id', className: 'text-right'},
                {name: '管理备注', field: 'admin_remark'},
                {name: '标题', field: 'title'},
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern data="item"></div>'},
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
                itemList: 'list',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {
                        value: 'status', text: '状态', type: 'btnGroup', default: '',
                        enum: [
                            {value: '', text: '全部'},
                            {value: '1', text: '正在进行'},
                            {value: '2', text: '已下线'},
                        ]
                    },
                    {   // status 1 上线 2 下线
                        // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray',
                        value: 'flag',
                        text: '状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: ['1', '1'], text: '正在进行'},
                            {value: ['2', ''], text: '已下线'},
                            {value: ['1', '2'], text: '待上线'},
                        ]
                    },
                    {  // accomplish_status 成团状态:1:开团,2:进行中,3:完成,4:已取消
                        value: 'flag', text: '状态', type: 'btnGroupArray2',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'accomplish_status',//
                        enum: [
                            {value: [], text: '全部'},
                            {value: [1, 2], text: '正在进行'},
                            {value: [3], text: '已下线'},
                            {value: [4], text: '待上线'},
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
                route: [{value: 'product.add', text: '新增商品'}],
                // 额外的bar  在搜索框下面 可以自定义事件
                ext: {
                    checked: {
                        text: '',
                        value: '_checked'
                    },
                    showNum: [
                        {text: '总数', type: 'count'},
                        {text: '已选', type: 'selected'},
                    ],
                    eventBtn: [
                        {text: '全选', event: 'all_select'},
                        {text: '取消全选', event: 'cancel_all_select'},
                        {
                            text: '修改子订单状态',
                            fieldFirective: '<div change-deliveries-status data="list"></div>',
                        },
                    ]
                }
            }
        }
    }
    return rtn;
});