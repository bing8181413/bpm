define([], function () {
    var rtn = {
        productList: {
            columns: [
                {name: 'ID', field: 'product_id', className: 'text-center'},
                // {
                //     name: '标题', field: 'title',
                //     truncateText: true,
                //     truncateTextLength: 5,
                //     truncateTextBreakOnWord: false,
                //     tooltip: 'title',
                //     tooltipPlacement: 'bottom',
                // },
                {name: '标题', field: 'title'},
                {
                    name: '上线时间',
                    fieldDirective: '<p>上架时间<br/> <span ng-bind="item.start_time"></span><br/>下架时间<br/><span ng-bind="item.end_time"></span></p>'
                },
                {name: '拼团规则', fieldDirective: '<div groupbuy-pattern data="item"></div>'},
                {name: '配送规则', fieldDirective: '<div product-pattern data="item"></div>'},
                {name: '拼团成<br/>功数量', field: 'order.groupbuy_count'},
                {name: '支付成<br/>功订单', field: 'order.order_count'},
                {name: '已售<br/>份数', field: 'order.order_copies'},
                {
                    name: '剩余<br/>库存',
                    fieldDirective: '<span ng-bind="item.origin_inventory-item.inventory.used_count"></span>'
                },
                {name: '商品<br/>状态', field: 'status', filter: 'product_status'},
                // {
                //     name: '商品<br/>备注', field: 'admin_remark',
                //     truncateText: true,
                //     truncateTextLength: 7,
                //     truncateTextBreakOnWord: false,
                //     tooltip: 'admin_remark',
                //     tooltipPlacement: 'bottom',
                // },
                {name: '商品备注', field: 'admin_remark'},
                {
                    name: '操作',
                    fieldDirective: '<p><a class="btn btn-success btn-rounded btn-sm" data="item" ' +
                    'ui-sref="main.product.update({product_id:item.product_id})">编辑</a></p>' +
                    '<div product-change-status data="item"></div>'
                },
            ],
            config: {
                title: '商品管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    // {
                    //     value: 'status', text: '商品状态', type: 'btnGroup', default: '1', width: '6',
                    //     enum: [
                    //         {value: '', text: '全部'},
                    //         {value: '1', text: '正在进行'},
                    //         {value: '3', text: '已下线'},
                    //         // {value: '0', text: '草稿'},
                    //     ]
                    // },
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray',
                        value: 'flag',
                        text: '状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: ['1', '1'], text: '正在进行'},
                            {value: ['3', ''], text: '已下线'},
                            {value: ['1', '2'], text: '待上线'},
                        ]
                    },
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全部'},
                            {value: '1', text: '是'},
                            {value: '2', text: '否'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    category: [1, 2],
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.product.add', text: '新增商品'}]
            },
            act_columns: [
                {name: '活动ID', field: 'product_id', className: 'text-center'},
                {name: '活动类型', field: 'category', filter: 'product_category'},
                {
                    name: '标题', field: 'title',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltip: 'title',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '报名时间',
                    fieldDirective: '<p>开始时间<br/> <span ng-bind="item.act_apply_start_time"></span>' +
                    '<br/>结束时间<br/><span ng-bind="item.act_apply_end_time"></span></p>'
                },
                {
                    name: '活动时间、地点',
                    fieldDirective: '<p>开始时间:<br/> <span ng-bind="item.act_start_time"></span>' +
                    '<br/>结束时间:<br/><span ng-bind="item.act_end_time"></span>' +
                    '<br/>地点:<br/><span ng-bind="item.act_address"></span></p>'
                },
                {name: '活动类目', fieldDirective: '<div product-option data="item"></div>'},
                {name: '覆盖城市', field: 'citys', filter: 'arraySub2String:\'city_name\''},
                {name: '报名人数', field: 'order.groupbuy_count'},
                {name: '已售份数', field: 'order.order_copies'},
                {
                    name: '剩余<br/>库存',
                    fieldDirective: '<span ng-bind="item.origin_inventory-item.inventory.used_count"></span>'
                },
                {
                    name: '上下架时间',
                    fieldDirective: '<p>上架时间<br/> <span ng-bind="item.start_time"></span><br/>下架时间<br/><span ng-bind="item.end_time"></span></p>'
                },
                {name: '活动<br/>状态', field: 'status', filter: 'product_status'},
                {
                    name: '管理<br/>备注', field: 'admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'admin_remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '操作',
                    fieldDirective: '<p><a class="btn btn-success btn-rounded btn-sm" data="item" ' +
                    'ui-sref="main.act.update({product_id:item.product_id})">编辑</a></p>' +
                    '<div product-change-status data="item"></div>'
                },
            ],
            act_config: {
                title: '活动管理',
                api: '/products',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray2',
                        value: 'flag1',
                        text: '活动类别',
                        default: 0, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'category',
                        enum: [
                            {value: [3, 4], text: '全部'},
                            {value: [3], text: '一起团'},
                            {value: [4], text: '众筹'},
                        ]
                    },
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray',
                        value: 'flag2',
                        text: '活动状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: ['1', '1'], text: '正在进行'},
                            {value: ['3', ''], text: '已下线'},
                            {value: ['1', '2'], text: '待上线'},
                        ]
                    },
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '12',
                        enum: [
                            {value: '0', text: '全部'},
                            {value: '1', text: '是'},
                            {value: '2', text: '否'},
                        ]
                    },
                    {value: 'keyword', text: '活动标题'},
                    // {value: 'date_min', text: '开始日期', type: 'date'},
                    // {value: 'date_max', text: '结束日期', type: 'date'},
                ],
                preSelectionSearch: {
                    category: [3, 4],
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{value: 'main.act.add', text: '新增活动'}]
            },
        }
    }
    return rtn;
});