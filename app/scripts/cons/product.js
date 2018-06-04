define(['angular', './common'], function (angular, common) {
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
                {name: '排序', field: 'order_by'},
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
                    fieldDirective: '<div product-edit data="item" ></div>' +
                    '<div change-product-type data="item" ></div>' +
                    '<div product-change-status data="item" ></div>'
                },
            ],
            config: {
                title: '商品列表',
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
                route: [
                    // {value: 'main.product.add', text: '新增商品'},
                    {routeDirective: '<div product-add data="">新增商品</div>'},
                    {routeDirective: '<div product-act-add data="">新增活动类商品</div>'}
                ]
            },
            act_columns: [
                // {name: 'ID', field: 'product_id', className: 'text-center'},
                // {name: '排序', field: 'order_by'},
                {
                    name: 'ID和排序', className: 'mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'ID:\'+item.product_id"></span></p>' +
                    '<p><span ng-bind="\'排序:\'+item.order_by"></span></p>' +
                    '<p><div account_id_to_name data="item"></div></p></div>'
                },
                {
                    name: '课程信息', className: 'width100 mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'标题:\'+item.title"></span></p>' +
                    '<p><span ng-bind="\'SKU:\'+(item.sku|common:\'sku\')"></span></p>' +
                    '<p><span ng-bind="\'活动类型:\'+(item.category|product_category)"></span></p>' +
                    // '<p><span ng-bind="\'活动类型:\'+(item.category|product_category)"></span></p>' +
                    '<p><span ng-bind="\'活动类别:\'+item.act_type"></span></p></div>'
                },
                {
                    name: '报名时间',
                    fieldDirective: '<div><p>开始时间:<br/> <span ng-bind="item.act_apply_start_time"></span></p>' +
                    '<p>结束时间:<br/><span ng-bind="item.act_apply_end_time"></span></p></div>'
                },
                {
                    name: '活动时间、地点',
                    fieldDirective: '<div><p>开始时间:<br/> <span ng-bind="item.act_start_time"></span></p>' +
                    '<p>结束时间:<br/><span ng-bind="item.act_end_time"></span></p>' +
                    '<p>活动时间类型:<br/> <span ng-bind="item.act_time_type|act_time_type"></span></p>' +
                    '<p ng-show="item.act_time_type==2"><span ng-bind="item.act_week_desc"></span></p>' +
                    '<span ng-show="item.addresses.length>0">地点:</span>' +
                    '<p ng-repeat=" obj in item.addresses " ng-show="item.addresses.length>0">' +
                    '<span ng-bind="($index+1)+\':\'+obj.detail_address"></span>' +
                    '</p></div>'
                },
                {
                    name: '活动类目',
                    className: 'width250 mobile_show',
                    fieldDirective: '<div product-option data="item"></div>'
                },
                {name: '拼团成<br/>功数量', field: 'order.groupbuy_count'},
                {name: '订单数', className: 'mobile_show', fieldDirective: '<div act-order-copies data="item"></div>'},
                {name: '报名人数', className: 'mobile_show', field: 'order.order_count'},
                {
                    name: '已售份数',
                    className: 'mobile_show',
                    fieldDirective: '<div product-order-copies data="item"></div>'
                },
                {name: '销售总金额', className: 'mobile_show', field: 'order.amounts'},
                {name: '剩余<br/>库存', field: 'options', filter: 'arraySum:\'left_inventory\''},
                // {
                //     name: '众筹进度',
                //     fieldDirective: '<p ng-if="item.category==3">众筹进度<br/>' +
                //     ' <span ng-bind="((item.order && item.order.amounts)||0)| process:item.act_goal_price"></span><br/>' +
                //     '已筹金额<br/><span ng-bind="(item.order && item.order.amounts)||0"></span><br/>' +
                //     '目标金额<br/><span ng-bind="item.act_goal_price"></span></p>' +
                //     '<p ng-if="item.category!==3">——</p>'
                // },
                {
                    name: '抢购进度',
                    fieldDirective: '<div><p>抢购进度<br/>' +
                    ' <span ng-bind="((item.order && item.order.order_copies)||0)| process:(item.options|arraySum:\'option_inventory\')"></span></p>' +
                    '<p>已售份数<br/><span ng-bind="(item.order && item.order.order_copies)||0"></span></p>' +
                    '<p>库存<br/><span ng-bind="item.options|arraySum:\'option_inventory\'"></span></p></div>'
                },
                {
                    name: '上下架时间',
                    fieldDirective: '<div><p>上架时间<br/> <span ng-bind="item.start_time"></span></p><p>下架时间<br/><span ng-bind="item.end_time"></span></p></div>'
                },
                {name: '活动状态', field: 'status', filter: 'product_status'},
                {name: '配送规则', fieldDirective: '<div product-pattern data="item"></div>'},
                {name: '覆盖城市', field: 'citys', filter: 'arraySub2String:\'city_name\''},
                // {
                //     name: '众筹<br/>结果',
                //     fieldDirective: '<span ng-bind="item.act_result|act_result" ng-if="item.category==3"></span>' +
                //     '<span ng-if="item.category!==3">——</span>'
                // },
                {
                    name: '管理<br/>备注', field: 'admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'admin_remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '操作', className: 'mobile_show',
                    fieldDirective: '<div weinxi-view data="item" ></div>'
                    + '<div act-edit data="item" ></div>'
                    + '<div product-change-status data="item" ></div>'
                    + '<div change-product-type data="item" ></div>'
                    + '<div act-crowdfunding data="item" ></div>'
                    + '<div act-change-notice data="item" ></div>'
                    // '<p><a class="btn btn-success btn-rounded btn-sm" data="item" ' +
                    // 'ui-sref="main.act.update({product_id:item.product_id})">编辑</a></p>' +
                    // '<div product-change-status data="item"></div>'
                },
            ],
            act_config: {
                title: '活动列表',
                api: '/products',
                rowItemName: 'item',
                rowItemClass: [
                    {product_id: 'hjm.act.product_id'}
                ],
                searchSupport: true,
                searchItems: [
                    // {
                    //     value: 'course_type', text: '课程类型', type: 'btnGroup', default: '', width: '12',
                    //     enum: [
                    //         {value: '', text: '全 部'},
                    //         {value: '1', text: '公众号课程'},
                    //         {value: '2', text: '小程序课程'},
                    //     ]
                    // },
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        // process_type  1 即将开始  2 进行中 3 已结束
                        type: 'btnGroupArray',
                        value: 'flag2',
                        text: '活动状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type', 'process_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', '', ''], text: '全 部'},
                            // {value: ['1', '1', '1'], text: '正在进行'},
                            // {value: ['1', '1', '2'], text: '进行中'},
                            {value: ['1', '1', '5'], text: '进行中'},// 5 包括原进行中和 没有结束时间的活动
                            {value: ['1', '1', '2'], text: '即将开始'},
                            {value: ['1', '1', '3'], text: '已结束'},
                            {value: ['3', '', ''], text: '已下线'},
                            {value: ['1', '2', ''], text: '待上线'},
                        ]
                    },
                    {
                        text: 'SKU',width: '6',
                        paramDirective: '<select class="form-control" ng-model="params.sku" ' +
                        'ng-options="item.value as item.text for item in $root.common.sku">' +
                        '<option value="">-- 全部 --</option>'+
                        '</select>'
                    },
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '2', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ]
                    },
                    {value: 'product_id', text: '活动ID', placeholder: '活动ID', default: ''},
                    {
                        value: 'group_strange', text: '陌生人拼团', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全 部'},
                            {value: '2', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ]
                    },
                    {value: 'keyword', text: '关键字', placeholder: '活动标题,管理备注', default: ''},
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray2',
                        value: 'flag1',
                        text: '活动类型',
                        default: 0, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'category',
                        enum: [
                            {value: [2, 3, 4], text: '全 部'},
                            {value: [3], text: '直接买'},
                            {value: [2], text: '人数团'},
                            {value: [4], text: '人数团和直接买'},
                        ]
                    },
                ],
                preSelectionSearch: {
                    sku: '',
                    category: [2, 3, 4],
                    // category: [2, 3, 4],
                    // key: 'deviceNo',
                    // value: 'testinfo'
                },
                paginationSupport: true,
                pageInfo: {
                    count: 10,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.act.add', text: '新增活动'}]
                route: [
                    // {value: 'main.act.add', text: '新增商品'},
                    {routeDirective: '<div act-add data="" >新增活动</div>'}
                ],
                scopeSearchParam: 'actPageInfo',
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                }
            },
            columns_by_subject: [
                {name: '活动类型', field: 'product.category', filter: 'product_category'},
                {name: '活动ID', field: 'product_id', className: 'text-center'},
                {
                    name: '标题', field: 'product.title',
                    truncateText: true,
                    truncateTextLength: 5,
                    truncateTextBreakOnWord: false,
                    tooltip: 'product.title',
                    tooltipPlacement: 'bottom',
                },
                {name: '简介', field: 'product.brief'},
                {
                    name: '报名时间',
                    fieldDirective: '<p>开始时间<br/> <span ng-bind="item.product.act_apply_start_time"></span>' +
                    '<br/>结束时间<br/><span ng-bind="item.product.act_apply_end_time"></span></p>'
                },
                {name: '活动类目', fieldDirective: '<div product-option data="item.product"></div>'},
                {name: '已售份数', fieldDirective: '<div product-order-copies data="item.product"></div>'},
                {name: '剩余<br/>库存', field: 'product.options', filter: 'arraySum:\'left_inventory\''},
                {name: '当前<br/>状态', field: 'product.status', filter: 'product_status'},
                {
                    name: '操作',
                    fieldDirective: '<div del-subject-products data="item" ></div>'
                },
            ],
            config_by_subject: {
                title: '专题活动列表',
                api: '/subjects/products',
                rowItemName: 'item',
                searchSupport: false,
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
                            {value: [3], text: '众筹'},
                            {value: [4], text: '一起玩'},
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
                    // category: [3, 4],
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 5, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                // route: [{value: 'main.act.add', text: '新增活动'}]
                route: [
                    // {value: 'main.act.add', text: '新增商品'},
                    // {routeDirective: '<div act-add data="" >新增活动</div>'}
                ]
            },
        }
    }
    return rtn;
});