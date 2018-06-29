define(['angular', './common'], function(angular, common) {
    var rtn = {
        productList: {
            columns: [
                // {name: 'ID', field: 'product_id', className: 'text-center'},
                // {name: '排序', field: 'order_by'},
                {
                    name: 'ID和排序', className: 'width100 mobile_show',
                    fieldDirective: '<div>'
                    + '<p>ID:<span ng-bind="item.product_id"></span></p>'
                    + '<p>排序:<span ng-bind="item.order_by"></span></p>'
                    + '<p><div account_id_to_name data="item"></div></p>'
                    + '<span weinxi-view data="item" ></span>'
                    + '</div>',
                },
                {
                    name: '课程信息', className: 'width200 mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'标题:\'+item.title"></span></p>' +
                    '<p><span ng-bind="\'SKU:\'+(item.sku|common:\'sku\')"></span></p>' +
                    '<p><span ng-bind="\'课程类型:\'+(item.category|product_category)"></span></p>' +
                    '<p><span ng-bind="\'团结束类型:\'+(item.groupbuy_end_type|groupbuy_end_type)"></span></p>' +
                    '<p><span ng-bind="\'课程类别:\'+item.act_type"></span></p>' +
                    '<p class="label" ' +
                    'ng-class="{\'label-primary\':item.status==1,\'label-warning\':item.status!=1}">' +
                    '课程状态:<span ng-bind="item.status|product_status"></span></p>' +
                    '</div>',
                },
                {
                    name: '时间', className: 'width300 mobile_show',
                    fieldDirective: '<div>' +
                    '<p><span >报名-开始时间</span>:<span ng-bind="item.act_apply_start_time"></span></p>' +
                    '<p><span >报名-结束时间</span>:<span ng-bind="item.act_apply_end_time"></span></p>' +
                    '<p><span >课程-开始时间</span>:<span ng-bind="item.act_start_time"></span></p>' +
                    '<p><span >课程-结束时间</span>:<span ng-bind="item.act_end_time"></span>' +
                    '<p><span >上架-开始时间</span>:<span ng-bind="item.start_time"></span></p>' +
                    '<p><span >上架-结束时间</span>:<span ng-bind="item.end_time"></span>' +
                    '<p><span >课程时间类型</span>:<span ng-bind="item.act_time_type|act_time_type"></span></p>' +
                    '<p ng-show="item.act_time_type==2"><span ng-bind="item.act_week_desc"></span></p>' +
                    '</div>',
                },
                {
                    name: '课程类目',
                    className: 'width250 mobile_show',
                    fieldDirective: '<div product-option data="item"></div>',
                },
                {
                    name: '售卖信息', className: 'width150 mobile_show',
                    fieldDirective: '<div>' +
                    '<p>拼团成功数量:<span ng-bind="item.order.groupbuy_count"></span></p>' +
                    '<p>报名人数:<span ng-bind="item.order.order_count"></span></p>' +
                    '<p>销售总金额:<span ng-bind="item.order.amounts"></span></p>' +
                    '<p>订单总数:<span act-order-copies data="item"></span></p>' +
                    '<p>已售份数:<span product-order-copies data="item"></span>' +
                    '</div>',
                },
                {
                    name: '抢购进度',
                    fieldDirective: '<div>' +
                    '<p>抢购进度:<span ng-bind="((item.order && item.order.order_copies)||0)| process:(item.options|arraySum:\'option_inventory\')"></span></p>' +
                    '<p>剩余库存:<span ng-bind="item.options|arraySum:\'left_inventory\'"></span></p>' +
                    '<p>库存:<span ng-bind="item.options|arraySum:\'option_inventory\'"></span></p></div>',
                },
                // {name: '配送规则', fieldDirective: '<div product-pattern data="item"></div>'},
                // {name: '覆盖城市', field: 'citys', filter: 'arraySub2String:\'city_name\''},
                {name: '管理备注', field: 'admin_remark', className: 'width150 mobile_show'},
                {
                    name: '状态修改', className: 'mobile_show width150',
                    fieldDirective:
                    '<div product-change-status data="item" ></div>'
                    + '<div change-product-type data="item" ></div>'
                    + '<div act-crowdfunding data="item" ></div>' +
                    '<p delete-data data="" config="{url:$root.common.domain+\'/product/\'+item.product_id+\'/redis\',method:\'DELETE\',text:\'删除缓存\',class:\'btn-danger btn-xs\'}" param="{}" callback="updateList()"></p>',

                },
                {
                    name: '操作', className: 'mobile_show width150',
                    fieldDirective: '<div act-edit data="item" ></div>'
                    + '<div act-distribution data="item" ></div>'
                    + '<div act-change-notice data="item" ></div>',
                },
            ],
            config: {
                title: '课程列表',
                api: '/products',
                rowItemName: 'item',
                rowItemClass: [
                    {product_id: 'hjm.act.product_id'},
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
                        text: '课程状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type', 'process_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', '', ''], text: '全 部'},
                            // {value: ['1', '1', '1'], text: '正在进行'},
                            // {value: ['1', '1', '2'], text: '进行中'},
                            {value: ['1', '1', '5'], text: '进行中'},// 5 包括原进行中和 没有结束时间的课程
                            {value: ['1', '1', '2'], text: '即将开始'},
                            {value: ['1', '1', '3'], text: '已结束'},
                            {value: ['3', '', ''], text: '已下线'},
                            {value: ['1', '2', ''], text: '待上线'},
                        ],
                    },
                    {
                        text: 'SKU', width: '6',
                        paramDirective: '<select class="form-control" ng-model="params.sku" ' +
                        'ng-options="item.value as item.text for item in $root.common.sku">' +
                        '<option value="">-- 全部 --</option>' +
                        '</select>',
                    },
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全 部'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '2', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ],
                    },
                    {value: 'product_id', text: '课程ID', placeholder: '课程ID', default: ''},
                    {
                        value: 'group_strange', text: '陌生人拼团', type: 'btnGroup', default: '0', width: '6',
                        enum: [
                            {value: '0', text: '全 部'},
                            {value: '2', text: '&nbsp;&nbsp;&nbsp;是&nbsp;&nbsp;&nbsp;'},
                            {value: '1', text: '&nbsp;&nbsp;&nbsp;否&nbsp;&nbsp;&nbsp;'},
                        ],
                    },
                    {value: 'keyword', text: '关键字', placeholder: '课程标题,管理备注', default: ''},
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray2',
                        value: 'flag1',
                        text: '课程类型',
                        default: 0, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'category',
                        enum: [
                            {value: [2, 3, 4], text: '全 部'},
                            {value: [3], text: '直接买'},
                            {value: [2], text: '人数团'},
                            {value: [4], text: '人数团和直接买'},
                        ],
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
                // route: [{value: 'main.act.add', text: '新增课程'}]
                route: [
                    // {value: 'main.act.add', text: '新增商品'},
                    {routeDirective: '<div act-add data="" >新增课程</div>'},
                ],
                scopeSearchParam: 'actPageInfo',
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                },
            },
            columns_by_subject: [
                {name: '课程类型', field: 'product.category', filter: 'product_category'},
                {name: '课程ID', field: 'product_id', className: 'text-center'},
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
                    '<br/>结束时间<br/><span ng-bind="item.product.act_apply_end_time"></span></p>',
                },
                {name: '课程类目', fieldDirective: '<div product-option data="item.product"></div>'},
                {name: '已售份数', fieldDirective: '<div product-order-copies data="item.product"></div>'},
                {name: '剩余<br/>库存', field: 'product.options', filter: 'arraySum:\'left_inventory\''},
                {name: '当前<br/>状态', field: 'product.status', filter: 'product_status'},
                {
                    name: '操作',
                    fieldDirective: '<div del-subject-products data="item" ></div>',
                },
            ],
            config_by_subject: {
                title: '专题课程列表',
                api: '/subjects/products',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray2',
                        value: 'flag1',
                        text: '课程类别',
                        default: 0, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: 'category',
                        enum: [
                            {value: [3, 4], text: '全部'},
                            {value: [3], text: '众筹'},
                            {value: [4], text: '一起玩'},
                        ],
                    },
                    {   // available_type 1 有效期内 2 尚未开始	3 已经过期 4 有效期外
                        type: 'btnGroupArray',
                        value: 'flag2',
                        text: '课程状态',
                        default: 1, //有enum_text时 enumde index 的值
                        width: '6',
                        enum_text: ['status', 'available_type'],//  有  enum_text 说明是数组
                        enum: [
                            {value: ['', ''], text: '全部'},
                            {value: ['1', '1'], text: '正在进行'},
                            {value: ['3', ''], text: '已下线'},
                            {value: ['1', '2'], text: '待上线'},
                        ],
                    },
                    {
                        value: 'visible', text: '是否显示', type: 'btnGroup', default: '0', width: '12',
                        enum: [
                            {value: '0', text: '全部'},
                            {value: '1', text: '是'},
                            {value: '2', text: '否'},
                        ],
                    },
                    {value: 'keyword', text: '课程标题'},
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
                // route: [{value: 'main.act.add', text: '新增课程'}]
                route: [
                    // {value: 'main.act.add', text: '新增商品'},
                    // {routeDirective: '<div act-add data="" >新增课程</div>'}
                ],
            },
        },
    };
    return rtn;
});