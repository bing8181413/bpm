define([], function () {
    var rtn = {
        batchproductsList: {
            columns: [
                {name: 'ID', field: 'id', className: 'text-right'},
                {name: '母活动ID', field: 'parent_id', className: 'text-center'},
                {
                    name: '活动信息', className: 'width100 mobile_show',
                    fieldDirective: '<div><p><span ng-bind="\'标题:\'+item.product.title"></span></p>' +
                    '<p><span ng-bind="\'SKU:\'+(item.product.sku|product_sku)"></span></p>' +
                    '<p><span ng-bind="\'活动类型:\'+(item.product.category|product_category)"></span></p>' +
                    '<p><span ng-bind="\'活动类别:\'+item.product.act_type"></span></p></div>'
                },
                {
                    name: '报名时间',
                    fieldDirective: '<div><p>开始时间:<br/> <span ng-bind="item.product.act_apply_start_time"></span></p>' +
                    '<p>结束时间:<br/><span ng-bind="item.product.act_apply_end_time"></span></p></div>'
                },
                {
                    name: '活动时间、地点',
                    fieldDirective: '<div><p>开始时间:<br/> <span ng-bind="item.product.act_start_time"></span></p>' +
                    '<p>结束时间:<br/><span ng-bind="item.product.act_end_time"></span></p>' +
                    '<p>活动时间类型:<br/> <span ng-bind="item.product.act_time_type|act_time_type"></span></p>' +
                    '<p ng-show="item.product.act_time_type==2"><span ng-bind="item.product.act_week_desc"></span></p>' +
                    '<span ng-show="item.product.addresses.length>0">地点:</span>' +
                    '<p ng-repeat=" obj in item.product.addresses " ng-show="item.product.addresses.length>0">' +
                    '<span ng-bind="($index+1)+\':\'+obj.detail_address"></span>' +
                    '</p></div>'
                },
                {
                    name: '覆盖活动', className: 'text-center',
                    fieldDirective: '<span show-table data="{text:item.count,modid:\'productsonsList\',config:\'config\',columns:\'columns\',extApi:$root.common.domain+\'/product/\'+item.parent_id+\'/sons\'}"></span>'
                },
                {
                    name: '管理备注', field: 'product.admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'product.admin_remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '管理',
                    fieldDirective: '<div act-edit data="item.product" ></div>'
                    + '<span <div act-copy data="item.product" ext-data="item"></span>'
                    + '<span product-son-add data="item"></span>'
                    + '<span product-cover data="item"></span>'
                    + '<span batchproducts-del data="item"></span>'
                }
            ],
            config: {
                title: '批量活动管理',
                api: '/product/batchproducts',
                rowItemName: 'item',
                searchSupport: false,
                searchItems: [],
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
        }
    }
    return rtn;
});