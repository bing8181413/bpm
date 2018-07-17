define([], function() {
    var rtn = {
        batchproductsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '母课程ID', field: 'parent_id', className: 'text-center'},
                {
                    name: '同步商品基数',
                    fieldDirective: '<p><span ng-bind="item.sync_base|keyVal:\'1\':\'同步\':\'2\':\'不同步\'"></span></p>'
                    + '<span batchproducts-update data="item"></span>',
                },
                {
                    name: '课程信息', className: 'width300 mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'标题:\'+item.product.title"></span></p>' +
                    '<p><span ng-bind="\'SKU:\'+(item.product.sku|product_sku)"></span></p>' +
                    '<p><span ng-bind="\'课程类型:\'+(item.product.category|product_category)"></span></p>' +
                    '<p><span ng-bind="\'课程类别:\'+item.product.act_type"></span></p></div>',
                },
                {
                    name: '时间',
                    fieldDirective: '<div><p>报名-开始时间:<span ng-bind="item.product.act_apply_start_time"></span></p>' +
                    '<p>报名-结束时间:<span ng-bind="item.product.act_apply_end_time"></span></p>' +
                    '<p>课程-开始时间:<span ng-bind="item.product.act_start_time"></span></p>' +
                    '<p>课程-结束时间:<span ng-bind="item.product.act_end_time"></span></p></div>',
                },
                {
                    name: '覆盖课程', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:item.count,modid:\'productsonsList\',config:\'config\',columns:\'columns\',extApi:$root.common.domain+\'/product/\'+item.parent_id+\'/sons\'}"></span>',
                },
                {name: '管理备注', field: 'product.admin_remark'},
                {
                    name: '母课程操作',
                    fieldDirective: '<span product-son-add data="item"></span>'
                    + '<span product-cover data="item"></span>'
                    + '<span batchproducts-del data="item"></span>',
                },
                {
                    name: '母课程管理',
                    fieldDirective: '<div act-edit data="item.product" ></div>'
                    // +'<p delete-data data="" config="{url:$root.common.domain+\'/product/\'+item.parent_id+\'/sonsredis\',method:\'DELETE\',text:\'删除缓存\',class:\'btn-danger\'}" param="{}" callback="updateList()"></p>'
                    + '<span><div act-copy data="item.product" ext-data="item"></span>',
                },
            ],
            config: {
                title: '批量课程管理',
                api: '/product/batchproducts',
                rowItemName: 'item',
                searchSupport: true,
                searchItems: [
                    {value: 'product_id', text: '课程ID', placeholder: '课程ID', default: ''},
                    {value: 'keyword', text: '关键字', placeholder: '课程标题,管理备注', default: ''},
                ],
                preSelectionSearch: {
                    // status: '0',
                },
                paginationSupport: true,
                pageInfo: {
                    count: 20,
                    page: 1,
                    maxSize: 2, //最大展示页，默认3
                    // showPageGoto: false //属性为true将显示前往第几页。
                },
                route: [{routeDirective: '<span batchproducts-add></span>'}],
            },
        },
    };
    return rtn;
});