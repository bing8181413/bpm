define([], function () {
    var rtn = {
        merchantProductList: {
            columns: [
                {
                    name: 'ID和排序', className: 'mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'ID:\'+item.product_id"></span></p>' +
                    '<p><span ng-bind="\'排序:\'+item.order_by"></span></p>'
                },
                {
                    name: '供应商', className: 'mobile_show',
                    fieldDirective: '<div ng-show="item.merchant_product"><p><span ng-bind="\'供应商ID:\'+item.merchant_product.merchant.account_id"></span></p>' +
                    '<p><span ng-bind="\'全名:\'+item.merchant_product.merchant.company_name"></span></p></div>'
                },
                {
                    name: '是否可看<br/>联系人信息',
                    field: 'merchant_product.show_contact|keyVal:\'1\':\'是\':\'2\':\'--\'|null2empty'
                },
                {name: '拼团成<br/>功数量', field: 'order.groupbuy_count'},
                {name: '订单数', className: 'mobile_show', fieldDirective: '<div act-order-copies data="item"></div>'},
                {name: '报名人数', className: 'mobile_show', field: 'order.order_count'},
                {
                    name: '已售份数',
                    className: 'mobile_show',
                    fieldDirective: '<div product-order-copies data="item"></div>'
                },
                {name: '剩余<br/>库存', field: 'options', filter: 'arraySum:\'left_inventory\''},
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
                {name: '总金额', field: 'merchant_product.real_order.amount'},
                {
                    name: '管理<br/>备注', field: 'admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'admin_remark',
                    tooltipPlacement: 'bottom',
                },
                // {
                //     name: '操作', className: 'mobile_show',
                //     fieldDirective: '<div add-merchant-product data="item" ></div>'
                // '<div weinxi-view data="item" ></div>'
                // + '<div act-edit data="item" ></div>'
                // + '<div product-change-status data="item" ></div>'
                // + '<div change-product-type data="item" ></div>'
                // + '<div act-crowdfunding data="item" ></div>'
                // + '<div act-change-notice data="item" ></div>'
                // '<p><a class="btn btn-success btn-rounded btn-sm" data="item" ' +
                // 'ui-sref="main.act.update({product_id:item.product_id})">编辑</a></p>' +
                // '<div product-change-status data="item"></div>'
                // },
            ],
            config: {
                title: '供应商活动列表',
                api: '/merchant/merchantproducts',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'company_name', text: '供应商名字', placeholder: '供应商名字', default: ''},
                    {value: 'account_id', text: '供应商ID', placeholder: '供应商ID', default: ''},
                ],
                preSelectionSearch: {
                    // sku: '',
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
            columns_by_merchant: [
                {name: '活动ID', field: 'product_id'},
                {
                    name: 'utm_source',
                    field: 'merchant_product.utm_source',
                },
                {
                    name: '链接',
                    fieldDirective: '<span ng-bind="$root.common.wx_domain+\'/product/detail/product_id/\'+item.product_id+\'?utm_source=\'+item.utm_source+\'&utm_medium=&utm_campaign=\'"></span>'
                },
                {name: '活动标题', field: 'title', className: 'width100'},
                {name: '拼团成<br/>功数量', field: 'order.groupbuy_count'},
                {
                    name: '订单数',
                    field: 'order.order_count',
                },
                // {name: '报名人数', className: 'mobile_show', field: 'order.order_count'},
                {
                    name: '已售份数',
                    field: 'order.order_copies',
                },
                {
                    name: '退订数',
                    field: 'merchant_product.real_product.fail_order',
                },
                {name: '剩余<br/>库存', field: 'options', filter: 'arraySum:\'left_inventory\''},
                {
                    name: '抢购进度',
                    fieldDirective: '<div><p>抢购进度<br/>' +
                    ' <span ng-bind="((item.order && item.order.order_copies)||0)| process:(item.options|arraySum:\'option_inventory\')"></span></p>' +
                    '<p>已售份数<br/><span ng-bind="(item.order && item.order.order_copies)||0"></span></p>' +
                    '<p>库存<br/><span ng-bind="item.options|arraySum:\'option_inventory\'"></span></p></div>'
                },
                {name: '总金额', field: 'order.amounts'},
                {
                    name: '操作',
                    fieldDirective: '<div del-merchant-product data="item" ></div>'
                },
            ],
            config_by_merchant: {
                title: '供应商活动列表',
                api: '/merchant/merchantproducts',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [
                    {value: 'company_name', text: '供应商名字', placeholder: '供应商名字', default: ''},
                    {value: 'account_id', text: '供应商ID', placeholder: '供应商ID', default: ''},
                ],
                preSelectionSearch: {
                    // sku: '',
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
                ],
                scopeSearchParam: 'actPageInfo',
                ext: {
                    showNum: [
                        {text: '总数', type: 'total'},
                    ],
                }
            },
        }
    }
    return rtn;
});