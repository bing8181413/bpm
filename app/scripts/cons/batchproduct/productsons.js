define([], function () {
    var rtn = {
        productsonsList: {
            columns: [
                {name: '活动ID', field: 'son_id', className: 'text-center'},
                {name: '活动名称', field: 'son_product.title', className: 'text-left'},
                {
                    name: '管理备注', field: 'son_product.admin_remark',
                    truncateText: true,
                    truncateTextLength: 7,
                    truncateTextBreakOnWord: false,
                    tooltip: 'son_product.admin_remark',
                    tooltipPlacement: 'bottom',
                },
                {
                    name: '管理',
                    fieldDirective: '<div product-son-edit data="item.son_product" ></div>' + '<span product-son-del data="item"></span>'
                }
            ],
            config: {
                title: '覆盖活动列表',
                api: '子活动在母活动配置',
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
                // route: [{value: 'main.batchproducts.add', text: '新增子活动'}]
            },
        }
    }
    return rtn;
});